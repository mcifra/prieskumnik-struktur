import React from 'react';

class References extends React.Component {
   render() {
      return (
          <div className={"references"}>
             <h1>Zdroje</h1>
             <h2>Logika : Neúplnost, složitost a nutnost / Vítězslav Švejdar. Praha : Academia, 2002</h2>
             <ul>
                <li>Teoretický zdroj</li>
                <li>definuje syntax a sémantiku logiky prvého rádu</li>
             </ul>
             <h2>Introduction to Logic / Michael Genesereth and Eric Kao</h2>
             <ul>
                <li>online na <a
                    href="http://logic.stanford.edu/intrologic/lessons/lessons.html">http://logic.stanford.edu/intrologic/lessons/lessons.html</a>
                </li>
                <li>podobný existujúci nástroj na univerzite Stanford</li>
                <li>našim cieľom je vytvoriť jednotný nástroj na zadávanie a riešenie všetkých cvičení pre logiku prvého
                   rádu aké obsahuje tento nástroj
                </li>
             </ul>
             <h2>React / Facebook Inc.</h2>
             <ul>
                <li>Javascript knižnica</li>
                <li>vytvorenie interaktívneho používateľského rozhrania</li>
                <li>dokumentácia online <a href="https://reactjs.org/docs/">https://reactjs.org/docs/</a></li>
             </ul>
             <h2>Jest / Facebook Inc.</h2>
             <ul>
                <li>dokumentácia online <a
                    href="http://facebook.github.io/jest/docs/en/getting-started.html">http://facebook.github.io/jest/docs/en/getting-started.html</a>
                </li>
                <li>knižnica na testovanie React aplikácií</li>
                <li>poslúži na testovanie aplikácie</li>
             </ul>
             <h2>Javascript</h2>
             <ul>
                <li>Mountain View, California: Mozilla, 2016 [online] <a
                    href="https://developer.mozilla.org/bm/docs/Web/JavaScript">https://developer.mozilla.org/bm/docs/Web/JavaScript</a>
                </li>
             </ul>
             <h2>PEG.js / David Majda</h2>
             <ul>
                <li>Javascript parser generátor</li>
                <li>využívaný na parsovanie vstupov od užívateľa</li>
                <li>online na <a href='https://pegjs.org/'>https://pegjs.org/</a></li>
             </ul>
             <h2>Redux</h2>
             <ul>
                <li>Javascript open-source knižnica zameraná na spravovanie stavu aplikácie</li>
                <li>online na <a href='https://redux.js.org/'>https://redux.js.org/</a></li>
             </ul>
          </div>
      );
   }
}

export default References;