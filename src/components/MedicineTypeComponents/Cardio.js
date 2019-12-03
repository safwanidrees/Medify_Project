import React from "react";

import MedicineTypeHome from './MedicineTypeHome'

class Cardio extends React.Component {
  render() {
    return (
      <React.Fragment>
        <MedicineTypeHome forType="Cardio-Vascular-System"/>
      </React.Fragment>
    );
  }
}

export default Cardio;
