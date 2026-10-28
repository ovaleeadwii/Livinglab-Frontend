// Layanan Chat CS: admin membalas chat dari pembeli.
// ---------------------------------------------------------------
// TODO (tim chat): ganti isi 3 fungsi di bawah dengan API/websocket asli.
// ChatbotPanel.jsx TIDAK perlu diubah selama bentuk datanya tetap:
//
//   Conversation: { id, buyerName, lastMessage, lastTime, unread, orderRef }
//   Message:      { id, from: "buyer" | "admin" | "bot", text, time }
//
//   getConversations()              -> Promise<Conversation[]>
//   getMessages(conversationId)     -> Promise<Message[]>
//   sendReply(conversationId, text) -> Promise<Message>   (pesan admin yang tersimpan)
//
// Kalau nanti ada bot yang menjawab otomatis, balasan bot cukup dikirim
// sebagai Message dengan from: "bot".
// ---------------------------------------------------------------

const USE_DUMMY = true; // ubah ke false setelah API chat siap
const API_BASE = (import.meta.env.VITE_API_BASE || "/api").replace(/\/$/, "");

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const nowTime = () =>
  new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Jakarta" });

// ---------- Data contoh (hanya dipakai saat USE_DUMMY = true) ----------
const dummyConversations = [
  { id: "c1", buyerName: "Rina Marlina", orderRef: "INV-4821", unread: 2, lastTime: "15:02" },
  { id: "c2", buyerName: "Toko Segar Sejahtera", orderRef: "Upgrade Reseller", unread: 0, lastTime: "14:40" },
  { id: "c3", buyerName: "SPPG Gisting 01", orderRef: "PO-MBG-0192", unread: 1, lastTime: "13:15" },
  { id: "c4", buyerName: "Andi Saputra", orderRef: "INV-4790", unread: 0, lastTime: "Kemarin" },
];

const dummyMessages = {
  c1: [
    { id: 1, from: "buyer", text: "Halo kak, pesanan saya INV-4821 sudah dikirim belum ya?", time: "14:58" },
    { id: 2, from: "bot", text: "Pesanan INV-4821 berstatus Diproses (sedang dikemas di Packhouse Gisting).", time: "14:58" },
    { id: 3, from: "buyer", text: "Kira-kira sampai kapan ya kak? Mau dipakai besok pagi.", time: "15:02" },
  ],
  c2: [
    { id: 1, from: "buyer", text: "Pengajuan upgrade reseller kami sudah disetujui?", time: "14:30" },
    { id: 2, from: "admin", text: "Sudah kami setujui ya, silakan login ulang untuk membuka menu penjual.", time: "14:40" },
  ],
  c3: [
    { id: 1, from: "buyer", text: "Mohon konfirmasi jadwal kirim PO-MBG-0192 untuk Kamis.", time: "13:15" },
  ],
  c4: [
    { id: 1, from: "buyer", text: "Terima kasih, sayurnya segar sekali!", time: "Kemarin" },
    { id: 2, from: "admin", text: "Sama-sama, ditunggu pesanan berikutnya 😊", time: "Kemarin" },
  ],
};

const lastOf = (id) => {
  const list = dummyMessages[id] || [];
  return list.length ? list[list.length - 1].text : "";
};

// ---------- Fungsi yang dipakai komponen ----------
export async function getConversations() {
  if (USE_DUMMY) {
    await wait(300);
    return dummyConversations.map((c) => ({ ...c, lastMessage: lastOf(c.id) }));
  }
  const res = await fetch(`${API_BASE}/admin/chats`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function getMessages(conversationId) {
  if (USE_DUMMY) {
    await wait(300);
    const conv = dummyConversations.find((c) => c.id === conversationId);
    if (conv) conv.unread = 0; // dianggap sudah dibaca
    return [...(dummyMessages[conversationId] || [])];
  }
  const res = await fetch(`${API_BASE}/admin/chats/${conversationId}/messages`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function sendReply(conversationId, text) {
  if (USE_DUMMY) {
    await wait(400);
    const msg = { id: Date.now(), from: "admin", text, time: nowTime() };
    dummyMessages[conversationId] = [...(dummyMessages[conversationId] || []), msg];
    const conv = dummyConversations.find((c) => c.id === conversationId);
    if (conv) conv.lastTime = msg.time;
    return msg;
  }
  const res = await fetch(`${API_BASE}/admin/chats/${conversationId}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
