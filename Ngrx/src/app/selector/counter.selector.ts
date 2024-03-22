import {createFeatureSelector, createSelector} from "@ngrx/store";

export const selectState = createFeatureSelector('counter');
// export const getCounter = createSelector(
//   selectState,
//   (abilityState: ) => abilityState.
// );
