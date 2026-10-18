/**
 * CASE CLOSED — The College Mystery
 * Companion Interactive Web Simulator
 * Logic, Data, and Algorithms directly mirror case.c
 */

// 1. DATA MODEL (Direct 1:1 match with case.c)
const SUSPECTS = [
  {
    id: 101,
    name: "Aarav",
    role: "Tech Team Lead",
    alibi: "In server room managing livestream and audio console from 7:45 PM to 9:15 PM.",
    evidencePoints: 35,
    primaryClue: "Server logs show automated script was running. Hallway CCTV shows him leaving room briefly at 8:40 PM for water, far from Trophy Room.",
    level: "Low Suspicion",
    levelClass: "pill-low"
  },
  {
    id: 102,
    name: "Priya",
    role: "Cultural Secretary",
    alibi: "On stage hosting the classical dance segment until 8:35 PM, then backstage with faculty.",
    evidencePoints: 45,
    primaryClue: "Stage footage confirms her on stage until 8:35 PM. Seen speaking with faculty judge until 8:55 PM. No access keycard registered to her.",
    level: "Medium Suspicion",
    levelClass: "pill-medium"
  },
  {
    id: 103,
    name: "Rohan",
    role: "Debate Finalist (Runner-up)",
    alibi: "Claims he was angry after losing the debate trophy and left campus by car at 7:30 PM.",
    evidencePoints: 85,
    primaryClue: "CONTRADICTION: Campus gate security log shows his car left at 9:30 PM, NOT 7:30 PM! Green blazer cloth snagged on trophy cabinet lock; Master Keycard #4 used was checked out under his student ID; Size 10 mud prints match his shoes.",
    level: "Prime Suspect",
    levelClass: "pill-extreme"
  },
  {
    id: 104,
    name: "Kabir",
    role: "Campus Photographer",
    alibi: "Roaming amphitheater and food stalls clicking candid event photos all evening.",
    evidencePoints: 50,
    primaryClue: "Camera metadata confirms candid shots taken across lawn. At 8:15 PM, he photographed the exterior Trophy Room window showing a silhouette inside wearing a green blazer.",
    level: "High Suspicion",
    levelClass: "pill-high"
  },
  {
    id: 105,
    name: "Meera",
    role: "Council Treasurer",
    alibi: "Counting fest ticket collections in student council room with 2 junior volunteers.",
    evidencePoints: 20,
    primaryClue: "Both volunteers and faculty treasurer verified her presence continuously until 9:00 PM. Lockbox tallies and door biometric logs fully verify her alibi.",
    level: "Low Suspicion",
    levelClass: "pill-low"
  }
];

