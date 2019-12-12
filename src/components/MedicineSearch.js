import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

import { getSubstituteMeds, searchFor, destroy } from "../actions";
import MedicineJSX from "./MedicineComponents/MedicineJSX";
import Portfolio from "./homeComponents/Portfolio";
import { Segment } from "semantic-ui-react";

const renderMed = searchResult => (
  <MedicineJSX medicine={searchResult} message="No results found" />
);

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
        header={"Substitute Medicines"}
      />
    );
    return list;
  }
};

const MedicineSearch = props => {
  const [result, setResult] = useState(null);
  const searchResult = useSelector(state => state.searchResult);
  const sameFormulaMeds = useSelector(state => state.formulaMeds);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const data = await searchFor(props.match.params.term);
      dispatch({ type: "SEARCH_RESULT", payload: data });
    })();
    // return () => {
    //   props.destroy("searchResult");
    // };
  }, [props.match.params.term]);
  if (
    searchResult !== "not found" &&
    searchResult &&
    !_.isEqual(result, searchResult)
  ) {
    getSubstituteMeds(searchResult.formula).then(data => {
      dispatch({ type: "SUBSTITUE_MEDS", payload: data });
    });
    setResult(searchResult);
  }
  return (
    <React.Fragment>
      <Segment placeholder style={{ marginTop: "30px" }}>
        {renderMed(searchResult)}
      </Segment>
      {renderPortfolio(searchResult, sameFormulaMeds)}
    </React.Fragment>
  );
};

export default MedicineSearch;
