/**
 * rcn-core.js — Robotics Club Nitte
 * Shared utilities: hashing, data access, seeding defaults.
 * Loaded by: member-login.html, member-dashboard.html, admin-dashboard.html
 *
 * ─────────────────────────────────────────────────────────────
 *  ⚠️  IMPORTANT — BEFORE GOING LIVE:
 *  1. Replace localStorage with a real server-side database.
 *  2. Replace hashStr/hashPw with bcrypt/Argon2 on the server.
 *  3. Remove the TEST MEMBER SEED block below (clearly marked).
 * ─────────────────────────────────────────────────────────────
 */

'use strict';

// ════════════════════════════════════════════════════════════════
//  1. HASH UTILITY
//     Algorithm : FNV-1a (32-bit, non-cryptographic)
//     Purpose   : Client-side password obfuscation.
//     Salt      : username is prepended so identical passwords
//                 produce different hashes for different users.
//
//  ⚠️  NOT suitable for production with sensitive data.
//      Upgrade to server-side bcrypt/Argon2 for real security.
// ════════════════════════════════════════════════════════════════

/**
 * Core FNV-1a hash — returns an 8-character hex string.
 * @param {string} s - Input string
 * @returns {string}
 */
function hashStr(s) {
  let h = 0x811c9dc5;                      // FNV offset basis
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);                  // XOR with char code
    h = (h * 0x01000193) >>> 0;            // FNV prime multiply, 32-bit unsigned
  }
  return h.toString(16).padStart(8, '0');  // e.g. "a3f1c8d2"
}

/**
 * Username-salted password hash.
 * Combines username + separator + password before hashing
 * so two users with the same password get different stored hashes.
 * @param {string} username
 * @param {string} password
 * @returns {string}
 */
function hashPw(username, password) {
  return hashStr(username.toLowerCase().trim() + '::' + password);
}


// ════════════════════════════════════════════════════════════════
//  2. MEMBER DATA HELPERS
// ════════════════════════════════════════════════════════════════

/** @returns {Array} All member records from localStorage */
function getMembers() {
  return JSON.parse(localStorage.getItem('rcn_members') || '[]');
}

/** @param {Array} members - Full member array to persist */
function saveMembers(members) {
  localStorage.setItem('rcn_members', JSON.stringify(members));
}


// ════════════════════════════════════════════════════════════════
//  3. ADMIN DATA HELPERS
// ════════════════════════════════════════════════════════════════

/** @returns {Array} All admin records from localStorage */
function getAdmins() {
  const stored = localStorage.getItem('rcn_admins');
  if (stored) return JSON.parse(stored);

  // ── Seed default admin on first run ───────────────────────────
  const defaults = [
    {
      id:           'A001',
      name:         'Chandramouli Sharma',
      username:     'Chandramouli',
      email:        'nnm24cc010@nmamit.in',
      backupEmail:  'sharmachandramouli1905@gmail.com',
      usn:          'NNM24CC010',
      phone:        '6360296816',
      passwordHash: hashPw('Chandramouli', 'CmS@rcnnitte2025'),
      role:         'superadmin',
      createdAt:    new Date().toISOString(),
      lastLogin:    null,
    }
  ];
  localStorage.setItem('rcn_admins', JSON.stringify(defaults));
  return defaults;
}

/** @param {Array} admins - Full admin array to persist */
function saveAdmins(admins) {
  localStorage.setItem('rcn_admins', JSON.stringify(admins));
}


// ════════════════════════════════════════════════════════════════
//  4. GOOGLE SHEETS LOGIN TRACKER
//     To activate: go to Admin Dashboard → Settings → Configure
//     and paste your Apps Script Web App deployment URL.
// ════════════════════════════════════════════════════════════════

/**
 * Posts a login event to the configured Google Sheets webhook.
 * Silently does nothing if no URL has been configured.
 * @param {Object} member - The member who just logged in
 */
function logToSheets(member) {
  const url = localStorage.getItem('rcn_sheets_url');
  if (!url) return;
  fetch(url, {
    method:  'POST',
    mode:    'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name:       member.name,
      username:   member.username,
      email:      member.email,
      usn:        member.usn,
      dept:       member.dept,
      year:       member.year,
      loginTime:  new Date().toISOString(),
      loginCount: member.loginCount,
    }),
  }).catch(() => { /* silently swallow network errors */ });
}


