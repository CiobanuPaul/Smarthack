Dănuț este un om al peșterii foarte ocupat: are de spart $n$ bolovani. Pentru fiecare bolovan $i$ se cunosc numărul de zile $z_i$ necesare pentru spargerea lui și termenul limită $d_i$, adică ultima zi la care acesta ar trebui spart.

Dănuț știe că cel mai eficient mod de a lucra este să se concentreze pe un singur bolovan în fiecare zi. Dacă începe să lucreze la un anume bolovan, el va lucra la acesta în continuu până când îl sparge, fără să intercaleze zile în care lucrează la alți bolovani, sau zile libere. De asemenea, Dănuț nu își va lua zile de odihnă nici între terminarea spargerii unui bolovan și începerea lucrului la bolovanul următor.

Se consideră că un bolovan $i$ este spart *înainte de termen* dacă numărul ultimei zile în care Dănuț lucrează la bolovanul $i$ este **mai mic sau egal** cu $d_i$.

# Cerintă

Dându-se numărul $n$ de bolovani, precum și numărul de zile necesare pentru spargerea fiecărui bolovan și termenul limită la care acesta ar trebui spart, să se determine o planificare a lucrului la cei $n$ bolovani în așa fel încât un număr maxim de bolovani să fie sparți *înainte de termen*.

# Date de intrare

Prima linie a fișierului de intrare `bolovani.in` va conține numărul $n$ de bolovani. Următoarele $n$ linii vor conține câte două numere întregi, pe a $i$-a dintre acestea aflându-se numerele $z_i$ și $d_i$ separate printr-un spațiu, semnificând numărul de zile necesare pentru spargerea bolovanului $i$, respectiv ultima zi în care ar trebui finalizată spargerea bolovanului $i$. 

# Date de ieșire

Prima linie a fișierului de ieșire `bolovani.out` va conține numărul bolovanilor sparți *înainte de termen*. Următoarele $n$ linii vor conține câte două numere separate printr-un spațiu, semnificând ziua în care Dănuț începe să lucreze la bolovanul $i$, respectiv ziua în care Dănuț termină spargerea bolovanului $i$. Dacă există mai multe soluții, se poate afișa oricare

# Restricții

* $1$ <span>&#8804;</span> $n$ <span>&#8804;</span> $10\ 000$
* $1$ <span>&#8804;</span> $z_i, d_i$ <span>&#8804;</span> $1\ 000\ 000\ 000$
* Dănuț începe spargerea bolovanilor în ziua 1.
* Dănuț trebuie să spargă toți cei $n$ bolovani, chiar dacă unii nu vor fi sparți *înainte de termen*

|# | Punctaj | Restricții|
| - | - | ------------|
|1|20|$n$ <span>&#8804;</span> $10$|
|2|20|$d_1 = d_2 = ... = d_n$|
|3|60|Fără restricții suplimentare|

# Exemple

`bolovani.in`
```
5
4 6
3 7
2 8
5 9
6 11
```

`bolovani.out`
```
3
12 15
1 3
4 5
16 20
6 11
```

# Explicații

Dănuț are de spart $n=5$ bolovani. El poate sparge $3$ dintre aceștia *înainte de termen*, dacă lucrează:

* la bolovanul $1$ din ziua $12$ până în ziua $15$, inclusiv, terminându-l de spart după termenul limită din ziua $6$.
* la bolovanul $2$ din ziua $1$ până în ziua $3$, inclusiv, terminându-l de spart înainte de termenul limită din ziua $7$.
* la bolovanul $3$ din ziua $4$ până în ziua $5$, inclusiv, terminându-l de spart înainte de termenul limită din ziua $8$.
* la bolovanul $4$ din ziua $16$ până în ziua $20$, inclusiv, terminându-l de spart după termenul limită din ziua $9$.
* la bolovanul $5$ din ziua $6$ până în ziua $11$, inclusiv, terminându-l de spart înainte de termenul limită din ziua $11$.