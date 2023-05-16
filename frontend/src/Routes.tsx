import About from "components/About";
import Banner from "components/Banner";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import Admin from "pages/Admin";
import Auth from "pages/Admin/Auth";
import CourseDetails from "pages/CourseDetails";
import Courses from "pages/Courses";
import Profile from "pages/Profile";
import { Redirect, Route, Router, Switch } from "react-router-dom";

import history from "util/history";

const Routes = () => {

    return(
        <Router history={history}> 
            <Navbar/>

            <Switch>

                <Route path="/" exact>
                    <Banner/>
                    <About/>
                </Route>

                <Route path="/courses" exact>
                    <Courses/>
                </Route>

                <Route path="/courses/:courseId">
                    <CourseDetails/>
                </Route>

                <Redirect from='/admin/auth' to='/admin/auth/login' exact />
                <Route path="/admin/auth">
                    <Auth />
                </Route>

                <Redirect from="/admin" to="/admin/courses" exact />
                <Route path="/admin">
                    <Admin />
                </Route>

                <Route path="/profile">
                    <Profile />
                </Route>

            </Switch>

            <Footer/>
        </Router>
    );
}

export default Routes;