import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { getTypeMeds } from "../../actions";
import Portfolio from "../homeComponents/Portfolio";
import MedicineItem from "./MedicineItem";

class MedicineDisplay extends React.Component {
  state = { type: "" };
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate() {
    if (this.state.type !== this.props.match.params.type) {
      this.fetchData();
    }
  }
  fetchData = () => {
    const { type } = this.props.match.params;
    this.setState({ type });
    this.props.getTypeMeds(type, 5);
  };
  renderPortfolio = meds => {
    if (!this.props.sameTypeMeds) return <div></div>;
    let list = [];
    _.forIn(meds, (val, key) => {
      if (key === this.props.match.params.type)
        list.push(<Portfolio items={val} type={key} key={key} />);
    });
    return list;
  };
  render() {
    // console.log(this.state);
    const { name, type } = this.props.match.params;
    return (
      <React.Fragment>
        <MedicineItem name={name} type={type} />
        {this.renderPortfolio(this.props.sameTypeMeds)}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { sameTypeMeds: state.typeMedicines };
};

export default connect(mapStateToProps, { getTypeMeds })(MedicineDisplay);
