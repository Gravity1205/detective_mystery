# ACADEMIC PROJECT REPORT
## CASE CLOSED — The College Mystery
### An Interactive Detective Investigation Simulator using C & Data Structures

---

**Course / Subject:** Data Structures & Algorithms / Problem Solving using C  
**Project Type:** College Mini-Project  
**Author / Student:** Investigator Team  
**Academic Year:** 2026  

---

## 1. ABSTRACT
In traditional introductory computer science courses, Data Structures and Algorithms (DSA) concepts such as structure arrays, linear search, and quadratic sorting algorithms are frequently taught using dry, mathematical exercises (e.g., sorting random numbers or searching arbitrary lists). This project presents **CASE CLOSED — The College Mystery**, an interactive, story-driven detective investigation simulator engineered in ANSI C/C99 with a complementary dark-themed web demonstration.

The program models a real-world scenario where the prestigious "Golden Minerva" Cultural Fest Trophy is stolen from a locked college room. Five suspects are modeled using C `struct` representations. The student user interacts with a modular terminal CLI to search suspect files using **Linear Search** ($O(n)$) and rank them by forensic evidence points using **Bubble Sort** ($O(n^2)$) in descending order. By grounding abstract data structures in a cohesive narrative, the project bridges theoretical algorithm design with practical problem-solving.

---

## 2. INTRODUCTION & MOTIVATION
Data structures form the foundational backbone of efficient software engineering. However, novice programmers often struggle to comprehend:
1. When and why to encapsulate related attributes inside heterogeneous `struct` constructs rather than maintaining parallel disconnected arrays.
2. The operational mechanics and internal memory traversal of sequential search algorithms.
3. How pairwise comparison-and-swap mechanics in Bubble Sort can be configured to sort data in descending order based on a designated structure member key.

By framing the problem as a criminal investigation—where evidence points act as weights and suspect IDs act as search keys—students can intuitively trace algorithm behavior, understand time and space complexity, and easily defend their implementation during university viva voce examinations.

---

## 3. PROJECT OBJECTIVES
The core objectives of this mini-project are:
1. **Heterogeneous Data Encapsulation:** To define and utilize `struct Suspect` in C, containing integer keys, character arrays, and forensic score counters.
2. **Contiguous Memory Storage:** To allocate and manage an array of structures representing five suspects: Aarav, Priya, Rohan, Kabir, and Meera.
3. **Manual Algorithm Implementation:**
   - Implement **Linear Search** manually from scratch without relying on external libraries to find suspects by numeric ID.
   - Implement **Bubble Sort (Descending)** manually to sort suspects by evidence points ($85 \to 50 \to 45 \to 35 \to 20$).
4. **Logical Mystery Design:** To devise five physical and digital clues (keycard audit logs, vehicle gate barriers, microscopic fabric fibers, and eyewitness photographs) that logically point to a single culprit (**Rohan, ID 103**).
5. **Interactive Presentation:** To provide both a robust C terminal application and a responsive, detective-themed web interface for presentation purposes.

---

## 4. SYSTEM ARCHITECTURE & METHODOLOGY

### 4.1 System Modules Architecture

```text
+-------------------------------------------------------------------------+
|                              USER INTERFACE                             |
|         [ C Console CLI (case.c) ]   <--->   [ Web Interface (HTML/CSS) ]|
+------------------------------------+------------------------------------+
                                     |
                                     v
+-------------------------------------------------------------------------+
|                             MAIN DISPATCHER                             |
|          Menu Loop (Options 1-7) & Buffer-Safe Input Validator          |
+------------------------------------+------------------------------------+
                                     |
        +----------------------------+----------------------------+
        |                            |                            |
        v                            v                            v
+------------------+       +------------------+       +------------------+
|   RECORD STORE   |       |  SEARCH ENGINE   |       |  RANKING ENGINE  |
| Array of Structs |       |  Linear Search   |       |   Bubble Sort    |
| (5 Suspects)     |       |      O(n)        |       |    Descending    |
+------------------+       +------------------+       +------------------+
        |                            |                            |
        +----------------------------+----------------------------+
                                     |
                                     v
+-------------------------------------------------------------------------+
|                           FORENSIC ANALYZER                             |
|          Clue Evaluator -> Contradiction Engine -> Culprit Reveal       |
+-------------------------------------------------------------------------+
```

