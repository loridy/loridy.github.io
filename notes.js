// Notes index renderer
// To publish a new note:
//   1. Add an entry to content/notes.json
//   2. Create content/notes/<slug>/index.md  (or index.html)
// The list page and tag filters are built automatically.

(async function () {
  const listEl    = document.getElementById('notes-list');
  const filtersEl = document.getElementById('notes-filters');
  if (!listEl) return;

  let notes = [];
  try {
    const res = await fetch('content/notes.json');
    notes = await res.json();
  } catch (e) {
    listEl.innerHTML = '<p style="color:var(--muted)">Could not load notes.</p>';
    return;
  }

  // Sort newest first
  notes.sort((a, b) => b.date.localeCompare(a.date));

  // Collect unique tags
  const allTags = ['all', ...new Set(notes.flatMap(n => n.tags || []))];
  let activeTag = 'all';

  // Build filter buttons
  allTags.forEach(tag => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (tag === 'all' ? ' active' : '');
    btn.textContent = tag === 'all' ? 'All' : tag;
    btn.addEventListener('click', () => {
      activeTag = tag;
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      render();
    });
    filtersEl.appendChild(btn);
  });

  function render() {
    const visible = activeTag === 'all' ? notes : notes.filter(n => (n.tags || []).includes(activeTag));
    listEl.innerHTML = '';
    if (visible.length === 0) {
      listEl.innerHTML = '<p style="color:var(--muted)">No notes yet.</p>';
      return;
    }
    visible.forEach(note => {
      const a = document.createElement('a');
      a.className = 'note-card';
      a.href = `content/notes/${note.slug}/index.html`;

      const tags = (note.tags || []).map(t => `<span class="note-tag">${t}</span>`).join('');
      a.innerHTML = `
        <div class="note-card-meta">
          <span class="note-date">${formatDate(note.date)}</span>
          ${tags}
        </div>
        <h3>${note.title}</h3>
        ${note.summary ? `<p>${note.summary}</p>` : ''}
      `;
      listEl.appendChild(a);
    });
  }

  function formatDate(iso) {
    const d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  render();
})();
