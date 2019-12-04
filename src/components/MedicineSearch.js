import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { searchFor, getTypeMeds, isLoading } from "../actions";
import MedicineJSX from "./MedicineComponents/MedicineJSX";
import Portfolio from "./homeComponents/Portfolio";
import { Segment, Loader } from "semantic-ui-react";

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
  componentWillUnmount() {
    this.setState({ term: "" });
    this.props.searchFor(this.state.term);
  }
  fetchData = () => {
    const { term } = this.props.match.params;
    this.setState({ term });
    this.props.searchFor(term);
    this.props.isLoading(false);
  };
  renderMed = () => {
    const { searchResult, isDataLoading } = this.props;
    if (isDataLoading) {
      return <Loader active />;
    }
    return <MedicineJSX medicine={searchResult} message="No results found" />;
  };
  renderPortfolio = () => {
    if (this.props.searchResult) {
      let list = [];
      _.forIn(this.props.sameTypeMeds, (val, key) => {
        if (key === this.props.searchResult.type)
          list.push(
            <Portfolio
              items={val}
              type={key}
              key={key}
              header={`More ${key} Medicines`}
            />
          );
      });
      return list;
    }
  };
  render() {
    return (
      <React.Fragment>
        <Segment placeholder style={{ marginTop: "30px" }}>
          {this.renderMed()}
        </Segment>
        {this.renderPortfolio()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchResult: state.searchResult,
    sameTypeMeds: state.typeMedicines,
    isDataLoading: state.isLoading
  };
};

export default connect(mapStateToProps, { searchFor, getTypeMeds, isLoading })(
  MedicineSearch
);
