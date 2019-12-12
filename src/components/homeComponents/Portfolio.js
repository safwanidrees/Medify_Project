import React from "react";
import _ from "lodash";
import { NavLink } from "react-router-dom";
import { Header, Button, Placeholder } from "semantic-ui-react";

import CustomPlaceholder from "../CustomPlacholder";
import CustomCard from "../CustomCard";

// renders medicines
const renderMeds = props => {
  let list = [];
  if (props.showPlaceholder) {
    for (let i = 0; i < props.amount; i++) {
      list.push(<CustomPlaceholder key={i} />);
    }
  } else {
    _.forIn(props.items, (val, key) => {
      list.push(<CustomCard med={{ name: key, ...val }} key={key} />);
    });
  }
  return list;
};


/** MAIN COMPONENT */
const Portfolio = props => {
  return (
    <section className="portfolio">
      <Header as="h1">
        {props.showPlaceholder ? (
          <Placeholder>
            <Placeholder.Line length="long" />
          </Placeholder>
        ) : (
          props.header
        )}
        <NavLink to={`/medicines/${props.type}?page=1`}>
          {props.showPlaceholder ? null : (
            <Button floated="right">Browse All</Button>
          )}
        </NavLink>
      </Header>
      <ul className="portfolio__items">{renderMeds(props)}</ul>
    </section>
  );
};

export default Portfolio;
