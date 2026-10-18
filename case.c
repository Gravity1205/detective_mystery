/* ============================================================================
 * PROJECT: CASE CLOSED — The College Mystery
 * COURSE:  Data Structures & Algorithms (DSA) / C Programming Mini-Project
 *
 * DESCRIPTION:
 *   An interactive terminal-based detective investigation simulator.
 *   The prestigious "Golden Minerva" Cultural Fest Trophy was stolen
 *   from the Dean's Display Cabinet. The user investigates 5 suspects,
 *   analyzes alibis and physical evidence, ranks suspects using Bubble Sort,
 *   searches suspect records using Linear Search, and solves the crime!
 *
 * KEY DSA CONCEPTS IMPLEMENTED:
 *   1. Structures (struct Suspect) - Heterogeneous data encapsulation
 *   2. Arrays of Structures       - Sequential list storage in memory
 *   3. Linear Search              - O(n) element search by ID
 *   4. Bubble Sort (Descending)   - O(n^2) ranking by evidence points
 *   5. Modular Programming        - Clean functions, pass-by-reference/array
 * ============================================================================
 */

#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define TOTAL_SUSPECTS 5
#define MAX_NAME_LEN 50
#define MAX_ROLE_LEN 50
#define MAX_TEXT_LEN 300

/* Structure definition to store all attributes of a suspect */
struct Suspect {
    int id;                         /* Unique numeric identifier */
    char name[MAX_NAME_LEN];        /* Full name of the suspect */
    char role[MAX_ROLE_LEN];        /* College festival role / designation */
    char alibi[MAX_TEXT_LEN];       /* Statement regarding whereabouts */
    int evidencePoints;             /* Accumulated forensic suspicion points (0-100) */
    char primaryClue[MAX_TEXT_LEN]; /* Physical evidence / forensic finding */
};

/* Function Prototypes */
void initializeSuspects(struct Suspect suspects[]);
void displayBanner(void);
void displayMenu(void);
void displayAllSuspects(const struct Suspect suspects[], int n);
int linearSearchById(const struct Suspect suspects[], int n, int targetId);
void viewSuspectDetails(const struct Suspect *s);
void bubbleSortByEvidenceDesc(struct Suspect suspects[], int n);
void rankSuspects(const struct Suspect suspects[], int n);
void inspectClues(void);
void revealCulprit(const struct Suspect suspects[], int n);
void clearInputBuffer(void);

/* ============================================================================
 * MAIN FUNCTION
 * ============================================================================
 */
