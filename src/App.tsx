import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Home from "./Home";

const App: React.FC = () => (
    <Router>
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            {/* <Route path="/topics">
                <Topics />
            </Route> */}
        </Switch>
    </Router>
);

export default App;