const CLUES = [
  {
    id: 1,
    title: "Snagged Textile Thread",
    type: "physical",
    typeLabel: "Physical Forensic",
    location: "Brass lock mechanism of trophy display case",
    desc: "A microscopic fiber sample of dark forest-green wool-polyester microfiber was found snagged in the latch teeth.",
    relation: "Directly matches the custom fabric and weave of the official College Debate Team finalist blazer.",
    impact: "Heavily implicates ROHAN (ID 103), who was wearing the team finalist blazer that evening.",
    tagClass: "tag-physical"
  },
  {
    id: 2,
    title: "Master Keycard #4 Digital Log",
    type: "contradiction",
    typeLabel: "Digital Forensics",
    location: "Electronic lock on Dean's Trophy Room door",
    desc: "Digital audit logs confirm Master Keycard #4 unlocked the door at precisely 8:22 PM. There was zero physical force used.",
    relation: "The facilities register logs Keycard #4 checked out to Rohan at 5:00 PM for 'debate materials rehearsal' and never returned.",
    impact: "Establishes definitive means and opportunity for ROHAN (ID 103).",
    tagClass: "tag-contradiction"
  },
  {
    id: 3,
    title: "North Security Exit Barrier Ledger",
    type: "contradiction",
    typeLabel: "Alibi Contradiction",
    location: "Campus North Perimeter Vehicle Barrier",
    desc: "Automated RFID license plate camera recorded Rohan's Honda City (DL-08-AB-4412) exiting the gates at 9:30 PM.",
    relation: "Completely disproves Rohan's official statement claiming he left the college premises at 7:30 PM.",
    impact: "Shatters Rohan's fabricated alibi and proves his physical presence on campus during the crime window.",
    tagClass: "tag-contradiction"
  },
  {
    id: 4,
    title: "Candid Window Timestamp Photo",
    type: "physical",
    typeLabel: "Witness Forensic",
    location: "Exhibition lawn exterior looking into Dean's window",
    desc: "A high-resolution telephoto photograph taken at 8:26 PM showing an interior silhouette packing a gold trophy into a duffel bag.",
    relation: "Captured by Kabir (ID 104) while shooting event candids; camera EXIF metadata validates timestamp.",
    impact: "Exonerates photographer Kabir while visually confirming a figure wearing a dark green blazer inside.",
    tagClass: "tag-physical"
  },
  {
    id: 5,
    title: "Muddy Footprint Cast (Size 10)",
    type: "physical",
    typeLabel: "Physical Forensic",
    location: "Directly beside the velvet plinth",
    desc: "Clear red-clay soil shoe impression with diamond waffle sole tread pattern consistent with Size 10 Converse sneakers.",
    relation: "Matches the red-clay mud observed on Rohan's sneakers from the unpaved north lawn pathway.",
    impact: "Places Rohan physically inside the restricted trophy enclosure.",
    tagClass: "tag-physical"
  }
];

// STATE MANAGEMENT
let currentTab = 'dashboard';
let filteredClues = [...CLUES];

// DOM ELEMENTS
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  renderSuspects(SUSPECTS);
  renderClues(filteredClues);
  renderRanking();
  initSearch();
  initClueFilters();
  initModals();
  initCodeTabs();
  initActionButtons();
});

// 2. NAVIGATION HANDLER
function initNavigation() {
  const navBtns = document.querySelectorAll('.nav-btn');
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      switchScreen(target);
    });
  });
}

function switchScreen(targetScreenId) {
  currentTab = targetScreenId;

  // Update nav buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-target') === targetScreenId);
  });

  // Update screen sections
  document.querySelectorAll('.screen-section').forEach(section => {
    section.classList.toggle('active', section.id === targetScreenId);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 3. SUSPECT BOARD RENDERING
function renderSuspects(suspectsList) {
  const grid = document.getElementById('suspectGrid');
  grid.innerHTML = '';

  suspectsList.forEach(s => {
    const card = document.createElement('div');
    card.className = 'suspect-card';
    card.id = `suspect-card-${s.id}`;

    card.innerHTML = `
      <div class="suspect-card-header">
        <div>
          <span class="suspect-id-badge">ID: ${s.id}</span>
          <h3 class="suspect-name">${s.name}</h3>
          <p class="suspect-role">${s.role}</p>
        </div>
        <div class="suspect-score-badge">
          <span class="score-number">${s.evidencePoints}</span>
          <span class="score-label">pts</span>
        </div>
      </div>

      <div class="suspect-alibi-box">
        <strong>Reported Alibi:</strong>
        <p>"${s.alibi}"</p>
      </div>

      <div class="suspect-clue-preview">
        <strong>Forensic Finding:</strong>
        <p>${s.primaryClue.substring(0, 110)}...</p>
      </div>

      <div class="card-actions">
        <button class="btn btn-secondary btn-dossier" data-id="${s.id}">
          &#128196; View Dossier
        </button>
      </div>
    `;

    grid.appendChild(card);
  });

  // Attach dossier modal triggers
  document.querySelectorAll('.btn-dossier').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.getAttribute('data-id'), 10);
      openSuspectModal(id);
    });
  });
}

