import { useState, useRef, useCallback } from "react";
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Download, Eye, RefreshCw } from "lucide-react";

type AdSize = {
  label: string;
  width: number;
  height: number;
  ratio: string;
};

const AD_SIZES: Record<string, AdSize> = {
  square: { label: "مربع (1:1)", width: 1080, height: 1080, ratio: "1 / 1" },
  landscape: { label: "أفقي (16:9)", width: 1920, height: 1080, ratio: "16 / 9" },
  portrait: { label: "عمودي (4:5)", width: 1080, height: 1350, ratio: "4 / 5" },
  story: { label: "ستوري (9:16)", width: 1080, height: 1920, ratio: "9 / 16" },
  banner: { label: "بانر (3:1)", width: 1200, height: 400, ratio: "3 / 1" },
};

type AdTemplate = "teal-light" | "teal-dark" | "white-teal" | "gradient";

const TEMPLATES: Record<AdTemplate, { label: string; bg: string; text: string; accent: string; desc: string }> = {
  "teal-light": {
    label: "فاتح",
    bg: "linear-gradient(135deg, #f1f9f7 0%, #bbe3e7 100%)",
    text: "#1a3d3b",
    accent: "#3c7974",
    desc: "خلفية فاتحة مع ألوان الجامعة",
  },
  "teal-dark": {
    label: "داكن",
    bg: "linear-gradient(135deg, #1a3d3b 0%, #3c7974 100%)",
    text: "#f1f9f7",
    accent: "#6ac7bd",
    desc: "خلفية داكنة بألوان الجامعة",
  },
  "white-teal": {
    label: "أبيض وأخضر",
    bg: "#ffffff",
    text: "#1a3d3b",
    accent: "#6ac7bd",
    desc: "خلفية بيضاء مع إطار ملون",
  },
  gradient: {
    label: "متدرج",
    bg: "linear-gradient(160deg, #6ac7bd 0%, #3c7974 50%, #1a3d3b 100%)",
    text: "#f1f9f7",
    accent: "#bbe3e7",
    desc: "تدرج أخضر مائي",
  },
};

