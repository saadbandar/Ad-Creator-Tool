import { useState, useRef, useCallback, useId, useEffect } from "react";
import html2canvas from "html2canvas";
import defaultBg from "@assets/social_media-03_1776117368027.png";
import patternImg from "@assets/pattern_1776117955422.png";
import logoImg from "@assets/تصميم_بدون_عنوان_1776144448792.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Download, RefreshCw, ImageIcon, Eye, LayoutTemplate } from "lucide-react";
import {
  CANVAS_SIZE,
  DarkGridCanvas, type DarkGridData,
  ArchGridCanvas, type ArchGridData,
  ArchFlowCanvas, type ArchFlowData,
  HeroListCanvas, type HeroListData,
  HeroStatsCanvas, type HeroStatsData,
  HeroComplexCanvas, type HeroComplexData,
} from "@/components/TemplateCanvas";

/* ── Template IDs ── */
type TemplateId = "dark-grid" | "arch-grid" | "arch-flow" | "hero-list" | "hero-stats" | "hero-complex";

interface Template {
  id: TemplateId;
  label: string;
  desc: string;
}

const TEMPLATES: Template[] = [
  { id: "dark-grid",    label: "قالب 1",  desc: "هيرو داكن + شبكة 4 عناصر" },
  { id: "arch-grid",    label: "قالب 2",  desc: "أقواس زخرفية + شبكة 4 عناصر" },
  { id: "arch-flow",    label: "قالب 3",  desc: "أقواس زخرفية + مخطط تدفق" },
  { id: "hero-list",    label: "قالب 4",  desc: "صورة كاملة + قائمة 12 عنصر" },
  { id: "hero-stats",   label: "قالب 5",  desc: "صورة كاملة + إحصائيات" },
  { id: "hero-complex", label: "قالب 6",  desc: "صورة كاملة + بطاقات وفقرات" },
];

