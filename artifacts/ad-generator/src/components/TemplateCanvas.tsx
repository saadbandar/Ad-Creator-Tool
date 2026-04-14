/* ─────────────────────────────────────────────────────────────────
   PSAU Event Announcement Template — Portrait 1080×1920
   Layout matches reference image: IMG_8188_1776174513716.png
───────────────────────────────────────────────────────────────── */
import patternImg   from "@assets/image2.png";
import socialBar    from "@assets/image3.png";
import badgeImg     from "@assets/image5.png";
import iconClock    from "@assets/image6.png";
import iconCalendar from "@assets/image7.png";
import iconLocation from "@assets/image8.png";
import iconCert     from "@assets/image9.png";
import logoTeams    from "@assets/image10.png";
import logoZoom     from "@assets/image11.png";
import logoUniv     from "@assets/تصميم_بدون_عنوان_1776144448792.png";

export const CANVAS_W = 1080;
export const CANVAS_H = 1920;

export type LocationType = "in-person" | "teams" | "zoom";

export interface EventAdData {
  bgImage: string;
  departmentName: string;
  eventType: string;
  eventTitle: string;
  time: string;
  day: string;
  date: string;
  locationType: LocationType;
  venue: string;
  hasCertificate: boolean;
  qrCodeImage?: string;
}

/* ── Brand colours ── */
const TEAL       = "#5ab8b0";
const DARK_TEAL  = "#3c7974";
const DEEP_GREEN = "#0e3020";

/* ── 6 presets matching PPTX slides ── */
export interface TemplatePreset {
  id: number;
  label: string;
  locationType: LocationType;
  hasCertificate: boolean;
}
export const TEMPLATE_PRESETS: TemplatePreset[] = [
  { id: 1, label: "حضوري — بدون شهادة",  locationType: "in-person", hasCertificate: false },
  { id: 2, label: "حضوري — مع شهادة",     locationType: "in-person", hasCertificate: true  },
  { id: 3, label: "Teams — مع شهادة",     locationType: "teams",     hasCertificate: true  },
  { id: 4, label: "Teams — بدون شهادة",   locationType: "teams",     hasCertificate: false },
  { id: 5, label: "Zoom — مع شهادة",      locationType: "zoom",      hasCertificate: true  },
  { id: 6, label: "Zoom — بدون شهادة",    locationType: "zoom",      hasCertificate: false },
];