int main(void) {
    struct Suspect suspects[TOTAL_SUSPECTS];
    int choice = 0;
    int searchId = 0;
    int foundIndex = -1;

    /* Initialize the suspect records */
    initializeSuspects(suspects);

    displayBanner();

    do {
        displayMenu();
        printf("Enter your choice (1-7): ");

        if (scanf("%d", &choice) != 1) {
            printf("\n[!] Invalid input! Please enter a number between 1 and 7.\n\n");
            clearInputBuffer();
            continue;
        }
        clearInputBuffer();

        printf("\n----------------------------------------------------------------------\n");

        switch (choice) {
            case 1:
                /* Feature 1: View all suspects */
                displayAllSuspects(suspects, TOTAL_SUSPECTS);
                break;

            case 2:
                /* Feature 2: Search for suspect by ID using Linear Search */
                printf("[SEARCH SUSPECT BY ID - LINEAR SEARCH]\n");
                printf("Enter Suspect ID to search (e.g., 101 to 105): ");
                if (scanf("%d", &searchId) != 1) {
                    printf("\n[!] Invalid ID format. Must be an integer.\n");
                    clearInputBuffer();
                    break;
                }
                clearInputBuffer();

                foundIndex = linearSearchById(suspects, TOTAL_SUSPECTS, searchId);
                if (foundIndex != -1) {
                    printf("\n[+] MATCH FOUND at Array Index [%d]!\n", foundIndex);
                    viewSuspectDetails(&suspects[foundIndex]);
                } else {
                    printf("\n[-] ERROR: Suspect with ID %d was NOT found in the records.\n", searchId);
                    printf("    Available valid IDs are 101, 102, 103, 104, 105.\n");
                }
                break;

            case 3:
                /* Feature 3: View alibi and evidence of a specific suspect */
                printf("[INSPECT SPECIFIC SUSPECT ALIBI & EVIDENCE]\n");
                printf("Enter Suspect ID to inspect (101-105): ");
                if (scanf("%d", &searchId) != 1) {
                    printf("\n[!] Invalid ID format.\n");
                    clearInputBuffer();
                    break;
                }
                clearInputBuffer();

                foundIndex = linearSearchById(suspects, TOTAL_SUSPECTS, searchId);
                if (foundIndex != -1) {
                    printf("\n======================================================================\n");
                    printf(" DOSSIER: %s (ID: %d) - %s\n", 
                           suspects[foundIndex].name, suspects[foundIndex].id, suspects[foundIndex].role);
                    printf("======================================================================\n");
                    printf(" ALIBI STATEMENT:\n   \"%s\"\n\n", suspects[foundIndex].alibi);
                    printf(" FORENSIC EVIDENCE FINDING:\n   %s\n\n", suspects[foundIndex].primaryClue);
                    printf(" EVIDENCE POINTS: %d / 100\n", suspects[foundIndex].evidencePoints);
                    printf("======================================================================\n");
                } else {
                    printf("\n[-] Suspect with ID %d not found.\n", searchId);
                }
                break;

            case 4:
                /* Feature 4: Rank suspects by evidence points using Bubble Sort */
                rankSuspects(suspects, TOTAL_SUSPECTS);
                break;

            case 5:
                /* Feature 5: Inspect crime scene clues and relations */
                inspectClues();
                break;

            case 6:
                /* Feature 6: Reveal the culprit with logical explanation */
                revealCulprit(suspects, TOTAL_SUSPECTS);
                break;

            case 7:
                /* Feature 7: Exit the program */
                printf("\n======================================================================\n");
                printf("  CASE STATUS: SUSPENDED\n");
                printf("  Thank you for investigating! Case files archived.\n");
                printf("======================================================================\n\n");
                break;

            default:
                printf("[!] Invalid choice (%d). Please select an option from 1 to 7.\n", choice);
                break;
        }

        if (choice != 7) {
            printf("\nPress ENTER to continue back to menu...");
            getchar();
            printf("\n");
        }

    } while (choice != 7);

    return 0;
}

/* ============================================================================
 * INITIALIZATION FUNCTION
 * Sets up 5 predefined suspects with consistent alibis, evidence, and scores.
 * ============================================================================
 */
void initializeSuspects(struct Suspect suspects[]) {
    /* Suspect 1: Aarav */
    suspects[0].id = 101;
    strcpy(suspects[0].name, "Aarav");
    strcpy(suspects[0].role, "Tech Team Lead");
    strcpy(suspects[0].alibi, 
           "In server room managing livestream and audio console from 7:45 PM to 9:15 PM.");
    suspects[0].evidencePoints = 35;
    strcpy(suspects[0].primaryClue, 
           "Server logs show automated script was running. Hallway CCTV shows him leaving room briefly at 8:40 PM for water, far from Trophy Room.");

    /* Suspect 2: Priya */
    suspects[1].id = 102;
    strcpy(suspects[1].name, "Priya");
    strcpy(suspects[1].role, "Cultural Secretary");
    strcpy(suspects[1].alibi, 
           "On stage hosting the classical dance segment until 8:35 PM, then backstage with faculty.");
    suspects[1].evidencePoints = 45;
    strcpy(suspects[1].primaryClue, 
           "Stage footage confirms her on stage until 8:35 PM. Seen speaking with faculty judge until 8:55 PM. No access keycard registered to her.");

    /* Suspect 3: Rohan (The Culprit) */
    suspects[2].id = 103;
    strcpy(suspects[2].name, "Rohan");
    strcpy(suspects[2].role, "Debate Finalist (Runner-up)");
    strcpy(suspects[2].alibi, 
           "Claims he was angry after losing the debate trophy and left campus by car at 7:30 PM.");
    suspects[2].evidencePoints = 85;
    strcpy(suspects[2].primaryClue, 
           "CONTRADICTION: Campus gate security log shows his car left at 9:30 PM, NOT 7:30 PM! Green blazer cloth snagged on trophy cabinet lock; Master Keycard #4 used was checked out under his student ID; Size 10 mud prints match his shoes.");

    /* Suspect 4: Kabir */
    suspects[3].id = 104;
    strcpy(suspects[3].name, "Kabir");
    strcpy(suspects[3].role, "Campus Photographer");
    strcpy(suspects[3].alibi, 
           "Roaming amphitheater and food stalls clicking candid event photos all evening.");
    suspects[3].evidencePoints = 50;
    strcpy(suspects[3].primaryClue, 
           "Camera metadata confirms candid shots taken across lawn. At 8:15 PM, he photographed the exterior Trophy Room window showing a silhouette inside wearing a green blazer.");

    /* Suspect 5: Meera */
    suspects[4].id = 105;
    strcpy(suspects[4].name, "Meera");
    strcpy(suspects[4].role, "Council Treasurer");
    strcpy(suspects[4].alibi, 
           "Counting fest ticket collections in student council room with 2 junior volunteers.");
    suspects[4].evidencePoints = 20;
    strcpy(suspects[4].primaryClue, 
           "Both volunteers and faculty treasurer verified her presence continuously until 9:00 PM. Lockbox tallies and door biometric logs fully verify her alibi.");
}

