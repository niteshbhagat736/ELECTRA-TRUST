const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  reason: {
    type: String,
    required: true,
    trim: true
  },
  images: {
    type: [String],
    default: []
  },
  options: {
    type: [String],
    default: []
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  voters: {
    type: [String],
    default: []
  },
  totalVotes: {
    type: Number,
    default: 0
  }
  ,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Vote', voteSchema);
