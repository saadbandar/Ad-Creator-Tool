import { useState, useRef, useCallback, useId, useEffect } from "react";
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
  TEMPLATE_PRESETS,
  type EventAdData,
  type LocationType,
} from "@/components/TemplateCanvas";

/* ── Default data ── */
const DEFAULT_DATA: EventAdData = {
  bgImage: defaultBg,
  departmentName: "النص هنا (اسم الجهة)",
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

/* icons for template preset cards */
const PRESET_ICONS: Record<string, string> = {
  "in-person": "📍",
  "teams": "💻",
  "zoom": "🎥",
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

export default function AdGenerator() {
  const [data, setData] = useState<EventAdData>({ ...DEFAULT_DATA });
  const [selectedPreset, setSelectedPreset] = useState<number>(1);
  const [exportFormat, setExportFormat] = useState<ExportFormat>("webp");
  const [isExporting, setIsExporting] = useState(false);

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

  /* Apply a preset — keeps editable text but switches locationType & hasCertificate */
  const applyPreset = (presetId: number) => {
    const preset = TEMPLATE_PRESETS.find(p => p.id === presetId);
    if (!preset) return;
    setSelectedPreset(presetId);
    setData(prev => ({
      ...prev,
      locationType:   preset.locationType,
      hasCertificate: preset.hasCertificate,
      qrCodeImage: prev.locationType === preset.locationType ? prev.qrCodeImage : undefined,
    }));
  };

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

          {/* ══ TEMPLATE SELECTOR ══ */}
          <Section title="اختر القالب">
            <div className="grid grid-cols-2 gap-2">
              {TEMPLATE_PRESETS.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => applyPreset(preset.id)}
                  className={`rounded-xl border-2 p-3 transition-all text-right flex flex-col gap-1 ${
                    selectedPreset === preset.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/40 hover:bg-muted/40"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{PRESET_ICONS[preset.locationType]}</span>
                    <span className="text-xs font-bold leading-tight">{preset.label}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">قالب {preset.id}</span>
                </button>
              ))}
            </div>
          </Section>

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
            {data.bgImage !== defaultBg && (
              <button onClick={() => set("bgImage", defaultBg)}
                className="mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                ← استخدام الصورة الافتراضية
              </button>
            )}
          </Section>

          {/* Event info */}
          <Section title="بيانات الفعالية">
            <Field label="اسم الجهة" value={data.departmentName}
              onChange={v => set("departmentName", v)} />
            <Field label="نوع الفعالية" value={data.eventType}
              onChange={v => set("eventType", v)} multiline />
            <Field label="عنوان الفعالية" value={data.eventTitle}
              onChange={v => set("eventTitle", v)} multiline />
          </Section>

          {/* Date & Time */}
          <Section title="التاريخ والوقت">
            <div className="grid grid-cols-3 gap-2">
              <Field label="الساعة" value={data.time} onChange={v => set("time", v)} />
              <Field label="اليوم"  value={data.day}  onChange={v => set("day", v)} />
              <Field label="التاريخ" value={data.date} onChange={v => set("date", v)} />
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
              onClick={() => { setData({ ...DEFAULT_DATA }); setSelectedPreset(1); }}
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
