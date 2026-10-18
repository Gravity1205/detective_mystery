# DATA STRUCTURES & ALGORITHMS (DSA) DEEP DIVE
## CASE CLOSED — The College Mystery
### Technical Reference & Theoretical Explanations

This document serves as an exhaustive study guide and viva preparation manual detailing the computer science theory, memory architecture, and algorithmic mechanics utilized in **CASE CLOSED**.

---

## 1. STRUCTURES (`struct`) IN C

### 1.1 What is a Structure?
A **structure** in C is a user-defined composite data type that allows the grouping of variables of **different (heterogeneous)** data types under a single unified name.

### 1.2 Structure Definition in `case.c`
```c
struct Suspect {
    int id;                         /* 4 bytes (Integer key) */
    char name[MAX_NAME_LEN];        /* 50 bytes (ASCII string) */
    char role[MAX_ROLE_LEN];        /* 50 bytes (ASCII string) */
    char alibi[MAX_TEXT_LEN];       /* 300 bytes (ASCII string) */
    int evidencePoints;             /* 4 bytes (Integer sort key) */
    char primaryClue[MAX_TEXT_LEN]; /* 300 bytes (ASCII string) */
};
```

### 1.3 Why Use a Structure Instead of Parallel Arrays?
If we did not use a structure, we would have to maintain six separate parallel arrays:
```c
int ids[5];
char names[5][50];
char roles[5][50];
char alibis[5][300];
int evidencePoints[5];
char primaryClues[5][300];
```
#### Disadvantages of Parallel Arrays:
1. **Lack of Encapsulation:** A suspect is conceptually a single entity, but parallel arrays scatter that entity's attributes across disparate memory locations.
2. **High Risk of Desynchronization:** If we sort `evidencePoints[]`, we must remember to manually swap the corresponding indices across all 5 other arrays. If one swap is forgotten, Suspect A ends up with Suspect B's name or alibi!
3. **Difficult Function Signatures:** Passing six arrays into every function clutters function prototypes and increases parameter overhead.

#### Advantages of Using `struct Suspect`:
- **Single Unit Swapping:** When sorting, swapping `struct Suspect temp = suspects[j];` moves all attributes together in a single atomic memory copy.
- **Cache Locality:** Related fields of a single suspect reside contiguously in memory.
- **Maintainability:** Adding a new field (e.g., `char phone[15]`) requires updating only the structure definition without altering function signatures across the program.

---

## 2. ARRAYS OF STRUCTURES

### 2.1 Memory Organization
An array of structures represents a contiguous block of memory where each element is an entire structure:
```c
struct Suspect suspects[TOTAL_SUSPECTS];
```

#### Contiguous Memory Layout Diagram:
```text
Address:   0x1000               0x12C4               0x1588               0x184C
Element:   suspects[0]          suspects[1]          suspects[2]          suspects[3]
Contents:  [Aarav Profile]      [Priya Profile]      [Rohan Profile]      [Kabir Profile]
Size:      ~708 Bytes           ~708 Bytes           ~708 Bytes           ~708 Bytes
```

### 2.2 Accessing Structure Members
- Using index notation and the dot operator (`.`):
  ```c
  printf("%s has %d points", suspects[2].name, suspects[2].evidencePoints);
  ```
- Using a structure pointer with the arrow operator (`->`):
  ```c
  void viewSuspectDetails(const struct Suspect *s) {
      printf("ID: %d\n", s->id);
      printf("Name: %s\n", s->name);
  }
  ```

---

## 3. LINEAR SEARCH ALGORITHM

### 3.1 Algorithmic Concept
Linear Search (also known as Sequential Search) is the simplest searching technique. It starts at the first element (index `0`) and checks each element sequentially until:
1. An element whose `.id` equals `targetId` is found, or
2. The end of the array is reached without a match.

### 3.2 C Implementation Walkthrough
```c
int linearSearchById(const struct Suspect suspects[], int n, int targetId) {
    int i;
    for (i = 0; i < n; i++) {
        if (suspects[i].id == targetId) {
            return i; /* Target found at index i */
        }
    }
    return -1; /* Target not present */
}
```

