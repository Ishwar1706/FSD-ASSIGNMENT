const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: String, required: true },
    faculty: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    isAnonymous: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
