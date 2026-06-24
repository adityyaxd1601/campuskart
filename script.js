// ── PRODUCT DATA ──
const products = {
  book: {
    emoji: '📗',
    bg: '#e8f5e9',
    cat: '📚 Books',
    name: 'Engineering Mathematics Book',
    price: '₹180',
    desc: 'B.S. Grewal — barely used, all topics covered. Ideal for B.Tech/BE students. No missing pages, clean condition with minimal highlights.',
    seller: 'Priya Mehta',
    sellerInit: 'PM',
    sellerMeta: 'MIT-WPU, 2nd Year Civil · 5 listings · ⭐ 4.8',
    chatRef: 'Engineering Mathematics Book',
    chatPrice: '₹180',
  },
  calc: {
    emoji: '🖩',
    bg: '#e3f2fd',
    cat: '💻 Electronics',
    name: 'Casio FX-991EX Calculator',
    price: '₹650',
    desc: 'Scientific calculator with 552 functions, perfect condition, original box and cover included. Great for Physics and Engineering exams.',
    seller: 'Aman Gupta',
    sellerInit: 'AG',
    sellerMeta: 'MIT-WPU, 3rd Year ECE · 8 listings · ⭐ 5.0',
    chatRef: 'Casio FX-991EX Calculator',
    chatPrice: '₹650',
  },
  laptop: {
    emoji: '💻',
    bg: '#ede7f6',
    cat: '💻 Electronics',
    name: 'Dell Inspiron 15 Laptop',
    price: '₹28,000',
    desc: 'i5 11th Gen, 8GB RAM, 512GB SSD — 2 years old, charger included. Minor scratch on lid. Runs perfectly, great for coding and design projects.',
    seller: 'Rohan Sharma',
    sellerInit: 'RS',
    sellerMeta: 'MIT-WPU, 3rd Year CSE · 12 listings · ⭐ 4.9',
    chatRef: 'Dell Inspiron 15 Laptop',
    chatPrice: '₹28,000',
  },
  cycle: {
    emoji: '🚲',
    bg: '#fff8e1',
    cat: '🚲 Cycles',
    name: 'Hero Sprint Bicycle',
    price: '₹3,200',
    desc: '21-speed mountain cycle, serviced last month, new brake pads. Perfect for navigating the campus and nearby areas. Lock included.',
    seller: 'Karan Patil',
    sellerInit: 'KP',
    sellerMeta: 'MIT-WPU, 1st Year MBA · 3 listings · ⭐ 4.7',
    chatRef: 'Hero Sprint Bicycle',
    chatPrice: '₹3,200',
  },
  mattress: {
    emoji: '🛏️',
    bg: '#fce4ec',
    cat: '🛏️ Hostel',
    name: 'Single Bed Mattress',
    price: '₹1,100',
    desc: '6-inch foam mattress in clean condition, comes with waterproof cover. Slightly used for one semester. Ideal for hostel rooms.',
    seller: 'Sneha Joshi',
    sellerInit: 'SJ',
    sellerMeta: 'MIT-WPU, 2nd Year Commerce · 2 listings · ⭐ 4.6',
    chatRef: 'Single Bed Mattress',
    chatPrice: '₹1,100',
  },
  notes: {
    emoji: '📓',
    bg: '#f3e5f5',
    cat: '📚 Books',
    name: 'CA Foundation Notes',
    price: '₹400',
    desc: 'Handwritten notes for all 4 subjects — Accounts, Law, Maths, Economics. Latest ICAI syllabus. Color-coded, well-organised.',
    seller: 'Ananya Kulkarni',
    sellerInit: 'AK',
    sellerMeta: 'MIT-WPU, 3rd Year BBA · 6 listings · ⭐ 4.9',
    chatRef: 'CA Foundation Notes',
    chatPrice: '₹400',
  },
};

let currentProduct = 'laptop';

// ── SCREEN NAVIGATION ──
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('screen-' + name);
  if (target) target.classList.add('active');

  // update bottom nav active state
  document.querySelectorAll('.bnav-btn').forEach(b => b.classList.remove('active'));
  const bnMap = { home: 'bn-home', create: 'bn-create', chat: 'bn-chat', login: 'bn-login' };
  if (bnMap[name]) {
    const bn = document.getElementById(bnMap[name]);
    if (bn) bn.classList.add('active');
  }

  // close mobile menu if open
  document.getElementById('mobileMenu').classList.remove('open');

  // scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // hide topbar on chat for more space on mobile
  const topbar = document.getElementById('topbar');
  topbar.style.display = name === 'chat' ? 'none' : '';
}

