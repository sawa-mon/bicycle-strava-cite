import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/styles";
import AddCirclreIcon from "@material-ui/icons/AddCircle";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { push } from "connected-react-router";
import { signOut } from "../../reducks/users/operations";
import { db } from "../../firebase/index";
import ExploreIcon from "@material-ui/icons/Explore";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import { getUserEmail } from "../../reducks/users/selectors";

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
  const selector = useSelector((state) => state);
  const userEmail = getUserEmail(selector);
  const [judgeAddress, setJudgeAddress] = useState(false);
  const address1 = process.env.REACT_APP_EDIT_ACCESS_KEY_ID1;
  const address2 = process.env.REACT_APP_EDIT_ACCESS_KEY_ID2;

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
      label: "すべて",
      id: "all",
      value: "/",
    },
    {
      func: selectMenu,
      label: "〜カテゴリで検索〜",
      id: "category",
      value: "/",
    },
    {
      func: selectMenu,
      label: "自転車関連店舗",
      id: "cycleshop",
      value: "/?category=cycleshop",
    },
    {
      func: selectMenu,
      label: "カフェ、フード店、他",
      id: "cafe",
      value: "/?category=cafe",
    },
    {
      func: selectMenu,
      label: "道の駅、休憩所",
      id: "roadsidestation",
      value: "/?category=roadsidestation",
    },
    {
      func: selectMenu,
      label: "コンビニ",
      id: "conveni",
      value: "/?category=conveni",
    },
    {
      func: selectMenu,
      label: "〜地域で検索〜",
      id: "prefect",
      value: "/",
    },
  ]);

  const menus = [
    {
      func: selectMenu,
      label: "利用規約",
      icon: <ImportContactsIcon />,
      id: "terms",
      value: "/termsofservice",
    },
    {
      func: selectMenu,
      label: "Mapポイント情報追加",
      icon: <AddCirclreIcon />,
      id: "add",
      value: "/installationinfoedit",
    },
    {
      func: selectMenu,
      label: "使い方を見る",
      icon: <ImportContactsIcon />,
      id: "use",
      value: "/home",
    },
    {
      func: selectMenu,
      label: "ユーザープロフィール",
      icon: <AccountCircleIcon />,
      id: "userpage",
      value: "/userinfo",
    },
    {
      func: selectMenu,
      label: "GoogleMapを開く",
      icon: <ExploreIcon />,
      id: "googlemap",
      value: "https://www.google.co.jp/maps",
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

  useEffect(() => {
    if (userEmail === (address1 || address2)) {
      setJudgeAddress(true);
    }
  }, []);

  return (
    <nav className={classes.drawer}>
      <Drawer
        container={container}
        variant="temporary" //開閉
        anchor="right" //開閉開始位置
        open={props.open}
        onClose={(e) => props.onClose(e)}
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{ keepMounted: true }}
      >
        <List>
          <ListItem
            button
            key="logout"
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
          {judgeAddress === true && (
            <ListItem
              button
              key="edit"
              onClick={(e) => {
                dispatch(push("/areapointedit"));
                props.onClose(e);
              }}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={"管理編集画面"} />
            </ListItem>
          )}
          {menus.map((menu) => (
            <ListItem
              button
              key={menu.id}
              onClick={(e) => {
                menu.func(e, menu.value);
              }}
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
              onClick={(e) => {
                filter.func(e, filter.value);
                props.onClose(e);
              }}
            >
              <ListItemText primary={filter.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </nav>
  );
};
