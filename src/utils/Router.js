import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Images from "../components/Images";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/images" render={() => <Images />}></Route>
    </Switch>
  );
};

export default Router;
