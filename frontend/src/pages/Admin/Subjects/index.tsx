import { Route, Switch } from "react-router-dom";
import List from "./List";
import Form from "./Form";


const Subjects = () => {
    return(
        <Switch>
            <Route path="/admin/subjects" exact>
                <List/>
            </Route>
            
            <Route path="/admin/subjects/:subjectId">
                <Form/>
            </Route>
        </Switch>
    );
}

export default Subjects;