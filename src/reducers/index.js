import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

const isLoading = (isLoading = false, action) => {
  if (action.type === "LOADING") return action.payload;
  return isLoading;
};

const getTypeMeds = (state = {}, action) => {
  switch (action.type) {
    case "GET_MEDS":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const getMed = (med = null, action) => {
  switch (action.type) {
    case "GET_MED":
      return action.payload;
    default:
      return med;
  }
};

const getSearchResults = (result = null, action) => {
  switch (action.type) {
    case "SEARCH_RESULT":
      return action.payload;
    default:
      return result;
  }
};

export default combineReducers({
  form: formReducer,
  isLoading,
  typeMedicines: getTypeMeds,
  selectedMed: getMed,
  searchResult: getSearchResults
});
