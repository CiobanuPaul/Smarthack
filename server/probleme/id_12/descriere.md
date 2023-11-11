Kida și El Bandito Inofensivo au $N$ display-uri digitale care pot afișa litere mici din alfabetul englez. Fiecare dintre cele $N$ display-uri are câte $M$ celule. Pentru fiecare display $i$, cunoaștem literele care pot fi afișate în fiecare celulă $j$ a sa.

Spre exemplu, dacă $M = 3$ și un display poate afișa pe prima poziție literele $\{b, x\}$, pe a doua poziție literele $\{y, z, c\}$ și pe a treia poziție literele $\{d, a\}$, putem forma, de exemplu, cuvintele $byd$, $bya$, $bza$, etc.

El Bandito Inofensivo consideră că un cuvânt de lungime $M$ este comun dacă acesta se poate forma pe cel puțin $K$ dintre cele $N$ display-uri. Auzind asta, Kida vă roagă să o ajutați să calculeze numărul de cuvinte comune distincte.

# Cerință
Ajutați-o pe Kida să calculeze numărul de cuvinte comune distincte. De vreme ce acest număr poate să fie foarte mare, se cere restul său la împărțirea prin $10^9 + 9$.

# Date de intrare
Pe prima linie din fișierul de intrare se află trei numere: $N$, $M$ și $K$, cu semnificația din enunț. Pe următoarele $N$ linii se află câte $M$ șiruri de caractere, formate din litere mici distincte ale alfabetului englez, separate prin câte un spațiu. Al $j$-lea șir de caractere de pe linia $i + 1$ din fișierul de intrare reprezintă caracterele pe care le poate afișa al $i$-lea display pe poziția $j$.

# Date de ieșire
Fișierul de ieșire va conține restul la împărțirea cu $10^9 + 9$ al numărului de cuvinte comune distincte.

# Restricții și precizări
- $1 \leq K \leq N \leq 22$
- $1 \leq M \leq 22$
- Cele $N$ display-uri pot afișa doar litere mici ale aflabetului englez.


|# | Punctaj | Restricții|
| - | - | ---------- |
|1|11|$K = N$|
|2|13|$1 \leq N, M \leq 15$ și toate cele $N$ display-uri pot afișa doar caractere din mulțimea $\{a, b\}$|
|3|14|$1 \leq M \leq 4$|
|4|25|$1 \leq N \leq 10$|
|5|22|$1 \leq M \leq 10$, $1 \leq N \leq 20$|
|6|15|fără restricții suplimentare|

# Exemplu
`comun.in`
```
4 3 2
ab bc ad
ba bc dz
bx yzc da
ax cd zwyhd
```
`comun.out`
```
7
```
Sunt 4 display-uri care pot afișa cuvinte de lungime $3$. Cuvintele care pot fi afișate pe cel puțin două display-uri sunt: $bca$, $abd$, $bbd$, $acd$, $bcd$, $xcd$ și $acz$.