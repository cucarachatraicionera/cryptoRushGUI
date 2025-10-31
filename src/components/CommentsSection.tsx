'use client';
import React, { useMemo, useState } from 'react';
import { User2, Clock } from 'lucide-react';

type Comment = {
  id: string;
  name: string;
  text: string;
  createdAt: number; // epoch ms
};

const seed: Comment[] = [
  { id: 'c1', name: 'Alex Chen', text: 'A fresh model blending AI with profit sharing — excited to be part of this.', createdAt: Date.now() - 2 * 60 * 60 * 1000 },
  { id: 'c2', name: 'Sarah Johnson', text: 'Finally, a project that combines AI innovation with fair profit sharing.', createdAt: Date.now() - 26 * 60 * 60 * 1000 },
  { id: 'c3', name: 'Crypto Enthusiast', text: 'Looking forward to the holders dashboard!', createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000 },
];

function timeAgo(ts: number) {
  const diff = Math.max(0, Date.now() - ts);
  const sec = Math.floor(diff / 1000);
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);
  if (day > 0) return `${day}d ago`;
  if (hr > 0) return `${hr}h ago`;
  if (min > 0) return `${min}m ago`;
  return 'just now';
}

const CommentsSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>(seed);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  const remaining = useMemo(() => 480 - text.length, [text]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setOk(null);

    if (website.trim() !== '') {
      return;
    }
    const nm = name.trim();
    const tx = text.trim();

    if (nm.length === 0 || tx.length === 0) {
      setError('Please fill in your name and comment.');
      return;
    }
    if (nm.length > 60) {
      setError('Name must be 60 characters or fewer.');
      return;
    }
    if (tx.length > 480) {
      setError('Comment must be 480 characters or fewer.');
      return;
    }

    const newComment: Comment = {
      id: Math.random().toString(36).slice(2),
      name: nm,
      text: tx,
      createdAt: Date.now(),
    };
    setComments((prev) => [newComment, ...prev]);
    setName('');
    setText('');
    setOk('Comment posted.');
  }

  return (
    <section id="comments" className="py-24">
      <div className="container mx-auto px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-sora font-semibold tracking-tight text-white">
            Community Comments
          </h2>
          <p className="mt-2 text-sm md:text-base text-crypto-muted">
            Share your thoughts about Crypto Rush. Be respectful; comments are public.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Comments list */}
          <div className="space-y-4">
            {comments.length === 0 ? (
              <div className="rounded-2xl border border-crypto-surface bg-crypto-surface/40 p-6 text-crypto-muted">
                Be the first to comment.
              </div>
            ) : (
              comments.map((c) => (
                <article key={c.id} className="rounded-2xl border border-crypto-surface bg-crypto-surface/40 p-6">
                  <header className="mb-2 flex items-center gap-3 text-slate-200">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-crypto-surface">
                      <User2 className="h-5 w-5 text-slate-400" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-white">{c.name}</span>
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock className="h-3.5 w-3.5" />
                        {timeAgo(c.createdAt)}
                      </span>
                    </div>
                  </header>
                  <p className="leading-relaxed text-slate-300">{c.text}</p>
                </article>
              ))
            )}
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-crypto-surface bg-crypto-surface/40 p-6">
            <form onSubmit={onSubmit} className="space-y-4" noValidate>
              {/* honeypot */}
              <input
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Name <span className="text-slate-500">(required)</span>
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={60}
                  className="w-full rounded-xl border border-crypto-surface bg-crypto-surface/60 px-3 py-2 text-slate-100 outline-none ring-crypto-neon/30 placeholder:text-slate-500 focus:ring"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Comment <span className="text-slate-500">(required)</span>
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  maxLength={480}
                  rows={5}
                  className="w-full resize-none rounded-xl border border-crypto-surface bg-crypto-surface/60 px-3 py-2 text-slate-100 outline-none ring-crypto-neon/30 placeholder:text-slate-500 focus:ring"
                  placeholder="Share your thoughts…"
                  required
                  aria-describedby="char-remaining"
                />
                <div id="char-remaining" className={`mt-1 text-right text-xs ${remaining < 0 ? 'text-rose-400' : 'text-slate-400'}`}>
                  {remaining} characters left
                </div>
              </div>

              {error && <div className="rounded-lg bg-rose-500/10 px-3 py-2 text-sm text-rose-300">{error}</div>}
              {ok && (
                <div className="rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300" aria-live="polite">
                  {ok}
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-crypto-neon/90 px-4 py-2 font-medium text-slate-900 shadow-[0_0_20px_rgba(34,247,174,0.35)] transition hover:bg-crypto-neon"
              >
                Post Comment
              </button>
              <p className="text-xs text-crypto-muted">*No backend yet. Comments are stored locally for demo purposes.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommentsSection;