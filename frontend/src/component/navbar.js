// import React ,{ useEffect } from 'react'
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   useLocation
// } from "react-router-dom";

// const navbar = () => {
//   let location=useLocation();
//   return (
//     <div>
//         <nav className="navbar navbar-expand-lg bg-body-tertiary">
//             <div className="container-fluid">
//                 <Link className="navbar-brand" to="/">Navbar</Link>

//                 <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                     <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                         <li className="nav-item">
//                             <Link className={location.pathname==="/home" ? "nav-link active" : "nav-link" } aria-current="page" to="/home">Home</Link>
//                         </li>

//                         <li className="nav-item">
//                             <Link className={location.pathname==="/about" ? "nav-link active" : "nav-link" } to="/about">about</Link>
//                         </li>
                        
//                         <li className="nav-item">
//                             <Link className="nav-link active" to="/addblog">Add blog</Link>
//                         </li>

//                         <li className="nav-item">
//                             <Link className="nav-link active" to="/">Public</Link>
//                         </li>
//                     </ul>

                    
//                     <form className="d-flex">
//                         <button className="btn btn-outline-success" type="submit">    
//                             <Link className="nav-link active" to="/detail">your detail</Link>
//                         </button>

//                         <button className="btn btn-outline-success" type="submit">    
//                             <Link className="nav-link active" to="/login">login</Link>
//                         </button>

//                         <button className="btn btn-outline-success" type="submit">    
//                             <Link className="nav-link active" to="/signup">SignUp</Link>
//                         </button>

//                     </form>
//                 </div>

//             </div>
//         </nav>
//     </div>
//   )
// }

// export default navbar







































































import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import './Navbar.css'; // You'll need to create this CSS file

const Navbar = () => {
  let location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`modern-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link className="logo" to="/" onClick={closeMobileMenu}>
          Navbar
        </Link>
        
        <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <li>
            <Link 
              className={location.pathname === "/home" ? "nav-link active-page" : "nav-link"} 
              to="/home"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
          </li>

          {/* <li>
            <Link 
              className={location.pathname === "/about" ? "nav-link active-page" : "nav-link"} 
              to="/about"
              onClick={closeMobileMenu}
            >
              About
            </Link>
          </li> */}
          
          <li>
            <Link 
              className={location.pathname === "/addblog" ? "nav-link active-page" : "nav-link"} 
              to="/addblog"
              onClick={closeMobileMenu}
            >
              Add Blog
            </Link>
          </li>

          <li>
            <Link 
              className={location.pathname === "/" ? "nav-link active-page" : "nav-link"} 
              to="/"
              onClick={closeMobileMenu}
            >
              Public
            </Link>
          </li>

          <li className="nav-buttons">
            <Link 
              className="nav-button detail-btn" 
              to="/detail"
              onClick={closeMobileMenu}
            >
              Your Detail
            </Link>
            
            <Link 
              className="nav-button login-btn" 
              to="/login"
              onClick={closeMobileMenu}
            >
              Login
            </Link>
            
            <Link 
              className="nav-button signup-btn" 
              to="/signup"
              onClick={closeMobileMenu}
            >
              SignUp
            </Link>

            <Link 
              className="nav-button signup-btn" 
              to="/logout"
              onClick={closeMobileMenu}
            >
              Logout
            </Link>
          </li>
        </ul>
        
        <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;