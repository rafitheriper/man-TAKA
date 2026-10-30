"use client";
import { useEffect, useState } from "react";
import { content as c } from "../lib/content";

function useNow() {
  const [now, setNow] = useState(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}
const pad = (n) => String(n).padStart(2, "0");

export function Opening() {
  const now = useNow();
  const target = new Date(c.birthday);
  const left = now ? target - now : null;
  const day = 86400000;
  const p = left === null ? 0 : Math.min(1, Math.max(0, 1 - left / (c.windowDays * day)));
  let parts = null;
  if (left !== null && left > 0) {
    parts = [
      [Math.floor(left / day), "din"],
      [Math.floor((left % day) / 3600000), "ghonta"],
      [Math.floor((left % 3600000) / 60000), "minute"],
      [Math.floor((left % 60000) / 1000), "second"],
    ];
  }
  return (
    <section className="scene">
      <div className="wrap">
        <div className="moon" aria-hidden="true">
          <i style={{ transform: `translateX(${p * 100}%)` }} />
        </div>
        <h1>{c.opening.title}</h1>
        <p>{c.opening.line}</p>
        <div className="count" aria-live="off">
          {parts ? (
            parts.map(([n, l]) => (
              <div key={l}>
                <b>{pad(n)}</b>
                <span>{l}</span>
              </div>
            ))
          ) : left !== null ? (
            <p className="big">Aj-i shei din.</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function Typo() {
  const [fixed, setFixed] = useState(false);
  return (
    <section className="scene alt">
      <div className="wrap">
        <h2 className={fixed ? "" : "wrong"}>{fixed ? c.typo.right : c.typo.wrong}</h2>
        <p>{fixed ? c.typo.after : c.typo.before}</p>
        <button className="btn" onClick={() => setFixed((f) => !f)}>
          {fixed ? "Abar bhul koro" : "Spelling thik koro"}
        </button>
      </div>
    </section>
  );
}

export function Archive() {
  return (
    <section className="scene">
      <div className="wrap">
        <h2>Amader inside jokes</h2>
        <div className="list">
          {c.jokes.map((j) => (
            <details key={j.title}>
              <summary>{j.title}</summary>
              <p>{j.body}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Moment() {
  const [stage, setStage] = useState(0);
  const labels = ["Candle jalao", "Fuu dao", "Abar jalao"];
  return (
    <section className="scene alt">
      <div className="wrap">
        <div className={`candle s${stage}`} aria-hidden="true">
          <u />
          <em />
        </div>
        <h2>{stage === 0 ? c.moment.unlit : stage === 1 ? c.moment.lit : c.moment.done}</h2>
        <button className="btn" onClick={() => setStage((s) => (s + 1) % 3)}>
          {labels[stage]}
        </button>
        <div className="media">
          {c.photos.map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={src} alt="" onError={(e) => (e.currentTarget.style.display = "none")} />
          ))}
        </div>
        <div className="voices">
          {c.voices.map((v) => (
            <label key={v.src}>
              <span>{v.label}</span>
              <audio controls preload="none" src={v.src} />
            </label>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Letter() {
  return (
    <section className="scene">
      <div className="wrap letter">
        {c.letter.map((t, i) => (
          <p key={i}>{t}</p>
        ))}
        <p className="sig">{c.signature}</p>
      </div>
    </section>
  );
}

function age(now) {
  const born = new Date(c.born);
  let y = now.getFullYear() - born.getFullYear();
  let ann = new Date(born);
  ann.setFullYear(born.getFullYear() + y);
  if (ann > now) {
    y -= 1;
    ann = new Date(born);
    ann.setFullYear(born.getFullYear() + y);
  }
  const ms = now - ann;
  const day = 86400000;
  return [y, Math.floor(ms / day), Math.floor((ms % day) / 3600000), Math.floor((ms % 3600000) / 60000), Math.floor((ms % 60000) / 1000)];
}

export function Ending() {
  const now = useNow();
  const a = now ? age(now) : null;
  return (
    <section className="scene alt end">
      <div className="wrap">
        <h2>{c.ending}</h2>
        {a && (
          <div className="count">
            {[[a[0], "bochor"], [a[1], "din"], [a[2], "ghonta"], [a[3], "minute"], [a[4], "second"]].map(([n, l]) => (
              <div key={l}>
                <b>{pad(n)}</b>
                <span>{l}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
