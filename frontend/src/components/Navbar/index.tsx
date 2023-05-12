
import { Link } from 'react-router-dom';
import './styles.css';

import { SiSpring } from 'react-icons/si';

const Navbar = () => {
    return(
        <nav className="navbar navbar-expand-md navbar-dark bg-primary main-nav">
            <div className='navbar-top'>
                <Link to="/" className="nav-logo-text">
                    <div className='navbar-brand'>
                        <SiSpring style={{color:"red"}}/>
                    </div>
                    <h4>Spring University</h4>
                </Link>
            </div>
            <div className='navbar-bottom'>

            </div>
            
        </nav>
    );
}

export default Navbar;