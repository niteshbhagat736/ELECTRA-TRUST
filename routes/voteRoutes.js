const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');
const { verifyAdmin, requireAuth } = require('../middlewares/authMiddleware');

// Public
router.post('/', voteController.createVote);
router.get('/all', verifyAdmin, voteController.getAllVotes);         
router.put('/approve/:id', verifyAdmin, voteController.approveVote); 
router.post('/:id/toggle', requireAuth, voteController.toggleVote);
router.delete('/:id', verifyAdmin, voteController.deleteVote);

//  (dynamic route)
router.get('/:id', voteController.getVoteById);

router.get('/', voteController.getApprovedVotes);  


module.exports = router;
