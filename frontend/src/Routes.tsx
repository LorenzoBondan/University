import About from "components/About";
import Banner from "components/Banner";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import CourseDetails from "pages/CourseDetails";
import Courses from "pages/Courses";
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

            </Switch>

            <Footer/>
        </Router>
    );
}

export default Routes;