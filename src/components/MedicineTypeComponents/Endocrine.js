import React from "react";

import MedicineTypeHome from './MedicineTypeHome'

class Endocrine extends React.Component {
  render() {
    return (
      <React.Fragment>
        <MedicineTypeHome forType="Endocrine-System"/>
      </React.Fragment>
    );
  }
}

export default Endocrine;
