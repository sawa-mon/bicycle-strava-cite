import { push } from "connected-react-router";
import { db, FirebaseTimestamp } from "../../firebase";
import { fetchPrefectureNameAction } from "./actions";

const areapointsRef = db.collection("areapoints");

export const fetchPrefectureName = (prefecture) => {
  return async (dispatch) => {
    const query = db
      .collection("areapoints")
      .where("prefecture", "==", prefecture);
    query.get().then((snapshots) => {
      snapshots.forEach((snapshot) => {
        const areapoints = snapshot.data();
        const data = {
          prefecture: areapoints.prefecture,
        };
        dispatch(fetchPrefectureNameAction(data));
      });
    });
  };
};

//ラック設置ポイントの登録処理
export const saveAddPoint = (
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
      info: info,
      images: images,
      installation: installation,
      locationLat: parseFloat(locationLat),
      locationLng: parseFloat(locationLng),
      prefecture: prefecture,
      timestamp: timestamp,
    };

    const ref = areapointsRef.doc();
    const id = ref.id;
    data.id = id;
    data.timestamp = timestamp;

    return areapointsRef
      .doc(id)
      .set(data)
      .then(() => {
        dispatch(push("/"));
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};
