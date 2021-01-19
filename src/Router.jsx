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
  UserInfo,
} from "./pages";
import Auth from "./Auth";

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/signin"} component={SignIn} />
      <Auth>
        <Route exact path={"/home"} component={Home} />
        <Route exact path={"/userinfo"} component={UserInfo} />
        <Route exact path={"(/)?"} component={PrefectureList} />
        <Route
          path={"/installationinfoedit(/:id)?"}
          component={InstallationInfoEdit}
        />
        {/* <Route
          exact
          path={"/editareapointlist"}
          component={EditAreaPointList}
        /> */}
        <Route exact path={"/areapoint/edit"} component={EditAreaPointList} />
        <Route exact path={"/areapoint/:id"} component={AreaPointDetail} />
      </Auth>
    </Switch>
  );
};

export default Router;
