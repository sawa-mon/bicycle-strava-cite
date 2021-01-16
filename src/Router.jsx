import React from "react";
import { Switch, Route } from "react-router";
import {
  SignIn,
  Home,
  EditAreaPointList,
  AreaPointDetail,
  PrefectureList,
  InstallationInfoEdit,
  Reload,
} from "./pages";
import Auth from "./Auth";

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/signin"} component={SignIn} />
      <Auth>
        <Route exact path={"/home"} component={Home} />
        <Reload>
          <Route exact path={"(/)?"} component={PrefectureList} />
          <Route
            path={"/installationinfoedit(/:id)?"}
            component={InstallationInfoEdit}
          />
          <Route
            exact
            path={"/editareapointlist"}
            component={EditAreaPointList}
          />
          <Route exact path={"/areapoint/:id"} component={AreaPointDetail} />
        </Reload>
      </Auth>
    </Switch>
  );
};

export default Router;