// 4. LINEAR SEARCH ALGORITHM SIMULATION
function initSearch() {
  const searchInput = document.getElementById('suspectSearchInput');
  const btnSearch = document.getElementById('btnSearchSuspect');
  const btnReset = document.getElementById('btnResetSearch');
  const feedback = document.getElementById('searchFeedback');

  function performSearch() {
    const rawVal = searchInput.value.trim();
    if (!rawVal) {
      showSearchFeedback('Please enter a suspect ID (101 - 105).', true);
      return;
    }

    const targetId = parseInt(rawVal, 10);
    if (isNaN(targetId)) {
      showSearchFeedback('Invalid ID format. Must be an integer.', true);
      return;
    }

    // Reset previous card highlights
    document.querySelectorAll('.suspect-card').forEach(c => c.classList.remove('highlighted'));

    // Manual Linear Search loop matching case.c: linearSearchById()
    let foundIndex = -1;
    let comparisonLog = [];

    for (let i = 0; i < SUSPECTS.length; i++) {
      comparisonLog.push(`Index [${i}]: ID ${SUSPECTS[i].id}`);
      if (SUSPECTS[i].id === targetId) {
        foundIndex = i;
        break;
      }
    }

    if (foundIndex !== -1) {
      const matched = SUSPECTS[foundIndex];
      showSearchFeedback(
        `<strong>[LINEAR SEARCH MATCH]</strong> Target ID ${targetId} found at Array Index [${foundIndex}] &rarr; ${matched.name} (${matched.role}) after ${foundIndex + 1} comparison(s).`,
        false
      );

      // Highlight card & scroll
      const matchedCard = document.getElementById(`suspect-card-${matched.id}`);
      if (matchedCard) {
        matchedCard.classList.add('highlighted');
        matchedCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      showSearchFeedback(
        `<strong>[NOT FOUND]</strong> Target ID ${targetId} was not found after searching all ${SUSPECTS.length} elements (O(n) scan). Valid IDs: 101, 102, 103, 104, 105.`,
        true
      );
    }
  }

  btnSearch.addEventListener('click', performSearch);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
  });

  btnReset.addEventListener('click', () => {
    searchInput.value = '';
    feedback.className = 'search-feedback hidden';
    feedback.innerHTML = '';
    document.querySelectorAll('.suspect-card').forEach(c => c.classList.remove('highlighted'));
  });
}

function showSearchFeedback(msg, isError) {
  const fb = document.getElementById('searchFeedback');
  fb.className = isError ? 'search-feedback error' : 'search-feedback';
  fb.innerHTML = msg;
}

// 5. EVIDENCE ROOM & CLUES FILTERING
function renderClues(cluesList) {
  const grid = document.getElementById('cluesGrid');
  grid.innerHTML = '';

  cluesList.forEach(clue => {
    const card = document.createElement('div');
    card.className = 'clue-card';

    card.innerHTML = `
      <span class="clue-tag ${clue.tagClass}">${clue.typeLabel}</span>
      <h3 class="clue-title">${clue.title}</h3>
      <p class="clue-location">&#128205; ${clue.location}</p>
      <p class="clue-desc">${clue.desc}</p>
      <div class="clue-impact-badge">
        <strong>Forensic Impact:</strong>
        <p>${clue.impact}</p>
      </div>
      <button class="btn btn-secondary btn-inspect-clue" data-clue-id="${clue.id}">
        &#128065; Inspect Forensics
      </button>
    `;

    grid.appendChild(card);
  });

  document.querySelectorAll('.btn-inspect-clue').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.getAttribute('data-clue-id'), 10);
      openClueModal(id);
    });
  });
}

function initClueFilters() {
  const filterBtns = document.querySelectorAll('.btn-filter');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterType = btn.getAttribute('data-filter');
      if (filterType === 'all') {
        filteredClues = [...CLUES];
      } else {
        filteredClues = CLUES.filter(c => c.type === filterType);
      }
      renderClues(filteredClues);
    });
  });
}

