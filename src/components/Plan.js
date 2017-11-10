import React from 'react';

class Plan extends React.Component {
    render() {
        return (
            <div className={"plan"}>
                <h1>Etapy vývoja</h1>
                <p>
                    Tu môžete vidieť ako som si rozvrhol časový plán tvorby práce. Plán je len orientačný, reálne dátumy dokončenia úloh sa môžu líšiť.
                </p>
                <p>Posledná aktualizácia: 10.11.2017</p>
                <table className={"table table-hover"}>
                    <thead>
                    <tr>
                        <th>Deadline</th>
                        <th>Úloha</th>
                    </tr>

                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <b>24.11.2017</b>
                        </td>
                        <td>
                            Model aplikácie - vytvorenie "backendu" aplikácie. Tvorba hierarchie tried ako sú jednotlivé podformuly (disjunkcia, konjunkcia,
                            implikácia, všeobecný kvantifikátor,
                            existenčný kvantifikátor, predikátový symbol, rovnostný symbol), termov (funkcia, konštanta, premenná), štruktúry a jazyka.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <b>08.12.2017</b>
                        </td>
                        <td>
                            Parser formúl - bude potrebný na prevod textového reťazca do jednotlivých tried a opačne.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <b>22.12.2017</b>
                        </td>
                        <td>
                            Implementácia UI #1 - učenie sa tvorby UI v React-e, vytvorenie UI pre interaktívne editovanie štruktúry a jazyka
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <b>05.01.2018</b>
                        </td>
                        <td>
                            Implementácia UI #2 - interaktívne editovanie predikátových symbolov (zložitejšia časť)
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <b>19.01.2018</b>
                        </td>
                        <td>
                            Implementácia UI #3 - učiteľská časť a dokončenie
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <b>15.02.2018</b>
                        </td>
                        <td>
                            Písanie východiskovej kapitoly a dokončenie prototypu
                        </td>
                    </tr>
                    </tbody>
                </table>

            </div>
        );
    }
}

export default Plan;