După o lungă activitate în domeniul instalațiilor sanitare, Dorel s-a hotărât să-și investească averea acumulată în acțiuni ale mai multor companii. După prima sa încercare care a avut succes, el a reușit să strângă și mai mulți bani decât avea înainte. Astfel, acesta s-a hotărât să continue această activitate și să investească în mai multe proiecte ale companiilor în care a investit anterior.

Dorel are o sumă de bani `G` și are la dispoziție `N` proiecte numerotate de la `1` la `N` în care poate să investească bani. Pentru fiecare proiect se cunoaște valoarea $a_i$ reprezentând câți bani dorește el să investească în proiectul `i`.

Schema de investiție a lui Dorel funcționează în felul următor: el analizează proiectele pe rând, iar când se află la un proiect `i`, dacă are suficienți bani (adică dacă suma de bani de care dispune este mai mare sau egală decât $a_i$), atunci el va investi bani în acel proiect (iar din suma de bani de care dispune se scade $a_i$). Altfel, el nu va investi niciun ban și va analiza următorul proiect.

Întrucât Dorel dorește să nu își consume toți banii și să învețe să fie econom, el dorește să reordoneze proiectele astfel încât după ce analizează fiecare proiect și își aplică algoritmul descris să rămână cu cât mai mulți bani.

# Cerință
Să se afle care este suma maximă de bani cu care poate să rămână Dorel după ce își reordonează strategic proiectele și aplică algoritmul său.

# Date de intrare
Pe prima linie a fișierului de intrare `schema.in` se află două numere `N` și `G`, separate printr-un spațiu. Pe a doua linie se află `N` numere separate prin spații, al `i`-ulea număr fiind $a_i$.

# Date de ieșire
Pe singura linie a fișierului de ieșire `schema.out` se va tipări suma maximă de bani cu care poate să rămână Dorel.

# Restricții și precizări
* `1 ≤ N ≤ 2 000`
* `0 ≤ G ≤ 5 000`
* $0 ≤ a_i ≤ 5 000$ pentru `i` de la `1` la `N`

## Subtask 1 (11 puncte)
* Ordinea proiectelor dată în fișierul de intrare este cea optimă.
## Subtask 2 (19 puncte)
* `N ≤ 7`
## Subtask 3 (14 puncte)
* Șirul `a` este format din două valori distincte care se repetă, în orice ordine.
## Subtask 4 (12 puncte)
* `N ≤ 80`
## Subtask 5 (25 puncte)
* `N ≤ 2 000` și $0 ≤ a_1 + a_2 + ··· + a_N ≤ 150$
## Subtask 6 (19 puncte)
* Fără restricții suplimentare

# Exemple

`schema.in`

```
3 10
7 4 5
```

`schema.out`

```
3
```

Explicație
---

Dorel păstrează ordinea inițială a proiectelor. Pentru primul proiect, acesta are suficienți bani pentru a investi în el, așa că o să facă asta. Va rămâne cu `3` unități monetare. Pentru celelalte două proiecte, acesta nu va avea suficient cât să plătească pentru ele, așa că va rămâne în final cu suma de `3`. Acesta este răspunsul optim.

Dacă acesta și-ar fi reordonat obiectele în `[4, 7, 5]`, la primul proiect va avea suficienți bani, deci o să investească. La al doilea proiect are `6` unități monetare și are nevoie de `7` ca să investească, așa că o să ignore proiectul. Pentru ultimul proiect, acesta are suficienți bani pentru a investi. În final rămâne cu o unitate monetară. Astfel, această reordonare nu este optimă.