// 6. EVIDENCE RANKING & BUBBLE SORT ANIMATION
function renderRanking() {
  // Clone and Bubble Sort in descending order matching case.c: bubbleSortByEvidenceDesc()
  const sorted = [...SUSPECTS];
  const n = sorted.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (sorted[j].evidencePoints < sorted[j + 1].evidencePoints) {
        const temp = sorted[j];
        sorted[j] = sorted[j + 1];
        sorted[j + 1] = temp;
      }
    }
  }

  // Prime suspect banner (Rank 1)
  const prime = sorted[0];
  const primeBanner = document.getElementById('primeSuspectBanner');
  primeBanner.innerHTML = `
    <div>
      <span class="prime-badge">&#128680; PRIME SUSPECT DETECTED</span>
      <h3 class="prime-title">${prime.name} (ID: ${prime.id}) &mdash; ${prime.role}</h3>
      <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 4px;">
        Contradicted alibi, access keycard log, matching shoe soil, and forensic blazer fiber.
      </p>
    </div>
    <div style="text-align: right;">
      <div class="prime-score">${prime.evidencePoints} pts</div>
      <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-dim); font-family: var(--font-mono);">Forensic Suspicion</span>
    </div>
  `;

  // Render Table Rows
  const tbody = document.getElementById('rankingTableBody');
  tbody.innerHTML = '';

  sorted.forEach((s, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="rank-badge-cell rank-${idx + 1}">#${idx + 1}</td>
      <td style="font-family: var(--font-mono); font-weight: 700; color: var(--accent-gold);">${s.id}</td>
      <td><strong>${s.name}</strong></td>
      <td style="color: var(--text-muted);">${s.role}</td>
      <td><strong style="color: var(--accent-gold-bright); font-family: var(--font-mono);">${s.evidencePoints} pts</strong></td>
      <td><span class="suspicion-pill ${s.levelClass}">${s.level}</span></td>
      <td>
        <button class="btn btn-ghost" style="padding: 4px 10px; font-size: 0.78rem;" onclick="openSuspectModal(${s.id})">
          Details
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Interactive Bubble Sort Step-by-Step Trace Simulation
function runSortTrace() {
  const logBox = document.getElementById('sortTraceLog');
  logBox.classList.add('active');
  logBox.innerHTML = '<strong>Initiating C Bubble Sort Simulation...</strong><br>';

  let arr = [...SUSPECTS.map(s => ({ name: s.name, points: s.evidencePoints }))];
  let n = arr.length;
  let step = 1;
  let logHtml = '<strong>[BUBBLE SORT DESCENDING TRACE]</strong><br>';
  logHtml += `Initial Array: [${arr.map(a => `${a.name}:${a.points}`).join(', ')}]<br><br>`;

  for (let i = 0; i < n - 1; i++) {
    logHtml += `<strong style="color: var(--accent-blue);">--- PASS ${i + 1} ---</strong><br>`;
    for (let j = 0; j < n - i - 1; j++) {
      let left = arr[j];
      let right = arr[j + 1];
      let comparison = `${left.name} (${left.points}) < ${right.name} (${right.points})`;

      if (left.points < right.points) {
        logHtml += `Step ${step++}: ${comparison} is TRUE &rarr; <span style="color: #ef4444;">SWAP</span> (${left.name} &harr; ${right.name})<br>`;
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      } else {
        logHtml += `Step ${step++}: ${comparison} is FALSE &rarr; No swap<br>`;
      }
    }
    logHtml += `State after Pass ${i + 1}: [${arr.map(a => `${a.name}:${a.points}`).join(', ')}]<br><br>`;
  }

  logHtml += `<strong style="color: #22c55e;">[SUCCESS] Array sorted in descending order!</strong><br>`;
  logHtml += `Rank #1 Prime Suspect: <strong>${arr[0].name} (${arr[0].points} pts)</strong>`;

  logBox.innerHTML = logHtml;
  logBox.scrollTop = logBox.scrollHeight;
}

// 7. MODALS (DOSSIER & CLUE VIEW)
function initModals() {
  const suspectModal = document.getElementById('suspectModal');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const btnModalClose = document.getElementById('btnModalClose');

  const clueModal = document.getElementById('clueModal');
  const btnCloseClueModal = document.getElementById('btnCloseClueModal');
  const btnClueModalClose = document.getElementById('btnClueModalClose');

  [btnCloseModal, btnModalClose].forEach(btn => {
    btn.addEventListener('click', () => suspectModal.classList.add('hidden'));
  });

  [btnCloseClueModal, btnClueModalClose].forEach(btn => {
    btn.addEventListener('click', () => clueModal.classList.add('hidden'));
  });

  suspectModal.addEventListener('click', (e) => {
    if (e.target === suspectModal) suspectModal.classList.add('hidden');
  });

  clueModal.addEventListener('click', (e) => {
    if (e.target === clueModal) clueModal.classList.add('hidden');
  });
}

function openSuspectModal(id) {
  const suspect = SUSPECTS.find(s => s.id === id);
  if (!suspect) return;

  document.getElementById('modalSuspectName').textContent = suspect.name;
  document.getElementById('modalSuspectRole').textContent = suspect.role;
  document.getElementById('modalSuspectId').textContent = suspect.id;
  document.getElementById('modalSuspectAlibi').textContent = `"${suspect.alibi}"`;
  document.getElementById('modalSuspectClue').textContent = suspect.primaryClue;
  document.getElementById('modalScoreText').textContent = `${suspect.evidencePoints} / 100 Points`;
  document.getElementById('modalScoreBar').style.width = `${suspect.evidencePoints}%`;

  document.getElementById('suspectModal').classList.remove('hidden');
}

function openClueModal(id) {
  const clue = CLUES.find(c => c.id === id);
  if (!clue) return;

  document.getElementById('modalClueTitle').textContent = clue.title;
  document.getElementById('modalClueLocation').innerHTML = `&#128205; Location: ${clue.location}`;
  document.getElementById('modalClueDesc').textContent = clue.desc;
  document.getElementById('modalClueRelation').textContent = clue.relation;
  document.getElementById('modalClueImpact').textContent = clue.impact;

  document.getElementById('clueModal').classList.remove('hidden');
}

// 8. CODE TABS SWITCHER
function initCodeTabs() {
  const tabs = document.querySelectorAll('.code-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const codeTarget = tab.getAttribute('data-code');
      document.querySelectorAll('.code-panel').forEach(panel => {
        panel.classList.toggle('active', panel.id === `code-${codeTarget}`);
      });
    });
  });
}