export default function AdGenerator() {
  const [title, setTitle] = useState("عنوان الإعلان الرئيسي");
  const [subtitle, setSubtitle] = useState("النص التوضيحي للإعلان");
  const [body, setBody] = useState("تفاصيل الإعلان وأي معلومات إضافية تريد إضافتها هنا. يمكنك كتابة نص طويل أو قصير حسب الحاجة.");
  const [footer, setFooter] = useState("جامعة الأمير سطام بن عبدالعزيز");
  const [selectedSize, setSelectedSize] = useState<string>("square");
  const [selectedTemplate, setSelectedTemplate] = useState<AdTemplate>("teal-light");
  const [isExporting, setIsExporting] = useState(false);
  const adRef = useRef<HTMLDivElement>(null);

  const template = TEMPLATES[selectedTemplate];
  const size = AD_SIZES[selectedSize];

  const exportAsImage = useCallback(async () => {
    if (!adRef.current) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(adRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        width: adRef.current.offsetWidth,
        height: adRef.current.offsetHeight,
        logging: false,
      });
      const link = document.createElement("a");
      link.download = `إعلان-جامعة-سطام-${selectedSize}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Export error:", err);
    } finally {
      setIsExporting(false);
    }
  }, [selectedSize]);

  const resetFields = () => {
    setTitle("عنوان الإعلان الرئيسي");
    setSubtitle("النص التوضيحي للإعلان");
    setBody("تفاصيل الإعلان وأي معلومات إضافية تريد إضافتها هنا. يمكنك كتابة نص طويل أو قصير حسب الحاجة.");
    setFooter("جامعة الأمير سطام بن عبدالعزيز");
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <div className="flex items-center gap-3">
            <UniversityLogo color="#ffffff" size={48} />
            <div>
              <h1 className="text-lg font-bold leading-tight">مولّد الإعلانات</h1>
              <p className="text-xs opacity-80">جامعة الأمير سطام بن عبدالعزيز</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls Panel */}
        <div className="space-y-5">
          <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
            <h2 className="text-base font-bold text-foreground mb-4 pb-2 border-b border-border">محتوى الإعلان</h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-sm font-semibold mb-1.5 block">العنوان الرئيسي</Label>
                <Input
                  id="title"
                  data-testid="input-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="اكتب العنوان هنا..."
                  className="text-right"
                />
              </div>

              <div>
                <Label htmlFor="subtitle" className="text-sm font-semibold mb-1.5 block">العنوان الفرعي</Label>
                <Input
                  id="subtitle"
                  data-testid="input-subtitle"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="اكتب العنوان الفرعي..."
                  className="text-right"
                />
              </div>

              <div>
                <Label htmlFor="body" className="text-sm font-semibold mb-1.5 block">نص الإعلان</Label>
                <Textarea
                  id="body"
                  data-testid="textarea-body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="اكتب نص الإعلان التفصيلي هنا..."
                  rows={4}
                  className="text-right resize-none"
                />
              </div>

              <div>
                <Label htmlFor="footer" className="text-sm font-semibold mb-1.5 block">نص التذييل</Label>
                <Input
                  id="footer"
                  data-testid="input-footer"
                  value={footer}
                  onChange={(e) => setFooter(e.target.value)}
                  placeholder="مثال: جامعة الأمير سطام بن عبدالعزيز"
                  className="text-right"
                />
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
            <h2 className="text-base font-bold text-foreground mb-4 pb-2 border-b border-border">إعدادات الإعلان</h2>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-semibold mb-1.5 block">حجم الإعلان</Label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger data-testid="select-size" className="text-right">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(AD_SIZES).map(([key, val]) => (
                      <SelectItem key={key} value={key}>{val.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">{size.width} × {size.height} بكسل</p>
              </div>

              <div>
                <Label className="text-sm font-semibold mb-1.5 block">القالب</Label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.entries(TEMPLATES) as [AdTemplate, typeof TEMPLATES[AdTemplate]][]).map(([key, tmpl]) => (
                    <button
                      key={key}
                      data-testid={`template-${key}`}
                      onClick={() => setSelectedTemplate(key)}
                      className={`p-3 rounded-lg border-2 text-right transition-all ${
                        selectedTemplate === key
                          ? "border-primary shadow-sm"
                          : "border-border hover:border-primary/40"
                      }`}
                    >
                      <div
                        className="w-full h-8 rounded mb-2"
                        style={{ background: tmpl.bg, border: "1px solid rgba(0,0,0,0.08)" }}
                      />
                      <p className="text-xs font-semibold">{tmpl.label}</p>
                      <p className="text-xs text-muted-foreground">{tmpl.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              data-testid="button-export"
              onClick={exportAsImage}
              disabled={isExporting}
              className="flex-1 gap-2"
            >
              {isExporting ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              {isExporting ? "جاري التصدير..." : "تحميل الصورة"}
            </Button>
            <Button
              data-testid="button-reset"
              variant="outline"
              onClick={resetFields}
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              إعادة تعيين
            </Button>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="space-y-3">
          <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-border">
              <h2 className="text-base font-bold text-foreground">معاينة الإعلان</h2>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Eye className="h-3.5 w-3.5" />
                معاينة مباشرة
              </div>
            </div>

            {/* Ad Preview Container */}
            <div className="flex items-center justify-center bg-muted/40 rounded-lg p-4 min-h-[300px]">
              <div
                className="w-full overflow-hidden"
                style={{ aspectRatio: size.ratio, maxHeight: "500px" }}
              >
                <div
                  ref={adRef}
                  className="w-full h-full relative flex flex-col"
                  style={{
                    background: template.bg,
                    fontFamily: "'Cairo', 'Neo Sans Arabic', sans-serif",
                    direction: "rtl",
                  }}
                >
                  {/* Decorative top bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1.5"
                    style={{ background: template.accent }}
                  />

                  {/* Logo area */}
                  <div className="flex items-center gap-3 p-5 pt-6">
                    <UniversityLogo color={template.accent} size={40} />
                    <div>
                      <p className="text-xs font-bold" style={{ color: template.accent }}>
                        PRINCE SATTAM BIN ABDULAZIZ UNIVERSITY
                      </p>
                      <p className="text-xs" style={{ color: template.text, opacity: 0.8 }}>
                        جامعة الأمير سطام بن عبدالعزيز
                      </p>
                    </div>
                  </div>

                  {/* Divider line */}
                  <div className="mx-5 h-px opacity-20" style={{ background: template.text }} />

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-center p-5 gap-3">
                    {title && (
                      <h2
                        className="font-black leading-tight"
                        style={{
                          color: template.text,
                          fontSize: "clamp(16px, 4vw, 32px)",
                          lineHeight: 1.3,
                        }}
                      >
                        {title}
                      </h2>
                    )}
                    {subtitle && (
                      <p
                        className="font-semibold"
                        style={{
                          color: template.accent,
                          fontSize: "clamp(12px, 2.5vw, 20px)",
                        }}
                      >
                        {subtitle}
                      </p>
                    )}
                    {body && (
                      <p
                        className="leading-relaxed opacity-85"
                        style={{
                          color: template.text,
                          fontSize: "clamp(10px, 1.8vw, 15px)",
                        }}
                      >
                        {body}
                      </p>
                    )}
                  </div>

                  {/* Footer */}
                  <div
                    className="px-5 py-3 flex items-center justify-between"
                    style={{ borderTop: `1px solid ${template.accent}30` }}
                  >
                    <p
                      className="text-xs font-semibold"
                      style={{ color: template.text, opacity: 0.7 }}
                    >
                      {footer}
                    </p>
                    <div
                      className="w-16 h-1 rounded-full"
                      style={{ background: template.accent, opacity: 0.6 }}
                    />
                  </div>

                  {/* Decorative bottom bar */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1"
                    style={{ background: template.accent, opacity: 0.4 }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="bg-accent/30 border border-accent-border rounded-lg px-4 py-3">
            <p className="text-xs text-foreground/70 leading-relaxed">
              <strong>ملاحظة:</strong> الصورة ستُحمّل بجودة عالية ({size.width}×{size.height} بكسل) عند الضغط على زر "تحميل الصورة".
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function UniversityLogo({ color, size }: { color: string; size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="شعار جامعة الأمير سطام"
    >
      {/* Stylized university emblem inspired by PSAU identity */}
      <circle cx="50" cy="50" r="48" fill={color} fillOpacity="0.12" />
      <circle cx="50" cy="50" r="42" stroke={color} strokeWidth="2" fill="none" />
      {/* Book shape */}
      <rect x="28" y="38" width="44" height="30" rx="3" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" />
      <line x1="50" y1="38" x2="50" y2="68" stroke={color} strokeWidth="1.5" />
      {/* Pages lines */}
      <line x1="33" y1="46" x2="46" y2="46" stroke={color} strokeWidth="1" opacity="0.7" />
      <line x1="33" y1="51" x2="46" y2="51" stroke={color} strokeWidth="1" opacity="0.7" />
      <line x1="33" y1="56" x2="46" y2="56" stroke={color} strokeWidth="1" opacity="0.7" />
      <line x1="54" y1="46" x2="67" y2="46" stroke={color} strokeWidth="1" opacity="0.7" />
      <line x1="54" y1="51" x2="67" y2="51" stroke={color} strokeWidth="1" opacity="0.7" />
      <line x1="54" y1="56" x2="67" y2="56" stroke={color} strokeWidth="1" opacity="0.7" />
      {/* Torch top */}
      <path d="M50 20 L44 34 L56 34 Z" fill={color} fillOpacity="0.8" />
      <circle cx="50" cy="18" r="4" fill={color} />
      {/* Stars */}
      <circle cx="28" cy="28" r="2" fill={color} fillOpacity="0.6" />
      <circle cx="72" cy="28" r="2" fill={color} fillOpacity="0.6" />
    </svg>
  );
}
