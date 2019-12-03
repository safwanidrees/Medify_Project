import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { NavLink } from "react-router-dom";

import { getTypeMeds } from "../../actions";

class MedicineTypeHome extends React.Component {
  componentDidMount() {
    this.props.getTypeMeds(this.props.forType, 50);
  }
  renderMedList() {
    let list = [];
    _.forIn(this.props.meds, (val, key) => {
      if (key === this.props.forType) {
        _.forIn(val, (medVal, medKey) => {
          list.push(
            <div className="ui card" key={medKey}>
              <div className="image">
                <img className="img" src={medVal.url} alt={key} />
              </div>
              <div className="content">
                <NavLink
                  to={`/medicine/${this.props.forType}/${medKey}`}
                  className="item"
                  activeStyle={{ textDecoration: "none" }}
                >
                  {medKey}
                </NavLink>
                <div className="meta">
                  <span className="date">{medVal.type}</span>
                </div>
                <div className="description">Rs.{medVal.price}</div>
              </div>
            </div>
          );
        });
      }
    });
    return list;
  }
  render() {
    return (
      <React.Fragment>
        <div className="ui header" style={{ marginLeft: "20px" }}>
          <h1>{this.props.forType}</h1>
        </div>
        <ul className="portfolio__items">{this.renderMedList()}</ul>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { meds: state.typeMedicines };
};

export default connect(mapStateToProps, { getTypeMeds })(MedicineTypeHome);
