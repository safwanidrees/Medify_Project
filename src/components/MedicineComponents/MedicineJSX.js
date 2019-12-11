import React from "react";
import {
  Grid,
  Image,
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
    if (!this.props.medicine) {
      return <Loader active />;
    } else if (this.props.medicine === "not found") {
      return (
        <Header icon>
          <Icon name="search" />
          {this.props.message}
        </Header>
      );
    } else if (this.props.medicine) {
      const { medicine } = this.props;
      return (
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            <Image src={medicine.url} style={{ height: "500px" }} />
          </Grid.Column>
          <Grid.Column verticalAlign="middle">
            <Header as="h1">
              {medicine.name}<br />
              <div style={{ fontSize: "17px" }}>
                ({medicine.formula})
              </div>
            </Header>
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
  }
  render() {
    return this.renderMed();
  }
}

const mapStateToProps = ({ isLoading }) => {
  return { isDataLoading: isLoading };
};

export default connect(mapStateToProps)(MedicineJSX);