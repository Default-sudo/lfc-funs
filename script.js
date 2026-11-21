document.addEventListener('DOMContentLoaded', () => {
  // 1. 2026-27 First-Team Squad Data
  const squad = [
    { number: 1, name: 'Alisson Becker', role: 'GK', label: 'Goalkeeper' },
    { number: 25, name: 'Giorgi Mamardashvili', role: 'GK', label: 'Goalkeeper' },
    { number: 4, name: 'Virgil van Dijk (C)', role: 'DEF', label: 'Defender' },
    { number: 33, name: 'Ronald Araújo', role: 'DEF', label: 'Defender' },
    { number: 6, name: 'Milos Kerkez', role: 'DEF', label: 'Defender' },
    { number: 30, name: 'Jeremie Frimpong', role: 'DEF', label: 'Defender' },
    { number: 12, name: 'Conor Bradley', role: 'DEF', label: 'Defender' },
    { number: 2, name: 'Joe Gomez', role: 'DEF', label: 'Defender' },
    { number: 7, name: 'Florian Wirtz', role: 'MID', label: 'Midfielder' },
    { number: 8, name: 'Dominik Szoboszlai', role: 'MID', label: 'Midfielder' },
    { number: 10, name: 'Alexis Mac Allister', role: 'MID', label: 'Midfielder' },
    { number: 38, name: 'Ryan Gravenberch', role: 'MID', label: 'Midfielder' },
    { number: 3, name: 'Wataru Endō', role: 'MID', label: 'Midfielder' },
    { number: 9, name: 'Alexander Isak', role: 'FWD', label: 'Forward' },
    { number: 18, name: 'Cody Gakpo', role: 'FWD', label: 'Forward' },
    { number: 14, name: 'Federico Chiesa', role: 'FWD', label: 'Forward' },
    { number: 29, name: 'Bradley Barcola', role: 'FWD', label: 'Forward' },
    { number: 22, name: 'Hugo Ekitiké', role: 'FWD', label: 'Forward' }
  ];

  const squadGrid = document.getElementById('squad-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  function renderSquad(filterRole) {
    const filtered = filterRole === 'all'
      ? squad
      : squad.filter(player => player.role === filterRole);

    squadGrid.innerHTML = filtered.map(player => `
      <article class="player-card">
        <div class="player-info">
          <h3>${player.name}</h3>
          <span>${player.label}</span>
        </div>
        <span class="jersey-num">#${player.number}</span>
      </article>
    `).join('');
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderSquad(btn.dataset.role);
    });
  });

  renderSquad('all');

  // 2. Interactive Fan Wall with LocalStorage
  const fanForm = document.getElementById('fan-form');
  const fanPostsContainer = document.getElementById('fan-posts');

  const defaultPosts = [
    { name: 'Liam (Anfield)', msg: 'Walk on, with hope in your heart! Up the Reds!', date: 'Matchday' },
    { name: 'Maya (Dublin)', msg: 'Can’t wait to see Wirtz and Isak link up under the Anfield lights.', date: 'Matchday' }
  ];

  let posts = JSON.parse(localStorage.getItem('lfc_fan_posts')) || defaultPosts;

  function renderPosts() {
    fanPostsContainer.innerHTML = '';
    posts.forEach(post => {
      const card = document.createElement('article');
      card.className = 'post-card';

      const header = document.createElement('div');
      header.className = 'post-header';
      header.textContent = `${post.name} • ${post.date}`;

      const body = document.createElement('p');
      body.textContent = post.msg; // Safe text rendering

      card.appendChild(header);
      card.appendChild(body);
      fanPostsContainer.appendChild(card);
    });
  }

  fanForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('fan-name');
    const msgInput = document.getElementById('fan-msg');

    const newPost = {
      name: nameInput.value.trim(),
      msg: msgInput.value.trim(),
      date: new Date().toLocaleDateString()
    };

    posts.unshift(newPost);
    localStorage.setItem('lfc_fan_posts', JSON.stringify(posts));
    renderPosts();

    nameInput.value = '';
    msgInput.value = '';
  });

  renderPosts();
});
