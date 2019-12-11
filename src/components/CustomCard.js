import React from "react";
import { NavLink } from "react-router-dom";
import {
  Card,
  Image
} from "semantic-ui-react";


class CustomCard extends React.Component {
  state = { med: null };
  static getDerivedStateFromProps(props, state) {
    state.med = props.med;
    return state;
  }
  renderMed = () => {
    const { med } = this.state;
    if (med) {
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
    }
  };
  render() {
    return this.renderMed();
  }
}

export default CustomCard;