/* ============================================================================
 * ALGORITHM 1: LINEAR SEARCH
 * Time Complexity:  O(n) - Linear Time (Worst & Average case)
 * Space Complexity: O(1) - Auxiliary Space
 *
 * Scans the array sequentially from index 0 to n-1.
 * Returns the index if targetId matches, otherwise returns -1.
 * ============================================================================
 */
int linearSearchById(const struct Suspect suspects[], int n, int targetId) {
    int i;
    for (i = 0; i < n; i++) {
        if (suspects[i].id == targetId) {
            return i; /* Target found at index i */
        }
    }
    return -1; /* Target not found after complete array scan */
}

/* ============================================================================
 * ALGORITHM 2: BUBBLE SORT (DESCENDING ORDER)
 * Time Complexity:  O(n^2) - Quadratic Time (Worst & Average case)
 * Space Complexity: O(1) - In-place Sorting
 *
 * Compares adjacent elements and swaps them if the left element is LESS than
 * the right element (suspects[j].evidencePoints < suspects[j+1].evidencePoints),
 * causing larger values to "bubble up" to the front (descending order).
 * ============================================================================
 */
void bubbleSortByEvidenceDesc(struct Suspect suspects[], int n) {
    int i, j;
    struct Suspect temp;

    for (i = 0; i < n - 1; i++) {
        /* Last i elements are already in place */
        for (j = 0; j < n - i - 1; j++) {
            /* For descending order: swap if current is smaller than next */
            if (suspects[j].evidencePoints < suspects[j + 1].evidencePoints) {
                temp = suspects[j];
                suspects[j] = suspects[j + 1];
                suspects[j + 1] = temp;
            }
        }
    }
}

/* ============================================================================
 * DISPLAY FUNCTIONS
 * ============================================================================
 */

void displayBanner(void) {
    printf("======================================================================\n");
    printf("   ____    _    ____  _____   ____ _     ___  ____  _____ ____  \n");
    printf("  / ___|  / \\  / ___|| ____| / ___| |   / _ \\/ ___|| ____|  _ \\ \n");
    printf(" | |     / _ \\ \\___ \\|  _|  | |   | |  | | | \\___ \\|  _| | | | |\n");
    printf(" | |___ / ___ \\ ___) | |___ | |___| |__| |_| |___) | |___| |_| |\n");
    printf("  \\____/_/   \\_\\____/|_____| \\____|_____\\___/|____/|_____|____/ \n");
    printf("======================================================================\n");
    printf("       CASE FILE #2026-FEST: THE STOLEN GOLDEN MINERVA TROPHY         \n");
    printf("       Location: Dean's Trophy Room, Central Administrative Block      \n");
    printf("       Time of Incident: Oct 17th, Between 8:00 PM and 9:00 PM         \n");
    printf("======================================================================\n");
}

