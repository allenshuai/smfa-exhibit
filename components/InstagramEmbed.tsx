'use client';
import { useEffect, useState } from 'react';

export default function InstagramEmbed() {
  const [permalink, setPermalink] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const r = await fetch('/api/instagram/latest');
      const { latest } = await r.json();
      if (latest?.permalink) setPermalink(latest.permalink);
    })();
  }, []);

  useEffect(() => {
    if (!permalink) return;
    // load embed.js once
    if (!(window as any).instgrm) {
      const s = document.createElement('script');
      s.src = 'https://www.instagram.com/embed.js';
      s.async = true;
      s.onload = () => (window as any).instgrm?.Embeds?.process();
      document.body.appendChild(s);
    } else {
      (window as any).instgrm?.Embeds?.process();
    }
  }, [permalink]);

  if (!permalink) {
    return (
      <div className="border rounded p-3 text-sm text-[#6c584c] bg-white/60">
        Loading Instagram…
      </div>
    );
  }

  return (
    <div className="border rounded bg-white overflow-hidden">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={`${permalink}?utm_source=ig_embed`}
        data-instgrm-version="14"
        style={{ margin: 0, width: '100%' }}
      />
    </div>
  );
}
