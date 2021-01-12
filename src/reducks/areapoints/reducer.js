import * as Actions from "./actions";
import initialState from "../store/initialState";

export const AreaPointsReducer = (state = initialState.areapoints, action) => {
  switch (action.type) {
    case Actions.FETCH_PREFECTURE_NAME:
      return {
        ...state,
        prefecture: [...action.payload],
      };
    default:
      return state;
  }
};
