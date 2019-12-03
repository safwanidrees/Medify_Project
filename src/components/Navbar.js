import React from "react";
import { Field, reduxForm } from "redux-form";
import { Link, NavLink } from "react-router-dom";
import { Dropdown, Button, Icon, Input } from "semantic-ui-react";
import { connect } from "react-redux" 

import history from "../history";
import { isLoading } from "../actions"

class Navbar extends React.Component {
  onSubmit = ({ search }) => {
    this.props.isLoading(true)
    history.push(`/search/${search}`);
  };
  render() {
    const activeStyle = {
      textDecoration: "none"
    };
    return (
      <div>
        <section className="nav__section">
          <nav className="main__nav">
            <div className="nav__intro">
              <div className="main__logo">
                <NavLink to="/" className="home_link" activeStyle={activeStyle}>
                  MED
                  <Icon
                    name="thermometer"
                    color="red"
                    style={{ margin: "0" }}
                  />
                  FY
                </NavLink>
              </div>
              <div className="search__contianer">
                <form
                  onSubmit={this.props.handleSubmit(this.onSubmit)}
                  className="search__form"
                >
                  <Input placeholder="Navigate to..." className="search__ui">
                    <Field
                      name="search"
                      type="text"
                      placeholder="Search..."
                      component="input"
                      className="search__field"
                    />
                    <Button>
                      <Icon name="search" />
                    </Button>
                  </Input>
                </form>
              </div>
              <div className="cart__stuff">
                <Link to="/medicine/add">
                  <Button>Add</Button>
                </Link>
              </div>
            </div>
            <div className="nav__links">
              <ul className="nav__link--items">
                <NavLink
                  to="/medicines/Cardio-Vascular-System"
                  className="item"
                  activeStyle={activeStyle}
                >
                  Cardio Vascular System
                </NavLink>
                <NavLink
                  to="/medicines/Derma"
                  className="item"
                  activeStyle={activeStyle}
                >
                  Derma
                </NavLink>
                <NavLink
                  to="/medicines/Central-Nervous-System"
                  className="item"
                  activeStyle={activeStyle}
                >
                  Central Nervous System
                </NavLink>
                <NavLink
                  to="/medicines/Circulatory-System"
                  className="item"
                  activeStyle={activeStyle}
                >
                  Circulatory System
                </NavLink>
                <NavLink
                  to="/medicines/Endocrine-System"
                  className="item"
                  activeStyle={activeStyle}
                >
                  Endocrine System
                </NavLink>
                <NavLink
                  to="/medicines/Gestro-Intestinal-Tract"
                  className="item"
                  activeStyle={activeStyle}
                >
                  Gastro Intestinal Tract
                </NavLink>
                <Dropdown text="view more" pointing item simple direction="left">
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <NavLink
                        to="/medicines/Gestro-Intestinal-Tract"
                        className="item"
                        activeStyle={activeStyle}
                      >
                        test
                      </NavLink>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <NavLink
                        to="/medicines/Gestro-Intestinal-Tract"
                        className="item"
                        activeStyle={activeStyle}
                      >
                        test
                      </NavLink>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <NavLink
                        to="/medicines/Gestro-Intestinal-Tract"
                        className="item"
                        activeStyle={activeStyle}
                      >
                        testing the Dropdown button
                      </NavLink>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </ul>
            </div>
          </nav>
        </section>
      </div>
    );
  }
}

const form = reduxForm({
  form: "Search form"
})(Navbar);

export default connect(null,{ isLoading })(form);
