import React from "react";
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import {Link} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';

class Navigation extends React.Component {
    render() {
        return (
            <header>
                <Navbar inverse>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">Prieskumník štruktúr</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <LinkContainer to='/about'>
                                <NavItem eventKey={1}>O práci</NavItem>
                            </LinkContainer>
                            <LinkContainer to='/plan'>
                                <NavItem eventKey={2} href="/plan">Etapy vývoja</NavItem>
                            </LinkContainer>
                            <LinkContainer to='/diary'>
                                <NavItem eventKey={3} href="/diary">Denník</NavItem>
                            </LinkContainer>
                        </Nav>
                        <Nav pullRight>
                            <LinkContainer to='/contact'>
                                <NavItem eventKey={1} href="/contact">Kontakt</NavItem>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

            </header>
        );
    }
}

export default Navigation;