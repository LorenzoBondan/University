import { Route, Switch } from "react-router-dom";
import Form from "./Form";
import List from "./List";


const Courses = () => {
    return(
        <Switch>
            <Route path="/admin/courses" exact>
                <List/>
            </Route>
            
            <Route path="/admin/courses/:courseId">
                <Form/>
            </Route>
        </Switch>
    );
}

export default Courses;