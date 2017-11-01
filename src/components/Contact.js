import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

class Contact extends React.Component {
    render() {
        return (
            <div className={"contact"}>
                <h1>Kontakt</h1>
                <Grid>
                    <Row className="show-grid block">
                        <Col md={6} className="center">
                            <h2>Meno</h2>
                            <p>Milan Cifra</p>
                        </Col>
                        <Col md={6} className="center">
                            <h2>Email</h2>
                            <p>cifra9@uniba.sk</p>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Contact;