import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

class Home extends React.Component {
    render() {
        return (
            <div className="about">
                <Grid>
                    <h1>Prieskumník sémantiky logiky prvého rádu</h1>
                    <h2>Bakalárska práca 2017/18</h2>
                    <Row className="show-grid people">
                        <Col md={6} className="center">
                            <h3>Autor</h3>
                            <p>Milan Cifra, cifra9@uniba.sk</p>
                        </Col>
                        <Col md={6} className="center">
                            <h3>Školiteľ</h3>
                            <p><a href="http://dai.fmph.uniba.sk/w/Jan_Kluka/sk">Mgr. Ján Kľuka, PhD.</a></p>
                        </Col>
                    </Row>
                    {/*<hr className="line-break"/>*/}
                    <Row className="show-grid anotation-goals">
                        <Col md={6} className="center">
                            <div className={"left"}>
                                <h2>Anotácia</h2>
                                <p>
                                    Sémantika formúl a termov sa v klasickej matematickej logike uchopuje pomocou štruktúr a Tarského definície pravdivosti.
                                    Osvojenie si tohto prístupu pri štúdiu základov logiky je z viacerých dôvodov náročné
                                    (abstraktnosť, rozmanitosť štruktúr, problém oddelenia syntaxe a sémantiky), a to až do takej miery, že
                                    niektorí autori preferujú herbrandovský prístup k sémantike.
                                </p>
                                <p>
                                    Možnou cestou k pochopeniu sú cvičenia zamerané
                                    na rozhodovanie platnosti formúl v štruktúrach, hľadanie štruktúr (ne)spĺňajúcich dané formuly, hľadanie formúl
                                    splnených iba v niektorých štruktúrach a pod. V prípade konečných štruktúr sa správnosť riešenia takýchto úloh dá
                                    ľahko strojovo kontrolovať, a tým poskytnúť študentom rýchlu spätnú väzbu. Nie je nám však známy nástroj poskytujúci
                                    interaktívne vyhodnocovanie riešení a dostatočné možnosti zadávať rozličné úlohy.
                                </p>
                            </div>
                        </Col>
                        <Col md={6} className="center">
                            <div className={"right"}>
                                <h2>Ciele práce</h2>
                                <p>
                                    Cieľom práce je navrhnúť, implementovať a otestovať prototyp interaktívneho webového nástroja – prieskumníka
                                    sémantiky logiky prvého rádu. Umožní definovanie prvorádového jazyka, konkrétnej konečnej štruktúry pre
                                    tento jazyk a kontrolu splnenia formúl.
                                </p>
                                <p>
                                    Prieskumník by mal slúžiť na riešenie úloh, ale aj na ich tvorbu.
                                    Vykonávať sa bude na strane klienta (t.j., vo webovom prehliadači), bude implementovaný vo vhodnom frameworku
                                    (<a href="http://www.reactjs.org">React</a>, <a href="http://www.angularjs.org">AngularJS</a>, <a href="http://elm-lang.org/">elm</a>, …) a tak, aby ho bolo možné integrovať do kvízového modulu výučbového systému <a
                                    href="http://www.courses.matfyz.sk">courses.matfyz.sk</a>.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Home;