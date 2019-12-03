import React from "react";
import {
  Grid,
  Image,
  Segment,
  Header,
  CardDescription,
  CardContent,
  CardMeta,
  Icon,
  Loader
} from "semantic-ui-react";
import { connect } from "react-redux";

class MedicineJSX extends React.Component {
  renderMed() {
    if (this.props.isDataLoading) {
      return <Loader active />;
    } else if (!this.props.display) {
      return (
        <Header icon>
          <Icon name="search" />
          {this.props.message}
        </Header>
      );
    } else if (!this.props.medicine) return <div></div>;
    const { medicine } = this.props;
    return (
      <Grid columns={2} relaxed="very" stackable>
        <Grid.Column>
          <Image src={medicine.url} style={{ height: "500px" }} />
        </Grid.Column>
        <Grid.Column verticalAlign="middle">
          <Header as="h1">{medicine.name}</Header>
          <CardMeta>
            <span className="date">{medicine.type}</span>
          </CardMeta>
          <CardDescription style={{ margin: "10px 0" }}>
            {medicine.description}
          </CardDescription>
          <CardContent style={{ fontWeight: "bold" }} extra>
            Rs.{medicine.price}
          </CardContent>
        </Grid.Column>
      </Grid>
    );
  }
  render() {
    return (
      <Segment placeholder style={{ margin: "30px 0" }}>
        {this.renderMed()}
      </Segment>
    );
  }
}

const mapStateToProps = ({ isLoading }) => {
  return { isDataLoading: isLoading };
};

export default connect(mapStateToProps)(MedicineJSX);
