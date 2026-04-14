import { useState, useRef, useCallback, useId, useEffect } from "react";
import html2canvas from "html2canvas";
import defaultBg from "@assets/image1.png";
import logoImg from "@assets/تصميم_بدون_عنوان_1776144448792.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Download, RefreshCw, ImageIcon, Eye } from "lucide-react";
import {
  CANVAS_W, CANVAS_H,
  EventAdCanvas,
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
};

export default function AdGenerator() {
  const [data, setData] = useState<EventAdData>({ ...DEFAULT_DATA });
  const [isExporting, setIsExporting] = useState(false);

  /* Scale factor for preview */
  const [scale, setScale] = useState(0.35);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);
  const fileInputId = useId();

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      /* maintain 9:16 ratio: scale by width */
      setScale(entry.contentRect.width / CANVAS_W);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const set = <K extends keyof EventAdData>(key: K, value: EventAdData[K]) =>
    setData(prev => ({ ...prev, [key]: value }));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => ev.target?.result && set("bgImage", ev.target.result as string);
    reader.readAsDataURL(file);
  };

  const exportAsImage = useCallback(async () => {
    const el = exportRef.current;
    if (!el) return;
    setIsExporting(true);
    try {
      el.style.visibility = "visible";
      await new Promise(r => setTimeout(r, 180));
      const canvas = await html2canvas(el, {
        scale: 1, useCORS: true, allowTaint: true,
        backgroundColor: "#ffffff", logging: false,
        width: CANVAS_W, height: CANVAS_H,
        windowWidth: CANVAS_W, windowHeight: CANVAS_H,
        imageTimeout: 20000,
      });
      el.style.visibility = "hidden";
      const link = document.createElement("a");
      link.download = "إعلان-فعالية-جامعة-سطام.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error(err);
      if (exportRef.current) exportRef.current.style.visibility = "hidden";
    } finally {
      setIsExporting(false);
    }
  }, []);

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

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6 items-start">

        {/* ── Controls ── */}
        <div className="space-y-4">

          {/* Background image */}
          <Section title="صورة الخلفية">
            <label htmlFor={fileInputId} data-testid="label-upload"
              className="flex flex-col items-center gap-2 border-2 border-dashed border-primary/40 rounded-lg p-4 cursor-pointer hover:border-primary/70 hover:bg-primary/5 transition-all">
              <ImageIcon className="h-6 w-6 text-primary/60" />
              <span className="text-xs text-muted-foreground text-center">
                اضغط لرفع صورة خلفية<br />
                <span className="text-primary font-medium">JPG, PNG, WEBP</span>
              </span>
              <input id={fileInputId} data-testid="input-image" type="file" accept="image/*"
                className="hidden" onChange={handleImageUpload} />
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
            <Field label='اسم الجهة' value={data.departmentName}
              onChange={v => set("departmentName", v)} />
            <Field label='نوع الفعالية' value={data.eventType}
              onChange={v => set("eventType", v)} multiline />
            <Field label='عنوان الفعالية' value={data.eventTitle}
              onChange={v => set("eventTitle", v)} multiline />
          </Section>

          {/* Date & Time */}
          <Section title="التاريخ والوقت">
            <div className="grid grid-cols-3 gap-2">
              <Field label='الساعة' value={data.time} onChange={v => set("time", v)} />
              <Field label='اليوم' value={data.day} onChange={v => set("day", v)} />
              <Field label='التاريخ' value={data.date} onChange={v => set("date", v)} />
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

            {data.locationType === "in-person" && (
              <div className="mt-3">
                <Field label='وصف المكان' value={data.venue} onChange={v => set("venue", v)} />
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

          {/* Actions */}
          <div className="flex gap-3">
            <Button data-testid="button-export" onClick={exportAsImage} disabled={isExporting}
              className="flex-1 gap-2 bg-[#0e3020] hover:bg-[#1a4030] text-white">
              {isExporting ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              {isExporting ? "جاري التصدير..." : "تحميل الصورة"}
            </Button>
            <Button data-testid="button-reset" variant="outline" onClick={() => setData({ ...DEFAULT_DATA })}
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
              <strong>ملاحظة:</strong> ستُحمَّل الصورة بدقة 1080×1920 بكسل مناسبة لقصص وسناب شات.
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
