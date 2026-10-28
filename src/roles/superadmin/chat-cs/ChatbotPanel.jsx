import React, { useCallback, useEffect, useRef, useState } from "react";
import { Search, Send, MessageSquare, Bot } from "lucide-react";
import { getConversations, getMessages, sendReply } from "../../../services/chatbotService";

// Inbox Chat CS: admin melihat daftar chat dari pembeli dan membalasnya.
// Pengambilan & pengiriman data ada di services/chatbotService.js (dikerjakan tim chat).

const BUBBLE = {
  admin: "ml-auto rounded-br-sm bg-[#176137] text-white",
  buyer: "mr-auto rounded-bl-sm border border-slate-200 bg-white text-slate-800",
  bot: "mr-auto rounded-bl-sm border border-dashed border-slate-300 bg-slate-100 text-slate-600",
};

export default function ChatbotPanel() {
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const listRef = useRef(null);

  const loadConversations = useCallback(async () => {
    try {
      setConversations(await getConversations());
    } catch (err) {
      setError(`Gagal memuat daftar chat (${err.message}).`);
    }
  }, []);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  // Ambil pesan saat percakapan dipilih
  useEffect(() => {
    if (!activeId) return;
    let cancelled = false;
    setLoadingMessages(true);
    setError(null);
    getMessages(activeId)
      .then((data) => !cancelled && setMessages(data))
      .catch((err) => !cancelled && setError(`Gagal memuat pesan (${err.message}).`))
      .finally(() => {
        if (!cancelled) setLoadingMessages(false);
        loadConversations(); // perbarui badge belum dibaca
      });
    return () => {
      cancelled = true;
    };
  }, [activeId, loadConversations]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || !activeId || sending) return;
    setSending(true);
    setError(null);
    try {
      const saved = await sendReply(activeId, text);
      setMessages((prev) => [...prev, saved]);
      setInput("");
      loadConversations();
    } catch (err) {
      setError(`Balasan gagal dikirim (${err.message}).`);
    } finally {
      setSending(false);
    }
  };

  const active = conversations.find((c) => c.id === activeId);
  const filtered = conversations.filter((c) => c.buyerName.toLowerCase().includes(search.toLowerCase()));
  const totalUnread = conversations.reduce((sum, c) => sum + (c.unread || 0), 0);

  return (
    <section className="grid h-[calc(100vh-8rem)] grid-cols-1 overflow-hidden rounded-2xl border border-slate-200 bg-white md:grid-cols-[320px_1fr]">
      {/* Daftar percakapan */}
      <aside className={`flex flex-col border-r border-slate-200 ${activeId ? "hidden md:flex" : "flex"}`}>
        <div className="border-b border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Chat Pembeli</h2>
            {totalUnread > 0 && (
              <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                {totalUnread} baru
              </span>
            )}
          </div>
          <label className="mt-3 flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
            <Search size={14} className="text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari pembeli..."
              className="w-full bg-transparent text-sm outline-none"
            />
          </label>
        </div>

        <ul className="flex-1 overflow-y-auto">
          {filtered.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => setActiveId(c.id)}
                className={`flex w-full gap-3 border-b border-slate-100 px-4 py-3 text-left hover:bg-slate-50 ${
                  c.id === activeId ? "bg-green-50" : ""
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-600">
                  {c.buyerName.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold text-slate-900">{c.buyerName}</span>
                    <span className="shrink-0 font-mono text-[10px] text-slate-400">{c.lastTime}</span>
                  </div>
                  <div className="font-mono text-[10px] text-[#176137]">{c.orderRef}</div>
                  <div className="flex items-center justify-between gap-2">
                    <span className={`truncate text-xs ${c.unread ? "font-semibold text-slate-800" : "text-slate-500"}`}>
                      {c.lastMessage}
                    </span>
                    {c.unread > 0 && (
                      <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-[#176137] px-1.5 text-[10px] font-bold text-white">
                        {c.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            </li>
          ))}
          {filtered.length === 0 && <li className="p-6 text-center text-sm text-slate-400">Tidak ada chat.</li>}
        </ul>
      </aside>

      {/* Jendela chat */}
      <div className={`flex min-w-0 flex-col ${activeId ? "flex" : "hidden md:flex"}`}>
        {!active ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 text-slate-400">
            <MessageSquare size={40} />
            <p className="text-sm">Pilih chat pembeli di sebelah kiri untuk membalas.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-3">
              <button
                type="button"
                onClick={() => setActiveId(null)}
                className="rounded-md px-2 py-1 text-sm text-slate-500 hover:bg-slate-100 md:hidden"
              >
                ←
              </button>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-600">
                {active.buyerName.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">{active.buyerName}</div>
                <div className="font-mono text-[10px] text-[#176137]">{active.orderRef}</div>
              </div>
            </div>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-slate-50 px-5 py-4">
              {loadingMessages && <p className="text-center text-sm text-slate-400">Memuat pesan...</p>}
              {!loadingMessages &&
                messages.map((m) => (
                  <div key={m.id} className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${BUBBLE[m.from] || BUBBLE.buyer}`}>
                    {m.from === "bot" && (
                      <div className="mb-1 flex items-center gap-1 font-mono text-[10px] font-semibold">
                        <Bot size={12} /> Balasan otomatis
                      </div>
                    )}
                    <p className="whitespace-pre-wrap">{m.text}</p>
                    <div className={`mt-1 text-right font-mono text-[10px] ${m.from === "admin" ? "text-green-100" : "text-slate-400"}`}>
                      {m.time}
                    </div>
                  </div>
                ))}
            </div>

            {error && <div className="border-t border-red-200 bg-red-50 px-5 py-2 text-xs text-red-600">{error}</div>}

            <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-slate-200 px-5 py-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Balas ${active.buyerName}...`}
                className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-[#176137]"
              />
              <button
                type="submit"
                disabled={sending || !input.trim()}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#176137] text-white hover:bg-[#12542e] disabled:opacity-50"
                aria-label="Kirim balasan"
              >
                <Send size={16} />
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
