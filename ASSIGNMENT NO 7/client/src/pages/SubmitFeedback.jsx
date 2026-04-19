import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Send, Star, ChevronLeft } from 'lucide-react';

const SubmitFeedback = () => {
    const [searchParams] = useSearchParams();
    const [courses, setCourses] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const [formData, setFormData] = useState({
        course: searchParams.get('course') || '',
        faculty: searchParams.get('faculty') || '',
        rating: 5,
        comment: '',
        isAnonymous: false
    });
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [coursesRes, facultiesRes] = await Promise.all([
                    axios.get('http://localhost:5001/api/data/courses'),
                    axios.get('http://localhost:5001/api/data/faculties')
                ]);
                setCourses(coursesRes.data);
                setFaculties(facultiesRes.data);
                
                // Only set default dropdown value if not already set by URL params
                setFormData(prev => ({
                    ...prev,
                    course: prev.course || (coursesRes.data.length > 0 ? coursesRes.data[0].name : ''),
                    faculty: prev.faculty || (facultiesRes.data.length > 0 ? facultiesRes.data[0].name : '')
                }));
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5001/api/feedback', formData, {
                headers: { 'x-auth-token': token }
            });
            navigate('/');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '600px', padding: '3rem 1.5rem' }}>
            <button onClick={() => navigate(-1)} className="btn btn-outline" style={{ border: 'none', marginBottom: '1.5rem', padding: '0.5rem' }}>
                <ChevronLeft size={20} /> Back to dashboard
            </button>
            
            <div className="glass-card animate-fade-in" style={{ padding: '2.5rem' }}>
                <h2 style={{ marginBottom: '0.5rem' }}>Share Your Experience</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Your feedback helps improve the educational quality for everyone.</p>
                
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Course Name</label>
                        <select value={formData.course} onChange={(e) => setFormData({ ...formData, course: e.target.value })} required>
                            {courses.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                        </select>
                    </div>

                    <div className="input-group">
                        <label>Faculty Member</label>
                        <select value={formData.faculty} onChange={(e) => setFormData({ ...formData, faculty: e.target.value })} required>
                            {faculties.map(f => <option key={f._id} value={f.name}>{f.name}</option>)}
                        </select>
                    </div>

                    <div className="input-group">
                        <label>Your Rating ({formData.rating} Stars)</label>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                            {[1, 2, 3, 4, 5].map(num => (
                                <Star 
                                    key={num} 
                                    size={32} 
                                    style={{ 
                                        cursor: 'pointer', 
                                        transition: 'all 0.2s',
                                        fill: num <= formData.rating ? 'var(--accent)' : 'transparent',
                                        color: num <= formData.rating ? 'var(--accent)' : 'var(--text-muted)'
                                    }}
                                    onClick={() => setFormData({ ...formData, rating: num })}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Your Detailed Comment</label>
                        <textarea 
                            rows="4" 
                            value={formData.comment} 
                            onChange={(e) => setFormData({ ...formData, comment: e.target.value })} 
                            required 
                            placeholder="What did you like? What could be improved?"
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                        <input 
                            type="checkbox" 
                            id="anon"
                            checked={formData.isAnonymous} 
                            onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                            style={{ width: 'auto' }}
                        />
                        <label htmlFor="anon" style={{ fontSize: '0.875rem', color: 'var(--text-muted)', cursor: 'pointer' }}>Submit as Anonymous student</label>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Submitting...' : <><Send size={18} /> Publish Review</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SubmitFeedback;
