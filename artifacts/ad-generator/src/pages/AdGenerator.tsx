import { useState, useRef, useCallback, useId, useEffect, type PointerEvent } from "react";
import html2canvas from "html2canvas";
import defaultBg from "@assets/image1.png";
import logoImg from "@assets/تصميم_بدون_عنوان_1776144448792.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Download, RefreshCw, ImageIcon, Eye, QrCode } from "lucide-react";
import {
  CANVAS_W, CANVAS_H,
  EventAdCanvas,
  type EventAdData,
  type LocationType,
} from "@/components/TemplateCanvas";

/* ── Default data ── */
const DEFAULT_DATA: EventAdData = {
  bgImage: defaultBg,
  bgPositionX: 50,
  bgPositionY: 50,
  bgZoom: 1,
  departmentName: "النص هنا (اسم الجهة)",
  representedBy: "",
  eventType: "النص هنا (نوع الفعالية: دورة، محاضرة، ورشة عمل، ...)",
  eventTitle: "النص هنا (عنوان الفعالية)",
  time: "التـوقيـت",
  day: "اليـوم",
  date: "التـاريـخ",
  locationType: "in-person",
  venue: "الـوصـف",
  hasCertificate: false,
  qrCodeImage: undefined,
};

type ExportFormat = "webp" | "png" | "jpeg";

interface FormatOption {
  id: ExportFormat;
  label: string;
  mime: string;
  ext: string;
  quality: number;
  hint: string;
}

const FORMAT_OPTIONS: FormatOption[] = [
  { id: "webp", mime: "image/webp", ext: "webp", label: "WebP", quality: 0.95,
    hint: "أفضل جودة وأصغر حجم — موصى به" },
  { id: "png",  mime: "image/png",  ext: "png",  label: "PNG",  quality: 1,
    hint: "جودة لا تُفقد — حجم أكبر" },
  { id: "jpeg", mime: "image/jpeg", ext: "jpg",  label: "JPEG", quality: 0.92,
    hint: "أصغر حجم — مناسب للمشاركة السريعة" },
];

/* ── Interactive image pan control ── */
const ImagePanControl = ({
  src, x, y, zoom, onChange, onZoomChange,
}: {
  src: string;
  x: number;
  y: number;
  zoom: number;
  onChange: (x: number, y: number) => void;
  onZoomChange: (z: number) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging   = useRef(false);

  const calcPos = (e: { clientX: number; clientY: number }) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width)  * 100));
    const py = Math.max(0, Math.min(100, ((e.clientY - rect.top)  / rect.height) * 100));
    onChange(Math.round(px), Math.round(py));
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    calcPos(e);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    calcPos(e);
  };
  const onPointerUp = () => { isDragging.current = false; };

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16/9",
        borderRadius: 10,
        overflow: "hidden",
        cursor: "crosshair",
        userSelect: "none",
        border: "2px solid var(--primary)",
      }}
    >
      <img src={src} alt="" draggable={false} style={{
        width: "100%", height: "100%",
        objectFit: "cover",
        objectPosition: `${x}% ${y}%`,
        transform: `scale(${zoom})`,
        transformOrigin: `${x}% ${y}%`,
        pointerEvents: "none",
        display: "block",
      }} />

      {/* Semi-dark overlay outside the focus area */}
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(0,0,0,0.38)",
        pointerEvents: "none",
      }} />

      {/* Crosshair focus indicator */}
      <div style={{
        position: "absolute",
        left: `${x}%`, top: `${y}%`,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
      }}>
        {/* Outer ring */}
        <div style={{
          width: 36, height: 36,
          borderRadius: "50%",
          border: "2px solid rgba(255,255,255,0.9)",
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
        }} />
        {/* Inner dot */}
        <div style={{
          width: 10, height: 10,
          borderRadius: "50%",
          backgroundColor: "#5ab8b0",
          border: "1.5px solid white",
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
        }} />
        {/* Cross lines */}
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)" }}>
          <div style={{ position:"absolute", left:-14, top:-1, width:28, height:2, background:"rgba(255,255,255,0.8)" }} />
          <div style={{ position:"absolute", top:-14, left:-1, width:2, height:28, background:"rgba(255,255,255,0.8)" }} />
        </div>
      </div>

      {/* Tip label */}
      <div style={{
        position: "absolute", bottom: 6, right: 6,
        background: "rgba(0,0,0,0.65)",
        color: "#fff", fontSize: 10, padding: "2px 7px",
        borderRadius: 4, pointerEvents: "none",
        direction: "rtl",
      }}>
        اسحب لتحريك الصورة
      </div>

      {/* Zoom badge */}
      <div style={{
        position: "absolute", bottom: 6, left: 6,
        background: "rgba(0,0,0,0.65)",
        color: "#fff", fontSize: 10, padding: "2px 7px",
        borderRadius: 4, pointerEvents: "none",
        fontFamily: "monospace",
      }}>
        {zoom.toFixed(1)}×
      </div>
    </div>

    {/* Zoom slider */}
    <div className="flex items-center gap-2 px-1 pt-1">
      <span className="text-xs text-muted-foreground shrink-0">🔍</span>
      <input
        type="range"
        min={1} max={3} step={0.05}
        value={zoom}
        onChange={e => onZoomChange(parseFloat(e.target.value))}
        className="w-full accent-primary h-1.5 cursor-pointer"
      />
      <span className="text-xs text-muted-foreground shrink-0 font-mono w-8 text-right">
        {zoom.toFixed(1)}×
      </span>
    </div>
  );
};

