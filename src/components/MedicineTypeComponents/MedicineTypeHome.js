import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { NavLink } from "react-router-dom";
import {
  Button,
  Container,
  Header,
  Segment,
  Card,
  Image,
  Grid
} from "semantic-ui-react";
import queryString from "query-string";

import { getTypeMeds, destroy } from "../../actions";

class MedicineTypeHome extends React.Component {
  state = { page: null, medArr: null };
  componentDidMount() {
    this.props.getTypeMeds(this.props.match.params.type, 50);
  }
  componentWillUnmount() {
    this.props.destroy("medicines", this.props.match.params.type);
  }
  componentDidUpdate() {
    const page = Number(queryString.parse(this.props.location.search).page);
    if (this.state.page !== page) {
      const final = this.pageManangement(page);
      this.setState({
        page,
        medArr: final
      });
    }
  }
  pageManangement = page => {
    let resultsPerPage, start, end, medArr, finalArr;
    resultsPerPage = 10;
    start = (page - 1) * resultsPerPage;
    end = page * resultsPerPage;
    medArr = _.values(
      _.mapValues(
        this.props.meds[this.props.match.params.type],
        (value, key) => {
          value["name"] = key;
          return value;
        }
      )
    );
    finalArr = medArr.slice(start, end);
    return finalArr;
  };
  renderMedList() {
    const { medArr } = this.state;
    if (medArr) {
      return medArr.map(med => {
        return (
          <Card key={med.name}>
            <Image src={med.url} wrapped ui={false} />
            <Card.Content>
              <NavLink
                to={`/medicine/${med.type}/${med.name}`}
                activeStyle={{ textDecoration: "none" }}
                className="item"
              >
                <Card.Header>{med.name}</Card.Header>
              </NavLink>
              <Card.Meta>
                <span className="date">{med.type}</span>
              </Card.Meta>
              <Card.Description>Rs.{med.price}</Card.Description>
            </Card.Content>
          </Card>
        );
      });
    }
  }

  setupButtons = () => {
    const { match, meds } = this.props;
    if (meds && this.state.page) {
      const totalPages = Math.ceil(
        Object.keys(meds[match.params.type]).length / 10
      );
      const { page } = this.state;
      console.log(page);
      console.log(totalPages);
      if (page === 1 && totalPages > 1) {
        // show next button
        return (
          <NavLink
            to={`/medicines/${this.props.match.params.type}?page=${page + 1}`}
          >
            <Button primary>Next</Button>
          </NavLink>
        );
      } else if (totalPages > 1) {
        // show previous button
        return (
          <NavLink
            to={`/medicines/${this.props.match.params.type}?page=${page - 1}`}
          >
            <Button primary>previous</Button>
          </NavLink>
        );
      } else if (page === totalPages && totalPages > 1) {
        // show both buttons
        return (
          <React.Fragment>
            <NavLink
              to={`/medicines/${this.props.match.params.type}?page=${page - 1}`}
            >
              <Button primary>previous</Button>
            </NavLink>
            <NavLink
              to={`/medicines/${this.props.match.params.type}?page=${page + 1}`}
            >
              <Button primary>Next</Button>
            </NavLink>
          </React.Fragment>
        );
      }
    }
  };
  render() {
    return (
      <Container style={{ margin: "50px 0", width: "90%" }}>
        <Header as="h1">{this.props.match.params.type}</Header>
        <Segment placeholder>
          <ul className="portfolio__items">{this.renderMedList()}</ul>
        </Segment>
        <Grid>
          <Grid.Column textAlign="center">{this.setupButtons()}</Grid.Column>
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
