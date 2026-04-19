import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { User, Star, PlusCircle, Search, Award } from 'lucide-react';

const Faculties = () => {
    const [faculties, setFaculties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchFaculties = async () => {
            try {
                const res = await axios.get('http://localhost:5001/api/data/faculties');
                setFaculties(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchFaculties();
    }, []);

    const filteredFaculties = faculties.filter(f => 
        f.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>Loading faculty members...</div>;

    return (
        <div className="container" style={{ paddingBottom: '4rem' }}>
            <header style={{ margin: '3rem 0', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Distinguished <span style={{ color: 'var(--accent)' }}>Faculty</span></h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
                    Connect with our educators and share your experience with their teaching methodology.
                </p>

                <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto', padding: '0.5rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Search size={20} style={{ color: 'var(--text-muted)' }} />
                    <input 
                        type="text" 
                        placeholder="Search for a faculty member..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ background: 'transparent', border: 'none', padding: '0.75rem 0', width: '100%', color: 'white', outline: 'none' }}
                    />
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {filteredFaculties.length > 0 ? (
                    filteredFaculties.map((fac) => (
                        <div key={fac._id} className="glass-card animate-fade-in" style={{ padding: '2.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                                <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', padding: '1rem', borderRadius: '50%', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <User size={40} style={{ color: 'white' }} />
                                </div>
                                <div style={{ position: 'absolute', bottom: '-5px', right: '-5px', background: 'var(--bg)', border: '2px solid var(--accent)', color: 'var(--accent)', borderRadius: '50%', padding: '4px' }}>
                                    <Award size={14} />
                                </div>
                            </div>
                            
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{fac.name}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>Faculty Member</p>
                            
                            <Link 
                                to={`/submit?faculty=${encodeURIComponent(fac.name)}`} 
                                className="btn btn-outline" 
                                style={{ width: '100%', borderColor: 'var(--accent)', color: 'white' }}
                                onMouseEnter={(e) => e.target.style.background = 'rgba(16, 185, 129, 0.1)'}
                                onMouseLeave={(e) => e.target.style.background = 'transparent'}
                            >
                                <PlusCircle size={18} /> Give Feedback
                            </Link>
                        </div>
                    ))
                ) : (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                        <p>No faculty members found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Faculties;