### 3.3 Step-by-Step Trace: Searching for Rohan (`targetId = 103`)
Given array with IDs: `[101, 102, 103, 104, 105]`

| Step | Index `i` | Current Element ID (`suspects[i].id`) | Comparison (`suspects[i].id == 103`) | Action |
| :---: | :---: | :---: | :---: | :--- |
| **1** | `0` | `101` (Aarav) | `101 == 103` $\to$ **FALSE** | Increment `i` to 1 |
| **2** | `1` | `102` (Priya) | `102 == 103` $\to$ **FALSE** | Increment `i` to 2 |
| **3** | `2` | `103` (Rohan) | `103 == 103` $\to$ **TRUE** | Return index `2` (**MATCH FOUND**) |

### 3.4 Complexity Analysis of Linear Search
- **Best-Case Time Complexity:** $\mathcal{O}(1)$  
  Occurs when the target element is located at index `0` (e.g., searching for ID `101`). Only 1 comparison is performed.
- **Worst-Case Time Complexity:** $\mathcal{O}(n)$  
  Occurs when the target is at the final index (`n - 1`), or does not exist in the array (e.g., searching for ID `999`). All $n$ elements must be checked.
- **Average-Case Time Complexity:** $\mathcal{O}(n)$  
  Average number of comparisons is $\frac{n + 1}{2} = \frac{5 + 1}{2} = 3$ comparisons.
- **Space Complexity:** $\mathcal{O}(1)$  
  Only a single loop counter variable `i` is allocated in the stack frame.

---

## 4. BUBBLE SORT ALGORITHM (DESCENDING ORDER)

### 4.1 Algorithmic Concept
Bubble Sort is a comparison-based sorting algorithm. In each pass through the array, adjacent pairs of elements are compared. If they are in the wrong order, they are swapped.

For **Descending Order** (highest values first):
- We swap if `suspects[j].evidencePoints < suspects[j + 1].evidencePoints`.
- This causes the smallest value to "sink" to the bottom of the array and the highest values to "bubble up" to the front.

### 4.2 C Implementation Walkthrough
```c
void bubbleSortByEvidenceDesc(struct Suspect suspects[], int n) {
    int i, j;
    struct Suspect temp;

    for (i = 0; i < n - 1; i++) {
        /* Last i elements are already positioned */
        for (j = 0; j < n - i - 1; j++) {
            /* Descending condition: swap if current is smaller than next */
            if (suspects[j].evidencePoints < suspects[j + 1].evidencePoints) {
                temp = suspects[j];
                suspects[j] = suspects[j + 1];
                suspects[j + 1] = temp;
            }
        }
    }
}
```

---

### 4.3 Detailed Numerical Trace of All Passes

#### Initial Evidence Scores:
```text
Index:   [0]      [1]      [2]      [3]      [4]
Suspect: Aarav    Priya    Rohan    Kabir    Meera
Scores:  [ 35 ,    45 ,     85 ,     50 ,     20 ]
```

#### PASS 1 (`i = 0`, `j` runs from `0` to `3`):
1. **`j = 0`:** Compare `scores[0]` (35) with `scores[1]` (45).  
   $35 < 45 \implies$ **SWAP**  
   Array state: `[ 45, 35, 85, 50, 20 ]`
2. **`j = 1`:** Compare `scores[1]` (35) with `scores[2]` (85).  
   $35 < 85 \implies$ **SWAP**  
   Array state: `[ 45, 85, 35, 50, 20 ]`
3. **`j = 2`:** Compare `scores[2]` (35) with `scores[3]` (50).  
   $35 < 50 \implies$ **SWAP**  
   Array state: `[ 45, 85, 50, 35, 20 ]`
4. **`j = 3`:** Compare `scores[3]` (35) with `scores[4]` (20).  
   $35 < 20 \implies$ **NO SWAP**  
   *Result of Pass 1:* The smallest element (20) has settled into position `[4]`.  
   Array: `[ 45, 85, 50, 35, 20 ]`

#### PASS 2 (`i = 1`, `j` runs from `0` to `2`):
1. **`j = 0`:** Compare `scores[0]` (45) with `scores[1]` (85).  
   $45 < 85 \implies$ **SWAP**  
   Array state: `[ 85, 45, 50, 35, 20 ]`
