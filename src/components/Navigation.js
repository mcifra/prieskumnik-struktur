import React from "react";
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import {Link} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';

const Navigation = () => (
    <header>
       <Navbar>
          <Navbar.Header>
             <Navbar.Brand>
                <Link to="/">Prieskumník štruktúr</Link>
             </Navbar.Brand>
             <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
             <Nav>
                <LinkContainer to='/plan'>
                   <NavItem eventKey={2}>Etapy vývoja</NavItem>
                </LinkContainer>
                <LinkContainer to='/references'>
                   <NavItem eventKey={3}>Zdroje</NavItem>
                </LinkContainer>
             </Nav>
             <Nav pullRight>
                <NavItem eventKey={1} href='https://github.com/mcifra/prieskumnik-struktur/issues'>
                   Oznámenie chyby
                </NavItem>
             </Nav>
          </Navbar.Collapse>
       </Navbar>
    </header>
);

export default Navigation;