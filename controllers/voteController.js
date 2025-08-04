const Vote = require('../models/Vote');

// POST /api/votes/:id/toggle
exports.toggleVote = async (req, res) => {
  try {
    const { email } = req.user || {}; // assuming user is available via middleware
    if (!email) return res.status(401).json({ error: 'Login required' });

    const vote = await Vote.findById(req.params.id);
    if (!vote) return res.status(404).json({ error: 'Vote not found' });

    const index = vote.voters.indexOf(email);
    if (index === -1) {
      vote.voters.push(email);
    } else {
      vote.voters.splice(index, 1);
    }

    vote.totalVotes = vote.voters.length;
    await vote.save();

    res.json({ voters: vote.voters, totalVotes: vote.totalVotes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// POST a new vote
exports.createVote = async (req, res) => {
  try {
    const { name, email, country, reason, images, options, start_date, end_date } = req.body;

    const vote = new Vote({
      name,
      email,
      country,
      reason,
      images: Array.isArray(images) ? images : [],
      options: Array.isArray(options) ? options : [],
      start_date: start_date ? new Date(start_date) : undefined,
      end_date: end_date ? new Date(end_date) : undefined
    });

    await vote.save();
    res.status(201).json({ message: 'Vote form submitted. Awaiting approval.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET all approved votes
exports.getApprovedVotes = async (req, res) => {
  try {
    const now = new Date();
    const votes = await Vote.find({
      isApproved: true,
      $or: [
        { end_date: { $exists: false } },
        { end_date: { $gt: now } }
      ]
    }).sort({ createdAt: -1 });

    res.json(votes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// GET a single approved vote by ID
exports.getVoteById = async (req, res) => {
  try {
    const vote = await Vote.findOne({
      _id: req.params.id,
      isApproved: true
    });

    if (!vote) {
      return res.status(404).json({ error: 'Vote not found' });
    }

    res.json(vote);
  } catch (error) {
    res.status(400).json({ error: 'Invalid vote ID' });
  }
};


// Admin: GET all votes
exports.getAllVotes = async (req, res) => {
  try {
    const votes = await Vote.find();
    res.json(votes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin: Approve vote
exports.approveVote = async (req, res) => {
  try {
    const vote = await Vote.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
if (!vote) return res.status(404).json({ error: 'Vote not found' });

    res.json({ message: 'Vote approved' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Admin: Delete vote
exports.deleteVote = async (req, res) => {
  try {
    await Vote.findByIdAndDelete(req.params.id);
    res.json({ message: 'Vote deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