### 4.2 Data Structures Specification
```c
struct Suspect {
    int id;                         /* Primary Key: 101 to 105 */
    char name[MAX_NAME_LEN];        /* Full Name */
    char role[MAX_ROLE_LEN];        /* Fest Designation */
    char alibi[MAX_TEXT_LEN];       /* Reported Whereabouts */
    int evidencePoints;             /* Sort Key: Suspicion Score (0-100) */
    char primaryClue[MAX_TEXT_LEN]; /* Forensic Evidence Notes */
};
```

---

## 5. ALGORITHM DESIGN & PSEUDOCODE

### 5.1 Linear Search Algorithm
Linear Search sequentially checks each element of the array until a match is found or the end of the array is reached.

#### Pseudocode:
```text
Algorithm: LinearSearchById(suspects, n, targetId)
Input: Array of struct Suspect, integer n (size), integer targetId
Output: Index of matched suspect, or -1 if not found

1. For i = 0 to n - 1 Do:
2.    If suspects[i].id == targetId Then:
3.       Return i  // Match found at index i
4.    End If
5. End For
6. Return -1       // Target not found after complete traversal
```

- **Best Case Time Complexity:** $\mathcal{O}(1)$ (Target is at index `0`).
- **Worst & Average Case:** $\mathcal{O}(n)$ (Target is at index `n-1` or absent).
- **Space Complexity:** $\mathcal{O}(1)$ (Auxiliary space).

---

### 5.2 Bubble Sort Algorithm (Descending Order)
Bubble Sort repeatedly steps through the array, compares adjacent structure elements based on `evidencePoints`, and swaps their entire records if the preceding element has a lower score than the succeeding element.

#### Pseudocode:
```text
Algorithm: BubbleSortByEvidenceDesc(suspects, n)
Input: Array of struct Suspect, integer n
Output: Array sorted in descending order of evidencePoints

1. For i = 0 to n - 2 Do:
2.    For j = 0 to n - i - 2 Do:
3.       If suspects[j].evidencePoints < suspects[j + 1].evidencePoints Then:
4.          temp = suspects[j]
5.          suspects[j] = suspects[j + 1]
6.          suspects[j + 1] = temp
7.       End If
8.    End For
9. End For
```

- **Comparisons in Pass 1:** $n - 1 = 4$
- **Total Comparisons:** $\frac{n(n - 1)}{2} = \frac{5 \times 4}{2} = 10$ comparisons.
- **Worst Case Time Complexity:** $\mathcal{O}(n^2)$
- **Space Complexity:** $\mathcal{O}(1)$ (In-place sorting).

---

## 6. PROGRAM FLOWCHART (MERMAID)

```mermaid
flowchart TD
    Start([Program Launch]) --> Init[Initialize 5 Suspect Structs in Array]
    Init --> Banner[Display Banner & Incident Report]
    Banner --> Menu{Display Menu: Enter Choice 1-7}
    
    Menu -->|Choice 1| ViewAll[Display All Suspects in Table]
    ViewAll --> Pause[Wait for Enter] --> Menu
    
    Menu -->|Choice 2| InputID[Prompt for Suspect ID]
    InputID --> LinearSearch[Execute Linear Search O(n)]
    LinearSearch --> FoundCheck{Found in Array?}
    FoundCheck -->|Yes| ShowDossier[Display Full Suspect Dossier]
    FoundCheck -->|No| ShowError[Display 'ID Not Found' Warning]
    ShowDossier --> Pause
    ShowError --> Pause
    
    Menu -->|Choice 3| InputDetailID[Prompt Suspect ID]
    InputDetailID --> ViewAlibi[Display Alibi & Forensic Clue]
    ViewAlibi --> Pause
    
    Menu -->|Choice 4| CloneArray[Clone Suspects Array]
    CloneArray --> BubbleSort[Execute Bubble Sort Descending O(n²)]
    BubbleSort --> DisplayRanks[Display Ranked Leaderboard #1 to #5]
    DisplayRanks --> Pause
    
    Menu -->|Choice 5| DisplayClues[Display 5 Physical & Digital Crime Scene Clues]
    DisplayClues --> Pause
    
    Menu -->|Choice 6| FindMax[Find Suspect with Max Evidence Points]
    FindMax --> Reveal[Reveal Rohan ID 103 as Culprit with Decisive Proof]
    Reveal --> Pause
    
    Menu -->|Choice 7| ExitProg([Archive Files & Terminate])
    Menu -->|Invalid Choice| InputErr[Show Invalid Input Prompt] --> Menu
```