export default function AdGenerator() {
  const [data, setData] = useState<EventAdData>({ ...DEFAULT_DATA });
  const [exportFormat, setExportFormat] = useState<ExportFormat>("webp");
  const [isExporting, setIsExporting] = useState(false);

  /* Raw picker values (internal) */
  const [rawTime, setRawTime] = useState("");
  const [rawDate, setRawDate] = useState("");

  const [scale, setScale] = useState(0.35);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const exportRef  = useRef<HTMLDivElement>(null);
  const bgInputId  = useId();
  const qrInputId  = useId();

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / CANVAS_W);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const set = <K extends keyof EventAdData>(key: K, value: EventAdData[K]) =>
    setData(prev => ({ ...prev, [key]: value }));

  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => ev.target?.result && set("bgImage", ev.target.result as string);
    reader.readAsDataURL(file);
  };

  const handleQrUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => ev.target?.result && set("qrCodeImage", ev.target.result as string);
    reader.readAsDataURL(file);
  };

  /* ── Time picker: "HH:MM" → "٩:٣٠ ص" ── */
  const handleTimeChange = (raw: string) => {
    setRawTime(raw);
    if (!raw) return;
    const [hStr, mStr] = raw.split(":");
    const h = parseInt(hStr, 10);
    const m = parseInt(mStr, 10);
    const period = h >= 12 ? "م" : "ص";
    const h12 = h % 12 || 12;
    const formatted = `${h12}:${m.toString().padStart(2, "0")} ${period}`;
    set("time", formatted);
  };

  /* ── Date picker: "YYYY-MM-DD" → day name + formatted date ── */
  const handleDateChange = (raw: string) => {
    setRawDate(raw);
    if (!raw) return;
    const d = new Date(raw + "T12:00:00"); // noon avoids timezone flips
    const dayName = new Intl.DateTimeFormat("ar-SA", { weekday: "long" }).format(d);
    const dateStr = new Intl.DateTimeFormat("ar-SA", {
      day: "numeric", month: "long", year: "numeric",
    }).format(d);
    set("day",  dayName);
    set("date", dateStr);
  };

  const exportAsImage = useCallback(async () => {
    const el = exportRef.current;
    if (!el) return;
    setIsExporting(true);
    const fmt = FORMAT_OPTIONS.find(f => f.id === exportFormat)!;
    try {
      el.style.visibility = "visible";
      await new Promise(r => setTimeout(r, 200));
      const canvas = await html2canvas(el, {
        scale: 1, useCORS: true, allowTaint: true,
        backgroundColor: "#ffffff", logging: false,
        width: CANVAS_W, height: CANVAS_H,
        windowWidth: CANVAS_W, windowHeight: CANVAS_H,
        imageTimeout: 20000,
      });
      el.style.visibility = "hidden";
      const link = document.createElement("a");
      link.download = `إعلان-فعالية-جامعة-سطام.${fmt.ext}`;
      link.href = canvas.toDataURL(fmt.mime, fmt.quality);
      link.click();
    } catch (err) {
      console.error(err);
      if (exportRef.current) exportRef.current.style.visibility = "hidden";
    } finally {
      setIsExporting(false);
    }
  }, [exportFormat]);

  const isOnline = data.locationType === "teams" || data.locationType === "zoom";

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Hidden full-size export canvas */}
      <div ref={exportRef} style={{
        position: "fixed", top: 0, left: "-9999px",
        width: CANVAS_W, height: CANVAS_H,
        visibility: "hidden", zIndex: -1, pointerEvents: "none",
      }}>
        <EventAdCanvas data={data} />
      </div>

      {/* Header */}
      <header className="bg-[#0e3020] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <div style={{ backgroundColor: "rgba(255,255,255,0.14)", borderRadius: 8, padding: "4px 10px" }}>
            <img src={logoImg} alt="شعار الجامعة"
              style={{ height: 38, display: "block", mixBlendMode: "screen" }} />
          </div>
          <div>
            <h1 className="text-base font-bold leading-tight">مولّد إعلانات الفعاليات</h1>
            <p className="text-xs opacity-70">جامعة الأمير سطام بن عبدالعزيز</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-6 items-start">

        {/* ── Controls ── */}
        <div className="space-y-4">

          {/* Background image */}
          <Section title="صورة الخلفية">
            <label htmlFor={bgInputId} data-testid="label-upload"
              className="flex flex-col items-center gap-2 border-2 border-dashed border-primary/40 rounded-lg p-4 cursor-pointer hover:border-primary/70 hover:bg-primary/5 transition-all">
              <ImageIcon className="h-6 w-6 text-primary/60" />
              <span className="text-xs text-muted-foreground text-center">
                اضغط لرفع صورة خلفية<br />
                <span className="text-primary font-medium">JPG, PNG, WEBP</span>
              </span>
              <input id={bgInputId} data-testid="input-image" type="file" accept="image/*"
                className="hidden" onChange={handleBgUpload} />
            </label>

            {/* Image pan control — shown after upload */}
            {data.bgImage !== defaultBg && (
              <div className="mt-3 space-y-2">
                <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                  <span>🖐️</span> اسحب لاختيار الجزء المرئي من الصورة
                </p>
                <ImagePanControl
                  src={data.bgImage}
                  x={data.bgPositionX}
                  y={data.bgPositionY}
                  zoom={data.bgZoom}
                  onChange={(x, y) => setData(prev => ({ ...prev, bgPositionX: x, bgPositionY: y }))}
                  onZoomChange={z => set("bgZoom", z)}
                />
                <button onClick={() => set("bgImage", defaultBg)}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  ← استخدام الصورة الافتراضية
                </button>
              </div>
            )}
          </Section>

          {/* Event info */}
          <Section title="بيانات الفعالية">
            <Field label='ممثلة بـ (اختياري — اتركه فارغاً لإخفائه)' value={data.representedBy ?? ""}
              onChange={v => set("representedBy", v)} />
            <Field label="نوع الفعالية" value={data.eventType}
              onChange={v => set("eventType", v)} multiline />
            <Field label="عنوان الفعالية" value={data.eventTitle}
              onChange={v => set("eventTitle", v)} multiline />
          </Section>

          {/* Date & Time */}
          <Section title="التاريخ والوقت">
            <div className="grid grid-cols-2 gap-3">
              {/* ── Time picker ── */}
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium">الساعة</p>
                <input
                  type="time"
                  value={rawTime}
                  onChange={e => handleTimeChange(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-right focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors"
                  style={{ direction: "ltr", colorScheme: "light" }}
                />
                {data.time && rawTime && (
                  <p className="text-[11px] text-primary font-medium text-right">
                    سيظهر: {data.time}
                  </p>
                )}
              </div>

              {/* ── Date picker ── */}
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium">التاريخ</p>
                <input
                  type="date"
                  value={rawDate}
                  onChange={e => handleDateChange(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors"
                  style={{ direction: "ltr", colorScheme: "light" }}
                />
                {data.date && rawDate && (
                  <p className="text-[11px] text-primary font-medium text-right">
                    {data.day} — {data.date}
                  </p>
                )}
              </div>
            </div>
          </Section>

          {/* Location type */}
          <Section title="طريقة الحضور">
            <div className="grid grid-cols-3 gap-2">
              {([
                { id: "in-person", label: "حضوري", icon: "📍" },
                { id: "teams",     label: "Teams",  icon: "💻" },
                { id: "zoom",      label: "Zoom",   icon: "🎥" },
              ] as { id: LocationType; label: string; icon: string }[]).map(opt => (
                <button
                  key={opt.id}
                  onClick={() => set("locationType", opt.id)}
                  className={`rounded-lg p-3 border-2 transition-all text-sm font-medium flex flex-col items-center gap-1 ${
                    data.locationType === opt.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <span className="text-xl">{opt.icon}</span>
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>

            {/* In-person: venue field */}
            {data.locationType === "in-person" && (
              <div className="mt-3">
                <Field label="وصف المكان" value={data.venue} onChange={v => set("venue", v)} />
              </div>
            )}

            {/* Online: QR code upload */}
            {isOnline && (
              <div className="mt-3 space-y-2">
                <label htmlFor={qrInputId}
                  className="flex items-center gap-2 border-2 border-dashed border-primary/40 rounded-lg p-3 cursor-pointer hover:border-primary/70 hover:bg-primary/5 transition-all">
                  <QrCode className="h-5 w-5 text-primary/60 shrink-0" />
                  <span className="text-xs text-muted-foreground">
                    {data.qrCodeImage
                      ? <span className="text-primary font-medium">✓ تم رفع الباركود — اضغط للتغيير</span>
                      : <><span className="text-primary font-medium">ارفع صورة الباركود (QR)</span><br />لرابط الانضمام</>
                    }
                  </span>
                  <input id={qrInputId} data-testid="input-qr" type="file" accept="image/*"
                    className="hidden" onChange={handleQrUpload} />
                </label>
                {data.qrCodeImage && (
                  <button onClick={() => set("qrCodeImage", undefined)}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    ✕ إزالة الباركود
                  </button>
                )}
              </div>
            )}
          </Section>

          {/* Certificate toggle */}
          <Section title="شهادات الحضور">
            <button
              onClick={() => set("hasCertificate", !data.hasCertificate)}
              className={`w-full rounded-lg p-3 border-2 transition-all flex items-center justify-between ${
                data.hasCertificate
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:border-primary/40"
              }`}
            >
              <span className="font-medium">
                {data.hasCertificate ? "✓ يوجد شهادات حضور" : "لا يوجد شهادات حضور"}
              </span>
              <span className="text-2xl">{data.hasCertificate ? "🎓" : "—"}</span>
            </button>
          </Section>

          {/* ══ EXPORT FORMAT ══ */}
          <Section title="صيغة الحفظ">
            <div className="grid grid-cols-3 gap-2">
              {FORMAT_OPTIONS.map(fmt => (
                <button
                  key={fmt.id}
                  data-testid={`format-${fmt.id}`}
                  onClick={() => setExportFormat(fmt.id)}
                  className={`rounded-xl border-2 p-3 transition-all flex flex-col items-center gap-1 ${
                    exportFormat === fmt.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/40 hover:bg-muted/40"
                  }`}
                >
                  <span className="text-sm font-bold tracking-wider">{fmt.label}</span>
                  <span className="text-[10px] text-center text-muted-foreground leading-tight">
                    {fmt.hint}
                  </span>
                </button>
              ))}
            </div>
          </Section>

          {/* Actions */}
          <div className="flex gap-3">
            <Button data-testid="button-export" onClick={exportAsImage} disabled={isExporting}
              className="flex-1 gap-2 bg-[#0e3020] hover:bg-[#1a4030] text-white">
              {isExporting
                ? <RefreshCw className="h-4 w-4 animate-spin" />
                : <Download className="h-4 w-4" />}
              {isExporting
                ? "جاري التصدير..."
                : `تحميل الصورة (${FORMAT_OPTIONS.find(f => f.id === exportFormat)?.label})`}
            </Button>
            <Button data-testid="button-reset" variant="outline"
              onClick={() => {
                setData({ ...DEFAULT_DATA });
                setSelectedPreset(1);
                setRawTime("");
                setRawDate("");
              }}
              className="gap-2">
              <RefreshCw className="h-4 w-4" />
              إعادة تعيين
            </Button>
          </div>
        </div>

        {/* ── Preview (9:16 portrait) ── */}
        <div className="space-y-3">
          <div className="bg-card border border-card-border rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
              <h2 className="text-sm font-bold">معاينة الإعلان</h2>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Eye className="h-3.5 w-3.5" />
                1080 × 1920 بكسل
              </div>
            </div>

            {/* 9:16 wrapper */}
            <div
              ref={wrapperRef}
              className="w-full bg-muted/30 rounded-lg mx-auto"
              style={{ aspectRatio: "9/16", position: "relative", overflow: "hidden", maxWidth: 480 }}
            >
              <div style={{
                position: "absolute", top: 0, left: 0,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                width: CANVAS_W,
                height: CANVAS_H,
                pointerEvents: "none",
              }}>
                <EventAdCanvas data={data} />
              </div>
            </div>
          </div>

          <div className="bg-accent/20 border border-accent-border rounded-lg px-4 py-2.5">
            <p className="text-xs text-foreground/70">
              <strong>ملاحظة:</strong> ستُحمَّل الصورة بدقة 1080×1920 بكسل مناسبة لقصص سناب شات وإنستغرام.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ── Layout helpers ── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-card-border rounded-xl p-4 shadow-sm">
      <h2 className="text-sm font-bold mb-3 pb-2 border-b border-border">{title}</h2>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Field({ label, value, onChange, multiline }: {
  label: string; value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground font-medium">{label}</p>
      {multiline ? (
        <Textarea value={value} onChange={e => onChange(e.target.value)}
          placeholder={label} rows={2}
          className="text-right text-sm resize-none" />
      ) : (
        <Input value={value} onChange={e => onChange(e.target.value)}
          placeholder={label} className="text-right text-sm" />
      )}
    </div>
  );
}

