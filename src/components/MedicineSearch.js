import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { searchFor, getTypeMeds, isLoading } from "../actions";
import MedicineJSX from "./MedicineComponents/MedicineJSX";
import Portfolio from "./homeComponents/Portfolio";

class MedicineSearch extends React.Component {
  state = { term: "" };
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate() {
    const { searchResult, sameTypeMeds } = this.props;
    if (this.state.term !== this.props.match.params.term) {
      this.fetchData();
    }
    if (searchResult && !sameTypeMeds.hasOwnProperty(searchResult.type)) {
      this.props.getTypeMeds(this.props.searchResult.type, 5);
    }
  }
  fetchData = () => {
    const { term } = this.props.match.params;
    this.setState({ term });
    this.props.searchFor(term);
    this.props.isLoading(false)
  };
  renderMed = () => {
    const { searchResult } = this.props;
    let display = true;
    if (!searchResult) display = false;
    return (
      <MedicineJSX
        medicine={searchResult}
        display={display}
        message="No results found"
      />
    );
  };
  renderPortfolio = () => {
    if (this.props.searchResult) {
      let list = [];
      _.forIn(this.props.sameTypeMeds, (val, key) => {
        if (key === this.props.searchResult.type)
          list.push(<Portfolio items={val} type={key} key={key} />);
      });
      return list;
    }
  };
  render() {
    return (
      <React.Fragment>
        {this.renderMed()}
        {this.renderPortfolio()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchResult: state.searchResult,
    sameTypeMeds: state.typeMedicines
  };
};

export default connect(mapStateToProps, { searchFor, getTypeMeds, isLoading })(
  MedicineSearch
);
