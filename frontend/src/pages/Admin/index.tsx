import { Link, Switch } from "react-router-dom";
import PrivateRoute from "components/PrivateRoute";
import './styles.css';
import LeftNavbar from "./LeftNavbar";
import { hasAnyRoles, isAuthenticated } from "util/auth";

import { MdDangerous } from 'react-icons/md';
import Courses from "./Courses";
import Subjects from "./Subjects";
import Classes from "./Classes";


function Admin(){
    return(

        <div className="admin-container" style={{display:"flex", justifyContent:"flex-start"}}>

        {hasAnyRoles(["ROLE_TEACHER", "ROLE_ADMIN"])?  (
            <>
            <LeftNavbar />
            
            <div className="admin-content">

                        <Switch>
                            <PrivateRoute path="/admin/courses">
                                <Courses/>
                            </PrivateRoute>

                            <PrivateRoute path="/admin/subjects">
                                <Subjects/>
                            </PrivateRoute>

                            <PrivateRoute path="/admin/classes">
                                <Classes/>
                            </PrivateRoute>

                            <PrivateRoute path="/admin/users">

                            </PrivateRoute>
                        </Switch>

                    </div></>

            ) : (
                <div className='base-card access-main-container'>

                    <div className="access-text-container" style={{textAlign:"center"}}>
                        <h1 className="text-primary">
                            <i><MdDangerous/></i>
                            Access denied!
                        </h1>
                        {isAuthenticated() ? 
                            <p className="text-secondary">Ask for an Admin to give you permission</p> 
                            : 
                            <Link to="/admin/auth">
                                <p className="text-secondary">Sign in to have access to this page</p>
                            </Link>
                        }
                    </div>
                </div>
                
            )}
            
        </div>
    );
}

export default Admin;