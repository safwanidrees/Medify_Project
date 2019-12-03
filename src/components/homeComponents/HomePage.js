import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import "../../style.css";
import Portfolio from "./Portfolio";
import { getTypeMeds } from "../../actions";
import RenderPlaceholder from "../Placholder";

class HomePage extends React.Component {
  componentDidMount() {
    this.props.getTypeMeds("Derma", 5);
    this.props.getTypeMeds("Cardio-Vascular-System", 5);
  }
  renderPortfolio = () => {
    let list = [];
    if (Object.keys(this.props.medicines).length < 1) {
      for (let i = 0; i <= 5; i++) {
        list.push(<RenderPlaceholder />);
      }
    }
    _.forIn(this.props.medicines, (val, key) => {
      list.push(<Portfolio items={val} type={key} key={key} />);
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

export default connect(mapStateToProps, { getTypeMeds })(HomePage);
