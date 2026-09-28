
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1554075816453734460/5Pnk7goYZ_bf0JbspTqzq_qNHEO8QWuyiAklGebiBEDPbPspMg2zcBKdeQkKfQMleLQl";

function generateStars(count = 120) {
  const container = document.getElementById("stars");
  for (let i = 0; i < count; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * 100 + "vw";
    star.style.top = Math.random() * 100 + "vh";
    star.style.animationDelay = Math.random() * 3 + "s";
    star.style.width = star.style.height = (Math.random() * 1.5 + 1) + "px";
    container.appendChild(star);
  }
}
generateStars();

async function playOpening() {
  const lines = document.querySelectorAll("#opening-lines .line");
  for (const line of lines) {
    await wait(900);
    line.classList.add("show");
    await wait(1800);
  }
  await wait(500);
  const btn = document.getElementById("btn-continue");
  btn.hidden = false;
  btn.classList.add("fade-in");
}
playOpening();

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function showScene(id) {
  document.querySelectorAll(".scene").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

document.getElementById("btn-continue").addEventListener("click", () => {
  showScene("scene-message");
});

document.getElementById("btn-to-gift").addEventListener("click", () => {
  showScene("scene-gift");
});

const claimBtn = document.getElementById("btn-claim");
const statusEl = document.getElementById("status");

claimBtn.addEventListener("click", async () => {
  claimBtn.disabled = true;
  statusEl.textContent = "hadiahmu sedang dikirim...";

  const waktu = new Date().toLocaleString("id-ID", {
    day: "numeric", month: "long", year: "numeric",
    hour: "2-digit", minute: "2-digit"
  });

  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `🚨 Tombol hadiah telah ditekan!\nWaktu: ${waktu}`
      })
    });
  } catch (err) {
    console.warn("Gagal kirim ke Discord:", err);
  }

const envelopeBtn = document.getElementById("btn-envelope");
const envelopeWrap = document.getElementById("envelope-wrap");
const letterEl = document.getElementById("letter");

envelopeBtn.addEventListener("click", () => {
  envelopeBtn.classList.add("open");   // flap-nya mulai muter kebuka
  envelopeBtn.disabled = true;

  setTimeout(() => {
    envelopeWrap.classList.add("fade-out"); // amplopnya memudar
    letterEl.classList.remove("hidden");
    letterEl.classList.add("show");          // suratnya muncul, membesar pelan
  }, 700); // nunggu animasi flap selesai dulu (700ms = 0.7s sesuai transition di CSS)
});
  
  await wait(2500);
  statusEl.textContent = "🎉 hadiahmu telah dikirim!";
  claimBtn.textContent = "sudah dikirim";
});
