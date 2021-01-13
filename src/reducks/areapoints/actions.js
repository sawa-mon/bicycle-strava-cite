export const DELETE_AREAPOINT = "DELETE_AREAPOINT";
export const deleteAreaPointsAction = (areapoints) => {
  return {
    type: "DELETE_AREAPOINT",
    payload: areapoints,
  };
};

export const FETCH_AREAPOINTS = "FETCH_AREAPOINTS";
export const fetchAreaPointsAction = (areapoints) => {
  return {
    type: "FETCH_AREAPOINTS",
    payload: areapoints,
  };
};
