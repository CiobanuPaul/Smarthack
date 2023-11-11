***biom*** $sn^{[1]}$ [At: $DN^3$ / Pl: ~uri / E: it **bioma**] (Blg) Complex ecologic ce se formează în raport cu un anumit mediu ambiant.
\
Steve Stonecutter se află într-o lume formată din cuburi, iar fiecare cub aparține unui singur biom. Cuburile sunt dispuse într-o linie și sunt numerotate de la $1$ la $N$. Se consideră că blocurile $i$ și $i + 1$ sunt vecine între ele pentru toate valorile $i$ de la $1$ la $N − 1$.

Putem reprezenta această lume ca și un șir de caractere $S$ de lungime $N$ format din litere mici ale alfabetului limbii engleze, numerotat de la $1$ la $N$, unde al $i$-lea caracter reprezintă biomul din care face parte al $i$-lea cub.

Pentru a se deplasa, Steve poate face următoarele mișcări:
- se poate deplasa cu costul $A$ de la cubul $i$ la vecinul său imediat la dreapta, adică $i + 1$;
- se poate deplasa cu costul $B$ de la cubul $i$ la vecinul său imediat la stânga, adică $i − 1$;
- se poate deplasa cu costul $C$ de la cubul $i$ la cubul $j$ minim pentru care $j \gt i$ și $S_i = S_j$;
- se poate deplasa cu costul $D$ de la cubul $i$ la cubul $j$ maxim pentru care $j \lt i$ și $S_i = S_j$.

\
Aceste mișcări se pot realiza dacă și numai dacă poziția în care Steve vrea să se deplaseze există. De exemplu, dacă Steve se află pe cubul $1$, acesta nu poate face a doua sau a patra mișcare.

Începând de la cubul $1$, Steve dorește să ajungă la cubul $N$ cu cost minim, așa că vă roagă pe voi să aflați care este acest cost.

# Date de intrare
Pe prima linie se găsește un singur număr $N$, reprezentând numărul de cuburi din lumea în care se află Steve.

Pe a doua linie se află patru numere $A$, $B$, $C$ și $D$ reprezentând costurile fiecărei operații pe care o poate face Steve.

Pe a treia linie se află șirul de caractere $S$ de lungime $N$ ce reprezintă harta biomurilor lumii.

# Date de ieșire
Pe o singură linie se va afla un singur număr ce reprezintă costul minim de a ajunge de la cubul $1$ la cubul $N$.

# Restricții
- $1 \leq N \leq 1\ 000\ 000$.
- $0 \leq A, B, C, D \leq 1\ 000\ 000\ 000$.

|# | Punctaj | Restricții|
| - | - | ------------|
|1|12|$N \leq 10$|
|2|8|Pentru orice $i \lt j \lt k$, dacă $S_i = S_k$ atunci $S_i = S_j$|
|3|11|$B = D = 1\ 000\ 000\ 000$, iar $A, C \leq 1\ 000$|
|4|19|$A = 1$, iar fiecare dintre $B$, $C$ și $D$ poate să fie $1$ sau $1\ 000\ 000\ 000$|
|5|10|$A \leq 1$, iar fiecare dintre $B$, $C$ și $D$ poate să fie $0$, $1$ sau $1\ 000\ 000\ 000$|
|6|11|$N \leq 500$|
|7|8|$N \leq 100\ 000$|
|8|21|fără restricții suplimentare|

# Exemple
`biom.in`
```
6
3 5 4 2
abccbc
```
`biom.out`
```
10
```
Steve se poate mișca cu o poziție la dreapta cu cost $3$. De la cubul $2$, acesta se poate deplasa spre cubul $5$ cu cost $4$. La sfârșit, acesta se deplasează din nou cu o poziție la dreapta pentru a ajunge la destinație, cubul $6$. Costul total va fi $3 + 4 + 3 = 10$.
\
`biom.in`
```
15
1 2 3 4
abccabcbacbabcb
```
`biom.out`
```
11
```
Steve se poate deplasa de la cubul $1$ la cubul $5$, iar pe urmă la cubul $9$, ambele deplasări având fiecare costul $3$. Pe urmă, de la cubul $9$ se poate deplasa la cubul $10$ cu cost $1$. De la cubul $10$, se poate deplasa la cubul $14$ cu cost $3$, ca în final să ajungă la destinație, în cubul $15$, cu cost $1$. Costul total de deplasare va fi $3 + 3 + 1 + 3 + 1 = 11$.