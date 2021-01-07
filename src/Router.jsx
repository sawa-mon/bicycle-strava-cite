import React from "react";
import { Switch, Route } from "react-router";
import { SignIn, Home } from "./pages";
import Auth from "./Auth";
import { NaganoPrefecture } from "./pages/NaganoPrefecture";
import { GifuPrefecture } from "./pages/GifuPrefecture";
import { AichiPrefecture } from "./pages/AichiPrefecture";

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/signin"} component={SignIn} />
      <Auth>
        <Route exact path={"(/)?"} component={Home} />
        <Route exact path={"/gifuprefecture"} component={GifuPrefecture} />
        <Route exact path={"/naganoprefecture"} component={NaganoPrefecture} />
        <Route exact path={"/aichiprefecture"} component={AichiPrefecture} />
      </Auth>
    </Switch>
  );
};

export default Router;
