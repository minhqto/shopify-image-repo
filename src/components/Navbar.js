import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import config from "../config/config";

const ImageRepoNavbar = (props) => {
  const history = useHistory();
  const [selected, setSelected] = useState(false);
  const toggle = () => setSelected(!selected);

  const handleClick = (event) => {
    event.preventDefault();
    history.push(`/${event.target.name}`);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    axios
      .delete(`${config.apiUrl}/logout`, { withCredentials: true })
      .then((response) => {
        useHistory.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand
          style={{ cursor: "pointer" }}
          name="images"
          onClick={(event) => {
            handleClick(event);
          }}
        >
          Imagify
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse selected={selected} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink
                style={{ cursor: "pointer" }}
                name="images"
                onClick={(event) => {
                  handleClick(event);
                }}
              >
                All Images
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ cursor: "pointer" }}
                name="addImages"
                onClick={(event) => {
                  handleClick(event);
                }}
              >
                Add Images
              </NavLink>
            </NavItem>
          </Nav>

          <NavLink
            style={{ cursor: "pointer" }}
            className="ml-auto"
            name="login"
            onClick={(event) => {
              handleLogout(event);
            }}
          >
            Log out
          </NavLink>
        </Collapse>
      </Navbar>
      <br></br>
    </div>
  );
};

export default ImageRepoNavbar;
