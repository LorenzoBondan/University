import { NavLink } from 'react-router-dom';
import { hasAnyRoles } from 'util/auth';
import './styles.css';

const LeftNavbar = () => {
    return(
        <nav className='admin-nav-container'>
            <ul className='ul-container'>
                {hasAnyRoles(['ROLE_TEACHER']) && (
                <>
                <li>
                    <NavLink to="/admin/courses" className='admin-nav-item'>
                        <p>Courses</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/subjects" className='admin-nav-item'>
                        <p>Subjects</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/classes" className='admin-nav-item'>
                        <p>Classes</p>
                    </NavLink>
                </li>
                { hasAnyRoles(['ROLE_ADMIN']) && ( 
                    <li>
                        <NavLink to="/admin/users" className='admin-nav-item'>
                            <p>Users</p>
                        </NavLink>
                    </li>   
                )}
                </>
                )}
            </ul>
        </nav>
    );
}

export default LeftNavbar;