import React from 'react';
import {Table} from 'react-bootstrap';

const Plan = () => (
   <div className={"plan"}>
     <h1>Etapy vývoja</h1>
     <p>
       Tu môžete vidieť ako som si rozvrhol časový plán tvorby práce. Plán je len orientačný, reálne dátumy
       dokončenia úloh sa môžu líšiť.
     </p>
     <p>Posledná aktualizácia: 26.11.2017</p>
     <Table hover>
       <thead>
       <tr>
         <th>Začiatok</th>
         <th>Deadline</th>
         <th>Úloha</th>
       </tr>
       </thead>
       <tbody>
       <tr>
         <td>
           <b>10.11.2017</b>
         </td>
         <td>
           <b>26.11.2017</b>
         </td>
         <td>
           Model aplikácie - vytvorenie "backendu" aplikácie. Tvorba hierarchie tried ako sú jednotlivé
           podformuly (disjunkcia, konjunkcia,
           implikácia, všeobecný kvantifikátor,
           existenčný kvantifikátor, predikátový symbol, rovnostný symbol), termov (funkcia, konštanta,
           premenná), štruktúry a jazyka.
         </td>
       </tr>
       <tr>
         <td>
           <b>27.11.2017</b>
         </td>
         <td>
           <b>10.12.2017</b>
         </td>
         <td>
           Parser formúl - bude potrebný na prevod textového reťazca do jednotlivých tried a opačne.
         </td>
       </tr>
       <tr>
         <td>
           <b>11.12.2017</b>
         </td>
         <td>
           <b>24.12.2017</b>
         </td>
         <td>
           Implementácia UI #1 - učenie sa tvorby UI v React-e, vytvorenie UI pre interaktívne editovanie
           štruktúry a jazyka
         </td>
       </tr>
       <tr>
         <td>
           <b>01.01.2018</b>
         </td>
         <td>
           <b>14.01.2018</b>
         </td>
         <td>
           Implementácia UI #2 - interaktívne editovanie predikátových symbolov (zložitejšia časť)
         </td>
       </tr>
       <tr>
         <td>
           <b>15.01.2018</b>
         </td>
         <td>
           <b>28.01.2018</b>
         </td>
         <td>
           Písanie východiskovej kapitoly a dokončenie prototypu
         </td>
       </tr>
       <tr>
         <td>
           <b>22.01.2018</b>
         </td>
         <td>
           <b>11.02.2018</b>
         </td>
         <td>
           Implementácia UI #3 - učiteľská časť, JSON import & export
         </td>
       </tr>
       <tr>
         <td>
           <b>12.02.2018</b>
         </td>
         <td>
           <b>15.04.2018</b>
         </td>
         <td>
           Vyľaďovanie a vylepšovanie UI
         </td>
       </tr>
       <tr>
         <td>
           <b>15.04.2018</b>
         </td>
         <td>
           <b> </b>
         </td>
         <td>
           Testovanie aplikácie na predmente Matematika (4) - Logika pre informatikov
         </td>
       </tr>
       <tr>
         <td>
           <b>02.04.2018</b>
         </td>
         <td>
           <b>06.05.2018</b>
         </td>
         <td>
           Písanie práce
         </td>
       </tr>
       </tbody>
     </Table>
   </div>
);

export default Plan;