import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Main from "./pages/Main";
import Repository from "./pages/Repository";

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Main}  />
                <Route exact path="/repository/:repository" component={Repository}  />
            </Switch>
        </BrowserRouter>
    );
}