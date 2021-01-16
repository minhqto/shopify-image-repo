import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Images from "../components/Images";
import AddImages from "../components/AddImages";
import Image from "../components/Image";
import Signup from "../components/Signup";
import Login from "../components/Login";

export const PrivateRouter = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/images" />
      </Route>
      <Route exact path="/images" render={() => <Images />}></Route>
      <Route exact path="/addImages" render={() => <AddImages />}></Route>
      <Route exact path="/image/:id" render={() => <Image />}></Route>
    </Switch>
  );
};

export const PublicRouter = () => {
  return (
    <Switch>
      <Route exact path="/signup" render={() => <Signup />}></Route>
      <Route exact path="/login" render={() => <Login />}></Route>
      <Route exact path="/*">
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
};
