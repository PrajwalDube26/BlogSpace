import React, { useContext, useState } from 'react';
import blogContext from '../context/blog/blogcontext';
import './Signup.css';


const login = () => {
    const blog_context = useContext(blogContext);
    const { login } = blog_context;

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login( credentials.email, credentials.password);
            setCredentials({email: "", password: "" });
        } 
        catch (error) {
            console.error("Signup error:", error);
        } 
        finally {
            setIsLoading(false);
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };



    return (
        // <div>
        //     <form onSubmit={handleSubmit}>
                
        //         <div className="row mb-3">
        //         <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
        //         <div className="col-sm-10">
        //             <input type="email" className="form-control" id="email" name="email" onChange={onChange} minLength={5} required/>
        //         </div>
        //         </div>

        //         <div className="row mb-3">
        //         <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
        //         <div className="col-sm-10">
        //             <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={3} required />
        //         </div>
        //         </div>

        //         <button type="submit" className="btn btn-primary">Sign Up</button>
        //     </form>
        // </div>

        <div className="signup-container">
            <div className="signup-card">
                <div className="signup-header">
                    <h2 className="signup-title">Login To Account</h2>
                    <p className="signup-subtitle">Join our community and start blogging!</p>
                </div>

                <form onSubmit={handleSubmit} className="signup-form">

                    <div className="form-group">

                        <label htmlFor="email" className="form-label">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Email Address
                        </label>

                        <div className="input-wrapper">
                            <input
                                type="email"
                                className="form-input"
                                id="email"
                                name="email"
                                onChange={onChange}
                                value={credentials.email}
                                required
                                minLength={10}
                                placeholder="Enter your email address"
                            />
                        </div>
                    </div>


                    <div className="form-group">

                        <label htmlFor="password" className="form-label">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                                <circle cx="12" cy="16" r="1" stroke="currentColor" strokeWidth="2"/>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                            Password
                        </label>

                        <div className="input-wrapper password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-input"
                                id="password"
                                name="password"
                                onChange={onChange}
                                value={credentials.password}
                                required
                                minLength={3}
                                placeholder="Create a password"
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                                ) : (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" strokeWidth="2"/>
                                    <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                                )}

                            </button>
                        </div>
                    </div>

                    <button type="submit" className={`signup-button ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
                        {isLoading ? (
                        <>
                            <div className="spinner"></div>
                            Creating Account...
                        </>
                        ) : (
                        <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Create Account
                        </>
                        )}
                    </button>
                </form>

                <div className="signup-footer">
                <p className="signup-login-text">
                    Already have an account?{' '}
                    <a href="/login" className="signup-login-link">
                    Sign in here
                    </a>
                </p>
                </div>
            </div>
            </div>
    )
}

export default login