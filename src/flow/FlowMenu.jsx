import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function FlowMenu() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #20243a 0%, #2a2e44 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(16px, 5vw, 40px)"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "rgba(38,41,61,0.96)",
          borderRadius: "clamp(16px, 4vw, 22px)",
          boxShadow: "0 6px 32px #0007",
          padding: "clamp(22px, 5vw, 30px) clamp(16px, 4vw, 18px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "clamp(20px, 5vw, 28px)",
          boxSizing: "border-box"
        }}
      >
        {/* HEADER */}
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "clamp(6px, 2vw, 8px)",
            gap: "clamp(8px, 2vw, 10px)"
          }}
        >
          {/* Geri */}
          <button
            onClick={() => navigate("/")}
            style={{
              background: "rgba(34,39,56,0.86)",
              border: "none",
              borderRadius: "clamp(6px, 2vw, 8px)",
              padding: "clamp(6px, 2vw, 7px) clamp(10px, 3vw, 13px) clamp(6px, 2vw, 7px) clamp(6px, 2vw, 8px)",
              color: "#c8d0ec",
              fontWeight: 700,
              fontSize: "clamp(16px, 4vw, 18px)",
              boxShadow: "0 2px 10px #0003",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              transition: "background 0.15s",
            }}
            aria-label="Geri"
          >
            <span style={{
              fontSize: "clamp(18px, 5vw, 21px)", fontWeight: 900, marginRight: "clamp(1px, 0.5vw, 2px)", display: "inline-block", transform: "translateY(-1px)"
            }}>←</span>
          </button>

          {/* Başlık */}
          <span
            style={{
              fontWeight: 800,
              fontSize: "clamp(16px, 4.5vw, 18.5px)",
              letterSpacing: "0.5px",
              color: "#E5E9FF",
              textShadow: "0 4px 24px #0009",
              flex: 1,
              textAlign: "center",
              minWidth: 0,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            {t("Akışlar ve Isı Kapasitesi")}
          </span>

          {/* Dil seçimi */}
          <div>
            <button
              onClick={() => i18n.changeLanguage("tr")}
              style={langButton(i18n.language === "tr")}
            >
              TR
            </button>
            <button
              onClick={() => i18n.changeLanguage("en")}
              style={langButton(i18n.language === "en")}
            >
              EN
            </button>
          </div>
        </div>

        {/* Açıklama */}
        <div
          style={{
            fontWeight: 400,
            fontSize: "clamp(14px, 4vw, 16px)",
            color: "#a0aed7",
            marginBottom: 0,
            marginTop: "clamp(2px, 0.5vw, 4px)",
            textAlign: "center"
          }}
        >
          {t("Hangi akışı hesaplamak istersin?")}
        </div>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "clamp(14px, 4vw, 18px)" }}>
          <button style={flowBtnBlue} onClick={() => navigate("/flow/ato")}>
            {t("ATO Hesaplama")}
          </button>
          <button style={flowBtnPurple} onClick={() => navigate("/flow/atg")}>
            {t("ATG Hesaplama")}
          </button>
          <button style={flowBtnGold} onClick={() => navigate("/flow/titan")}>
            {t("Titan/Baryum Hesaplama")}
          </button>
          <button style={flowBtnRed} onClick={() => navigate("/flow/heat")}>
            {t("Isı Kapasitesi")}
          </button>
          <button style={flowBtnGreen} onClick={() => navigate("/flow/residence")}>
            {t("Residence_Time")}
          </button>
        </div>
      </div>
    </div>
  );
}

// Dil butonu stili
const langButton = (active) => ({
  background: active ? "#414158" : "#232942",
  color: "#e0e0e0",
  border: "1px solid #363648",
  borderRadius: "clamp(6px, 2vw, 7px)",
  padding: "clamp(4px, 1.5vw, 6px) clamp(10px, 3vw, 12px)",
  fontSize: "clamp(13px, 3.5vw, 15px)",
  marginLeft: "clamp(3px, 1vw, 4px)",
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 1px 4px #0002",
  transition: "background 0.15s"
});

// Hesaplama butonları
const flowBtnBlue = {
  width: "100%",
  padding: "clamp(14px, 4vw, 16px) 0",
  borderRadius: "clamp(12px, 3vw, 14px)",
  border: "none",
  fontSize: "clamp(16px, 4.5vw, 19px)",
  fontWeight: 700,
  color: "#f7fafd",
  background: "linear-gradient(90deg,#4978fa 20%,#3a57c9 100%)",
  boxShadow: "0 2px 16px #223d9040",
  letterSpacing: "0.03em",
  transition: "all .18s cubic-bezier(.77,0,.18,1)",
  cursor: "pointer",
  marginBottom: 0,
};
const flowBtnPurple = {
  ...flowBtnBlue,
  background: "linear-gradient(90deg,#8857d1 20%,#7e2ff7 100%)"
};
const flowBtnGold = {
  ...flowBtnBlue,
  background: "linear-gradient(90deg,#ffd84d 20%,#fa983a 100%)",
  color: "#353444",
};
const flowBtnRed = {
  ...flowBtnBlue,
  background: "linear-gradient(90deg,#ff7474 20%,#fa2a2a 100%)",
  color: "#fff",
};
const flowBtnGreen = {
  ...flowBtnBlue,
  background: "linear-gradient(90deg,#34c759 20%,#32d184 100%)",
  color: "#fff",
};

export default FlowMenu;
