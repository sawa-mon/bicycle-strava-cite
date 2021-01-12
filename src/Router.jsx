import React from "react";
import { Switch, Route } from "react-router";
import { SignIn, Home } from "./pages";
import Auth from "./Auth";
import { NaganoPrefecture } from "./pages/index";
import { GifuPrefecture } from "./pages/index";
import { AichiPrefecture } from "./pages/index";
import { MiePrefecture } from "./pages/index";
import { InstallationInfoEdit } from "./pages/index";

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/signin"} component={SignIn} />
      <Auth>
        <Route exact path={"(/)?"} component={Home} />
        <Route exact path={"/gifu"} component={GifuPrefecture} />
        <Route exact path={"/nagano"} component={NaganoPrefecture} />
        <Route exact path={"/aichi"} component={AichiPrefecture} />
        <Route exact path={"/mie"} component={MiePrefecture} />
        <Route
          exact
          path={"/installationinfoEdit"}
          component={InstallationInfoEdit}
        />
      </Auth>
    </Switch>
  );
};

export default Router;
