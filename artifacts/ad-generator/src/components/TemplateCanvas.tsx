/* ─────────────────────────────────────────────────────────────────
   PSAU Event Announcement Template — Portrait 1080×1920
   Layout matches reference: 36adf217-6621-47c2-94ea-1518ac99ca8b
─────────────────────────────────────────────────────────────────── */
import patternImg        from "@assets/image2.png";
import patternTransparent from "@assets/pattern_transparent.png";
import socialBar    from "@assets/image3.png";
import badgeImg     from "@assets/image5.png";
import iconClock    from "@assets/image6.png";
import iconCalendar from "@assets/image7.png";
import iconLocation from "@assets/image8.png";
import iconCert     from "@assets/image9.png";
import logoTeams    from "@assets/image10.png";
import logoZoom     from "@assets/image11.png";
import logoUniv      from "@assets/تصميم_بدون_عنوان_1776144448792.png";
import logoUnivWhite from "@assets/logo_white.png";

export const CANVAS_W = 1080;
export const CANVAS_H = 1920;

export type LocationType = "in-person" | "teams" | "zoom";

export interface EventAdData {
  bgImage: string;
  bgPositionX: number;
  bgPositionY: number;
  departmentName: string;
  representedBy?: string;
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

const TEAL       = "#5ab8b0";
const DARK_TEAL  = "#3c7974";
const DEEP_GREEN = "#0e3020";

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

export function EventAdCanvas({ data }: { data: EventAdData }) {
  const {
    bgImage, bgPositionX, bgPositionY,
    departmentName, representedBy, eventType, eventTitle,
    time, day, date,
    locationType, venue,
    hasCertificate, qrCodeImage,
  } = data;

  const isOnline      = locationType !== "in-person";
  const platformLogo  = locationType === "teams" ? logoTeams : logoZoom;
  const platformName  = locationType === "teams" ? "Microsoft Teams" : "Zoom";

  const PHOTO_H    = 700;
  const CURVE_TOP  = 598;
  const WHITE_TOP  = 710;
  const FOOTER_TOP = 1790;

  return (
    <div style={{
      width: CANVAS_W, height: CANVAS_H,
      position: "relative", overflow: "hidden",
      backgroundColor: "#ffffff",
      fontFamily: "'Cairo','Arial',sans-serif",
      direction: "rtl",
    }}>

      {/* ══════════════════════════════════════
          1. PHOTO SECTION + DARK TEAL OVERLAY
      ══════════════════════════════════════ */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: PHOTO_H }}>

        {/* Background photo */}
        <img src={bgImage} alt="" crossOrigin="anonymous" style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%", objectFit: "cover",
          objectPosition: `${bgPositionX ?? 50}% ${bgPositionY ?? 50}%`,
        }} />

        {/* Dark teal gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(170deg,
            ${DEEP_GREEN}e8 0%,
            ${DARK_TEAL}d4 45%,
            ${DARK_TEAL}c0 80%,
            ${DARK_TEAL}95 100%)`,
        }} />

        {/* Pattern / vector watermark over the dark overlay */}
        <img src={patternImg} alt="" crossOrigin="anonymous" style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover", opacity: 0.07, pointerEvents: "none",
          mixBlendMode: "overlay",
        }} />

        {/* ── "دعـوة" — large white text over the photo, near the bottom ── */}
        <div style={{
          position: "absolute",
          bottom: 148,
          left: 0, right: 0,
          padding: "0 64px",
          textAlign: "center",
          zIndex: 5,
        }}>
          <span style={{
            color: "#ffffff",
            fontSize: 110,
            fontWeight: 900,
            lineHeight: 1,
            display: "block",
          }}>
            دعوة
          </span>
        </div>
      </div>

      {/* ══════════════════════════════════════
          2. UNIVERSITY LOGO — top right (white via CSS filter)
      ══════════════════════════════════════ */}
      <div style={{
        position: "absolute", top: 32, right: 36, zIndex: 20,
      }}>
        <img src={logoUnivWhite} alt="" crossOrigin="anonymous"
          style={{ width: 240, display: "block" }} />
      </div>

      {/* ══════════════════════════════════════
          3. SVG WAVE CURVE + decorative arc
      ══════════════════════════════════════ */}
      <div style={{
        position: "absolute", top: CURVE_TOP, left: 0, right: 0,
        height: 120, zIndex: 15,
      }}>
        <svg viewBox="0 0 1080 120" preserveAspectRatio="none" width="1080" height="120">
          <defs>
            {/* Horizontal gradient — transparent at edges, opaque at center */}
            <linearGradient id="arcFillGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor={TEAL} stopOpacity="0"   />
              <stop offset="25%"  stopColor={TEAL} stopOpacity="0.75"/>
              <stop offset="50%"  stopColor={TEAL} stopOpacity="1"   />
              <stop offset="75%"  stopColor={TEAL} stopOpacity="0.75"/>
              <stop offset="100%" stopColor={TEAL} stopOpacity="0"   />
            </linearGradient>
          </defs>

          {/* White filled background wave */}
          <path d="M0,120 L0,72 Q540,8 1080,72 L1080,120 Z" fill="#ffffff" />

          {/*
            Tapered arc ribbon:
            Upper edge: Q540,8  (tight / high)
            Lower edge: Q540,36 (looser / lower)
            → thick (~20 px) at center, tapers to 0 at both ends
          */}
          <path
            d="M0,72 Q540,8 1080,72 Q540,36 0,72 Z"
            fill="url(#arcFillGrad)"
          />

        </svg>
      </div>

      {/* ══════════════════════════════════════
          4. WHITE SECTION
      ══════════════════════════════════════ */}
      <div style={{
        position: "absolute",
        top: WHITE_TOP, left: 0, right: 0,
        bottom: CANVAS_H - FOOTER_TOP,
        backgroundColor: "#ffffff",
        zIndex: 5, overflow: "hidden",
      }}>
        {/* Pattern overlay — vertical fade: visible at top, fades to transparent at bottom */}
        <img src={patternTransparent} alt="" crossOrigin="anonymous" style={{
          position: "absolute",
          inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          objectPosition: "center top",
          opacity: 0.13,
          pointerEvents: "none",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 40%, transparent 80%)",
          maskImage:        "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 40%, transparent 80%)",
        }} />

        {/* Content column */}
        <div style={{
          position: "relative", zIndex: 2,
          display: "flex", flexDirection: "column",
          alignItems: "flex-end",
          padding: "44px 64px 40px 64px",
          height: "100%",
          boxSizing: "border-box",
          gap: 0,
        }}>

          {/* ── Invitation text — 3 lines, NO quotation marks ── */}
          <div style={{
            width: "100%",
            textAlign: "center",
            display: "flex", flexDirection: "column", gap: 6,
          }}>
            <p style={{ color: DEEP_GREEN, fontSize: 40, fontWeight: 700, margin: 0, lineHeight: 1.65 }}>
              تدعوكم كلية إدارة الأعمال بحوطة بني تميم
            </p>
            {representedBy && (
              <p style={{ color: DARK_TEAL, fontSize: 34, fontWeight: 600, margin: 0, lineHeight: 1.5 }}>
                ممثلة بـ {representedBy}
              </p>
            )}
            <p style={{ color: "#1a1a1a", fontSize: 37, fontWeight: 500, margin: 0, lineHeight: 1.65 }}>
              لحضـور {eventType}
            </p>
          </div>

          {/* ── Event title — teal, centered, no quotes ── */}
          <div style={{ marginTop: 36, width: "100%", textAlign: "center" }}>
            <p style={{
              color: TEAL,
              fontSize: 64,
              fontWeight: 900,
              lineHeight: 1.45,
              margin: 0,
            }}>
              {eventTitle}
            </p>
          </div>

          {/* ── INFO CARD — light bg, QR left + info rows right ── */}
          <div style={{
            marginTop: "auto",
            width: "100%",
            backgroundColor: "#eaf5f4",
            borderRadius: 26,
            padding: "36px 40px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 32,
            direction: "ltr",
            boxSizing: "border-box",
          }}>

            {/* QR CODE — left side (always shown for online) */}
            {isOnline && (
              <div style={{
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 220,
                height: 220,
                backgroundColor: "#fff",
                borderRadius: 16,
                padding: 8,
              }}>
                {qrCodeImage ? (
                  <img src={qrCodeImage} alt="QR" crossOrigin="anonymous"
                    style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 8 }} />
                ) : (
                  <div style={{
                    width: "100%", height: "100%",
                    border: `3px dashed ${TEAL}`,
                    borderRadius: 10,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{ color: TEAL, fontSize: 22, textAlign: "center", fontWeight: 600 }}>QR</span>
                  </div>
                )}
              </div>
            )}

            {/* INFO ROWS — right side */}
            <div style={{
              flex: 1,
              display: "flex", flexDirection: "column",
              gap: 22,
              direction: "rtl",
            }}>

              {/* Time */}
              <InfoRow icon={iconClock} text={time} subText={undefined} subLogo={undefined} />

              {/* Day + Date */}
              <InfoRow icon={iconCalendar} text={`${day}  ${date}`} subText={undefined} subLogo={undefined} />

              {/* Location */}
              {isOnline ? (
                <InfoRow
                  icon={iconLocation}
                  text="عن بُعد"
                  subText={platformName}
                  subLogo={platformLogo}
                />
              ) : (
                <InfoRow icon={iconLocation} text={venue} subText={undefined} subLogo={undefined} />
              )}

              {/* Certificate — always last */}
              {hasCertificate && (
                <InfoRow icon={iconCert} text="يوجد شهادات حضور" subText={undefined} subLogo={undefined} />
              )}

            </div>
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════
          5. FOOTER — dark teal bar
      ══════════════════════════════════════ */}
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
        <span style={{
          color: "#ffffff",
          fontSize: 32,
          fontWeight: 700,
          fontFamily: "inherit",
          flexShrink: 0,
          letterSpacing: 0.5,
        }}>
          وحدة العلاقات العامة
        </span>
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <img src={socialBar} alt="" crossOrigin="anonymous"
            style={{ height: 80, objectFit: "contain" }} />
        </div>
      </div>

    </div>
  );
}

/* ── Single info row: icon (RTL start) + main text + optional sub-text/logo ── */
function InfoRow({
  icon, text, subText, subLogo,
}: {
  icon: string;
  text: string;
  subText: string | undefined;
  subLogo: string | undefined;
}) {
  return (
    <div style={{
      display: "flex", flexDirection: "row",
      alignItems: "center",
      gap: 16,
      direction: "rtl",
    }}>
      <img src={icon} alt="" crossOrigin="anonymous"
        style={{ width: 46, height: 46, objectFit: "contain", flexShrink: 0 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ color: DEEP_GREEN, fontSize: 30, fontWeight: 700, lineHeight: 1.25 }}>
          {text}
        </span>
        {subText && (
          <span style={{ color: "#444", fontSize: 26, fontWeight: 500, lineHeight: 1.25 }}>
            {subText}
          </span>
        )}
        {subLogo && (
          <img src={subLogo} alt="" crossOrigin="anonymous"
            style={{ height: 28, objectFit: "contain", alignSelf: "flex-start", marginTop: 2 }} />
        )}
      </div>
    </div>
  );
}
