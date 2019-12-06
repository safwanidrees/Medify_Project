import React from "react";
import _ from "lodash";
import { NavLink, Link } from "react-router-dom";
import { Card, Image, Header, Button, Placeholder } from "semantic-ui-react";

import CustomPlaceholder from "../CustomPlacholder";

class Portfolio extends React.Component {
  renderMeds = meds => {
    let list = [];
    console.log(this.props.showPlaceholder)
    if (this.props.showPlaceholder) {
      for (let i = 0; i < this.props.amount; i++) {
        list.push(<CustomPlaceholder key={i} />);
      }
    } else {
      _.forIn(meds, (val, key) => {
        list.push(
          <Card key={key}>
            <Image src={val.url} wrapped ui={false} />
            <Card.Content>
              <NavLink
                to={`/medicine/${val.type}/${key}`}
                activeStyle={{ textDecoration: "none" }}
                className="item"
              >
                <Card.Header>{key}</Card.Header>
              </NavLink>
              <Card.Meta>
                <span className="date">{val.type}</span>
              </Card.Meta>
              <Card.Description>Rs.{val.price}</Card.Description>
            </Card.Content>
          </Card>
        );
      });
    }
    return list;
  };
  render() {
    return (
      <section className="portfolio">
        <Header as="h1">
          {this.props.showPlaceholder ? (
            <Placeholder>
              <Placeholder.Line length="long" />
            </Placeholder>
          ) : (
            this.props.header
          )}
          <Link to={`/medicines/${this.props.type}`}>
            {this.props.showPlaceholder ? (
              null
            ) : (
              <Button floated="right">Browse All</Button>
            )}
          </Link>
        </Header>
        <ul className="portfolio__items">
          {this.renderMeds(this.props.items)}
        </ul>
      </section>
    );
  }
}

export default Portfolio;