// ════════════════════════════════════════════════════════════════
//  5. GENERAL UI HELPERS  (shared across all pages)
// ════════════════════════════════════════════════════════════════

/**
 * Show an alert box with a message and type class.
 * @param {string} id   - Element id
 * @param {string} msg  - Message text
 * @param {string} type - 'error' | 'success' | 'warning'
 */
function showAlert(id, msg, type = 'error') {
  const el = document.getElementById(id);
  if (!el) return;
  el.className = 'alert ' + type;
  el.textContent = msg;
  el.style.display = 'block';
}

/** Hide an alert box. @param {string} id */
function hideAlert(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = 'none';
}

/**
 * Toggle a password input between text and password type.
 * @param {string} id - Input element id
 */
function togglePw(id) {
  const el = document.getElementById(id);
  if (el) el.type = el.type === 'password' ? 'text' : 'password';
}

/**
 * Format an ISO date string to a readable date.
 * @param {string|null} iso
 * @returns {string}
 */
function fmtDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

/**
 * Format an ISO date string to a readable date + time.
 * @param {string|null} iso
 * @returns {string}
 */
function fmtDateTime(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    + ' ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

/**
 * Get name initials (up to 2 letters) for avatar display.
 * @param {string} name
 * @returns {string}
 */
function initials(name) {
  return (name || '?').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

/**
 * Trigger a JSON file download in the browser.
 * @param {any}    data     - Data to serialise
 * @param {string} filename - Download filename
 */
function downloadJson(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}


// ════════════════════════════════════════════════════════════════
//  6. SEED FUNCTIONS  (call once on page load)
// ════════════════════════════════════════════════════════════════

/**
 * Ensures the default admin exists in localStorage.
 * Safe to call on every page load — only writes on first run.
 */
function seedDefaultAdmin() {
  getAdmins(); // triggers the seed inside getAdmins() if needed
}


// ════════════════════════════════════════════════════════════════
//
//  ╔══════════════════════════════════════════════════════════╗
//  ║           TEST MEMBER — REMOVE BEFORE GOING LIVE        ║
//  ║                                                          ║
//  ║  Username : testmember                                   ║
//  ║  Password : Test@1234                                    ║
//  ║  Email    : testmember@nmamit.in                         ║
//  ║  USN      : NNM00TEST01                                  ║
//  ║  Phone    : 9999999999                                   ║
//  ║                                                          ║
//  ║  HOW TO REMOVE:                                          ║
//  ║  Delete the entire seedTestMember() function below AND   ║
//  ║  the seedTestMember() call at the bottom of this block.  ║
//  ╚══════════════════════════════════════════════════════════╝
//
// ── START OF TEST MEMBER BLOCK ────────────────────────────────

function seedTestMember() {
  const members = getMembers();

  // Only seed if not already present (checks by username)
  if (members.find(m => m.username === 'testmember')) return;

  members.push({
    id:           'M_TEST_001',            // fixed id so it's easy to find & delete
    name:         'Test Member',
    username:     'testmember',
    email:        'testmember@nmamit.in',
    usn:          'NNM00TEST01',
    phone:        '9999999999',
    dept:         'Computer Science & Engineering',
    passwordHash: hashPw('testmember', 'Test@1234'),
    status:       'active',               // pre-approved so login works immediately
    joinDate:     new Date().toISOString(),
    approvedDate: new Date().toISOString(),
    lastLogin:    null,
    loginCount:   0,
    _isTestAccount: true,                 // marker flag — easy to filter out in exports
  });

  saveMembers(members);
  console.info('[RCN] Test member seeded. Username: testmember | Password: Test@1234');
}

seedTestMember(); // ← DELETE THIS LINE when going live

// ── END OF TEST MEMBER BLOCK ──────────────────────────────────


// ════════════════════════════════════════════════════════════════
//  INITIALISE on every page load
// ════════════════════════════════════════════════════════════════
seedDefaultAdmin();
