import React from "react";
import { Switch, Route } from "react-router";
import { SignIn, Home } from "./pages";
import Auth from "./Auth";
import { NaganoPrefecture } from "./pages/NaganoPrefecture";
import { GifuPrefecture } from "./pages/GifuPrefecture";
import { AichiPrefecture } from "./pages/AichiPrefecture";
import { MiePrefecture } from "./pages/MiePrefecture";

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/signin"} component={SignIn} />
      {/* <Auth> */}
      <Route exact path={"(/)?"} component={Home} />
      <Route exact path={"/gifuprefecture"} component={GifuPrefecture} />
      <Route exact path={"/naganoprefecture"} component={NaganoPrefecture} />
      <Route exact path={"/aichiprefecture"} component={AichiPrefecture} />
      <Route exact path={"/mieprefecture"} component={MiePrefecture} /> */}
      {/* </Auth> */}
    </Switch>
  );
};

export default Router;
