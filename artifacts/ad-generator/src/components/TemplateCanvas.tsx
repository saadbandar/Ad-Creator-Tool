import { CSSProperties } from "react";

export const CANVAS_SIZE = 1080;

/* ── Brand colors ── */
export const C = {
  teal: "#6ac7bd",
  darkTeal: "#3c7974",
  deepGreen: "#1e3d2f",
  text: "#1a2e22",
  gray: "#6b7280",
};

/* ─────────────────────────────────────────────
   Shared: Footer (contact info)
───────────────────────────────────────────── */
export function Footer() {
  const rowStyle: CSSProperties = {
    display: "flex", alignItems: "center", gap: 8, color: "#fff", fontSize: 18, whiteSpace: "nowrap",
  };
  const iconStyle: CSSProperties = { width: 22, flexShrink: 0 };
  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0,
      height: 100,
      background: C.darkTeal,
      display: "flex", alignItems: "center",
      justifyContent: "space-between",
      padding: "0 44px",
      direction: "ltr",
      gap: 10,
    }}>
      {/* Social */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={rowStyle}>
          <svg style={iconStyle} viewBox="0 0 24 24" fill="#fff"><path d="M22 5.8a8.5 8.5 0 0 1-2.36.65 4.07 4.07 0 0 0 1.8-2.27 8.1 8.1 0 0 1-2.6 1A4.13 4.13 0 0 0 5.9 9.03a11.65 11.65 0 0 1-8.45-4.3 4.13 4.13 0 0 0 1.28 5.5A4 4 0 0 1 .96 9.7v.05a4.13 4.13 0 0 0 3.32 4.05 4.16 4.16 0 0 1-1.87.07 4.14 4.14 0 0 0 3.86 2.87A8.28 8.28 0 0 1 0 18.4a11.65 11.65 0 0 0 6.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.35-.01-.52A8.18 8.18 0 0 0 22 5.8z"/></svg>
          <span>@psau_edu_sa</span>
        </div>
        <div style={rowStyle}>
          <svg style={iconStyle} viewBox="0 0 24 24" fill="#fff"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z"/></svg>
          <span>@psau.edu.sa</span>
        </div>
      </div>
      {/* Web / Email */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={rowStyle}>
          <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          <span>https://www.psau.edu.sa/</span>
        </div>
        <div style={rowStyle}>
          <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          <span>rector.office@psau.edu.sa</span>
        </div>
      </div>
      {/* Address */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, textAlign: "right" }}>
        <div style={{ ...rowStyle, justifyContent: "flex-end", direction: "rtl" }}>
          <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span>شارع عبد الله بن عامر، الخرج</span>
        </div>
        <div style={{ color: "#ffffffbb", fontSize: 16, textAlign: "right" }}>
          Abdullah Bin Amer Street, Al-Kharj
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Shared: Logo on light background
───────────────────────────────────────────── */
export function LogoOnLight({ logo }: { logo: string }) {
  return (
    <div style={{ position: "absolute", top: 24, right: 28 }}>
      <img src={logo} alt="شعار الجامعة" crossOrigin="anonymous"
        style={{ width: 180, display: "block" }} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Shared: Logo on dark background
───────────────────────────────────────────── */
export function LogoOnDark({ logo }: { logo: string }) {
  return (
    <div style={{
      position: "absolute", top: 22, right: 28,
      backgroundColor: "rgba(255,255,255,0.18)",
      borderRadius: 14,
      padding: "8px 14px",
    }}>
      <img src={logo} alt="شعار الجامعة" crossOrigin="anonymous"
        style={{ width: 190, display: "block", mixBlendMode: "multiply" }} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Shared: Single arch-shaped image cell
───────────────────────────────────────────── */
function ArchCell({ x, y, w, h, bgImage }: {
  x: number; y: number; w: number; h: number; bgImage: string;
}) {
  return (
    <div style={{
      position: "absolute", left: x, top: y, width: w, height: h,
      overflow: "hidden",
      borderTopLeftRadius: "50% 55%",
      borderTopRightRadius: "50% 55%",
      borderBottomLeftRadius: "12%",
      borderBottomRightRadius: "12%",
    }}>
      <img src={bgImage} alt="" crossOrigin="anonymous"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(160deg, rgba(14,48,36,0.62) 0%, rgba(14,48,36,0.78) 100%)",
      }} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Shared: Arch shapes cluster (templates 2 & 3)
───────────────────────────────────────────── */
export function ArchCluster({ bgImage }: { bgImage: string }) {
  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 500 }}>
      <ArchCell bgImage={bgImage} x={-10}  y={-20}  w={390} h={440} />
      <ArchCell bgImage={bgImage} x={430}  y={-30}  w={350} h={390} />
      <ArchCell bgImage={bgImage} x={800}  y={-20}  w={310} h={370} />
      <ArchCell bgImage={bgImage} x={180}  y={130}  w={330} h={380} />
      <ArchCell bgImage={bgImage} x={590}  y={110}  w={310} h={370} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Shared: Hero image section (templates 4-6)
───────────────────────────────────────────── */
export function HeroSection({ bgImage, title, subtitle, height = 460 }: {
  bgImage: string; title: string; subtitle: string; height?: number;
}) {
  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height }}>
      <img src={bgImage} alt="" crossOrigin="anonymous"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(14,40,26,0.55) 0%, rgba(14,40,26,0.78) 55%, rgba(12,35,22,0.92) 100%)",
      }} />
      {/* Text */}
      <div style={{
        position: "absolute", bottom: 70, right: 0, left: 0,
        padding: "0 52px", direction: "rtl",
      }}>
        <h1 style={{ color: "#fff", fontSize: 78, fontWeight: 900, lineHeight: 1.1, margin: 0,
          textShadow: "0 2px 16px rgba(0,0,0,0.3)" }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ color: "rgba(255,255,255,0.88)", fontSize: 34, fontWeight: 400,
            margin: "8px 0 0", lineHeight: 1.4 }}>
            {subtitle}
          </p>
        )}
      </div>
      {/* Wave */}
      <div style={{ position: "absolute", bottom: -2, left: 0, right: 0 }}>
        <svg viewBox="0 0 1080 72" preserveAspectRatio="none" width="1080" height="72">
          <path d="M0,72 L0,48 Q540,-8 1080,48 L1080,72 Z" fill="#ffffff" />
        </svg>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   TEMPLATE 1 — Dark gradient header + 2×2 grid
   (the original design)
