import { useState, useRef, useCallback, useId, useEffect } from "react";
import html2canvas from "html2canvas";
import defaultBg from "@assets/social_media-03_1776117368027.png";
import patternImg from "@assets/pattern_1776117955422.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, RefreshCw, ImageIcon, Eye } from "lucide-react";

const CANVAS_SIZE = 1080;

type ContentItem = { title: string; desc: string };

const DEFAULT_ITEMS: ContentItem[] = [
  { title: "محتوى نصي", desc: "وصف قصير مختصر ليتم إستبداله لاحقًا..." },
  { title: "محتوى نصي", desc: "وصف قصير مختصر ليتم إستبداله لاحقًا..." },
  { title: "محتوى نصي", desc: "وصف قصير مختصر ليتم إستبداله لاحقًا..." },
  { title: "محتوى نصي", desc: "وصف قصير مختصر ليتم إستبداله لاحقًا..." },
];

export default function AdGenerator() {
  const [title, setTitle] = useState("العنوان");
  const [items, setItems] = useState<ContentItem[]>(DEFAULT_ITEMS.map(i => ({ ...i })));
  const [bgImage, setBgImage] = useState<string>(defaultBg);
  const [isExporting, setIsExporting] = useState(false);

  /* Scale factor for the preview */
  const [scale, setScale] = useState(0.5);
  const wrapperRef = useRef<HTMLDivElement>(null);

  /* Ref for the FULL-SIZE hidden export canvas (no transform applied) */
  const exportRef = useRef<HTMLDivElement>(null);

  const fileInputId = useId();

  /* Watch preview wrapper and update scale */
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / CANVAS_SIZE);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const updateItem = (i: number, field: keyof ContentItem, v: string) =>
    setItems(prev => { const n = [...prev]; n[i] = { ...n[i], [field]: v }; return n; });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => ev.target?.result && setBgImage(ev.target.result as string);
    reader.readAsDataURL(file);
  };

  /* Export: capture the FULL-SIZE hidden element — no transforms involved */
  const exportAsImage = useCallback(async () => {
    const el = exportRef.current;
    if (!el) return;
    setIsExporting(true);
    try {
      /* Make it briefly visible so html2canvas can render it */
      el.style.visibility = "visible";
      await new Promise(r => setTimeout(r, 100)); /* let images settle */

      const canvas = await html2canvas(el, {
        scale: 1,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        width: CANVAS_SIZE,
        height: CANVAS_SIZE,
        windowWidth: CANVAS_SIZE,
        windowHeight: CANVAS_SIZE,
        imageTimeout: 20000,
      });

      el.style.visibility = "hidden";

      const link = document.createElement("a");
      link.download = "إعلان-جامعة-سطام.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Export error:", err);
      if (exportRef.current) exportRef.current.style.visibility = "hidden";
    } finally {
      setIsExporting(false);
    }
  }, []);

  const resetAll = () => {
    setBgImage(defaultBg);
    setTitle("العنوان");
    setItems(DEFAULT_ITEMS.map(i => ({ ...i })));
  };

  const adProps = { bgImage, title, items, pattern: patternImg };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* ── Hidden full-size export canvas (off-screen, visibility:hidden) ── */}
      <div
        ref={exportRef}
        style={{
          position: "fixed",
          top: 0,
          left: "-9999px",
          width: CANVAS_SIZE,
          height: CANVAS_SIZE,
          visibility: "hidden",
          zIndex: -1,
          pointerEvents: "none",
        }}
      >
        <AdCanvas {...adProps} />
      </div>

      {/* App header */}
      <header className="bg-[#1e3d2f] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <PsauLogo size={44} color="#6ac7bd" />
          <div>
            <h1 className="text-base font-bold leading-tight">مولّد الإعلانات</h1>
            <p className="text-xs opacity-70">جامعة الأمير سطام بن عبدالعزيز</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6 items-start">
        {/* ── Controls ── */}
        <div className="space-y-4">
          {/* Background image */}
          <div className="bg-card border border-card-border rounded-xl p-4 shadow-sm">
            <h2 className="text-sm font-bold mb-3 pb-2 border-b border-border">صورة الخلفية</h2>
            <label
              htmlFor={fileInputId}
              data-testid="label-upload"
              className="flex flex-col items-center gap-2 border-2 border-dashed border-primary/40 rounded-lg p-4 cursor-pointer hover:border-primary/70 hover:bg-primary/5 transition-all"
            >
              <ImageIcon className="h-6 w-6 text-primary/60" />
              <span className="text-xs text-muted-foreground text-center">
                اضغط لرفع صورة خلفية<br />
                <span className="text-primary font-medium">JPG, PNG, WEBP</span>
              </span>
              <input
                id={fileInputId}
                data-testid="input-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
            {bgImage !== defaultBg && (
              <button
                onClick={() => setBgImage(defaultBg)}
                className="mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                ← استخدام الصورة الافتراضية
              </button>
            )}
          </div>

          {/* Title */}
          <div className="bg-card border border-card-border rounded-xl p-4 shadow-sm">
            <h2 className="text-sm font-bold mb-3 pb-2 border-b border-border">العنوان الرئيسي</h2>
            <Input
              data-testid="input-title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="اكتب العنوان..."
              className="text-right text-base font-bold"
            />
          </div>

          {/* Content items */}
          <div className="bg-card border border-card-border rounded-xl p-4 shadow-sm">
            <h2 className="text-sm font-bold mb-3 pb-2 border-b border-border">العناصر الأربعة</h2>
            <div className="space-y-4">
              {items.map((item, i) => (
                <div key={i} className="space-y-1.5">
                  <p className="text-xs text-muted-foreground font-medium">العنصر {i + 1}</p>
                  <Input
                    data-testid={`input-item-title-${i}`}
                    value={item.title}
                    onChange={e => updateItem(i, "title", e.target.value)}
                    placeholder="العنوان..."
                    className="text-right text-sm"
                  />
                  <Input
                    data-testid={`input-item-desc-${i}`}
                    value={item.desc}
                    onChange={e => updateItem(i, "desc", e.target.value)}
                    placeholder="الوصف..."
                    className="text-right text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              data-testid="button-export"
              onClick={exportAsImage}
              disabled={isExporting}
              className="flex-1 gap-2 bg-[#1e3d2f] hover:bg-[#2a5240] text-white"
            >
              {isExporting ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              {isExporting ? "جاري التصدير..." : "تحميل الصورة"}
            </Button>
            <Button
              data-testid="button-reset"
              variant="outline"
              onClick={resetAll}
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              إعادة تعيين
            </Button>
          </div>
        </div>

        {/* ── Preview ── */}
        <div className="space-y-3">
          <div className="bg-card border border-card-border rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
              <h2 className="text-sm font-bold">معاينة الإعلان</h2>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Eye className="h-3.5 w-3.5" />
                1080 × 1080 بكسل
              </div>
            </div>

            {/* Scaled preview wrapper — only visual, not used for export */}
            <div
              ref={wrapperRef}
              className="w-full bg-muted/30 rounded-lg"
              style={{ aspectRatio: "1/1", position: "relative", overflow: "hidden" }}
            >
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                width: CANVAS_SIZE,
                height: CANVAS_SIZE,
                pointerEvents: "none",
              }}>
                <AdCanvas {...adProps} />
              </div>
            </div>
          </div>

          <div className="bg-accent/20 border border-accent-border rounded-lg px-4 py-2.5">
            <p className="text-xs text-foreground/70">
              <strong>ملاحظة:</strong> ستُحمَّل الصورة بدقة 1080×1080 بكسل مناسبة لمنصات التواصل الاجتماعي.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   AdCanvas — always rendered at exactly 1080×1080px, no transforms
───────────────────────────────────────────────────────────────── */
function AdCanvas({ bgImage, title, items, pattern }: {
  bgImage: string;
  title: string;
  items: ContentItem[];
  pattern: string;
}) {
  const TOP_H = 575;
  const CURVE_H = 80;

  return (
    <div
      style={{
        width: CANVAS_SIZE,
        height: CANVAS_SIZE,
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#ffffff",
        fontFamily: "'Cairo', 'Arial', sans-serif",
        direction: "rtl",
      }}
    >
      {/* ── TOP: background image + green overlay ── */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: TOP_H }}>
        <img
          src={bgImage}
          alt=""
          crossOrigin="anonymous"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
          }}
        />
        {/* Dark green overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(15,40,27,0.70) 0%, rgba(20,52,34,0.82) 55%, rgba(14,36,22,0.94) 100%)",
        }} />

        {/* University logo — top right */}
        <div style={{
          position: "absolute", top: 30, right: 32,
          display: "flex", alignItems: "flex-start", gap: 16, direction: "rtl",
        }}>
          <PsauLogo size={76} color="#6ac7bd" />
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <span style={{ color: "#fff", fontSize: 19, fontWeight: 700, lineHeight: 1.25, textAlign: "right" }}>جامعة الأميـر</span>
            <span style={{ color: "#fff", fontSize: 32, fontWeight: 900, lineHeight: 1.1, textAlign: "right" }}>سطام</span>
            <span style={{ color: "#fff", fontSize: 19, fontWeight: 700, lineHeight: 1.25, textAlign: "right" }}>بن عبدالعزيز</span>
            <span style={{ color: "#fff", fontSize: 11.5, fontWeight: 400, lineHeight: 1.3, opacity: 0.85, letterSpacing: "0.06em", textAlign: "right", marginTop: 4 }}>
              PRINCE SATTAM BIN ABDULAZIZ UNIVERSITY
            </span>
          </div>
        </div>

        {/* Main title — above curve */}
        <div style={{
          position: "absolute", bottom: CURVE_H + 10, right: 0, left: 0,
          padding: "0 54px",
        }}>
          <h1 style={{
            color: "#ffffff",
            fontSize: 112,
            fontWeight: 900,
            lineHeight: 1.05,
            textAlign: "right",
            textShadow: "0 3px 22px rgba(0,0,0,0.38)",
            letterSpacing: "-0.01em",
            margin: 0,
          }}>
            {title}
          </h1>
        </div>
      </div>

      {/* ── CURVED TRANSITION (white wave) ── */}
      <div style={{
        position: "absolute",
        top: TOP_H - CURVE_H,
        left: 0, right: 0,
        height: CURVE_H + 50,
        zIndex: 10,
      }}>
        <svg viewBox="0 0 1080 130" preserveAspectRatio="none" width="1080" height="130">
          <path d="M0,130 L0,72 Q540,-26 1080,72 L1080,130 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* ── BOTTOM SECTION: white + pattern + 2×2 grid ── */}
      <div style={{
        position: "absolute",
        top: TOP_H + 16,
        left: 0, right: 0, bottom: 0,
        backgroundColor: "#ffffff",
        zIndex: 5,
        overflow: "hidden",
      }}>
        {/* Official university geometric pattern — very subtle watermark */}
        <img
          src={pattern}
          alt=""
          crossOrigin="anonymous"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: 0.09,
            pointerEvents: "none",
          }}
        />

        {/* 2×2 content grid */}
        <div style={{
          position: "relative", zIndex: 2,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "32px 48px",
          padding: "28px 60px",
          height: "100%",
          alignContent: "center",
          direction: "rtl",
          boxSizing: "border-box",
        }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, direction: "rtl" }}>
                <span style={{ color: "#3c7974", fontSize: 24, lineHeight: 1, flexShrink: 0 }}>✦</span>
                <span style={{
                  color: "#1e3d2f",
                  fontSize: 29,
                  fontWeight: 800,
                  lineHeight: 1.2,
                  textAlign: "right",
                }}>
                  {item.title}
                </span>
              </div>
              <p style={{
                color: "#6b7280",
                fontSize: 22,
                lineHeight: 1.55,
                textAlign: "right",
                margin: 0,
                paddingRight: 36,
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── PSAU Arch/Gate Logo ── */
function PsauLogo({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <circle cx="60" cy="62" r="56" stroke={color} strokeWidth="2.5" fill="none" />
      <path d="M18,110 L18,62 Q18,18 60,16 Q102,18 102,62 L102,110" stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M33,110 L33,66 Q33,34 60,32 Q87,34 87,66 L87,110" stroke={color} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M47,110 L47,75 Q47,58 60,57 Q73,58 73,75 L73,110" stroke={color} strokeWidth="2.5" fill={color} fillOpacity="0.18" strokeLinecap="round" />
      <path d="M53,16 Q60,7 67,16" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="60" cy="5" r="4.5" fill={color} />
      <rect x="13" y="108" width="12" height="6" rx="2" fill={color} />
      <rect x="95" y="108" width="12" height="6" rx="2" fill={color} />
      <rect x="10" y="113" width="100" height="5" rx="2" fill={color} />
      <line x1="33" y1="80" x2="47" y2="80" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <line x1="73" y1="80" x2="87" y2="80" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <line x1="33" y1="92" x2="47" y2="92" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <line x1="73" y1="92" x2="87" y2="92" stroke={color} strokeWidth="1.5" opacity="0.6" />
    </svg>
  );
}
