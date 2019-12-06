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
    let list = [];
    if (!meds.hasOwnProperty(this.props.match.params.type)) {
      for(let i=0; i<1; i++)
        list.push(<Portfolio showPlaceholder amount="5" key={i}/>);
    }
    _.forIn(meds, (val, key) => {
      if (key === this.props.match.params.type) {
        list.push(
          <Portfolio
            items={val}
            type={key}
            key={key}
            header={`More ${key} Medicines`}
          />
        );
      }
    });

    return list;
  };
  render() {
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
