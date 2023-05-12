import About from "components/About";
import Banner from "components/Banner";
import Navbar from "components/Navbar";
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

                
            </Switch>

        </Router>
    );
}

export default Routes;