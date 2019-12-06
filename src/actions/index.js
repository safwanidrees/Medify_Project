import * as firebase from "firebase";
import _ from "lodash";

export const isLoading = isLoading => {
  return { type: "LOADING", payload: isLoading };
};

export const searchFor = term => async dispatch => {
  const snap = await firebase
    .database()
    .ref()
    .child("medicines")
    .once("value");
  let result = "not found";
  _.forIn(snap.val(), val => {
    _.forIn(val, (val, key) => {
      if (key.toLowerCase() === term.toLowerCase()) {
        result = { name: key, ...val };
        return false;
      }
    });
  });
  dispatch({ type: "SEARCH_RESULT", payload: result });
};

export const getSingleMed = (type = null, med = null) => async dispatch => {
  const snap = await firebase
    .database()
    .ref()
    .child("medicines")
    .child(type)
    .child(med)
    .once("value");
  dispatch({ type: "GET_MED", payload: { name: med, ...snap.val() } });
};

export const getTypeMeds = (type = null, limit = 5) => async dispatch => {
  const snap = await firebase
    .database()
    .ref()
    .child("medicines")
    .child(type)
    .limitToFirst(limit)
    .once("value");
  dispatch({ type: "GET_MEDS", payload: { [type]: snap.val() } });
};

export const destroy = (type, opt) => async (dispatch, getState) => {
  if (type === "searchResult") {
    dispatch({ type: "SEARCH_RESULT", payload: null });
  } else if (type === "medicine") {
    dispatch({ type: "GET_MED", payload: null });
  } else if (type === "medicines") {
    delete getState().typeMedicines[opt];
    dispatch({ type: "GET_MEDS", payload: null });
  }
};
