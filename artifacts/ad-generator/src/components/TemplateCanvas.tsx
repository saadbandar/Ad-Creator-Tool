/* ─────────────────────────────────────────────────────────────────
   Event Announcement Template — Portrait 1080×1920
   Faithful recreation of the official PSAU event invitation card
───────────────────────────────────────────────────────────────── */
import bgTemplate   from "@assets/image1.png";
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
  bgImage: string;           // user-uploaded or default
  departmentName: string;    // اسم الجهة
  eventType: string;         // نوع الفعالية
  eventTitle: string;        // عنوان الفعالية
  time: string;              // التوقيت
  day: string;               // اليوم
  date: string;              // التاريخ
  locationType: LocationType;
  venue: string;             // for in-person: description of place
  hasCertificate: boolean;
}

/* ── Shared colours ── */
const TEAL     = "#6ac7bd";
const DARK_TEAL = "#3c7974";
const DEEP_GREEN = "#0e3020";

/* ═══════════════════════════════════════════════════════════════
   The main canvas component
═══════════════════════════════════════════════════════════════ */
export function EventAdCanvas({ data }: { data: EventAdData }) {
  const {
    bgImage,
    departmentName, eventType, eventTitle,
    time, day, date,
    locationType, venue,
    hasCertificate,
  } = data;

  /* ── Layout constants (px) ── */
  const CURVE_TOP = 1000;   /* where the curve starts (top of white wave) */
  const CONTENT_TOP = 1070; /* start of white content section */
  const FOOTER_TOP = 1790;  /* start of dark footer */

  return (
    <div style={{
      width: CANVAS_W,
      height: CANVAS_H,
      position: "relative",
      overflow: "hidden",
      backgroundColor: "#ffffff",
      fontFamily: "'Cairo','Arial',sans-serif",
      direction: "rtl",
    }}>
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. BACKGROUND IMAGE + TEAL OVERLAY
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: CURVE_TOP + 60 }}>
        <img src={bgImage} alt="" crossOrigin="anonymous"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(175deg,
            ${DEEP_GREEN}dd 0%,
            ${DARK_TEAL}cc 40%,
            ${DARK_TEAL}bb 75%,
            ${DARK_TEAL}88 100%)`,
        }} />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. UNIVERSITY LOGO (top-right)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div style={{
        position: "absolute", top: 38, right: 40,
        backgroundColor: "rgba(255,255,255,0.18)",
        borderRadius: 16,
        padding: "10px 16px",
        zIndex: 20,
      }}>
        <img src={logoUniv} alt="" crossOrigin="anonymous"
          style={{ width: 210, display: "block", mixBlendMode: "multiply" }} />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. "دعوة" HERO TITLE
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div style={{
        position: "absolute", top: 290, left: 0, right: 0,
        textAlign: "center", zIndex: 10,
      }}>
        <span style={{
          color: "#ffffff",
          fontSize: 200,
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: "0.04em",
          display: "block",
          textShadow: "0 4px 30px rgba(0,0,0,0.3)",
        }}>
          دعـوة
        </span>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. INVITATION TEXT (over dark section)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div style={{
        position: "absolute", top: 560, left: 0, right: 0,
        padding: "0 60px",
        textAlign: "center",
        zIndex: 10,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
      }}>
        <p style={{ color: "#ffffffee", fontSize: 36, fontWeight: 600, margin: 0, lineHeight: 1.5 }}>
          تـدعوكم جـامعة الأمير سطام بن عبدالعزيـز
        </p>
        <p style={{ color: "#ffffffcc", fontSize: 32, fontWeight: 400, margin: 0, lineHeight: 1.5 }}>
          ممثلة بـ "{departmentName}"
        </p>
        <p style={{ color: "#ffffffcc", fontSize: 32, fontWeight: 400, margin: 0, lineHeight: 1.5 }}>
          لحضور "{eventType}"
        </p>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          5. SVG CURVE TRANSITION
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div style={{
        position: "absolute", top: CURVE_TOP - 10, left: 0, right: 0,
        height: 90, zIndex: 15,
      }}>
        <svg viewBox="0 0 1080 90" preserveAspectRatio="none" width="1080" height="90">
          <path d="M0,90 L0,55 Q540,-10 1080,55 L1080,90 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          6. WHITE CONTENT SECTION
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div style={{
        position: "absolute",
        top: CONTENT_TOP, left: 0, right: 0,
        bottom: CANVAS_H - FOOTER_TOP,
        backgroundColor: "#ffffff",
        zIndex: 5,
        overflow: "hidden",
      }}>
        {/* Geometric pattern watermark */}
        <img src={patternImg} alt="" crossOrigin="anonymous"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center",
            opacity: 0.06, pointerEvents: "none",
          }} />

        {/* Content */}
        <div style={{
          position: "relative", zIndex: 2,
          display: "flex", flexDirection: "column",
          alignItems: "center",
          padding: "40px 60px 30px",
          gap: 24,
          height: "100%",
          boxSizing: "border-box",
        }}>
          {/* Event title */}
          <div style={{
            background: `linear-gradient(135deg, ${DEEP_GREEN} 0%, ${DARK_TEAL} 100%)`,
            borderRadius: 20,
            padding: "28px 48px",
            width: "100%",
            textAlign: "center",
            boxSizing: "border-box",
          }}>
            <p style={{
              color: "#ffffff",
              fontSize: 52,
              fontWeight: 900,
              lineHeight: 1.3,
              margin: 0,
              textShadow: "0 2px 10px rgba(0,0,0,0.2)",
            }}>
              {eventTitle}
            </p>
          </div>

          {/* Info cards: time + date */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            width: "100%",
          }}>
            {/* Time */}
            <InfoCard icon={iconClock} label="الساعة" value={time} />
            {/* Date */}
            <InfoCard icon={iconCalendar} label={day} value={date} />
          </div>

          {/* Location / Platform */}
          {locationType === "in-person" ? (
            <div style={{ width: "100%" }}>
              <InfoCard icon={iconLocation} label="المكان" value={venue} fullWidth />
            </div>
          ) : (
            <div style={{
              width: "100%",
              border: `2px solid ${TEAL}44`,
              borderRadius: 16,
              padding: "22px 32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              direction: "rtl",
              background: `${TEAL}08`,
              boxSizing: "border-box",
            }}>
              <span style={{ color: DARK_TEAL, fontSize: 30, fontWeight: 700 }}>عن بُعد عبر</span>
              <img
                src={locationType === "teams" ? logoTeams : logoZoom}
                alt={locationType === "teams" ? "Microsoft Teams" : "Zoom"}
                crossOrigin="anonymous"
                style={{ height: locationType === "zoom" ? 40 : 50, objectFit: "contain" }}
              />
            </div>
          )}

          {/* Certificate badge */}
          {hasCertificate && (
            <div style={{
              display: "flex", alignItems: "center", gap: 18,
              border: `2px solid ${TEAL}55`,
              borderRadius: 16,
              padding: "18px 32px",
              width: "100%",
              background: `${TEAL}08`,
              direction: "rtl",
              boxSizing: "border-box",
            }}>
              <img src={iconCert} alt="" crossOrigin="anonymous" style={{ width: 52, flexShrink: 0 }} />
              <div>
                <p style={{ color: DARK_TEAL, fontSize: 26, fontWeight: 800, margin: 0 }}>يوجد شهادات حضور</p>
                <p style={{ color: "#888", fontSize: 22, margin: "4px 0 0" }}>سيتم منح شهادة حضور للمشاركين</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          7. FOOTER (dark teal)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div style={{
        position: "absolute",
        top: FOOTER_TOP, left: 0, right: 0, bottom: 0,
        backgroundColor: DARK_TEAL,
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        direction: "ltr",
      }}>
        {/* Social media bar image */}
        <img src={socialBar} alt="" crossOrigin="anonymous"
          style={{ height: 80, objectFit: "contain" }} />
        {/* Accreditation badge */}
        <img src={badgeImg} alt="" crossOrigin="anonymous"
          style={{ height: 100, objectFit: "contain" }} />
      </div>
    </div>
  );
}

/* ── Reusable info card ── */
function InfoCard({ icon, label, value, fullWidth }: {
  icon: string; label: string; value: string; fullWidth?: boolean;
}) {
  return (
    <div style={{
      border: `2px solid ${TEAL}44`,
      borderRadius: 16,
      padding: "20px 24px",
      display: "flex",
      alignItems: "center",
      gap: 16,
      direction: "rtl",
      background: `${TEAL}08`,
      boxSizing: "border-box",
      width: fullWidth ? "100%" : undefined,
    }}>
      <img src={icon} alt="" crossOrigin="anonymous" style={{ width: 54, flexShrink: 0 }} />
      <div>
        <p style={{ color: "#888", fontSize: 22, margin: 0, lineHeight: 1.2 }}>{label}</p>
        <p style={{ color: "#1a2e22", fontSize: 28, fontWeight: 800, margin: "4px 0 0", lineHeight: 1.3 }}>{value}</p>
      </div>
    </div>
  );
}
