Prieskumník sémantiky logiky prvého rádu
=
Tento repozitár obsahuje zdrojové kódy k mojej bakalárskej práci "Prieskumník sémantiky logiky prvého rádu". 
Aplikácia je naprogramovaná pomocou JS knižnice [React](https://reactjs.org/), a na spravovanie stavu je využívaná knižnica [Redux](https://redux.js.org/). Parsovanie vstupov od užívateľa je riešené s [PEG.js](https://pegjs.org/)

Prieskumník sémantky logiky prvého rádu je webový nástroj ponúkajúci interaktívne rozhranie, kde si užívateľ môže definovať jazyk a štruktúru logiky prvého rádu. Následne si môže vyhodnocovať ľubovoľný počet formúl alebo termov a tak zisťovať, či formula zo štruktúry vyplýva, alebo akú hodnotu má term. Nástroj taktiež dokáže skontrolovať správnosť syntaxe výrazu. 

Takto vytvorenú štruktúru je možné exportovať ako JSON súbor, a neskôr naspäť importovať.

### Inštalácia
Projekt sa lokálne nainštaluje nasledovne:
```shell
git clone git@github.com:mcifra/prieskumnik-struktur.git prieskumnik
cd prieskumnik
npm install
```
Spustenie virtuálneho serveru:
```shell
npm start
```
Následne na adrese `localhost:3000/` bude bežať aplikácia.
