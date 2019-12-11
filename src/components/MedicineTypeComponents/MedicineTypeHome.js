import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Container, Header, Segment, Grid } from "semantic-ui-react";
import queryString from "query-string";

import PageButtons from "./PageButtons";
import { getTypeMeds, destroy } from "../../actions";
import CustomCard from "../CustomCard";

class MedicineTypeHome extends React.Component {
  state = { page: null, medArr: [], totalPages: null, type: null };

  static getDerivedStateFromProps(props, state) {
    // sets the type inside of state to be type inside url
    state.type = props.match.params.type;

    // sets the page inside of state to be page inside url
    state.page = Number(queryString.parse(props.location.search).page);

    // checks if the medicines of right type exists
    if (!props.meds[state.type]) {
      // if not then gets it
      props.getTypeMeds(state.type, 50);
    }

    // sets medicines arr to array created from medicines object
    state.medArr = _.values(
      _.mapValues(props.meds[state.type], (value, key) => {
        value["name"] = key;
        return value;
      })
    );

    // controls page flow
    if (state.medArr) {
      state.totalPages = Math.ceil(state.medArr.length / 10);
      state.medArr = state.medArr.slice((state.page - 1) * 10, state.page * 10);
    }

    return state;
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData = () => {
    const { getTypeMeds } = this.props;
    getTypeMeds(this.state.type, 50);
  };
  renderMedList() {
    return this.state.medArr.map(med => {
      return <CustomCard med={med} key={med.name || 1} />;
    });
  }

  render() {
    return (
      <Container style={{ margin: "50px 0", width: "90%" }}>
        <Header as="h1">{this.props.match.params.type}</Header>
        <Segment placeholder>
          <ul className="portfolio__items">{this.renderMedList()}</ul>
        </Segment>
        <Grid>
          <Grid.Column textAlign="center">
            <PageButtons
              type={this.props.match.params.type}
              page={this.state.page}
              totalPages={this.state.totalPages}
            />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return { meds: state.typeMedicines };
};

export default connect(mapStateToProps, { getTypeMeds, destroy })(
  MedicineTypeHome
);
