import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Star, MessageCircle, User, BookOpen } from 'lucide-react';

const Dashboard = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const res = await axios.get('http://localhost:5001/api/feedback');
                setFeedbacks(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchFeedbacks();
    }, []);

    if (loading) return <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>Loading reviews...</div>;

    return (
        <div className="container" style={{ paddingBottom: '4rem' }}>
            <header style={{ margin: '3rem 0', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Student Experience <span style={{ color: 'var(--primary)' }}>Hub</span></h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem' }}>Transparency in education, driven by students.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
                <Link to="/courses" className="glass-card animate-fade-in" style={{ padding: '1.5rem', textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                    <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '0.75rem', borderRadius: '0.75rem' }}>
                        <BookOpen size={24} style={{ color: 'var(--primary)' }} />
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Explore Courses</h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Browse all academic modules</p>
                    </div>
                </Link>

                <Link to="/faculties" className="glass-card animate-fade-in" style={{ padding: '1.5rem', textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                    <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.75rem', borderRadius: '0.75rem' }}>
                        <User size={24} style={{ color: 'var(--accent)' }} />
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Meet Faculty</h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Learn about our educators</p>
                    </div>
                </Link>

                <Link to="/submit" className="glass-card animate-fade-in" style={{ padding: '1.5rem', textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                    <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '0.75rem', borderRadius: '0.75rem' }}>
                        <Star size={24} style={{ color: '#fbbf24' }} />
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Share Experience</h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Contribute to the community</p>
                    </div>
                </Link>
            </div>

            <h2 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <MessageCircle style={{ color: 'var(--primary)' }} /> Recent Student Reviews
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
                {Array.isArray(feedbacks) && feedbacks.length > 0 ? (
                    feedbacks.map((fb) => (
                        <div key={fb._id} className="glass-card animate-fade-in" style={{ padding: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                                <div>
                                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                        <BookOpen size={18} style={{ color: 'var(--primary)' }} /> {fb.course}
                                    </h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>with {fb.faculty}</p>
                                </div>
                                <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent)', padding: '0.4rem 0.75rem', borderRadius: '2rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    {fb.rating} <Star size={14} style={{ fill: 'var(--accent)', color: 'var(--accent)' }} />
                                </div>
                            </div>
                            
                            <p style={{ marginBottom: '1.5rem', fontStyle: 'italic', color: '#e2e8f0', borderLeft: '3px solid var(--primary)', paddingLeft: '1rem' }}>
                                "{fb.comment}"
                            </p>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.4rem', borderRadius: '50%' }}>
                                    <User size={14} />
                                </div>
                                <span>{fb.isAnonymous ? 'Anonymous Student' : (fb.studentId && typeof fb.studentId === 'object' ? fb.studentId.name : 'Student')}</span>
                                <span style={{ marginLeft: 'auto' }}>{fb.createdAt ? new Date(fb.createdAt).toLocaleDateString() : 'Just now'}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                        <MessageCircle size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                        <p>No feedback reviews yet. Be the first to share your experience!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
