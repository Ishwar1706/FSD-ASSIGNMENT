import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BookOpen, Star, PlusCircle, Search } from 'lucide-react';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await axios.get('http://localhost:5001/api/data/courses');
                setCourses(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const filteredCourses = courses.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>Loading courses...</div>;

    return (
        <div className="container" style={{ paddingBottom: '4rem' }}>
            <header style={{ margin: '3rem 0', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Academic <span style={{ color: 'var(--primary)' }}>Courses</span></h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
                    Explore our curriculum and share your learning experience to help others.
                </p>

                <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto', padding: '0.5rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Search size={20} style={{ color: 'var(--text-muted)' }} />
                    <input 
                        type="text" 
                        placeholder="Search for a course..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ background: 'transparent', border: 'none', padding: '0.75rem 0', width: '100%', color: 'white', outline: 'none' }}
                    />
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => (
                        <div key={course._id} className="glass-card animate-fade-in" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <div style={{ background: 'rgba(99, 102, 241, 0.1)', width: 'fit-content', padding: '0.75rem', borderRadius: '1rem', marginBottom: '1.5rem' }}>
                                <BookOpen size={24} style={{ color: 'var(--primary)' }} />
                            </div>
                            
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', lineHeight: '1.2' }}>{course.name}</h3>
                            
                            <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem' }}>
                                <Link 
                                    to={`/submit?course=${encodeURIComponent(course.name)}`} 
                                    className="btn btn-primary" 
                                    style={{ flex: 1, fontSize: '0.875rem' }}
                                >
                                    <PlusCircle size={18} /> Give Feedback
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                        <p>No courses found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Courses;
