import { createSelector } from "reselect";

const AreaPointsSelector = (state) => state.areapoints;

export const getPrefectureName = createSelector(
  [AreaPointsSelector],
  (state) => state.prefecture
);
