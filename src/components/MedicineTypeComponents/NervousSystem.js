import React from "react";

import MedicineTypeHome from './MedicineTypeHome'

class NervousSystem extends React.Component {
  render() {
    return (
      <React.Fragment>
        <MedicineTypeHome forType="Central-Nervous-System"/>
      </React.Fragment>
    );
  }
}

export default NervousSystem;
