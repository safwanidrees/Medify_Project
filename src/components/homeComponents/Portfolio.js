import React from "react";
import _ from "lodash";
import { NavLink } from "react-router-dom";
import { Header, Button, Placeholder } from "semantic-ui-react";

import CustomPlaceholder from "../CustomPlacholder";
import CustomCard from "../CustomCard";

class Portfolio extends React.Component {
  renderMeds = () => {
    let list = [];
    if (this.props.showPlaceholder) {
      for (let i = 0; i < this.props.amount; i++) {
        list.push(<CustomPlaceholder key={i} />);
      }
    } else {
      _.forIn(this.props.items, (val, key) => {
        list.push(<CustomCard med={{ name: key, ...val }} key={key}/>);
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
          <NavLink to={`/medicines/${this.props.type}?page=1`}>
            {this.props.showPlaceholder ? null : (
              <Button floated="right">Browse All</Button>
            )}
          </NavLink>
        </Header>
        <ul className="portfolio__items">{this.renderMeds()}</ul>
      </section>
    );
  }
}

export default Portfolio;
