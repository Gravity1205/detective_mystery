# TOP 10 COLLEGE VIVA VOCE QUESTIONS & ANSWERS
## Project: CASE CLOSED — The College Mystery
### Course: Problem Solving using C & Data Structures (DSA)

---

### Question 1: Why did you use a `struct` instead of multiple independent arrays?
**Answer:**  
"A `struct` in C allows us to encapsulate heterogeneous data (different types like `int id`, `char name[]`, and `int evidencePoints`) into a single logical entity representing a suspect.  
If we had used separate parallel arrays (such as `ids[]`, `names[]`, `scores[]`), keeping them synchronized during sorting operations would be error-prone. With a `struct`, swapping two suspects during Bubble Sort moves their entire profile atomically in a single statement: `temp = suspects[j]; suspects[j] = suspects[j+1]; suspects[j+1] = temp;`."

---

### Question 2: What is an "Array of Structures", and how is it stored in memory?
**Answer:**  
"An array of structures is a contiguous block of computer memory where each element is an entire structure record.  
In `case.c`, `struct Suspect suspects[5]` allocates space for five consecutive suspect records. Memory addresses increase linearly (`&suspects[0]`, `&suspects[1]`, etc.), which provides excellent CPU cache locality and allows rapid $O(1)$ random access to any suspect profile by index."

---

### Question 3: What is the Time and Space Complexity of Linear Search?
**Answer:**  
- **Best-case time complexity:** $\mathcal{O}(1)$ — when the searched ID is at the very first position (index `0`).
- **Worst-case time complexity:** $\mathcal{O}(n)$ — when the target ID is at the last index (`n-1`) or does not exist in the array.
- **Average-case time complexity:** $\mathcal{O}(n)$ — requires $\frac{n+1}{2}$ comparisons on average.
- **Space complexity:** $\mathcal{O}(1)$ — it requires only a single loop variable `i`, using constant auxiliary memory.

---

### Question 4: Why did you choose Linear Search over Binary Search for searching suspects?
**Answer:**  
"Binary Search requires the array to be strictly sorted by the search key beforehand. In our application:
1. The suspect database may not always be sorted by ID (for example, after sorting by evidence points).
2. For a small dataset ($N = 5$), Linear Search takes at most 5 comparisons, which executes in a fraction of a microsecond. The computational overhead of maintaining a sorted order for Binary Search would provide no practical performance benefit."

---

### Question 5: How did you adapt standard Bubble Sort to sort in descending order?
**Answer:**  
"Standard Bubble Sort sorts in ascending order by checking if the left element is greater than the right element (`arr[j] > arr[j+1]`).  
To sort in **descending order** (highest evidence points first), we simply reversed the comparison condition to:
```c
if (suspects[j].evidencePoints < suspects[j + 1].evidencePoints)
```
This causes any suspect with a lower suspicion score to be swapped to the right, allowing the suspect with the highest evidence points (Rohan with 85 points) to bubble up to index `0`."

---

### Question 6: How many passes and total comparisons are executed by Bubble Sort for 5 suspects?
**Answer:**  
"For an array of size $n = 5$:
- **Outer Loop Passes:** $n - 1 = 4$ passes.
- **Comparisons per pass:**
  - Pass 1: $5 - 0 - 1 = 4$ comparisons
  - Pass 2: $5 - 1 - 1 = 3$ comparisons
  - Pass 3: $5 - 2 - 1 = 2$ comparisons
  - Pass 4: $5 - 3 - 1 = 1$ comparison
- **Total Comparisons:** $4 + 3 + 2 + 1 = 10$ comparisons (Formula: $\frac{n(n-1)}{2} = \frac{5 \times 4}{2} = 10$)."

---

### Question 7: Is Bubble Sort an "in-place" and "stable" algorithm? What does that mean?
**Answer:**  
- **In-place:** Yes. Bubble Sort has an auxiliary space complexity of $\mathcal{O}(1)$ because it only uses a single temporary variable (`struct Suspect temp`) to perform swaps, without allocating a secondary array.
- **Stable:** Yes. If two suspects have identical evidence points, Bubble Sort does not swap them (because `<` evaluates to false for equal values), thus preserving their original relative order."

---

### Question 8: In C, when an array of structures is passed to a function, is it passed by value or by reference?
**Answer:**  
"In C, arrays are automatically passed **by reference** (by pointer). When we pass `suspects` into `void bubbleSortByEvidenceDesc(struct Suspect suspects[], int n)`, the function receives the memory address of the first element (`&suspects[0]`). Any swaps performed inside the function directly modify the caller's array.  
When we do not want a function to modify our array (such as in `displayAllSuspects()`), we use the `const` qualifier: `const struct Suspect suspects[]`."

---

### Question 9: Why did you write a custom `clearInputBuffer()` function?
**Answer:**  
"When reading numerical inputs using `scanf("%d", &choice)`, `scanf` reads only the numeric characters and leaves the trailing newline (`'\n'`) in the input buffer (`stdin`).  
If not cleared, subsequent calls to `getchar()` or `scanf()` would immediately consume the lingering newline without waiting for user input. Our `clearInputBuffer()` function loops through `getchar()` until it encounters `'\n'` or `EOF`, ensuring clean and crash-free input handling."

---

### Question 10: How do the DSA concepts directly solve the detective mystery?
**Answer:**  
"The data structures and algorithms represent the core investigative workflow:
1. `struct Suspect` acts as the digital **Police Dossier** binding identity, statements, and forensic points.
2. **Linear Search** simulates the detective querying records to cross-examine specific alibis against crime scene clues.
3. **Bubble Sort** acts as the **Prioritization Engine**, mathematically sorting all suspects by forensic weight. The suspect who rises to Rank #1 (Rohan, 85 points) is unmasked as the culprit supported by physical evidence: broken alibi, stolen keycard log, matching shoe mud, and torn blazer threads."
