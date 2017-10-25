import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

class Home extends React.Component {
    render() {
        return (
            <div className="about">
                <Grid>
                    <h1>O práci</h1>
                    <Row className="show-grid block">
                        <Col md={6} className="center">
                            <h2>Oficiálny názov</h2>
                            <p>Prieskumník sémantiky logiky prvého rádu</p>
                        </Col>
                        <Col md={6} className="center">
                            <h2>Školiteľ</h2>
                            <p>Mgr. Ján Kľuka, PhD.</p>
                        </Col>
                    </Row>
                    <hr className="line-break"/>
                    <h2>Anotácia</h2>
                    <p className={"long-text"}>
                        Sémantika formúl a termov sa v klasickej matematickej logike uchopuje pomocou štruktúr a Tarského definície pravdivosti [1].
                        Osvojenie si tohto prístupu pri štúdiu základov logiky je z viacerých dôvodov náročné
                        (abstraktnosť, rozmanitosť štruktúr, problém oddelenia syntaxe a sémantiky), a to až do takej miery, že
                        niektorí autori preferujú herbrandovský prístup k sémantike [2]. Možnou cestou k pochopeniu sú cvičenia zamerané
                        na rozhodovanie platnosti formúl v štruktúrach, hľadanie štruktúr (ne)spĺňajúcich dané formuly, hľadanie formúl
                        splnených iba v niektorých štruktúrach a pod. V prípade konečných štruktúr sa správnosť riešenia takýchto úloh dá
                        ľahko strojovo kontrolovať, a tým poskytnúť študentom rýchlu spätnú väzbu. Nie je nám však známy nástroj poskytujúci
                        interaktívne vyhodnocovanie riešení a dostatočné možnosti zadávať rozličné úlohy.
                    </p>
                    <hr className="line-break"/>
                    <h2>Ciele práce</h2>
                    <p className={"long-text"}>
                        Cieľom práce je navrhnúť, implementovať a otestovať prototyp interaktívneho webového nástroja – prieskumníka
                        sémantiky logiky prvého rádu. Umožní definovanie prvorádového jazyka, konkrétnej konečnej štruktúry pre
                        tento jazyk a kontrolu splnenia formúl. Prieskumník by mal slúžiť na riešenie úloh, ale aj na ich tvorbu.
                        Vykonávať sa bude na strane klienta (t.j., vo webovom prehliadači), bude implementovaný vo vhodnom frameworku
                        (React, AngularJS, elm, …) a tak, aby ho bolo možné integrovať do kvízového modulu výučbového systému courses.matfyz.sk [3].
                    </p>
                </Grid>
            </div>
        );
    }
}

export default Home;