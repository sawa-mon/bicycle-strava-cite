import { providerGoogle, providerTwitter } from "../../firebase/index";
import { signInAction, signOutAction } from "./acitons";
import { push } from "connected-react-router";
import { auth, db, FirebaseTimestamp } from "../../firebase/index";

export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;

        db.collection("users")
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();

            dispatch(
              signInAction({
                isSignedIn: true,
                icon: data.icon,
                email: data.email,
                username: data.displayName,
              })
            );
          });
      } else {
        dispatch(push("/signin"));
      }
    });
  };
};

export const googleSignIn = () => {
  return async (dispatch) => {
    auth.signInWithPopup(providerGoogle).then((result) => {
      const user = result.user;

      if (user) {
        const uid = user.uid;
        const timestamp = FirebaseTimestamp.now();

        const userData = {
          createed_at: timestamp,
          email: user.email,
          icon: user.photoURL,
          username: user.displayName,
        };
        db.collection("users")
          .doc(uid)
          .set(userData)
          .then(() => {
            dispatch(signInAction(userData));
          })
          .then(() => {
            dispatch(push("/home"));
          })
          .catch(() => {
            alert("ログインに失敗しました");
          });
      }
    });
  };
};

export const twitterSignIn = () => {
  return async (dispatch) => {
    auth.signInWithPopup(providerTwitter).then((result) => {
      const user = result.user;

      if (user) {
        const uid = user.uid;
        const timestamp = FirebaseTimestamp.now();
        const userinfo = result.additionalUserInfo;

        const userData = {
          createed_at: timestamp,
          email: user.displayName,
          icon: user.photoURL,
          username: userinfo.username,
        };

        db.collection("users")
          .doc(uid)
          .set(userData)
          .then(() => {
            dispatch(signInAction(userData));
          })
          .then(() => {
            dispatch(push("/home"));
          })
          .catch(() => {
            alert("ログインに失敗しました");
          });
      }
    });
  };
};

export const signOut = () => {
  return async (dispatch) => {
    auth
      .signOut()
      .then(() => {
        dispatch(signOutAction());
        dispatch(push("/signin"));
      })
      .catch(() => {
        alert("ログアウトに失敗しました");
      });
  };
};
