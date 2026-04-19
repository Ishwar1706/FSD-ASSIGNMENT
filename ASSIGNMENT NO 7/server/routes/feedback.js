const express = require('express');
const router = express.Router();
const { submitFeedback, getFeedbacks } = require('../controllers/feedbackController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, submitFeedback);
router.get('/', getFeedbacks);

module.exports = router;