/* ── Default data per template ── */
function defaultDarkGrid(bgImage: string): DarkGridData {
  return { bgImage, logo: logoImg, pattern: patternImg, title: "العنوان",
    items: [
      { title: "محتوى نصي", desc: "وصف قصير مختصر ليتم إستبداله لاحقًا..." },
      { title: "محتوى نصي", desc: "وصف قصير مختصر ليتم إستبداله لاحقًا..." },
      { title: "محتوى نصي", desc: "وصف قصير مختصر ليتم إستبداله لاحقًا..." },
      { title: "محتوى نصي", desc: "وصف قصير مختصر ليتم إستبداله لاحقًا..." },
    ] };
}
function defaultArchGrid(bgImage: string): ArchGridData {
  return { bgImage, logo: logoImg, pattern: patternImg,
    title: "عنوان نصي ليتم إستبداله لاحقًا",
    items: [
      { title: "محتوى نصي", desc: "وصف قصير مختصر ليتم إستبداله لاحقًا..." },
      { title: "محتوى نصي", desc: "وصف قصير مختصر ليتم إستبداله لاحقًا..." },
      { title: "محتوى نصي", desc: "وصف قصير مختصر ليتم إستبداله لاحقًا..." },
      { title: "محتوى نصي", desc: "وصف قصير مختصر ليتم إستبداله لاحقًا..." },
    ] };
}
function defaultArchFlow(bgImage: string): ArchFlowData {
  return { bgImage, logo: logoImg, title: "الـعـنـوان",
    flowItems: [
      { text: "النص يوضع هنا", desc: "يوضع هنا النص يوضع" },
      { text: "النص يوضع هنا", desc: "يوضع هنا النص يوضع" },
      { text: "النص يوضع هنا", desc: "يوضع هنا النص يوضع" },
      { text: "النص يوضع هنا", desc: "يوضع هنا النص يوضع" },
      { text: "النص يوضع هنا", desc: "يوضع هنا النص يوضع" },
    ] };
}
function defaultHeroList(bgImage: string): HeroListData {
  return { bgImage, logo: logoImg, pattern: patternImg,
    title: "محتوى نصي ليتم إستبداله لاحقًا",
    subtitle: "وصف قصير مختصر ليتم إستبداله لاحقًا...",
    sectionTitle: "عنوان قصير",
    listItems: Array(12).fill("محتوى نصي") };
}
function defaultHeroStats(bgImage: string): HeroStatsData {
  return { bgImage, logo: logoImg, pattern: patternImg,
    title: "محتوى نصي ليتم إستبداله لاحقًا",
    subtitle: "وصف قصير مختصر ليتم إستبداله لاحقًا...",
    stats: [
      { number: "3k", label: "عنوان للرقم", desc: "محتوى نصي مختصر ليتم إستبداله لاحقًا، لمحتوى يُعبر عن الرقم المذكور." },
      { number: "3k", label: "عنوان للرقم", desc: "محتوى نصي مختصر ليتم إستبداله لاحقًا، لمحتوى يُعبر عن الرقم المذكور." },
      { number: "3k", label: "عنوان للرقم", desc: "محتوى نصي مختصر ليتم إستبداله لاحقًا، لمحتوى يُعبر عن الرقم المذكور." },
    ] };
}
function defaultHeroComplex(bgImage: string): HeroComplexData {
  return { bgImage, logo: logoImg, pattern: patternImg,
    title: "محتوى نصي ليتم إستبداله",
    subtitle: "وصف قصير مختصر ليتم إستبداله لاحقًا...",
    textBlocks: [
      { title: "عنوان نصي", para: "محتوى نصي مختصر ليتم إستبداله لاحقًا، لمحتوى يعبر عنه بما هو مناسب له." },
      { title: "عنوان نصي", para: "محتوى نصي مختصر ليتم إستبداله لاحقًا، لمحتوى يعبر عنه بما هو مناسب له." },
    ],
    iconItems: [
      { title: "محتوى نصي", desc: "وصف قصير مختصر" },
      { title: "محتوى نصي", desc: "وصف قصير مختصر" },
      { title: "محتوى نصي", desc: "وصف قصير مختصر" },
      { title: "محتوى نصي", desc: "وصف قصير مختصر" },
    ] };
}

/* ── Helper: build canvas props from state ── */
type AllData = {
  templateId: TemplateId;
  bgImage: string;
  darkGrid: DarkGridData;
  archGrid: ArchGridData;
  archFlow: ArchFlowData;
  heroList: HeroListData;
  heroStats: HeroStatsData;
  heroComplex: HeroComplexData;
};

function CanvasSwitch({ data }: { data: AllData }) {
  switch (data.templateId) {
    case "dark-grid":    return <DarkGridCanvas data={data.darkGrid} />;
    case "arch-grid":    return <ArchGridCanvas data={data.archGrid} />;
    case "arch-flow":    return <ArchFlowCanvas data={data.archFlow} />;
    case "hero-list":    return <HeroListCanvas data={data.heroList} />;
    case "hero-stats":   return <HeroStatsCanvas data={data.heroStats} />;
    case "hero-complex": return <HeroComplexCanvas data={data.heroComplex} />;
  }
}