void displayMenu(void) {
    printf("========================= CASE INVESTIGATION MENU =====================\n");
    printf(" [1] View All Suspects Overview\n");
    printf(" [2] Search Suspect by ID (Linear Search Algorithm)\n");
    printf(" [3] Inspect Suspect Alibi & Evidence Record\n");
    printf(" [4] Rank Suspects by Suspicion Score (Bubble Sort Algorithm)\n");
    printf(" [5] Inspect Crime Scene Physical Clues & Forensic Analysis\n");
    printf(" [6] Reveal the Culprit & Solution Walkthrough\n");
    printf(" [7] Exit Investigation\n");
    printf("======================================================================\n");
}

/* Formatted table view of all suspects */
void displayAllSuspects(const struct Suspect suspects[], int n) {
    int i;
    printf("\n======================== LIST OF SUSPECTS ============================\n");
    printf("%-5s | %-10s | %-28s | %-15s\n", "ID", "Name", "Role / Designation", "Evidence Score");
    printf("----------------------------------------------------------------------\n");
    for (i = 0; i < n; i++) {
        printf("%-5d | %-10s | %-28s | %3d / 100\n",
               suspects[i].id,
               suspects[i].name,
               suspects[i].role,
               suspects[i].evidencePoints);
    }
    printf("======================================================================\n");
    printf("Total registered suspects under investigation: %d\n", n);
}

/* Detailed dossier of a single suspect */
void viewSuspectDetails(const struct Suspect *s) {
    printf("----------------------------------------------------------------------\n");
    printf(" Suspect ID       : %d\n", s->id);
    printf(" Full Name        : %s\n", s->name);
    printf(" College Role     : %s\n", s->role);
    printf(" Alibi Claim      : %s\n", s->alibi);
    printf(" Evidence Score   : %d / 100\n", s->evidencePoints);
    printf(" Key Evidence     : %s\n", s->primaryClue);
    printf("----------------------------------------------------------------------\n");
}

/* Copies suspect list, sorts in descending order with Bubble Sort, and displays */
void rankSuspects(const struct Suspect suspects[], int n) {
    struct Suspect ranked[TOTAL_SUSPECTS];
    int i;

    /* Copy array to preserve original order in main database */
    for (i = 0; i < n; i++) {
        ranked[i] = suspects[i];
    }

    /* Execute Bubble Sort in descending order */
    bubbleSortByEvidenceDesc(ranked, n);

    printf("\n=================== SUSPECTS RANKED BY EVIDENCE POINTS ================\n");
    printf(" Sorting Algorithm: Bubble Sort (Descending Order | O(n^2))\n");
    printf("----------------------------------------------------------------------\n");
    printf("%-5s | %-5s | %-10s | %-25s | %-10s\n", "Rank", "ID", "Name", "Role", "Points");
    printf("----------------------------------------------------------------------\n");

    for (i = 0; i < n; i++) {
        printf("#%-4d | %-5d | %-10s | %-25s | %3d pts\n",
               i + 1,
               ranked[i].id,
               ranked[i].name,
               ranked[i].role,
               ranked[i].evidencePoints);
    }
    printf("======================================================================\n");
    printf("[*] PRIME SUSPECT (Rank #1): %s (ID: %d) with %d Points!\n",
           ranked[0].name, ranked[0].id, ranked[0].evidencePoints);
    printf("    Notice: Evidence points reflect forensic weights assigned to physical\n");
    printf("    clues and contradicted alibis for this educational project.\n");
}

