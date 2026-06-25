import React, { useContext, useEffect } from 'react';
import blogContext from '../context/blog/blogcontext';
import './featchuser.css'; // You'll need to create this CSS file

const FeatchUser = () => {
    const blog_context = useContext(blogContext);
    const { featchuser, user_detail } = blog_context;
    
    useEffect(() => {
        featchuser();
    }, [featchuser]);

    // Generate initials for avatar
    const getInitials = (name) => {
        return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';
    };

    // Format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="profile-container">
            <div className="profile-card">
                {/* Profile Header */}
                <div className="profile-header">
                    <div className="profile-avatar">
                        <span className="avatar-initials">
                            {getInitials(user_detail.name)}
                        </span>
                    </div>
                    <div className="profile-status">
                        <span className="status-dot"></span>
                        <span className="status-text">Online</span>
                    </div>
                </div>

                {/* Profile Content */}
                <div className="profile-content">
                    <div className="profile-info">
                        <h2 className="profile-name">{user_detail.name || 'User Name'}</h2>
                        <p className="profile-role">Blog Author</p>
                    </div>

                    <div className="profile-details">
                        <div className="detail-item">
                            <div className="detail-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <div className="detail-content">
                                <span className="detail-label">Email</span>
                                <span className="detail-value">{user_detail.email || 'user@example.com'}</span>
                            </div>
                        </div>

                        <div className="detail-item">
                            <div className="detail-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                                    <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
                                    <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
                                    <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                            </div>
                            <div className="detail-content">
                                <span className="detail-label">Member Since</span>
                                <span className="detail-value">{formatDate(user_detail.date)}</span>
                            </div>
                        </div>

                        <div className="detail-item">
                            <div className="detail-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                            </div>
                            <div className="detail-content">
                                <span className="detail-label">User ID</span>
                                <span className="detail-value">{user_detail._id ? `#${user_detail._id.slice(-6)}` : '#000000'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Profile Actions */}
                    <div className="profile-actions">
                        <button className="action-btn primary">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Edit Profile
                        </button>
                        <button className="action-btn secondary">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            View Blogs
                        </button>
                    </div>
                </div>

                {/* Profile Footer */}
                <div className="profile-footer">
                    <div className="profile-stats">
                        <div className="stat-item">
                            <span className="stat-number">12</span>
                            <span className="stat-label">Posts</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">248</span>
                            <span className="stat-label">Views</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">36</span>
                            <span className="stat-label">Likes</span>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default FeatchUser;