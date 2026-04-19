const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const Faculty = require('../models/Faculty');

router.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/faculties', async (req, res) => {
    try {
        const faculties = await Faculty.find();
        res.json(faculties);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/seed', async (req, res) => {
    try {
        const sampleCourses = [
            { name: 'Introduction to Computer Science' },
            { name: 'Data Structures and Algorithms' },
            { name: 'Web Development (MERN Stack)' },
            { name: 'Artificial Intelligence' },
            { name: 'Calculus and Discrete Mathematics' }
        ];

        const sampleFaculties = [
            { name: 'Dr. Alan Turing' },
            { name: 'Prof. Grace Hopper' },
            { name: 'Dr. Richard Feynman' },
            { name: 'Prof. Ada Lovelace' }
        ];

        // Only insert if empty
        const courseCount = await Course.countDocuments();
        if (courseCount === 0) {
            await Course.insertMany(sampleCourses);
        }

        const facultyCount = await Faculty.countDocuments();
        if (facultyCount === 0) {
            await Faculty.insertMany(sampleFaculties);
        }

        res.json({ message: 'Seeding successful or data already exists' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
