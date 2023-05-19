import { Route, Switch } from "react-router-dom";
import List from "./List";
import Form from "./Form";


const Classes = () => {
    return(
        <Switch>
            <Route path="/admin/classes" exact>
                <List/>
            </Route>
            
            <Route path="/admin/classes/:classId">
                <Form/>
            </Route>
        </Switch>
    );
}

export default Classes;