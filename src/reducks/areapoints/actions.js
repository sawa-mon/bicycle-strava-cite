export const FETCH_PREFECTURE_NAME = "FETCH_PREFECTURE_NAME";
export const fetchPrefectureNameAction = (areapoints) => {
  return {
    type: "FETCH_PREFECTURE_NAME",
    payload: {
      prefecture: areapoints.prefecture,
    },
  };
};
