import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Home from "./Home";
import User from "./User";

const App: React.FC = () => (
    <div className="container my-5">
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/user/:username">
                    <User />
                </Route>
            </Switch>
        </Router>
    </div>
);

export default App;
