import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch,
} from "react-router-dom";
import Home from "./Home";
import User from "./User";
import { Container } from "react-bootstrap";

const App: React.FC = () => {
    const { path } = useRouteMatch();

    return (
        <Container className="my-5">
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path={`${path}/:username`}>
                        <User />
                    </Route>
                </Switch>
            </Router>
        </Container>
    );
};

export default App;
