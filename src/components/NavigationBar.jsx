import React, { Component } from 'react';

import {Navbar, Nav, NavDropdown, NavItem, MenuItem, Glyphicon} from 'react-bootstrap';

class NavigationBar extends Component {
    render() {
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">Homepage of Brett J Settle</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavDropdown eventKey={3} title="Projects" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1} href="/projects">Browse</MenuItem>
                            <MenuItem eventKey={3.2} href="http://cytoscape.org">Cytoscape</MenuItem>
                            <MenuItem eventKey={3.3} href="http://flika-org.github.io">FLIKA</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.4}>CytoGraph</MenuItem>
                            <MenuItem eventKey={3.5}>VimGolf</MenuItem>
                        </NavDropdown>
                        <NavItem eventKey={1} href="/about">
                            About
                        </NavItem>
                        <NavItem eventKey={2} href="/contact">
                            Contact
                        </NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="http://github.com/brettjsettle">
                            <Glyphicon glyph="github" />
                        </NavItem>
                        <NavItem eventKey={2} href="http://teambabylon.github.io">
                            Team Babylon Blog
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavigationBar;