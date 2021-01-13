import { push } from "connected-react-router";
import { db, FirebaseTimestamp } from "../../firebase";
import { deleteAreaPointsAction, fetchAreaPointsAction } from "./actions";

const areapointsRef = db.collection("areapoints");

//県情報の取得
export const fetchAreaPoints = () => {
  return async (dispatch) => {
    areapointsRef
      .orderBy("timestamp", "desc")
      .get()
      .then((snapshots) => {
        const areapointsList = [];
        snapshots.forEach((snapshot) => {
          const areapoint = snapshot.data();
          areapointsList.push(areapoint);
        });
        dispatch(fetchAreaPointsAction(areapointsList));
      });
  };
};

//データベース情報の削除処理
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
  prefecture
) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();

    const data = {
      id: id,
      info: info,
      images: images,
      installation: installation,
      locationLat: parseFloat(locationLat),
      locationLng: parseFloat(locationLng),
      prefecture: prefecture,
      timestamp: timestamp,
    };

    //新規作成のページのときのみ(idが""=新規作成)は実行
    if (id === "") {
      const ref = areapointsRef.doc();
      id = ref.id;
      data.id = id;
      data.timestamp = timestamp;
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