═══════════════════════════════════════════════════ */
export interface DarkGridData {
  bgImage: string; logo: string; pattern: string;
  title: string;
  items: { title: string; desc: string }[];
}
export function DarkGridCanvas({ data }: { data: DarkGridData }) {
  const { bgImage, logo, pattern, title, items } = data;
  const TOP_H = 490;
  const CURVE_H = 80;
  return (
    <div style={{ width: CANVAS_SIZE, height: CANVAS_SIZE, position: "relative",
      overflow: "hidden", backgroundColor: "#fff",
      fontFamily: "'Cairo','Arial',sans-serif", direction: "rtl" }}>
      {/* Image + dark overlay */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: TOP_H }}>
        <img src={bgImage} alt="" crossOrigin="anonymous"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(15,40,27,0.70) 0%, rgba(20,52,34,0.82) 55%, rgba(14,36,22,0.94) 100%)",
        }} />
        <LogoOnDark logo={logo} />
        <div style={{ position: "absolute", bottom: CURVE_H + 6, right: 0, left: 0, padding: "0 54px" }}>
          <h1 style={{ color: "#fff", fontSize: 108, fontWeight: 900, lineHeight: 1.05,
            textShadow: "0 3px 22px rgba(0,0,0,0.38)", margin: 0 }}>{title}</h1>
        </div>
      </div>
      {/* Curve */}
      <div style={{ position: "absolute", top: TOP_H - CURVE_H, left: 0, right: 0, height: CURVE_H + 50, zIndex: 10 }}>
        <svg viewBox="0 0 1080 130" preserveAspectRatio="none" width="1080" height="130">
          <path d="M0,130 L0,72 Q540,-26 1080,72 L1080,130 Z" fill="#ffffff" />
        </svg>
      </div>
      {/* White content */}
      <div style={{ position: "absolute", top: TOP_H + 12, left: 0, right: 0, bottom: 0,
        backgroundColor: "#fff", zIndex: 5, overflow: "hidden" }}>
        <img src={pattern} alt="" crossOrigin="anonymous"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", opacity: 0.09, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 2,
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "28px 44px", padding: "22px 58px",
          height: "100%", alignContent: "center", direction: "rtl", boxSizing: "border-box" }}>
          {items.slice(0, 4).map((item, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, direction: "rtl" }}>
                <span style={{ color: C.darkTeal, fontSize: 24, flexShrink: 0 }}>✦</span>
                <span style={{ color: C.text, fontSize: 28, fontWeight: 800, lineHeight: 1.2 }}>{item.title}</span>
              </div>
              <p style={{ color: C.gray, fontSize: 22, lineHeight: 1.55, margin: 0, paddingRight: 36 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   TEMPLATE 2 — Arch shapes + 2×2 grid
═══════════════════════════════════════════════════ */
export interface ArchGridData {
  bgImage: string; logo: string; pattern: string;
  title: string;
  items: { title: string; desc: string }[];
}
export function ArchGridCanvas({ data }: { data: ArchGridData }) {
  const { bgImage, logo, pattern, title, items } = data;
  return (
    <div style={{ width: CANVAS_SIZE, height: CANVAS_SIZE, position: "relative",
      overflow: "hidden", backgroundColor: "#fff",
      fontFamily: "'Cairo','Arial',sans-serif", direction: "rtl" }}>
      {/* Arch shapes */}
      <ArchCluster bgImage={bgImage} />
      {/* Logo on white */}
      <LogoOnLight logo={logo} />
      {/* Title */}
      <div style={{ position: "absolute", top: 490, right: 0, left: 0,
        padding: "0 54px", textAlign: "right", direction: "rtl" }}>
        <h1 style={{ color: C.text, fontSize: 68, fontWeight: 900, lineHeight: 1.1, margin: 0 }}>{title}</h1>
      </div>
      {/* Content grid */}
      <div style={{
        position: "absolute", top: 568, left: 0, right: 0, bottom: 100,
        overflow: "hidden",
      }}>
        <img src={pattern} alt="" crossOrigin="anonymous"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", opacity: 0.07, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 2,
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "22px 40px", padding: "20px 56px",
          height: "100%", alignContent: "center", direction: "rtl", boxSizing: "border-box" }}>
          {items.slice(0, 4).map((item, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, direction: "rtl" }}>
                <span style={{ color: C.darkTeal, fontSize: 22, flexShrink: 0 }}>❯</span>
                <span style={{ color: C.text, fontSize: 26, fontWeight: 800, lineHeight: 1.2 }}>{item.title}</span>
              </div>
              <p style={{ color: C.gray, fontSize: 21, lineHeight: 1.55, margin: 0, paddingRight: 34 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   TEMPLATE 3 — Arch shapes + flow diagram (5 items)
═══════════════════════════════════════════════════ */
export interface ArchFlowData {
  bgImage: string; logo: string;
  title: string;
  flowItems: { text: string; desc: string }[];
}
export function ArchFlowCanvas({ data }: { data: ArchFlowData }) {
  const { bgImage, logo, title, flowItems } = data;
  const items = [...flowItems];
  while (items.length < 5) items.push({ text: "نص", desc: "وصف" });

  const FlowBox = ({ item, style }: { item: { text: string; desc: string }; style: CSSProperties }) => (
    <div style={{
      border: `2px solid ${C.darkTeal}`,
      borderRadius: 16,
      padding: "14px 20px",
      direction: "rtl",
      ...style,
    }}>
      <div style={{ color: C.text, fontSize: 22, fontWeight: 700, lineHeight: 1.3 }}>{item.text}</div>
      <div style={{ color: C.gray, fontSize: 19, lineHeight: 1.45, marginTop: 5 }}>{item.desc}</div>
    </div>
  );

  return (
    <div style={{ width: CANVAS_SIZE, height: CANVAS_SIZE, position: "relative",
      overflow: "hidden", backgroundColor: "#fff",
      fontFamily: "'Cairo','Arial',sans-serif", direction: "rtl" }}>
      <ArchCluster bgImage={bgImage} />
      <LogoOnLight logo={logo} />
      {/* Title */}
      <div style={{ position: "absolute", top: 492, right: 0, left: 0,
        padding: "0 54px", textAlign: "center" }}>
        <h1 style={{ color: C.text, fontSize: 72, fontWeight: 900, lineHeight: 1.1, margin: 0 }}>{title}</h1>
      </div>
      {/* Flow diagram */}
      <div style={{ position: "absolute", top: 585, left: 40, right: 40, bottom: 110 }}>
        {/* Row 1: 2 boxes with arrow between */}
        <div style={{ display: "flex", gap: 0, alignItems: "center", marginBottom: 12 }}>
          <FlowBox item={items[0]} style={{ flex: 1 }} />
          <div style={{ display: "flex", alignItems: "center", flexShrink: 0, padding: "0 12px" }}>
            <svg width="44" height="20" viewBox="0 0 44 20">
              <path d="M0,10 L34,10 M28,4 L44,10 L28,16" stroke={C.darkTeal} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
          <FlowBox item={items[1]} style={{ flex: 1 }} />
        </div>
        {/* Corner diamond */}
        <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: 60, marginBottom: 12 }}>
          <span style={{ color: C.darkTeal, fontSize: 26 }}>✦</span>
        </div>
        {/* Row 2: 2 boxes with arrow between */}
        <div style={{ display: "flex", gap: 0, alignItems: "center", marginBottom: 12 }}>
          <FlowBox item={items[2]} style={{ flex: 1 }} />
          <div style={{ display: "flex", alignItems: "center", flexShrink: 0, padding: "0 12px" }}>
            <svg width="44" height="20" viewBox="0 0 44 20">
              <path d="M44,10 L10,10 M16,4 L0,10 L16,16" stroke={C.darkTeal} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
          <FlowBox item={items[3]} style={{ flex: 1 }} />
        </div>
        {/* Corner diamond */}
        <div style={{ display: "flex", justifyContent: "flex-start", paddingLeft: 60, marginBottom: 12 }}>
          <span style={{ color: C.darkTeal, fontSize: 26 }}>✦</span>
        </div>
        {/* Row 3: center box */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <FlowBox item={items[4]} style={{ width: "48%" }} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   TEMPLATE 4 — Hero full image + list grid (3 cols × N rows)
═══════════════════════════════════════════════════ */
export interface HeroListData {
  bgImage: string; logo: string; pattern: string;
  title: string; subtitle: string;
  sectionTitle: string;
  listItems: string[];
}
export function HeroListCanvas({ data }: { data: HeroListData }) {
  const { bgImage, logo, pattern, title, subtitle, sectionTitle, listItems } = data;
  const items = [...listItems];
  while (items.length < 12) items.push("محتوى نصي");
  const HERO_H = 440;

  return (
    <div style={{ width: CANVAS_SIZE, height: CANVAS_SIZE, position: "relative",
      overflow: "hidden", backgroundColor: "#fff",
      fontFamily: "'Cairo','Arial',sans-serif", direction: "rtl" }}>
      <HeroSection bgImage={bgImage} title={title} subtitle={subtitle} height={HERO_H} />
      <LogoOnDark logo={logo} />
      {/* White content section */}
      <div style={{ position: "absolute", top: HERO_H + 50, left: 0, right: 0, bottom: 100, overflow: "hidden" }}>
        <img src={pattern} alt="" crossOrigin="anonymous"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", opacity: 0.07, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", padding: "0 48px" }}>
          {/* Section title badge */}
          <div style={{
            backgroundColor: C.darkTeal, color: "#fff",
            fontSize: 26, fontWeight: 700,
            padding: "8px 40px", borderRadius: 30,
            marginBottom: 24, display: "inline-block",
          }}>
            {sectionTitle}
          </div>
          {/* 3-column grid */}
          <div style={{
            width: "100%",
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
            gap: "14px 32px", direction: "rtl",
          }}>
            {items.slice(0, 12).map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, direction: "rtl" }}>
                <span style={{ color: C.darkTeal, fontSize: 20, flexShrink: 0 }}>‹</span>
                <span style={{ color: C.text, fontSize: 21, fontWeight: 600, lineHeight: 1.3 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   TEMPLATE 5 — Hero full image + 3 stats/numbers
═══════════════════════════════════════════════════ */
export interface HeroStatsData {
  bgImage: string; logo: string; pattern: string;
  title: string; subtitle: string;
  stats: { number: string; label: string; desc: string }[];
}
export function HeroStatsCanvas({ data }: { data: HeroStatsData }) {
  const { bgImage, logo, pattern, title, subtitle, stats } = data;
  const items = [...stats];
  while (items.length < 3) items.push({ number: "—", label: "عنوان", desc: "وصف" });
  const HERO_H = 430;

  return (
    <div style={{ width: CANVAS_SIZE, height: CANVAS_SIZE, position: "relative",
      overflow: "hidden", backgroundColor: "#fff",
      fontFamily: "'Cairo','Arial',sans-serif", direction: "rtl" }}>
      <HeroSection bgImage={bgImage} title={title} subtitle={subtitle} height={HERO_H} />
      <LogoOnDark logo={logo} />
      {/* Stats section */}
      <div style={{ position: "absolute", top: HERO_H + 50, left: 0, right: 0, bottom: 100, overflow: "hidden" }}>
        <img src={pattern} alt="" crossOrigin="anonymous"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", opacity: 0.07, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 2, height: "100%",
          display: "flex", flexDirection: "column", justifyContent: "center",
          gap: 20, padding: "10px 52px" }}>
          {items.slice(0, 3).map((stat, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center",
              background: "rgba(108,199,189,0.06)",
              border: `1.5px solid ${C.teal}33`,
              borderRadius: 16,
              padding: "18px 28px",
              direction: "rtl",
              gap: 0,
            }}>
              {/* Stat number + label (right side) */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end",
                minWidth: 180, flexShrink: 0, borderLeft: `3px solid ${C.teal}`, paddingLeft: 24 }}>
                <span style={{ color: C.darkTeal, fontSize: 52, fontWeight: 900, lineHeight: 1 }}>{stat.number}</span>
                <span style={{ color: C.teal, fontSize: 24, fontWeight: 700, marginTop: 4 }}>{stat.label}</span>
              </div>
              {/* Description (left side) */}
              <div style={{ flex: 1, paddingRight: 28 }}>
                <p style={{ color: C.gray, fontSize: 22, lineHeight: 1.6, margin: 0, textAlign: "right" }}>{stat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   TEMPLATE 6 — Hero + complex (2 text blocks + 4 icon cards)
═══════════════════════════════════════════════════ */
export interface HeroComplexData {
  bgImage: string; logo: string; pattern: string;
  title: string; subtitle: string;
  textBlocks: { title: string; para: string }[];
  iconItems: { title: string; desc: string }[];
}
export function HeroComplexCanvas({ data }: { data: HeroComplexData }) {
  const { bgImage, logo, pattern, title, subtitle, textBlocks, iconItems } = data;
  const blocks = [...textBlocks];
  while (blocks.length < 2) blocks.push({ title: "عنوان نصي", para: "وصف قصير" });
  const icons = [...iconItems];
  while (icons.length < 4) icons.push({ title: "محتوى نصي", desc: "وصف قصير مختصر" });
  const HERO_H = 380;

  return (
    <div style={{ width: CANVAS_SIZE, height: CANVAS_SIZE, position: "relative",
      overflow: "hidden", backgroundColor: "#fff",
      fontFamily: "'Cairo','Arial',sans-serif", direction: "rtl" }}>
      <HeroSection bgImage={bgImage} title={title} subtitle={subtitle} height={HERO_H} />
      <LogoOnDark logo={logo} />
      {/* Content */}
      <div style={{ position: "absolute", top: HERO_H + 42, left: 0, right: 0, bottom: 100, overflow: "hidden" }}>
        <img src={pattern} alt="" crossOrigin="anonymous"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", opacity: 0.07, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 2, padding: "12px 48px", height: "100%",
          display: "flex", flexDirection: "column", gap: 18 }}>
          {/* 2 text blocks */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, direction: "rtl" }}>
            {blocks.slice(0, 2).map((b, i) => (
              <div key={i} style={{ background: "rgba(108,199,189,0.06)", border: `1.5px solid ${C.teal}33`,
                borderRadius: 14, padding: "16px 22px" }}>
                <div style={{ color: C.text, fontSize: 24, fontWeight: 800, marginBottom: 8 }}>{b.title}</div>
                <div style={{ color: C.gray, fontSize: 19, lineHeight: 1.55 }}>{b.para}</div>
              </div>
            ))}
          </div>
          {/* 4 icon cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, direction: "rtl" }}>
            {icons.slice(0, 4).map((item, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center",
                gap: 8, textAlign: "center", padding: "12px 8px" }}>
                <div style={{
                  width: 52, height: 52, borderRadius: "50%",
                  background: C.darkTeal,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ color: "#fff", fontSize: 26, fontWeight: 700 }}>✦</span>
                </div>
                <div style={{ color: C.text, fontSize: 21, fontWeight: 700 }}>{item.title}</div>
                <div style={{ color: C.gray, fontSize: 18, lineHeight: 1.4 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
