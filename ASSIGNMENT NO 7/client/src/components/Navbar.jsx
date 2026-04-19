import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, MessageSquare, PlusCircle, User } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="glass-card" style={{ margin: '1rem', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: '1rem', zIndex: 100, border: 'none' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: 'white' }}>
                <div style={{ background: 'var(--primary)', padding: '0.5rem', borderRadius: '0.5rem' }}>
                    <MessageSquare size={24} />
                </div>
                <span style={{ fontWeight: '700', fontSize: '1.25rem' }}>EduFeedback</span>
            </Link>

            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <Link to="/courses" style={{ textDecoration: 'none', color: 'var(--text-muted)', fontWeight: '500', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'white'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>Courses</Link>
                <Link to="/faculties" style={{ textDecoration: 'none', color: 'var(--text-muted)', fontWeight: '500', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'white'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>Faculty</Link>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                {user ? (
                    <>
                        <Link to="/submit" className="btn btn-outline" style={{ textDecoration: 'none' }}>
                            <PlusCircle size={18} /> Give Feedback
                        </Link>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingLeft: '1rem', borderLeft: '1px solid var(--glass-border)' }}>
                            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.4rem', borderRadius: '50%' }}>
                                <User size={18} />
                            </div>
                            <span style={{ fontWeight: '500' }}>{user.name}</span>
                            <button onClick={handleLogout} className="btn-outline" style={{ padding: '0.4rem', border: 'none', cursor: 'pointer', background: 'transparent', color: 'var(--text-muted)' }}>
                                <LogOut size={18} />
                            </button>
                        </div>
                    </>
                ) : (
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Link to="/login" className="btn btn-outline" style={{ textDecoration: 'none' }}>Login</Link>
                        <Link to="/register" className="btn btn-primary" style={{ textDecoration: 'none' }}>Register</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
