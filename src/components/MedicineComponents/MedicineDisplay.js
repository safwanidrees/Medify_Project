import React from "react";
import { connect } from "react-redux";

import { getSubstituteMeds } from "../../actions";
import Portfolio from "../homeComponents/Portfolio";
import MedicineItem from "./MedicineItem";

class MedicineDisplay extends React.Component {
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate() {
    this.fetchData();
  }
  fetchData = () => {
    const { selectedMed, sameFormulaMeds } = this.props;
    if (selectedMed && Object.keys(sameFormulaMeds).length === 0) {
      this.props.getSubstituteMeds(selectedMed.formula);
    }
  };
  renderPortfolio = () => {
    let list = [];
    const { sameFormulaMeds, match } = this.props;
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
  render() {
    const { name, type } = this.props.match.params;
    return (
      <React.Fragment>
        <MedicineItem name={name} type={type} />
        {this.renderPortfolio()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { sameFormulaMeds: state.formulaMeds, selectedMed: state.selectedMed };
};

export default connect(mapStateToProps, { getSubstituteMeds })(MedicineDisplay);
