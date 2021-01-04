import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Images from "../components/Images";
import AddImages from "../components/AddImages";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/images" render={() => <Images />}></Route>
      <Route exact path="/addImages" render={() => <AddImages />}></Route>
    </Switch>
  );
};

export default Router;
