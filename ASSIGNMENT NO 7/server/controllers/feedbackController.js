const Feedback = require('../models/Feedback');

const submitFeedback = async (req, res) => {
    try {
        const { course, faculty, rating, comment, isAnonymous } = req.body;
        const feedback = new Feedback({
            studentId: req.user.id,
            course,
            faculty,
            rating,
            comment,
            isAnonymous
        });
        await feedback.save();
        res.status(201).json(feedback);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find()
            .populate('studentId', 'name')
            .sort({ createdAt: -1 });
        res.json(feedbacks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { submitFeedback, getFeedbacks };
