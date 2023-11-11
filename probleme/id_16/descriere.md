Se dau $N$ triplete de numere naturale ($a_i$, $b_i$, $c_i$), unde $c_i \neq 0$ și $1 \leq i \leq N$, fiecare reprezentând câte un număr rațional $q_i$ egal cu $\frac{(-1)^{a_i} \cdot b_i}{c_i}$.

# Cerință
Găsiți un subșir nevid al șirului $q_1$, $q_2$, …, $q_N$ al cărui produs al valorilor să fie maxim posibil.

# Date de intrare

Fișierul de intrare `colibri.in` conține pe prima linie numărul $N$. Următoarele $N$ linii descriu cele $N$ triplete: pe linia $i$ se află numerele naturale $a_i$, $b_i$, $c_i$, separate prin spații.

# Date de ieșire

Pe prima linie a fișierului de ieșire `colibri.out` se află un șir de $N$ cifre. Cifra $i$, unde $1 ≤ i ≤ N$, este `1` dacă și numai dacă $q_i$ este selectat în subșirul soluție, altfel este `0`. Cifrele șirului nu se vor separa prin spații.

# Restricții și precizări

* $1 \leq N \leq 50 \ 000$;
* $0 \leq a_i, b_i \leq 1\ 000\ 000$, oricare ar fi $1 \leq i \leq N$;
* $1 \leq c_i \leq 1\ 000\ 000$, oricare ar fi $1 \leq i \leq N$;
* Dacă există mai multe soluții, atunci se acceptă orice soluție corectă;
* Spunem că un șir $x$ este subșir al unui șir $y$ dacă și numai dacă $x$ se poate obține din $y$ eliminând o parte din elementele lui $y$ (inclusiv nici unul) fără a schimba ordinea relativă a elementelor rămase.

| # | Punctaj | Restricții          |
| - | ------- | ------------------- |
| 1 | 30      | $N \leq 19$ și $a_i, b_i, c_i ≤ 9$ |
| 2 | 20      | $N ≤ 19$      |
| 3 | 20      | $a_i, b_i, c_i ≤ 9$      |
| 4 | 30      | Fără restricții suplimenare.      |

# Exemplul 1

`colibri.in`
```
5
0 0 1
2 4 2
4 7 7
1 2 3
0 3 2
```

`colibri.out`
```
01001
```

## Explicație


În exemplu $N = 5$, $q_1 = \frac{0}{1}$, $q_2 = \frac{4}{2}$, $q_3 = \frac{7}{7}$, $q_4 = −\frac{2}{3}$ și $q_5 = \frac{3}{2}$.

Produsul maxim posibil este egal cu $3$. Acesta se poate obține luând fie subșirul constând din numerele $q_2$ și $q_5$, fie luând subșirul format din numerele $q_2$, $q_3$ și $q_5$. Cu alte cuvinte, și răspunsul `01101` este corect.
