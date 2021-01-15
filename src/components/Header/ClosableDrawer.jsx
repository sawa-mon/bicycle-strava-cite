import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/styles";
import SearchIcon from "@material-ui/icons/Search";
import AddCirclreIcon from "@material-ui/icons/AddCircle";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { TextInput } from "../UIkit/index";
import { push } from "connected-react-router";
import { signOut } from "../../reducks/users/operations";
import { db } from "../../firebase/index";
import ExploreIcon from "@material-ui/icons/Explore";

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      flexShrink: 0,
      width: 256,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: 256,
  },
  searchField: {
    alignItems: "center",
    display: "flex",
    marginLeft: 32,
  },
}));

export const ClosableDrawer = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { container } = props;

  const selectMenu = (event, path) => {
    if (/^https:*/.test(path) || /^http:*/.test(path)) {
      let a = document.createElement("a");
      a.href = path;
      a.target = "_blank";
      a.click();
    }

    dispatch(push(path));
    props.onClose(event);
  };

  const [filters, setFilters] = useState([
    {
      func: selectMenu,
      label: "すべてのエリア",
      id: "all",
      value: "/",
    },
  ]);

  const menus = [
    {
      func: selectMenu,
      label: "ユーザープロフィール",
      icon: <AccountCircleIcon />,
      id: "userpage",
      value: "/",
    },
    {
      func: selectMenu,
      label: "GoogleMapを開く",
      icon: <ExploreIcon />,
      id: "googlemap",
      value: "https://www.google.co.jp/maps",
    },
    {
      func: selectMenu,
      label: "Mapポイント情報変更",
      icon: <TrackChangesIcon />,
      id: "editmap",
      value: "/editareapointlist",
    },
    {
      func: selectMenu,
      label: "Mapポイント情報追加",
      icon: <AddCirclreIcon />,
      id: "add",
      value: "/installationinfoedit",
    },
  ];

  useEffect(() => {
    db.collection("prefectures")
      .orderBy("number", "asc")
      .get()
      .then((snapshots) => {
        const list = [];
        snapshots.forEach((snapshot) => {
          const prefecture = snapshot.data();
          list.push({
            func: selectMenu,
            label: prefecture.name,
            id: prefecture.id,
            value: `/?prefecture=${prefecture.id}`,
          });
        });
        setFilters((prevState) => [...prevState, ...list]);
      });
  }, []);

  return (
    <nav className={classes.drawer}>
      <Drawer
        container={container}
        variant="temporary" //開閉
        anchor="right" //開閉開始位置
        open={props.open}
        onClose={(event) => props.onClose(event)}
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{ keepMounted: true }}
      >
        <List>
          <ListItem
            button
            key="logout"
            onClose={(event) => props.onClose(event)}
            onClick={(e) => {
              dispatch(signOut());
              selectMenu(e);
            }}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={"ログアウト"} />
          </ListItem>
          {menus.map((menu) => (
            <ListItem
              button
              key={menu.id}
              onClick={(e) => menu.func(e, menu.value)}
            >
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.label} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {filters.map((filter) => (
            <ListItem
              button
              key={filter.id}
              onClick={(e) => filter.func(e, filter.value)}
            >
              <ListItemText primary={filter.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </nav>
  );
};