// ── PRODUCT DETAIL ──
function showProduct(key) {
  currentProduct = key;
  const p = products[key];
  if (!p) return;

  document.getElementById('detailImg').textContent = p.emoji;
  document.getElementById('detailImg').style.background = p.bg;
  document.getElementById('detailCat').textContent = p.cat;
  document.getElementById('detailName').textContent = p.name;
  document.getElementById('detailPrice').textContent = p.price;
  document.getElementById('detailDesc').textContent = p.desc;
  document.getElementById('sellerName').textContent = p.seller;
  document.getElementById('sellerAvatar').textContent = p.sellerInit;
  document.getElementById('sellerMeta').textContent = p.sellerMeta;

  showScreen('product');
}

// ── CHAT: sync ref card from current product ──
function syncChatRef() {
  const p = products[currentProduct];
  if (!p) return;
  document.getElementById('chatRefName').textContent = p.chatRef;
  document.getElementById('chatRefPrice').textContent = p.chatPrice;
}

// ── LOGIN ──
function doLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const pass = document.getElementById('loginPass').value.trim();

  if (!email) {
    alert('Please enter your college email.');
    return;
  }
  const validDomains = ['.edu', '.ac.in', '.edu.in'];
  const isValid = validDomains.some(d => email.endsWith(d));
  if (!isValid) {
    alert('⚠️ Only college emails (.edu / .ac.in) are accepted for verification.');
    return;
  }
  if (!pass) {
    alert('Please enter your password.');
    return;
  }
  showScreen('home');
}

// ── SEARCH ──
function filterProducts() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  const cards = document.querySelectorAll('.product-card');
  let visible = 0;
  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    const show = text.includes(q);
    card.style.display = show ? '' : 'none';
    if (show) visible++;
  });
  document.getElementById('noResults').style.display = visible === 0 ? 'block' : 'none';
}

// ── CATEGORY FILTER ──
function filterCat(el, cat) {
  document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');

  const cards = document.querySelectorAll('.product-card');
  let visible = 0;
  cards.forEach(card => {
    const show = cat === 'all' || card.dataset.cat === cat;
    card.style.display = show ? '' : 'none';
    if (show) visible++;
  });
  document.getElementById('noResults').style.display = visible === 0 ? 'block' : 'none';

  // reset search
  document.getElementById('searchInput').value = '';
}

// ── CHAT: send message ──
function sendMessageBtn() {
  sendChatMessage();
}
function sendMessage(e) {
  if (e.key === 'Enter') sendChatMessage();
}
function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;

  const box = document.getElementById('chatMessages');
  const msg = document.createElement('div');
  msg.className = 'msg sent';
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  msg.innerHTML = `<p>${escapeHtml(text)}</p><span class="msg-time">${time}</span>`;
  box.appendChild(msg);
  input.value = '';
  box.scrollTop = box.scrollHeight;

  // auto reply after short delay
  setTimeout(() => {
    const replies = [
      'Sure, I can arrange that! 😊',
      'Let me check and get back to you.',
      'Yes, it\'s still available!',
      'That works for me. See you then!',
      'Can we meet at the main gate instead?',
    ];
    const reply = document.createElement('div');
    reply.className = 'msg received';
    const rTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    reply.innerHTML = `<p>${replies[Math.floor(Math.random() * replies.length)]}</p><span class="msg-time">${rTime}</span>`;
    box.appendChild(reply);
    box.scrollTop = box.scrollHeight;
  }, 900 + Math.random() * 600);
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ── CREATE LISTING ──
function publishListing() {
  const title = document.getElementById('listTitle').value.trim();
  const desc = document.getElementById('listDesc').value.trim();
  const price = document.getElementById('listPrice').value.trim();
  const cat = document.getElementById('listCat').value;

  if (!title || !desc || !price || !cat) {
    alert('Please fill in all fields before publishing.');
    return;
  }

  document.getElementById('createForm').style.display = 'none';
  document.getElementById('createSuccess').style.display = 'block';

  // reset form silently for next use
  document.getElementById('listTitle').value = '';
  document.getElementById('listDesc').value = '';
  document.getElementById('listPrice').value = '';
  document.getElementById('listCat').value = '';
}

// ── MOBILE MENU ──
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  showScreen('landing');
  syncChatRef();

  // Re-sync chat ref whenever chat screen is shown
  const origShow = window.showScreen;
  window.showScreen = function(name) {
    origShow(name);
    if (name === 'chat') syncChatRef();
    if (name === 'create') {
      // reset success state
      document.getElementById('createForm').style.display = 'block';
      document.getElementById('createSuccess').style.display = 'none';
    }
  };
});
