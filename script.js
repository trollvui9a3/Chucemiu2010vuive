const $ = (id) => document.getElementById(id);
const intro = $('intro');
const giftStage = $('giftStage');
const gift = $('gift');
const reveal = $('reveal');
const toast = $('toast');
let giftOpened = false;
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add('hidden'), 2600);
}

function hearts(count = 18, originX = window.innerWidth / 2, originY = window.innerHeight / 2) {
  const symbols = ['♡', '♥', '✦', '✧', '💗'];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'heart-float';
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = `${originX + (Math.random() - .5) * 170}px`;
    el.style.top = `${originY + (Math.random() - .5) * 50}px`;
    el.style.color = ['#ff79a8', '#e9a2d0', '#c5a9ff', '#ffc66d'][i % 4];
    el.style.setProperty('--drift', `${(Math.random() - .5) * 130}px`);
    el.style.animationDuration = `${1.3 + Math.random() * 1.2}s`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2700);
  }
}

function makeSparkles() {
  const wrap = $('sparkles');
  for (let i = 0; i < 28; i++) {
    const dot = document.createElement('span');
    dot.className = 'sparkle';
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.top = `${Math.random() * 100}%`;
    dot.style.setProperty('--dur', `${1.4 + Math.random() * 3}s`);
    dot.style.animationDelay = `${Math.random() * 3}s`;
    wrap.appendChild(dot);
  }
}

$('openGift').addEventListener('click', () => {
  intro.classList.add('hidden');
  giftStage.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  hearts(12, window.innerWidth / 2, window.innerHeight * .56);
});

function openGift() {
  if (giftOpened) return;
  giftOpened = true;
  gift.classList.add('opened');
  $('tapNote').textContent = 'Một chút phép màu đang đến... ✨';
  hearts(28, window.innerWidth / 2, window.innerHeight * .48);
  setTimeout(() => {
    giftStage.classList.add('hidden');
    reveal.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    hearts(20, window.innerWidth / 2, 180);
  }, 1050);
}
gift.addEventListener('click', openGift);
gift.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openGift(); }
});

$('yesBtn').addEventListener('click', () => {
  $('answerMessage').textContent = 'Vậy thì nhiệm vụ bí mật của tớ hoàn thành rồi — chúc cậu một ngày thật xinh 💖';
  hearts(34, window.innerWidth / 2, window.innerHeight * .72);
});
$('shyBtn').addEventListener('click', () => {
  $('answerMessage').textContent = 'Không sao hết nè 🙈 Chỉ cần cậu vui khi xem món quà này là tớ vui rồi.';
  hearts(10, window.innerWidth / 2, window.innerHeight * .72);
});
$('againBtn').addEventListener('click', () => {
  reveal.classList.add('hidden');
  giftStage.classList.add('hidden');
  intro.classList.remove('hidden');
  gift.classList.remove('opened');
  giftOpened = false;
  $('tapNote').textContent = 'Chạm vào hộp quà một lần nữa nhé 💗';
  $('answerMessage').textContent = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
  showToast('Món quà đã sẵn sàng mở lại 💌');
});
makeSparkles();
