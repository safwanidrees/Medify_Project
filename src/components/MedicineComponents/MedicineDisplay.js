import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getSubstituteMeds } from "../../actions";
import Portfolio from "../homeComponents/Portfolio";
import MedicineItem from "./MedicineItem";

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

const MedicineDisplay = props => {
  const { name, type } = props.match.params;

  const dispatch = useDispatch();
  const sameFormulaMeds = useSelector(({ formulaMeds }) => formulaMeds);

  const getSubstitute = medicine => {
    getSubstituteMeds(medicine.formula).then(data => {
      dispatch({ type: "SUBSTITUE_MEDS", payload: data });
    });
  };

  useEffect(() => {
    return () => {
      dispatch({ type: "SUBSTITUE_MEDS", payload: {} });
    };
  }, []);

  return (
    <React.Fragment>
      <MedicineItem name={name} type={type} getSubstitute={getSubstitute} />
      {renderPortfolio(sameFormulaMeds, props.match)}
    </React.Fragment>
  );
};

export default MedicineDisplay;
