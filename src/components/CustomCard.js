import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Card, Image } from "semantic-ui-react";

/** MAIN COMPONENT */
const CustomCard = ({ med }) => {
  const [medicine, setMedicine] = useState(null);
  if (med !== medicine) {
    setMedicine(med);
  }
  return renderMed(medicine);
};

const renderMed = med => {
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
  } else {
    return null;
  }
};

export default CustomCard;
