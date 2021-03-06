import { push } from "connected-react-router";
import { db, FirebaseTimestamp } from "../../firebase";
import { deleteAreaPointsAction, fetchAreaPointsAction } from "./actions";

const areapointsRef = db.collection("areapoints");

//エリア情報取得
export const fetchAreaPoints = (category, prefecture) => {
  return async (dispatch) => {
    let query = areapointsRef.orderBy("timestamp", "desc");
    // orderByに加えてprefectureが空白ではなかったらwhere条件文でフィールドがprefectureのものを取得する
    query =
      prefecture !== "" ? query.where("prefecture", "==", prefecture) : query;
    query = category !== "" ? query.where("category", "==", category) : query;

    query.get().then((snapshots) => {
      const areapointList = [];
      snapshots.forEach((snapshot) => {
        const areapoint = snapshot.data();
        areapointList.push(areapoint);
      });
      dispatch(fetchAreaPointsAction(areapointList));
    });
  };
};

//dbエリア情報の削除処理
export const deleteAreaPoint = (id) => {
  return async (dispatch, getState) => {
    areapointsRef
      .doc(id)
      .delete()
      .then(() => {
        const prevAreaPoints = getState().areapoints.list;
        const nextAreaPoints = prevAreaPoints.filter(
          (areapoint) => areapoint.id !== id
        ); //配列に渡ってきた削除されたもの以外のidを回す
        dispatch(deleteAreaPointsAction(nextAreaPoints));
      });
  };
};

//ラック設置ポイントの登録処理
export const saveAddPoint = (
  id,
  info,
  images,
  installation,
  locationLat,
  locationLng,
  prefecture,
  category,
  userName,
  icon,
  timestamp
) => {
  return async (dispatch, getState) => {
    const data = {
      id: id,
      info: info,
      images: images,
      installation: installation,
      locationLat: parseFloat(locationLat),
      locationLng: parseFloat(locationLng),
      prefecture: prefecture,
      timestamp: timestamp,
      category: category,
      username: userName,
      icon: icon,
    };

    const userInfo = getState().users;
    //新規作成のページのときのみ(idが""=新規作成)は実行
    if (id === "") {
      const timestamp = FirebaseTimestamp.now();
      const ref = areapointsRef.doc();
      id = ref.id;
      data.id = id;
      data.timestamp = timestamp;
      const icon = userInfo.icon;
      data.icon = icon;
      const username = userInfo.username;
      data.username = username;
    }

    return areapointsRef
      .doc(id)
      .set(data, { marge: true }) //dataのみだとデータを上書きしてしまう為
      .then(() => {
        dispatch(push("/"));
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};