// 9. CTA & ACTION BUTTONS
function initActionButtons() {
  const btnStart = document.getElementById('btnStartInvestigation');
  if (btnStart) {
    btnStart.addEventListener('click', () => switchScreen('suspects'));
  }

  const btnQuickDemo = document.getElementById('btnQuickDemo');
  if (btnQuickDemo) {
    btnQuickDemo.addEventListener('click', () => switchScreen('cbridge'));
  }

  const btnSortTrace = document.getElementById('btnRunSortAnimation');
  if (btnSortTrace) {
    btnSortTrace.addEventListener('click', runSortTrace);
  }

  const btnRestart = document.getElementById('btnRestartInvestigation');
  if (btnRestart) {
    btnRestart.addEventListener('click', () => {
      document.getElementById('suspectSearchInput').value = '';
      document.getElementById('searchFeedback').className = 'search-feedback hidden';
      document.querySelectorAll('.suspect-card').forEach(c => c.classList.remove('highlighted'));
      switchScreen('dashboard');
    });
  }

  const btnDSAExp = document.getElementById('btnViewDSAExplanation');
  if (btnDSAExp) {
    btnDSAExp.addEventListener('click', () => switchScreen('cbridge'));
  }
}

// Global modal helper for inline calls
window.openSuspectModal = openSuspectModal;
