import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getSingleMed } from "../../actions";
import MedicineJSX from "./MedicineJSX";
import { Segment } from "semantic-ui-react";

const MedicineItem = props => {
  const [medName, setMedName] = useState(null);
  const { name, type } = props;

  const dispatch = useDispatch();
  const medicine = useSelector(({ selectedMed }) => selectedMed);

  if (medName !== name) {
    getSingleMed(type, name).then(data => {
      dispatch({ type: "GET_MED", payload: data });
      props.getSubstitute(data);
    });
    setMedName(name);
  }

  useEffect(() => {
    return () => {
      dispatch({ type: "GET_MED", payload: null });
    };
  }, []);

  return (
    <Segment placeholder style={{ marginTop: "30px 0" }}>
      <MedicineJSX medicine={medicine} />
    </Segment>
  );
};

export default MedicineItem;