---

## 7. CLUE CORRELATION & CRIME RESOLUTION

| Clue # | Name & Forensic Finding | Corroborating Suspect | Contradicted Suspect | Decisive Impact |
| :---: | :--- | :--- | :--- | :--- |
| **1** | **Snagged Green Blazer Thread** | — | **Rohan (ID 103)** | Microscopic wool fiber matches debate team finalist blazer caught in display latch. |
| **2** | **Master Keycard #4 Audit Log** | — | **Rohan (ID 103)** | Card used at 8:22 PM; signed out to Rohan at 5:00 PM for rehearsals and never returned. |
| **3** | **North Exit Gate Barrier Log** | — | **Rohan (ID 103)** | RFID gate records Rohan's car leaving at 9:30 PM, completely refuting his 7:30 PM departure claim. |
| **4** | **Candid Window Photograph** | **Kabir (ID 104)** | **Rohan (ID 103)** | Photo taken at 8:26 PM by Kabir shows a figure in a green blazer packing the trophy into a duffel bag. |
| **5** | **Muddy Footprint Cast (Size 10)**| — | **Rohan (ID 103)** | Red clay footprint matches the north garden mud found on Rohan's Converse sneakers. |

---

## 8. EXPERIMENTAL VERIFICATION & TEST RESULTS

The C application was compiled with `gcc -Wall -Wextra -std=c99` and verified with automated test vectors:

| Test Case | Module | Tested Input | Expected Result | Actual Result | Status |
| :---: | :--- | :---: | :--- | :--- | :---: |
| **TC-01** | Overview | `1` | Displays 5 suspects with IDs 101-105 | Formatted table displayed | **PASS** |
| **TC-02** | Search (Valid) | `2` $\to$ `103` | Linear search returns index 2 (Rohan) | Rohan dossier displayed | **PASS** |
| **TC-03** | Search (Invalid) | `2` $\to$ `999` | Returns -1 with error message | Suspect not found message | **PASS** |
| **TC-04** | Alibi View | `3` $\to$ `101` | Displays Aarav alibi & 35 points | Dossier with alibi displayed | **PASS** |
| **TC-05** | Bubble Sort | `4` | Descending order: 85, 50, 45, 35, 20 | Prime suspect Rohan (85 pts) | **PASS** |
| **TC-06** | Crime Clues | `5` | Displays all 5 forensic items | 5 clues with impacts shown | **PASS** |
| **TC-07** | Culprit Reveal | `6` | Identifies Rohan with 5 proof items | Rohan unmasked; trophy found | **PASS** |
| **TC-08** | Input Safety | `abc` | Buffer cleared, menu re-prompted | Handled gracefully | **PASS** |

---

## 9. LIMITATIONS & FUTURE ENHANCEMENTS

### 9.1 Limitations
1. **Fixed Memory Allocation:** The suspect database is statically sized to 5 elements (`TOTAL_SUSPECTS 5`), requiring recompilation if more suspects are added.
2. **Volatile Storage:** Suspect data is initialized in RAM; modifications or dynamic clues are not persisted to a relational database or external disk file.
3. **Deterministic Mystery:** The culprit is fixed to Rohan for educational consistency.

### 9.2 Future Enhancements
1. **File I/O Integration:** Loading suspects and clues dynamically from JSON or CSV case files using `fopen()`, `fscanf()`, or `fread()`.
2. **Binary Search Tree (BST) / Hash Table:** Implementing $O(1)$ hash maps for suspect lookup and BST for dynamic evidence ranking.
3. **Procedural Mystery Generation:** Implementing seed-based randomization so different suspects can become the culprit across different gameplay sessions.

---

## 10. CONCLUSION
**CASE CLOSED — The College Mystery** successfully demonstrates how core Data Structures and Algorithms can be integrated into an engaging, narrative-driven educational software application. By implementing manual Linear Search and descending Bubble Sort on an array of C structures, the project offers students a clear, defensible, and interactive foundation for college viva evaluations.
