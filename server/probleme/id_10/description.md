Costel deține un șir $p$ de $n$ pietricele prețioase numerotate de la $1$ la $n$. Deoarece Costel este un om superstițios, el colecționează pietricele doar de anumite tipuri. Tipul unei pietricele este reprezentat de o literă mică a alfabetului englez, iar fiecare tip în parte are o anumită valoare. <br/> <br/>
    
Într-o zi, Costel s-a decis să distribuie șirul de $n$ pietricele pe $k$ rafturi astfel încât fiecare raft să conțină câte o subsecvență nevidă de pietricele din șirul original, iar la final, fiecare pietricică să se afle pe exact un raft. Definim valoarea unui raft ca fiind suma valorilor pietricelelor de pe acel raft. 

# Cerintă

 Fiind dat șirul de $n$ pietricele, să se distribuie pietricelele din șir în $k$ subsecvențe disjuncte astfel încât:
* Cea mai mare valoare a unui raft să fie maximă.
* Cea mai mică valoare a unui raft să fie maximă.

# Date de intrare

Fișierul de intrare `pietricele.in` va conține pe prima linie numerele naturale $c$, $n$ și $k$ separate prin câte un spațiu, unde $c$ reprezintă cerința care trebuie rezolvată, $n$ reprezintă numărul de pietricele din șir, iar $k$ reprezintă numărul de rafturi pe care vor fi distribuite pietricelele. Cea de-a doua linie a fișierul va conține $n$ litere mici ale alfabetului englez, reprezentând tipurile pietricelelor din șirul deținut de Costel. Cea de-a treia linie conține $26$ de numere separate prin câte un spațiu, reprezentând valoarea fiecărui tip de pietricică de la `a` la `z`. 

# Date de ieșire

Fișierul de ieșire `pietricele.out` conține răspunsul pentru cerința dată.

# Restricții

* $c \in \{1, 2\}$
* $1$ <span>&#8804;</span> $k$ <span>&#8804;</span> $n$ <span>&#8804;</span> $200\ 000$
* valorile tipurilor de pietricele sunt cuprinse în intervalul \[$1$, $2 \cdot 10^9$\].
* subsecvenţă a șirului $p$ este o succesiune de pietricele aflate pe poziții consecutive: $p_i, p_{i+1}, \dots, p_j,\ 1 \leq i \leq j \leq n$.
* două subsecvențe sunt disjuncte dacă nu au nicio pietricică în comun.
* se recomandă folosirea tipului de date `long long`

|# | Punctaj | Restricții|
| - | - | ------------|
|1|10|$c=1$, pentru fiecare pietricică din șir $\mathit{valoare}[p_i] \le \mathit{valoare}[p_{i + 1}]$|
|2|20|$c = 1$, fără restricții suplimentare|
|3|10|$c=2$, $n \le 5000$ și $k=3$|
|4|10|$c=2$, $1 \le k \le n \le 100$|
|5|10|$c=2$ și valorile tuturor tipurilor de pietricele sunt egale.|
|6|40|fără restricții suplimentare|

# Exemple

`pietricele.in`
```
1 12 3
abbaacabcbaa
1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26
```

`pietricele.out`
```
18
```

`pietricele.in`
```
2 12 3
aabaacabcbaa
1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26
```

`pietricele.out`
```
6
```

# Explicații

Cea mai mare valoare pe care o poate avea un raft este $18$ și se obține prin următoarea distribuire pe rafturi: `a`, `bbaacabcba`, `a`, fiecare cu valorile $1$, $18$, respectiv $1$. <br/>
Șirul se distribuie pe $3$ rafturi astfel: `aabaa`, `cab`, `cbaa`, fiecare cu valorile $6$, $6$ respectiv $7$. Astfel, $6$ este cea mai mică valoare a unui raft, care pentru acest exemplu este maximul posibil.