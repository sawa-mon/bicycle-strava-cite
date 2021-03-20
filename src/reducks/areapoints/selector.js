import { createSelector } from "reselect";

const areapointsSelector = (state) => state.areapoints;

export const getAreaPoints = createSelector(
  [areapointsSelector],
  (state) => state.list
);
