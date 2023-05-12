
import { Link, NavLink } from 'react-router-dom';
import './styles.css';
import '@popperjs/core';
import 'bootstrap/js/src/collapse';

import SpringLogo from 'assets/images/spring-logo.png';
import { hasAnyRoles } from 'util/auth';

import { FaGraduationCap } from 'react-icons/fa';
import { ImBooks } from 'react-icons/im';
import { SiGoogleclassroom} from 'react-icons/si';
import { MdOutlineAdminPanelSettings} from 'react-icons/md';

import linkedinIcon from 'assets/images/linkedin.svg';
import instagramIcon from 'assets/images/instagram.svg';
import facebookIcon from 'assets/images/facebook.svg';
import githubIcon from 'assets/images/github.svg';

const Navbar = () => {
    return(
        <nav className="navbar navbar-expand-md navbar-dark bg-primary main-nav">
            <div className='navbar-top'>
                <div className='navbar-top-logo'>
                    <Link to="/" className="nav-logo-text color-primary">
                        <div className='navbar-brand'>
                            <img src={SpringLogo} alt="logo" />
                        </div>
                        <h4>Spring University</h4>
                    </Link>
                </div>

                <div className='navbar-social-content-container'>
                    <a href="https://linkedin.com"><img src={linkedinIcon} alt="" /></a>
                    <a href="https://instagram.com/lorenzobondan"><img src={instagramIcon} alt="" /></a>
                    <a href="https://facebook.com/loreenzo_bondaan"><img src={facebookIcon} alt="" /></a>
                    <a href="https://github.com/LorenzoBondan"><img src={githubIcon} alt="" /></a>

                </div>
            </div>

            

            <div className='navbar-bottom'>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#university-navbar"
                    aria-controls="university-navbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                <span className='navbar-toggler-icon'></span>
                </button>

                <div className="collapse navbar-collapse" id="university-navbar">
                    <ul className='navbar-nav main-menu'>
                        <li>
                            <NavLink to="/courses" activeClassName='active' exact>
                                <FaGraduationCap style={{marginRight:"5px"}}/>
                                Courses
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/subjects" activeClassName='active'>
                                <ImBooks style={{marginRight:"5px"}}/>
                                Subjects
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/classes" activeClassName='active'>
                                <SiGoogleclassroom style={{marginRight:"5px"}}/>
                                Classes
                            </NavLink>
                        </li>

                        {hasAnyRoles(["ROLE_ADMIN"]) && (
                            <li>
                                <NavLink to="/admin" activeClassName='active'>
                                    <MdOutlineAdminPanelSettings style={{marginRight:"5px"}}/>
                                    Admin
                                </NavLink>
                            </li>
                        )}

                    </ul>
                </div>
            </div>
            
        </nav>
    );
}

export default Navbar;