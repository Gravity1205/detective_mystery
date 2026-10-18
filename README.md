# CASE CLOSED — The College Mystery
> **A College Mini-Project in C Programming and Data Structures & Algorithms (DSA)**  
> *Developed for Academic Submission, Project Exhibitions & Viva Voce Evaluations*

---

## 📌 Project Overview
**CASE CLOSED — The College Mystery** is an interactive detective investigation simulator.  
During the annual Grand Gala College Cultural Festival, the prestigious **Golden Minerva Trophy** (valued at ₹1,50,000) mysteriously vanishes from the locked cabinet inside the Dean's Office between **8:00 PM and 9:00 PM**. 

As the student investigator, you examine five suspects, scrutinize their conflicting alibis, inspect physical and digital forensic clues, perform a **Linear Search** to locate suspect dossiers, execute a **Bubble Sort** to rank suspects by evidence points in descending order, and conclusively unmask the culprit!

---

## 🗂️ Project Repository Structure

```text
punnetsir_c2/
├── case.c                 # Complete C source code (ANSI C / C99)
├── case.exe               # Compiled Windows executable binary
├── index.html             # Detective investigation web interface
├── style.css              # Dark navy & charcoal cinematic detective stylesheet
├── app.js                 # Interactive demonstration logic & DSA visualizer
├── README.md              # Project overview, setup & compilation guide
├── PROJECT_REPORT.md      # Comprehensive academic project report with flowcharts
├── DSA_EXPLANATION.md     # Deep-dive theory on Structs, Linear Search & Bubble Sort
├── VIVA_QUESTIONS.md      # 10 essential viva questions with simple student answers
└── TEST_CASES.md          # Complete test matrix & verification results
```

---

## ⚙️ Compilation & Execution Guide

### Prerequisites
You need a standard C compiler installed (such as **GCC / MinGW-w64**, **Clang**, or **MSVC**).

### 1. Compile `case.c` Using GCC
Open your terminal (PowerShell, Command Prompt, or Linux/macOS Bash) and run:

```bash
gcc -Wall -Wextra -std=c99 case.c -o case.exe
```

*For Linux or macOS:*
```bash
gcc -Wall -Wextra -std=c99 case.c -o case
```

### 2. Run the Terminal Application
Execute the compiled binary:

**Windows (PowerShell / CMD):**
```powershell
.\case.exe
```

**Linux / macOS:**
```bash
./case
```

---

## 🎮 Terminal Application Menu Options

When you launch `case.exe`, you will be greeted by the investigation console:

```text
========================= CASE INVESTIGATION MENU =====================
 [1] View All Suspects Overview
 [2] Search Suspect by ID (Linear Search Algorithm)
 [3] Inspect Suspect Alibi & Evidence Record
 [4] Rank Suspects by Suspicion Score (Bubble Sort Algorithm)
 [5] Inspect Crime Scene Physical Clues & Forensic Analysis
 [6] Reveal the Culprit & Solution Walkthrough
 [7] Exit Investigation
======================================================================
```

### Suspect Roster (Sample Data)
| Suspect ID | Name | Role / Designation | Evidence Score | Key Fact |
| :---: | :--- | :--- | :---: | :--- |
| **101** | Aarav | Tech Team Lead | 35 pts | In server room; CCTV confirms brief water break |
| **102** | Priya | Cultural Secretary | 45 pts | Hosting dance on stage; verified by faculty |
| **103** | **Rohan** | **Debate Finalist (Runner-up)** | **85 pts** | **THE CULPRIT! Gate log & blazer fiber match** |
| **104** | Kabir | Campus Photographer | 50 pts | Photo metadata corroborates lawn candid shots |
| **105** | Meera | Council Treasurer | 20 pts | Counting cash; 2 volunteers verify continuously |

---

## 🌐 Launching the Web Demonstration

The web interface is a standalone client-side application built with pure **HTML5, CSS3, and Vanilla JavaScript** with zero external frameworks or internet dependencies.

### Option A: Direct Open
Simply double-click `index.html` in your file explorer to open it in Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari.

### Option B: Local Web Server (Recommended)
Using Python:
```bash
python -m http.server 8000
```
Then navigate to: `http://localhost:8000` in your web browser.

### Key Web Features
- **Dashboard**: Incident briefing, crime window, and mystery backstory.
- **Suspect Board**: Polaroid case files with instant ID search simulation and modal dossiers.
- **Evidence Room**: Forensic laboratory cards with filter tags (Contradictions, Physical Forensics).
- **Evidence Ranking**: Interactive Bubble Sort simulation with step-by-step pairwise comparison logs.
- **Case Resolution**: Decisive clues breakdown, motive analysis, and investigation reset.
- **C Source & DSA Tab**: Direct educational bridge displaying the exact C code for university viva presentation.

---

## 🔬 Core DSA Concepts Explained

1. **Structures (`struct Suspect`)**:
   Encapsulates heterogeneous data fields (`int id`, `char name[]`, `char role[]`, `char alibi[]`, `int evidencePoints`, `char primaryClue[]`) into a single record.
2. **Array of Structures**:
   Stores all 5 suspect records in contiguous memory, enabling cache-friendly indexed access.
3. **Linear Search ($O(n)$)**:
   Scans the array sequentially element-by-element to locate a suspect by their unique ID.
4. **Bubble Sort Descending ($O(n^2)$)**:
   Repeatedly steps through the list, compares adjacent elements, and swaps them if the left score is less than the right score (`suspects[j].evidencePoints < suspects[j+1].evidencePoints`), bubbling the highest suspect score to index `0`.

---

## 📚 Deliverables Included in this Project

- **[PROJECT_REPORT.md](PROJECT_REPORT.md)**: Academic mini-project report with Abstract, System Architecture, Mermaid Flowcharts, and Test Results.
- **[DSA_EXPLANATION.md](DSA_EXPLANATION.md)**: In-depth analysis of Structs, Linear Search vs. Binary Search, and Bubble Sort step-by-step trace.
- **[VIVA_QUESTIONS.md](VIVA_QUESTIONS.md)**: 10 curated viva questions with clear answers for exams and presentations.
- **[TEST_CASES.md](TEST_CASES.md)**: Comprehensive test suite covering valid/invalid inputs and algorithm correctness.
