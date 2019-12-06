import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { searchFor, getTypeMeds, destroy } from "../actions";
import MedicineJSX from "./MedicineComponents/MedicineJSX";
import Portfolio from "./homeComponents/Portfolio";
import { Segment } from "semantic-ui-react";

class MedicineSearch extends React.Component {
  state = { term: "" };
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate() {
    const { searchResult, sameTypeMeds, getTypeMeds, match } = this.props;
    if (this.state.term !== match.params.term) {
      this.fetchData();
    }
    if (searchResult !== "not found" && searchResult) {
      if (!sameTypeMeds.hasOwnProperty(searchResult.type))
        getTypeMeds(searchResult.type, 5);
    }
  }
  componentWillUnmount() {
    this.props.destroy("searchResult");
  }
  fetchData = () => {
    const { term } = this.props.match.params;
    this.setState({ term });
    this.props.searchFor(term);
  };
  renderMed = () => (
    <MedicineJSX
      medicine={this.props.searchResult}
      message="No results found"
    />
  );

  renderPortfolio = () => {
    const { searchResult, sameTypeMeds } = this.props;
    let list = [];
    if (searchResult) {
      if (Object.keys(sameTypeMeds).length < 1) {
        for (let i = 0; i < 1; i++) {
          list.push(<Portfolio showPlaceholder amount="5" key={i} />);
        }
      }
      _.forIn(sameTypeMeds, (val, key) => {
        if (key === searchResult.type)
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
    sameTypeMeds: state.typeMedicines
  };
};

export default connect(mapStateToProps, {
  searchFor,
  getTypeMeds,
  destroy
})(MedicineSearch);