/* ══════════════════════════════════════════
   Main page
══════════════════════════════════════════ */
export default function AdGenerator() {
  const [templateId, setTemplateId] = useState<TemplateId>("dark-grid");
  const [bgImage, setBgImage] = useState<string>(defaultBg);
  const [isExporting, setIsExporting] = useState(false);

  /* Per-template data (kept separate so switching doesn't lose data) */
  const [darkGrid, setDarkGrid] = useState<DarkGridData>(() => defaultDarkGrid(defaultBg));
  const [archGrid, setArchGrid] = useState<ArchGridData>(() => defaultArchGrid(defaultBg));
  const [archFlow, setArchFlow] = useState<ArchFlowData>(() => defaultArchFlow(defaultBg));
  const [heroList, setHeroList] = useState<HeroListData>(() => defaultHeroList(defaultBg));
  const [heroStats, setHeroStats] = useState<HeroStatsData>(() => defaultHeroStats(defaultBg));
  const [heroComplex, setHeroComplex] = useState<HeroComplexData>(() => defaultHeroComplex(defaultBg));

  /* Sync bgImage into every template's data */
  useEffect(() => {
    setDarkGrid(d => ({ ...d, bgImage }));
    setArchGrid(d => ({ ...d, bgImage }));
    setArchFlow(d => ({ ...d, bgImage }));
    setHeroList(d => ({ ...d, bgImage }));
    setHeroStats(d => ({ ...d, bgImage }));
    setHeroComplex(d => ({ ...d, bgImage }));
  }, [bgImage]);

  const allData: AllData = { templateId, bgImage, darkGrid, archGrid, archFlow, heroList, heroStats, heroComplex };

  /* Scale factor for preview */
  const [scale, setScale] = useState(0.5);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);
  const fileInputId = useId();

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / CANVAS_SIZE));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => ev.target?.result && setBgImage(ev.target.result as string);
    reader.readAsDataURL(file);
  };

  const exportAsImage = useCallback(async () => {
    const el = exportRef.current;
    if (!el) return;
    setIsExporting(true);
    try {
      el.style.visibility = "visible";
      await new Promise(r => setTimeout(r, 150));
      const canvas = await html2canvas(el, {
        scale: 1, useCORS: true, allowTaint: true,
        backgroundColor: "#ffffff", logging: false,
        width: CANVAS_SIZE, height: CANVAS_SIZE,
        windowWidth: CANVAS_SIZE, windowHeight: CANVAS_SIZE,
        imageTimeout: 20000,
      });
      el.style.visibility = "hidden";
      const link = document.createElement("a");
      link.download = "إعلان-جامعة-سطام.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error(err);
      if (exportRef.current) exportRef.current.style.visibility = "hidden";
    } finally {
      setIsExporting(false);
    }
  }, []);

  const resetCurrent = () => {
    const bg = bgImage;
    if (templateId === "dark-grid")    setDarkGrid(defaultDarkGrid(bg));
    if (templateId === "arch-grid")    setArchGrid(defaultArchGrid(bg));
    if (templateId === "arch-flow")    setArchFlow(defaultArchFlow(bg));
    if (templateId === "hero-list")    setHeroList(defaultHeroList(bg));
    if (templateId === "hero-stats")   setHeroStats(defaultHeroStats(bg));
    if (templateId === "hero-complex") setHeroComplex(defaultHeroComplex(bg));
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Hidden full-size export canvas */}
      <div ref={exportRef} style={{
        position: "fixed", top: 0, left: "-9999px",
        width: CANVAS_SIZE, height: CANVAS_SIZE,
        visibility: "hidden", zIndex: -1, pointerEvents: "none",
      }}>
        <CanvasSwitch data={allData} />
      </div>

      {/* Header */}
      <header className="bg-[#1e3d2f] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <div style={{ backgroundColor: "rgba(255,255,255,0.12)", borderRadius: 8, padding: "4px 8px" }}>
            <img src={logoImg} alt="شعار الجامعة"
              style={{ height: 36, display: "block", mixBlendMode: "screen" }} />
          </div>
          <div>
            <h1 className="text-base font-bold leading-tight">مولّد الإعلانات</h1>
            <p className="text-xs opacity-70">جامعة الأمير سطام بن عبدالعزيز</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 items-start">
        {/* ── Controls panel ── */}
        <div className="space-y-4">

          {/* Template selector */}
          <div className="bg-card border border-card-border rounded-xl p-4 shadow-sm">
            <h2 className="text-sm font-bold mb-3 pb-2 border-b border-border flex items-center gap-2">
              <LayoutTemplate className="h-4 w-4 text-primary" />
              اختر القالب
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {TEMPLATES.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTemplateId(t.id)}
                  className={`rounded-lg p-2.5 text-right border-2 transition-all ${
                    templateId === t.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/40 bg-background"
                  }`}
                >
                  <div className="text-sm font-bold">{t.label}</div>
                  <div className="text-xs opacity-70 leading-tight mt-0.5">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Background image */}
          <div className="bg-card border border-card-border rounded-xl p-4 shadow-sm">
            <h2 className="text-sm font-bold mb-3 pb-2 border-b border-border">صورة الخلفية</h2>
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
            {bgImage !== defaultBg && (
              <button onClick={() => setBgImage(defaultBg)}
                className="mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                ← استخدام الصورة الافتراضية
              </button>
            )}
          </div>

          {/* Dynamic controls per template */}
          <TemplateControls
            templateId={templateId}
            darkGrid={darkGrid} setDarkGrid={setDarkGrid}
            archGrid={archGrid} setArchGrid={setArchGrid}
            archFlow={archFlow} setArchFlow={setArchFlow}
            heroList={heroList} setHeroList={setHeroList}
            heroStats={heroStats} setHeroStats={setHeroStats}
            heroComplex={heroComplex} setHeroComplex={setHeroComplex}
          />

          {/* Actions */}
          <div className="flex gap-3">
            <Button data-testid="button-export" onClick={exportAsImage} disabled={isExporting}
              className="flex-1 gap-2 bg-[#1e3d2f] hover:bg-[#2a5240] text-white">
              {isExporting ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              {isExporting ? "جاري التصدير..." : "تحميل الصورة"}
            </Button>
            <Button data-testid="button-reset" variant="outline" onClick={resetCurrent} className="gap-2">
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
            <div ref={wrapperRef} className="w-full bg-muted/30 rounded-lg"
              style={{ aspectRatio: "1/1", position: "relative", overflow: "hidden" }}>
              <div style={{
                position: "absolute", top: 0, left: 0,
                transform: `scale(${scale})`, transformOrigin: "top left",
                width: CANVAS_SIZE, height: CANVAS_SIZE,
                pointerEvents: "none",
              }}>
                <CanvasSwitch data={allData} />
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

/* ══════════════════════════════════════════
   Dynamic controls per template
══════════════════════════════════════════ */
function TemplateControls({
  templateId,
  darkGrid, setDarkGrid,
  archGrid, setArchGrid,
  archFlow, setArchFlow,
  heroList, setHeroList,
  heroStats, setHeroStats,
  heroComplex, setHeroComplex,
}: {
  templateId: TemplateId;
  darkGrid: DarkGridData; setDarkGrid: (d: DarkGridData) => void;
  archGrid: ArchGridData; setArchGrid: (d: ArchGridData) => void;
  archFlow: ArchFlowData; setArchFlow: (d: ArchFlowData) => void;
  heroList: HeroListData; setHeroList: (d: HeroListData) => void;
  heroStats: HeroStatsData; setHeroStats: (d: HeroStatsData) => void;
  heroComplex: HeroComplexData; setHeroComplex: (d: HeroComplexData) => void;
}) {
  if (templateId === "dark-grid") return (
    <div className="bg-card border border-card-border rounded-xl p-4 shadow-sm space-y-4">
      <h2 className="text-sm font-bold pb-2 border-b border-border">محتوى القالب</h2>
      <FieldText label="العنوان الرئيسي" value={darkGrid.title}
        onChange={v => setDarkGrid({ ...darkGrid, title: v })} />
      <ItemsGrid4 items={darkGrid.items}
        onChange={items => setDarkGrid({ ...darkGrid, items })} />
    </div>
  );

  if (templateId === "arch-grid") return (
    <div className="bg-card border border-card-border rounded-xl p-4 shadow-sm space-y-4">
      <h2 className="text-sm font-bold pb-2 border-b border-border">محتوى القالب</h2>
      <FieldText label="العنوان الرئيسي" value={archGrid.title}
        onChange={v => setArchGrid({ ...archGrid, title: v })} />
      <ItemsGrid4 items={archGrid.items}
        onChange={items => setArchGrid({ ...archGrid, items })} />
    </div>
  );

  if (templateId === "arch-flow") return (
    <div className="bg-card border border-card-border rounded-xl p-4 shadow-sm space-y-4">
      <h2 className="text-sm font-bold pb-2 border-b border-border">محتوى القالب</h2>
      <FieldText label="العنوان الرئيسي" value={archFlow.title}
        onChange={v => setArchFlow({ ...archFlow, title: v })} />
      <div className="space-y-3">
        <p className="text-xs text-muted-foreground font-medium">عناصر التدفق (5 عناصر)</p>
        {archFlow.flowItems.map((item, i) => (
          <div key={i} className="space-y-1.5 pb-2 border-b border-border last:border-0">
            <p className="text-xs text-muted-foreground">العنصر {i + 1}</p>
            <Input value={item.text}
              onChange={e => setArchFlow({ ...archFlow, flowItems: archFlow.flowItems.map((x, j) => j === i ? { ...x, text: e.target.value } : x) })}
              placeholder="النص..." className="text-right text-sm" />
            <Input value={item.desc}
              onChange={e => setArchFlow({ ...archFlow, flowItems: archFlow.flowItems.map((x, j) => j === i ? { ...x, desc: e.target.value } : x) })}
              placeholder="الوصف..." className="text-right text-sm" />
          </div>
        ))}
      </div>
    </div>
  );

  if (templateId === "hero-list") return (
    <div className="bg-card border border-card-border rounded-xl p-4 shadow-sm space-y-4">
      <h2 className="text-sm font-bold pb-2 border-b border-border">محتوى القالب</h2>
      <FieldText label="العنوان الرئيسي" value={heroList.title}
        onChange={v => setHeroList({ ...heroList, title: v })} />
      <FieldText label="العنوان الفرعي" value={heroList.subtitle}
        onChange={v => setHeroList({ ...heroList, subtitle: v })} />
      <FieldText label="عنوان القسم" value={heroList.sectionTitle}
        onChange={v => setHeroList({ ...heroList, sectionTitle: v })} />
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground font-medium">القائمة (12 عنصر)</p>
        <div className="grid grid-cols-2 gap-2">
          {heroList.listItems.slice(0, 12).map((item, i) => (
            <Input key={i} value={item}
              onChange={e => setHeroList({ ...heroList, listItems: heroList.listItems.map((x, j) => j === i ? e.target.value : x) })}
              placeholder={`عنصر ${i + 1}`} className="text-right text-xs" />
          ))}
        </div>
      </div>
    </div>
  );

  if (templateId === "hero-stats") return (
    <div className="bg-card border border-card-border rounded-xl p-4 shadow-sm space-y-4">
      <h2 className="text-sm font-bold pb-2 border-b border-border">محتوى القالب</h2>
      <FieldText label="العنوان الرئيسي" value={heroStats.title}
        onChange={v => setHeroStats({ ...heroStats, title: v })} />
      <FieldText label="العنوان الفرعي" value={heroStats.subtitle}
        onChange={v => setHeroStats({ ...heroStats, subtitle: v })} />
      <div className="space-y-3">
        <p className="text-xs text-muted-foreground font-medium">الإحصائيات (3 أرقام)</p>
        {heroStats.stats.map((stat, i) => (
          <div key={i} className="space-y-1.5 pb-2 border-b border-border last:border-0">
            <p className="text-xs text-muted-foreground">الإحصاء {i + 1}</p>
            <div className="grid grid-cols-2 gap-2">
              <Input value={stat.number}
                onChange={e => setHeroStats({ ...heroStats, stats: heroStats.stats.map((x, j) => j === i ? { ...x, number: e.target.value } : x) })}
                placeholder="الرقم (مثل: 3k)" className="text-right text-sm" />
              <Input value={stat.label}
                onChange={e => setHeroStats({ ...heroStats, stats: heroStats.stats.map((x, j) => j === i ? { ...x, label: e.target.value } : x) })}
                placeholder="التسمية" className="text-right text-sm" />
            </div>
            <Textarea value={stat.desc} rows={2}
              onChange={e => setHeroStats({ ...heroStats, stats: heroStats.stats.map((x, j) => j === i ? { ...x, desc: e.target.value } : x) })}
              placeholder="الوصف..." className="text-right text-sm resize-none" />
          </div>
        ))}
      </div>
    </div>
  );

  if (templateId === "hero-complex") return (
    <div className="bg-card border border-card-border rounded-xl p-4 shadow-sm space-y-4">
      <h2 className="text-sm font-bold pb-2 border-b border-border">محتوى القالب</h2>
      <FieldText label="العنوان الرئيسي" value={heroComplex.title}
        onChange={v => setHeroComplex({ ...heroComplex, title: v })} />
      <FieldText label="العنوان الفرعي" value={heroComplex.subtitle}
        onChange={v => setHeroComplex({ ...heroComplex, subtitle: v })} />
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground font-medium">الفقرتان النصيتان</p>
        {heroComplex.textBlocks.map((b, i) => (
          <div key={i} className="space-y-1.5 pb-2 border-b border-border last:border-0">
            <p className="text-xs text-muted-foreground">الفقرة {i + 1}</p>
            <Input value={b.title}
              onChange={e => setHeroComplex({ ...heroComplex, textBlocks: heroComplex.textBlocks.map((x, j) => j === i ? { ...x, title: e.target.value } : x) })}
              placeholder="العنوان..." className="text-right text-sm" />
            <Textarea value={b.para} rows={2}
              onChange={e => setHeroComplex({ ...heroComplex, textBlocks: heroComplex.textBlocks.map((x, j) => j === i ? { ...x, para: e.target.value } : x) })}
              placeholder="الفقرة..." className="text-right text-sm resize-none" />
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground font-medium">البطاقات (4 عناصر)</p>
        {heroComplex.iconItems.map((item, i) => (
          <div key={i} className="grid grid-cols-2 gap-2">
            <Input value={item.title}
              onChange={e => setHeroComplex({ ...heroComplex, iconItems: heroComplex.iconItems.map((x, j) => j === i ? { ...x, title: e.target.value } : x) })}
              placeholder={`عنوان ${i + 1}`} className="text-right text-xs" />
            <Input value={item.desc}
              onChange={e => setHeroComplex({ ...heroComplex, iconItems: heroComplex.iconItems.map((x, j) => j === i ? { ...x, desc: e.target.value } : x) })}
              placeholder="الوصف" className="text-right text-xs" />
          </div>
        ))}
      </div>
    </div>
  );

  return null;
}

/* ── Reusable field components ── */
function FieldText({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground font-medium">{label}</p>
      <Input value={value} onChange={e => onChange(e.target.value)}
        placeholder={label} className="text-right text-sm" />
    </div>
  );
}

function ItemsGrid4({
  items,
  onChange,
}: { items: { title: string; desc: string }[]; onChange: (items: { title: string; desc: string }[]) => void }) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground font-medium">العناصر الأربعة</p>
      {items.slice(0, 4).map((item, i) => (
        <div key={i} className="space-y-1.5">
          <p className="text-xs text-muted-foreground">العنصر {i + 1}</p>
          <Input value={item.title}
            onChange={e => onChange(items.map((x, j) => j === i ? { ...x, title: e.target.value } : x))}
            placeholder="العنوان..." className="text-right text-sm" />
          <Input value={item.desc}
            onChange={e => onChange(items.map((x, j) => j === i ? { ...x, desc: e.target.value } : x))}
            placeholder="الوصف..." className="text-right text-sm" />
        </div>
      ))}
    </div>
  );
}
