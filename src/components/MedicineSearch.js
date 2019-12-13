import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

import { getSubstituteMeds, searchFor } from "../actions";
import MedicineJSX from "./MedicineComponents/MedicineJSX";
import Portfolio from "./homeComponents/Portfolio";
import { Segment } from "semantic-ui-react";

// renders portfolio
const renderPortfolio = (searchResult, sameFormulaMeds) => {
  let list = [];
  if (searchResult && searchResult !== "not found") {
    if (Object.keys(sameFormulaMeds).length === 0) {
      for (let i = 0; i < 1; i++) {
        list.push(<Portfolio showPlaceholder amount="5" key={i} />);
      }
    }
    delete sameFormulaMeds[searchResult.name || ""];
    list.push(
      <Portfolio
        items={sameFormulaMeds}
        type={searchResult.type}
        key="1"
        header="Substitute Medicines"
        showButton={false}
      />
    );
    return list;
  }
};

/** MAIN COMPONENT */
const MedicineSearch = props => {
  // component's state
  const [result, setResult] = useState(null);

  // accessing the redux store
  const searchResult = useSelector(state => state.searchResult);
  const sameFormulaMeds = useSelector(state => state.formulaMeds);
  const dispatch = useDispatch();

  useEffect(() => {
    // on mounting and updating the searched term
    (async () => {
      const data = await searchFor(props.match.params.term);
      dispatch({ type: "SEARCH_RESULT", payload: data });
    })();

    // on unmounting
    return () => {
      dispatch({ type: "SEARCH_RESULT", payload: null });
    };
  }, [props.match.params.term, dispatch]);

  // checks if search result exists
  if (
    searchResult !== "not found" &&
    searchResult &&
    !_.isEqual(result, searchResult)
  ) {
    // if exists then gets substitute medicines
    getSubstituteMeds(searchResult.formula).then(data => {
      dispatch({ type: "SUBSTITUE_MEDS", payload: data });
    });
    setResult(searchResult);
  }

  return (
    <React.Fragment>
      <Segment placeholder style={{ marginTop: "30px", minHeight: "580px" }}>
        <MedicineJSX medicine={searchResult} message="No results found" />
      </Segment>
      {renderPortfolio(searchResult, sameFormulaMeds)}
    </React.Fragment>
  );
};

export default MedicineSearch;
