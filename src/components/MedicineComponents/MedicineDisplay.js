/* eslint-disable */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getSubstituteMeds } from "../../actions";
import Portfolio from "../homeComponents/Portfolio";
import MedicineItem from "./MedicineItem";

/** MAIN COMPONENT */
const MedicineDisplay = props => {
  // getting name and type of medicine from url params
  const { name, type } = props.match.params;

  // accessing the redux store
  const dispatch = useDispatch();
  const sameFormulaMeds = useSelector(({ formulaMeds }) => formulaMeds);

  // gets the medicines with same formula
  const getSubstitute = medicine => {
    getSubstituteMeds(medicine.formula).then(data => {
      dispatch({ type: "SUBSTITUE_MEDS", payload: data });
    });
  };

  useEffect(() => {
    // on unmounting
    return () => {
      dispatch({ type: "SUBSTITUE_MEDS", payload: {} });
    };
  }, [dispatch]);

  return (
    <React.Fragment>
      <MedicineItem name={name} type={type} getSubstitute={getSubstitute} />
      {renderPortfolio(sameFormulaMeds, props.match)}
    </React.Fragment>
  );
};

// renders portfolio
const renderPortfolio = (sameFormulaMeds, match) => {
  let list = [];
  if (Object.keys(sameFormulaMeds).length === 0) {
    for (let i = 0; i < 1; i++)
      list.push(<Portfolio showPlaceholder amount="5" key={i} />);
  }
  delete sameFormulaMeds[match.params.name];
  list.push(
    <Portfolio
      items={sameFormulaMeds}
      type={match.params.type}
      key="1"
      header={"Substitute Medicines"}
    />
  );

  return list;
};

export default MedicineDisplay;
