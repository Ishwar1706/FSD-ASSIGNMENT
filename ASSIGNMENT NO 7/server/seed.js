const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('./models/Course');
const Faculty = require('./models/Faculty');

dotenv.config();

const courses = ['OOP', 'DSA', 'DAA', 'OS', 'CNS', 'SE', 'FSD'];
const faculties = [
    'Prof Rucha Shinde',
    'Anand Birajdar',
    'Ganesh Deshmukh',
    'Varsha Pandagre',
    'Sujata Kolhe',
    'Priyanka Gupta'
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB for seeding');

        await Course.deleteMany({});
        await Faculty.deleteMany({});

        await Course.insertMany(courses.map(name => ({ name })));
        await Faculty.insertMany(faculties.map(name => ({ name })));

        console.log('✅ Data seeded successfully');
        process.exit();
    } catch (err) {
        console.error('❌ Seeding Error:', err);
        process.exit(1);
    }
};

seedData();
