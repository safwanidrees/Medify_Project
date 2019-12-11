import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import "../../style.css";
import Portfolio from "./Portfolio";
import { getTypeMeds, destroy } from "../../actions";

class HomePage extends React.Component {
  componentDidMount() {
    ["Derma", "Cardio-Vascular-System"].forEach(type => {
      this.props.getTypeMeds(type, 5);
    });
  }
  componentWillUnmount() {
    ["Derma", "Cardio-Vascular-System"].forEach(type => {
      this.props.destroy("medicines", type);
    });
  }
  renderPortfolio = () => {
    let list = [];
    const {medicines} = this.props
    if (Object.keys(medicines).length < 1) {
      for (let i = 0; i < 2; i++) {
        list.push(<Portfolio showPlaceholder amount="5" key={i} />);
      }
    }
    _.forIn(medicines, (val, key) => {
      if (key === "Derma" || key === "Cardio-Vascular-System") {
        list.push(<Portfolio items={val} type={key} key={key} header={key} />);
      }
    });
    return list;
  };
  render() {
    return (
      <React.Fragment>
        <section className="main__container">
          <h1 className="test">
            Search any medicine you want,
            <br />
            you'll find it here
          </h1>
        </section>
        {this.renderPortfolio()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { medicines: state.typeMedicines };
};

export default connect(mapStateToProps, { getTypeMeds, destroy })(HomePage);