2. **`j = 1`:** Compare `scores[1]` (45) with `scores[2]` (50).  
   $45 < 50 \implies$ **SWAP**  
   Array state: `[ 85, 50, 45, 35, 20 ]`
3. **`j = 2`:** Compare `scores[2]` (45) with `scores[3]` (35).  
   $45 < 35 \implies$ **NO SWAP**  
   *Result of Pass 2:* Array is now `[ 85, 50, 45, 35, 20 ]`.

#### PASS 3 (`i = 2`, `j` runs from `0` to `1`):
1. **`j = 0`:** Compare `scores[0]` (85) with `scores[1]` (50).  
   $85 < 50 \implies$ **NO SWAP**
2. **`j = 1`:** Compare `scores[1]` (50) with `scores[2]` (45).  
   $50 < 45 \implies$ **NO SWAP**

#### PASS 4 (`i = 3`, `j` runs from `0` to `0`):
1. **`j = 0`:** Compare `scores[0]` (85) with `scores[1]` (50).  
   $85 < 50 \implies$ **NO SWAP**

#### Final Sorted Array (Descending):
```text
Rank #1: Rohan (ID 103)  -> 85 pts (CULPRIT)
Rank #2: Kabir (ID 104)  -> 50 pts
Rank #3: Priya (ID 102)  -> 45 pts
Rank #4: Aarav (ID 101)  -> 35 pts
Rank #5: Meera (ID 105)  -> 20 pts
```

---

### 4.4 Complexity Analysis of Bubble Sort
- **Total Comparisons Formula:**
  $$\sum_{i=1}^{n-1} i = \frac{n(n - 1)}{2} = \frac{5 \times 4}{2} = 10 \text{ comparisons}$$
- **Worst-Case Time Complexity:** $\mathcal{O}(n^2)$ (Array initially sorted in reverse/ascending order).
- **Average-Case Time Complexity:** $\mathcal{O}(n^2)$
- **Best-Case Time Complexity:** $\mathcal{O}(n)$ (If an `isSwapped` flag is used on an already sorted list).
- **Space Complexity:** $\mathcal{O}(1)$ (In-place; requires only one temporary `struct Suspect temp` variable for swapping).
- **Algorithm Stability:** **Stable** (Preserves the relative order of suspects with equal evidence points).

---

## 5. COMPARATIVE ALGORITHMIC ANALYSIS

### 5.1 Linear Search vs. Binary Search
| Parameter | Linear Search (Used in `case.c`) | Binary Search |
| :--- | :--- | :--- |
| **Prerequisite** | Unsorted or sorted array | **Must be strictly sorted** |
| **Time Complexity (Worst)** | $\mathcal{O}(n)$ | $\mathcal{O}(\log_2 n)$ |
| **Time Complexity (Best)** | $\mathcal{O}(1)$ | $\mathcal{O}(1)$ |
| **Space Complexity** | $\mathcal{O}(1)$ | $\mathcal{O}(1)$ iterative / $\mathcal{O}(\log n)$ recursive |
| **Suitability for $N=5$** | **Optimal** (minimal code, no sorting precondition required) | Overkill for $N=5$; requires initial sorting |

### 5.2 Bubble Sort vs. Advanced Sorting Algorithms
| Parameter | Bubble Sort (Used in `case.c`) | Merge Sort | QuickSort |
| :--- | :--- | :--- | :--- |
| **Time Complexity (Avg)** | $\mathcal{O}(n^2)$ | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n \log n)$ |
| **Time Complexity (Worst)**| $\mathcal{O}(n^2)$ | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n^2)$ |
| **Auxiliary Space** | $\mathcal{O}(1)$ (In-place) | $\mathcal{O}(n)$ (Heap arrays) | $\mathcal{O}(\log n)$ (Call stack) |
| **Implementation Complexity** | **Very Simple (~15 lines)** | High (recursive divide & conquer) | High (partitioning logic) |
| **Educational Suitability** | **Ideal for college viva** | Better for large datasets | Industry standard for large arrays |
