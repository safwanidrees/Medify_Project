import React from "react";
import { connect } from "react-redux";

import { getSingleMed } from "../../actions";
import MedicineJSX from "./MedicineJSX";
import { Segment } from "semantic-ui-react";

class MedicineItem extends React.Component {
  state = { name: "" };
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate() {
    if (this.state.name !== this.props.name) {
      this.fetchData();
    }
  }
  fetchData = () => {
    const { name, type } = this.props;
    this.setState({ name });
    this.props.getSingleMed(type, name);
  };
  renderMed() {
    return (
      <Segment placeholder style={{ marginTop: "30px 0" }}>
        <MedicineJSX medicine={this.props.medicine} />
      </Segment>
    );
  }
  render() {
    return this.renderMed();
  }
}

const mapStateToProps = state => {
  return { medicine: state.selectedMed };
};

export default connect(mapStateToProps, { getSingleMed })(MedicineItem);
