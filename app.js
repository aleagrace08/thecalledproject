// Dark mode
function toggleDark() {
  const isDark = document.body.classList.toggle('dark');
  document.getElementById('darkIcon').textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('called-dark', isDark ? '1' : '');
}

// Restore dark mode preference on load
(function() {
  if (localStorage.getItem('called-dark') === '1') {
    document.body.classList.add('dark');
    const icon = document.getElementById('darkIcon');
    if (icon) icon.textContent = '☀️';
  }
})();

// Page routing
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

// Donate amount selection
function selectAmount(el) {
  document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
}

// Donate CTA
function handleDonate() {
  const selected = document.querySelector('.amount-btn.selected');
  const amount = selected ? selected.querySelector('.amt').textContent : '$10';
  alert('Thank you for your generosity! You would be redirected to donate ' + amount + ' to Doctors Without Borders.');
}

// Journal entry saving
function saveEntry() {
  const title = document.getElementById('journalTitle').value.trim();
  const body  = document.getElementById('journalBody').value.trim();
  if (!title && !body) return;
  const dateStr = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const el = document.createElement('div');
  el.className = 'entry-card';
  el.style.animation = 'fadeIn 0.3s ease';
  el.innerHTML = `
    <div class="entry-date">${dateStr}</div>
    <div class="entry-title">${title || 'Untitled'}</div>
    <div class="entry-body">${body || '…'}</div>
    <div class="entry-mood">✍️</div>`;
  document.getElementById('journalEntries').prepend(el);
  document.getElementById('journalTitle').value = '';
  document.getElementById('journalBody').value  = '';
}

// Stories filter
function filterStories(specialty, pill) {
  document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
  pill.classList.add('active');
  document.querySelectorAll('#storyGrid .story-card').forEach(card => {
    const match = specialty === 'all' || card.dataset.specialty === specialty;
    card.classList.toggle('hidden', !match);
  });
}

// Newsletter subscription
function subscribeNewsletter() {
  const email = document.getElementById('nlEmail').value.trim();
  if (!email || !email.includes('@')) {
    document.getElementById('nlEmail').style.outline = '2px solid #C1684A';
    return;
  }
  document.getElementById('nlForm').style.display = 'none';
  document.getElementById('nlSuccess').style.display = 'block';
}

// Character count for story submission
function updateCharCount(textarea) {
  const count = textarea.value.length;
  const el = document.getElementById('charCount');
  el.textContent = count + ' / 1500 characters';
  el.style.color = count > 1500 ? '#C1684A' : '#78716C';
}

// Submit story form
function submitStory() {
  const fname   = document.getElementById('fname').value.trim();
  const lname   = document.getElementById('lname').value.trim();
  const semail  = document.getElementById('semail').value.trim();
  const specialty = document.getElementById('specialty').value;
  const storyBody = document.getElementById('storyBody').value.trim();
  const consent   = document.getElementById('consent').checked;

  // Basic validation
  if (!fname || !lname) { alert('Please enter your name.'); return; }
  if (!semail || !semail.includes('@')) { alert('Please enter a valid email.'); return; }
  if (!specialty) { alert('Please select your specialty.'); return; }
  if (!storyBody || storyBody.length < 100) { alert('Please write at least 100 characters for your story.'); return; }
  if (!consent) { alert('Please check the consent box to submit.'); return; }

  // Mark all steps done
  ['step1','step2','step3'].forEach(id => {
    const s = document.getElementById(id);
    s.classList.remove('active');
    s.classList.add('done');
  });

  document.getElementById('submitForm').style.display = 'none';
  document.getElementById('submitSuccess').style.display = 'block';
  window.scrollTo(0, 0);
}

// Set today's date in journal
document.getElementById('todayDate').textContent =
  new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