/* ═══════════════════════════════════════════════════════════════
   Main canvas — matches the reference image layout
═══════════════════════════════════════════════════════════════ */
export function EventAdCanvas({ data }: { data: EventAdData }) {
  const {
    bgImage,
    departmentName, eventType, eventTitle,
    time, day, date,
    locationType, venue,
    hasCertificate, qrCodeImage,
  } = data;

  const isOnline = locationType !== "in-person";

  /* ── vertical breakpoints (px at 1080×1920) ── */
  const PHOTO_H    = 860;   /* height of the photo/dark section          */
  const CURVE_TOP  = 800;   /* where the white curve SVG starts          */
  const WHITE_TOP  = 870;   /* start of white content area               */
  const FOOTER_TOP = 1790;  /* start of dark footer                      */

  return (
    <div style={{
      width: CANVAS_W, height: CANVAS_H,
      position: "relative", overflow: "hidden",
      backgroundColor: "#ffffff",
      fontFamily: "'Cairo','Arial',sans-serif",
      direction: "rtl",
    }}>

      {/* ════════════════════════════════════
          1. PHOTO + DARK TEAL OVERLAY
      ════════════════════════════════════ */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: PHOTO_H }}>
        <img src={bgImage} alt="" crossOrigin="anonymous"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(170deg,
            ${DEEP_GREEN}e6 0%,
            ${DARK_TEAL}d0 45%,
            ${DARK_TEAL}bb 80%,
            ${DARK_TEAL}90 100%)`,
        }} />
      </div>

      {/* ════════════════════════════════════
          2. UNIVERSITY LOGO — top right
             (shows Arabic + English as part of image)
      ════════════════════════════════════ */}
      <div style={{
        position: "absolute", top: 32, right: 36,
        zIndex: 20,
        backgroundColor: "rgba(255,255,255,0.15)",
        borderRadius: 14,
        padding: "8px 14px",
      }}>
        <img src={logoUniv} alt="" crossOrigin="anonymous"
          style={{ width: 230, display: "block", mixBlendMode: "multiply" }} />
      </div>

      {/* ════════════════════════════════════
          3. SVG WAVE CURVE — transitions photo→white
      ════════════════════════════════════ */}
      <div style={{
        position: "absolute", top: CURVE_TOP, left: 0, right: 0,
        height: 100, zIndex: 15,
      }}>
        <svg viewBox="0 0 1080 100" preserveAspectRatio="none" width="1080" height="100">
          <path d="M0,100 L0,60 Q540,0 1080,60 L1080,100 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* ════════════════════════════════════
          4. WHITE SECTION (covers from WHITE_TOP to FOOTER_TOP)
      ════════════════════════════════════ */}
      <div style={{
        position: "absolute",
        top: WHITE_TOP, left: 0, right: 0,
        bottom: CANVAS_H - FOOTER_TOP,
        backgroundColor: "#ffffff",
        zIndex: 5, overflow: "hidden",
      }}>
        {/* Geometric pattern watermark */}
        <img src={patternImg} alt="" crossOrigin="anonymous"
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", opacity: 0.055, pointerEvents: "none",
          }} />

        {/* ── Content column ── */}
        <div style={{
          position: "relative", zIndex: 2,
          display: "flex", flexDirection: "column",
          alignItems: "center",
          padding: "0 64px",
          height: "100%",
          boxSizing: "border-box",
        }}>

          {/* ── "دعـوة" — in the white area, dark teal, right after curve ── */}
          <div style={{ paddingTop: 52, textAlign: "center", width: "100%" }}>
            <span style={{
              color: DARK_TEAL,
              fontSize: 82,
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "0.08em",
              display: "block",
            }}>
              دعـــوة
            </span>
          </div>

          {/* ── University invitation text (restored, right-aligned / RTL) ── */}
          <div style={{
            marginTop: 38,
            width: "100%",
            textAlign: "right",
            display: "flex", flexDirection: "column", gap: 12,
          }}>
            <p style={{ color: DEEP_GREEN, fontSize: 32, fontWeight: 700, margin: 0, lineHeight: 1.5 }}>
              تـدعوكم جـامعة الأمير سطام بن عبدالعزيـز
            </p>
            <p style={{ color: "#333", fontSize: 29, fontWeight: 400, margin: 0, lineHeight: 1.5 }}>
              ممثلة بـ "{departmentName}"
            </p>
            <p style={{ color: "#333", fontSize: 29, fontWeight: 400, margin: 0, lineHeight: 1.5 }}>
              لحضور "{eventType}"
            </p>
          </div>

          {/* ── Event title — large teal text with quotation marks, no box ── */}
          <div style={{ marginTop: 36, width: "100%", textAlign: "center" }}>
            <p style={{
              color: DARK_TEAL,
              fontSize: 58,
              fontWeight: 900,
              lineHeight: 1.35,
              margin: 0,
            }}>
              "{eventTitle}"
            </p>
          </div>

          {/* ── QR code block (online only, if uploaded) ── */}
          {isOnline && qrCodeImage && (
            <div style={{
              marginTop: 32,
              display: "flex",
              alignItems: "center",
              gap: 28,
              width: "100%",
              justifyContent: "center",
            }}>
              <img src={qrCodeImage} alt="QR" crossOrigin="anonymous"
                style={{ width: 200, height: 200, objectFit: "contain", borderRadius: 12 }} />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
                <p style={{ color: DARK_TEAL, fontSize: 28, fontWeight: 700, margin: 0 }}>عن بُعد عبر</p>
                <img
                  src={locationType === "teams" ? logoTeams : logoZoom}
                  alt="" crossOrigin="anonymous"
                  style={{ height: locationType === "zoom" ? 38 : 48, objectFit: "contain" }}
                />
              </div>
            </div>
          )}

          {/* ── 4 info cards in a horizontal row ── */}
          <div style={{
            marginTop: "auto",
            paddingBottom: 40,
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "flex-start",
            gap: 0,
            direction: "rtl",
          }}>
            {/* Card: اليوم / التاريخ */}
            <IconCard icon={iconCalendar} label="اليوم" value={`${day}\n${date}`} />

            {/* Card: الساعة / التوقيت */}
            <IconCard icon={iconClock} label="الساعة" value={time} />

            {/* Card: location — either venue or platform */}
            {isOnline && !qrCodeImage ? (
              /* Online without QR: show platform in location slot */
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
                flex: 1, textAlign: "center",
              }}>
                <img
                  src={locationType === "teams" ? logoTeams : logoZoom}
                  alt="" crossOrigin="anonymous"
                  style={{ height: 56, objectFit: "contain" }}
                />
                <p style={{ color: "#555", fontSize: 22, margin: 0 }}>عن بُعد</p>
              </div>
            ) : (
              <IconCard icon={iconLocation} label="المكان" value={isOnline ? "عن بُعد" : venue} />
            )}

            {/* Card: certificate — only when hasCertificate */}
            {hasCertificate && (
              <IconCard icon={iconCert} label="يوجد" value={"شهادات\nحضور"} />
            )}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════
          5. FOOTER — dark teal bar
      ════════════════════════════════════ */}
      <div style={{
        position: "absolute",
        top: FOOTER_TOP, left: 0, right: 0, bottom: 0,
        backgroundColor: DARK_TEAL,
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        padding: "0 36px",
        direction: "ltr",
        gap: 24,
      }}>
        {/* NCAAA badge — LEFT */}
        <img src={badgeImg} alt="" crossOrigin="anonymous"
          style={{ height: 110, objectFit: "contain", flexShrink: 0 }} />
        {/* Social media bar — fills remaining space */}
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <img src={socialBar} alt="" crossOrigin="anonymous"
            style={{ height: 80, objectFit: "contain" }} />
        </div>
      </div>
    </div>
  );
}

/* ── Borderless icon card: icon (top) → label → value ── */
function IconCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  const lines = value.split("\n");
  return (
    <div style={{
      flex: 1,
      display: "flex", flexDirection: "column",
      alignItems: "center",
      gap: 10,
      textAlign: "center",
      padding: "0 8px",
    }}>
      <img src={icon} alt="" crossOrigin="anonymous"
        style={{ width: 72, height: 72, objectFit: "contain" }} />
      <p style={{ color: "#777", fontSize: 22, margin: 0, lineHeight: 1.3 }}>{label}</p>
      {lines.map((line, i) => (
        <p key={i} style={{ color: DEEP_GREEN, fontSize: 24, fontWeight: 700, margin: 0, lineHeight: 1.3 }}>
          {line}
        </p>
      ))}
    </div>
  );
}
