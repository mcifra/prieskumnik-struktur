import React from 'react';
import {Grid, Row, Col, Panel} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class Home extends React.Component {
    render() {
        return (
            <Row>
                <Col md={6}>
                    <Row>
                        <Col md={12}>
                            <Panel bsStyle='success'>
                                <Panel.Body>
                                    <h1 className='homepage-heading-h1'>Prieskumník sémantiky logiky prvého rádu</h1>
                                    <h2 className='homepage-heading-h2'>Bakalárska práca 2017/18</h2>
                                </Panel.Body>
                            </Panel>
                        </Col>
                        <Col md={6}>
                            <Panel bsStyle='success'>
                                <Panel.Heading>
                                    <Panel.Title componentClass='h3'>Autor</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body>
                                    Milan Cifra, cifra9@uniba.sk
                                </Panel.Body>
                            </Panel>
                        </Col>
                        <Col md={6}>
                            <Panel bsStyle='success'>
                                <Panel.Heading>
                                    <Panel.Title componentClass='h3'>Školiteľ</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body>
                                    <a href="http://dai.fmph.uniba.sk/w/Jan_Kluka/sk">Mgr. Ján Kľuka,
                                        PhD.</a>
                                </Panel.Body>
                            </Panel>
                        </Col>
                        <Col md={12}>
                            <Panel bsStyle='primary'>
                                <Panel.Heading>
                                    <Panel.Title componentClass='h3'>To podstatné</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body>
                                    <div className='row-margin'>
                                        <Row>
                                        <Col sm={7}>
                                            <h4>Prezentácia zdrojov</h4>
                                        </Col>
                                        <Col sm={5}>
                                            <div class="btn-group">
                                                <a href="docs/zdroje.pdf" class="btn btn-primary my-btn">Stiahnuť</a>
                                                <a href="#" class="btn btn-primary dropdown-toggle"
                                                   data-toggle="dropdown"><span class="caret"></span></a>
                                                <ul class="dropdown-menu">
                                                    <li><a href="docs/zdroje.pdf">PDF</a></li>
                                                    <li><a href="docs/zdroje.pptx">PPTX</a></li>
                                                </ul>
                                            </div>
                                        </Col>
                                        </Row>
                                    </div>
                                    <div className='row-margin'>
                                        <Row>
                                        <Col sm={7}>
                                            <h4>Prototyp</h4>
                                        </Col>
                                        <Col sm={5}>
                                            <Link to='/app' className='btn btn-primary my-btn'>Spustiť</Link>
                                        </Col>
                                        </Row>
                                    </div>
                                    <div className='row-margin'>
                                        <Row>
                                        <Col sm={7}>
                                            <h4>Východisková kapitola</h4>
                                        </Col>
                                        <Col sm={5}>
                                            <a href="#" class="btn btn-primary disabled my-btn">Stiahnuť</a>
                                        </Col>
                                        </Row>
                                    </div>
                                </Panel.Body>
                            </Panel>
                        </Col>
                    </Row>
                </Col>
                <Col md={6}>
                    <Row>
                        <Col md={12}>
                            <Panel bsStyle='info'>
                                <Panel.Heading>
                                    <Panel.Title componentClass='h3'>Anotácia</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body>
                                    <p>
                                        Sémantika formúl a termov sa v klasickej matematickej logike uchopuje
                                        pomocou
                                        štruktúr a Tarského definície pravdivosti.
                                        Osvojenie si tohto prístupu pri štúdiu základov logiky je z viacerých
                                        dôvodov
                                        náročné
                                        (abstraktnosť, rozmanitosť štruktúr, problém oddelenia syntaxe a sémantiky),
                                        a to až
                                        do takej miery, že
                                        niektorí autori preferujú herbrandovský prístup k sémantike.
                                    </p>
                                    <p>
                                        Možnou cestou k pochopeniu sú cvičenia zamerané
                                        na rozhodovanie platnosti formúl v štruktúrach, hľadanie štruktúr
                                        (ne)spĺňajúcich
                                        dané formuly, hľadanie formúl
                                        splnených iba v niektorých štruktúrach a pod. V prípade konečných štruktúr
                                        sa
                                        správnosť riešenia takýchto úloh dá
                                        ľahko strojovo kontrolovať, a tým poskytnúť študentom rýchlu spätnú väzbu.
                                        Nie je
                                        nám však známy nástroj poskytujúci
                                        interaktívne vyhodnocovanie riešení a dostatočné možnosti zadávať rozličné
                                        úlohy.
                                    </p>
                                </Panel.Body>
                            </Panel>
                        </Col>
                        <Col md={12}>
                            <Panel bsStyle='info'>
                                <Panel.Heading>
                                    <Panel.Title componentClass='h3'>Ciele práce</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body>
                                    <p>
                                        Cieľom práce je navrhnúť, implementovať a otestovať prototyp interaktívneho
                                        webového
                                        nástroja – prieskumníka
                                        sémantiky logiky prvého rádu. Umožní definovanie prvorádového jazyka,
                                        konkrétnej
                                        konečnej štruktúry pre
                                        tento jazyk a kontrolu splnenia formúl.
                                    </p>
                                    <p>
                                        Prieskumník by mal slúžiť na riešenie úloh, ale aj na ich tvorbu.
                                        Vykonávať sa bude na strane klienta (t.j., vo webovom prehliadači), bude
                                        implementovaný vo vhodnom frameworku
                                        (<a href="http://www.reactjs.org">React</a>, <a
                                        href="http://www.angularjs.org">AngularJS</a>, <a
                                        href="http://elm-lang.org/">elm</a>, …) a tak, aby ho bolo možné integrovať
                                        do
                                        kvízového modulu výučbového systému <a
                                        href="http://www.courses.matfyz.sk">courses.matfyz.sk</a>.
                                    </p>
                                </Panel.Body>
                            </Panel>
                        </Col>
                    </Row>
                </Col>
            </Row>

        );
    }
}

export default Home;