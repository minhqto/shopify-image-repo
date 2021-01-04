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
        <NavbarToggler onClick={toggle} />
        <Collapse selected={selected} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/images">All Images</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/addImages">Add Images</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default ImageRepoNavbar;
