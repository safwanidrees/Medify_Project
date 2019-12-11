import React from "react";
import { connect } from "react-redux";

import { searchFor, getSubstituteMeds, destroy } from "../actions";
import MedicineJSX from "./MedicineComponents/MedicineJSX";
import Portfolio from "./homeComponents/Portfolio";
import { Segment } from "semantic-ui-react";

class MedicineSearch extends React.Component {
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps) {
    const {
      searchResult,
      sameFormulaMeds,
      getSubstituteMeds,
      match
    } = this.props;
    if (prevProps.match.params.term !== match.params.term) {
      this.fetchData();
    }
    if (
      searchResult !== "not found" &&
      searchResult &&
      Object.keys(sameFormulaMeds).length === 0
    ) {
      getSubstituteMeds(searchResult.formula);
    }
  }
  componentWillUnmount() {
    this.props.destroy("searchResult");
  }
  fetchData = () => {
    const { term } = this.props.match.params;
    this.props.searchFor(term);
  };
  renderMed = () => (
    <MedicineJSX
      medicine={this.props.searchResult}
      message="No results found"
    />
  );

  renderPortfolio = () => {
    const { searchResult, sameFormulaMeds } = this.props;
    let list = [];
    if (searchResult && searchResult !== "not found") {
      if (Object.keys(sameFormulaMeds).length === 0) {
        for (let i = 0; i < 1; i++) {
          list.push(<Portfolio showPlaceholder amount="5" key={i} />);
        }
      }
      delete sameFormulaMeds[searchResult ? searchResult.name : ""];
      list.push(
        <Portfolio
          items={sameFormulaMeds}
          type={searchResult.type}
          key="1"
          header={"Substitute Medicines"}
        />
      );
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
    sameFormulaMeds: state.formulaMeds
  };
};

export default connect(mapStateToProps, {
  searchFor,
  getSubstituteMeds,
  destroy
})(MedicineSearch);
