import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

const ImageRepoNavbar = (props) => {
  const [selected, setSelected] = useState(false);
  const toggle = () => setSelected(!selected);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Imagify</NavbarBrand>
        <Nav navbar>
          <NavItem>
            <NavLink href="/images">All Images</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};

export default ImageRepoNavbar;