/* Displays all crime scene forensic clues */
void inspectClues(void) {
    printf("\n===================== CRIME SCENE EVIDENCE & FORENSICS ================\n");
    printf(" Crime Scene: Dean's Office, Trophy Cabinet (Locked Glass Display)\n");
    printf(" Incident Time: 8:15 PM - 8:45 PM (during Main Stage Band Performance)\n");
    printf("======================================================================\n\n");

    printf("[CLUE 1] SNAGGED TEXTILE THREAD\n");
    printf("  Location: Caught inside the brass latch of the trophy display case.\n");
    printf("  Analysis: Dark forest green wool-polyester microfiber blend.\n");
    printf("  Relation: Matches the official College Debate Team finalist blazer.\n");
    printf("  Impact  : Heavily implicates ROHAN (ID 103), the debate finalist.\n\n");

    printf("[CLUE 2] MASTER KEYCARD #4 ACCESS LOG\n");
    printf("  Location: Digital lock reader on Dean's Trophy Room door.\n");
    printf("  Analysis: Card #4 scanned at 8:22 PM to open door; no forced entry.\n");
    printf("  Relation: Facilities register records Keycard #4 issued to Rohan for\n");
    printf("            \"rehearsing debate material\" at 5:00 PM; never returned.\n");
    printf("  Impact  : Directly proves entry means and opportunity for ROHAN.\n\n");

    printf("[CLUE 3] CAMPUS MAIN GATE VEHICLE LOG\n");
    printf("  Location: North Security Exit Barrier.\n");
    printf("  Analysis: Rohan's Honda City (DL-08-AB-4412) logged EXIT at 9:30 PM.\n");
    printf("  Relation: Contradicts Rohan's official alibi claiming he left at 7:30 PM.\n");
    printf("  Impact  : Shatters Rohan's false alibi; places him on campus at crime time.\n\n");

    printf("[CLUE 4] CANDID EXTERIOR PHOTOGRAPH\n");
    printf("  Location: Captured by Kabir (ID 104) from lawn near Dean's window.\n");
    printf("  Analysis: Photo metadata timestamp: 8:26 PM. Shows a tall silhouette in\n");
    printf("            a dark green blazer tucking a trophy-shaped object into a duffel bag.\n");
    printf("  Impact  : Exonerates Kabir (he took the photo) and confirms Rohan's presence.\n\n");

    printf("[CLUE 5] MUDDY FOOTPRINT CAST (SIZE 10 CONVERSE)\n");
    printf("  Location: Directly beside the velvet trophy plinth.\n");
    printf("  Analysis: Fresh red clay soil consistent with the unpaved north garden path.\n");
    printf("  Relation: Rohan wore red-clay stained Size 10 Converse sneakers that night.\n");
    printf("  Impact  : Places Rohan physically inside the restricted room.\n");
    printf("======================================================================\n");
}

/* Conclusive reveal of the culprit based on data and clues */
void revealCulprit(const struct Suspect suspects[], int n) {
    /* Find suspect with highest evidence points */
    int topIndex = 0;
    int i;
    for (i = 1; i < n; i++) {
        if (suspects[i].evidencePoints > suspects[topIndex].evidencePoints) {
            topIndex = i;
        }
    }

    printf("\n######################################################################\n");
    printf("                      CASE CLOSED: THE CULPRIT REVEALED               \n");
    printf("######################################################################\n\n");
    printf("  ACCUSED IDENTIFICATION:\n");
    printf("  Name             : %s\n", suspects[topIndex].name);
    printf("  Suspect ID       : %d\n", suspects[topIndex].id);
    printf("  Role             : %s\n", suspects[topIndex].role);
    printf("  Suspicion Score  : %d Points (Rank #1)\n\n", suspects[topIndex].evidencePoints);

    printf("  MOTIVE & SUMMARY:\n");
    printf("  Rohan was deeply devastated after losing the Inter-College Debate Trophy\n");
    printf("  earlier that afternoon. Blaming the judges, he resolved that if his team\n");
    printf("  could not have the trophy, the rival winners would not receive it either.\n\n");

    printf("  DECISIVE CORROBORATING EVIDENCE:\n");
    printf("  1. BROKEN ALIBI: Claimed departure at 7:30 PM, but gate logs prove his car\n");
    printf("     remained parked and departed at 9:30 PM.\n");
    printf("  2. ACCESS KEY: Keycard #4 used at 8:22 PM was signed out under his ID.\n");
    printf("  3. FORENSIC FIBERS: Green wool thread from his finalist blazer was snagged\n");
    printf("     directly inside the trophy cabinet latch.\n");
    printf("  4. WITNESS PHOTO: Kabir's candid photo caught him carrying the trophy bag.\n");
    printf("  5. PHYSICAL TRACES: Size 10 Converse impressions match red clay on his shoes.\n\n");

    printf("  VERDICT: Rohan confessed when confronted with the gate log and blazer thread!\n");
    printf("           The Golden Minerva Trophy was recovered safely from his car trunk.\n");
    printf("######################################################################\n");
}

/* Clears leftover characters in standard input stream */
void clearInputBuffer(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF) {
        /* Discard */
    }
}
