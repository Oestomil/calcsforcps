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
        padding: "5vw"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "rgba(38,41,61,0.96)",
          borderRadius: 22,
          boxShadow: "0 6px 32px #0007",
          padding: "30px 18px 22px 18px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
        }}
      >
        {/* HEADER */}
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 8,
            gap: 10
          }}
        >
          {/* Geri */}
          <button
            onClick={() => navigate("/")}
            style={{
              background: "rgba(34,39,56,0.86)",
              border: "none",
              borderRadius: 8,
              padding: "7px 13px 7px 8px",
              color: "#c8d0ec",
              fontWeight: 700,
              fontSize: 18,
              boxShadow: "0 2px 10px #0003",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              transition: "background 0.15s",
            }}
            aria-label="Geri"
          >
            <span style={{
              fontSize: 21, fontWeight: 900, marginRight: 2, display: "inline-block", transform: "translateY(-1px)"
            }}>←</span>
          </button>

          {/* Başlık */}
          <span
            style={{
              fontWeight: 800,
              fontSize: "1.16rem",
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
            fontSize: "1.02rem",
            color: "#a0aed7",
            marginBottom: 0,
            marginTop: 2,
            textAlign: "center"
          }}
        >
          {t("Hangi akışı hesaplamak istersin?")}
        </div>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 18 }}>
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
  borderRadius: 7,
  padding: "3px 12px",
  fontSize: 15,
  marginLeft: 4,
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 1px 4px #0002",
  transition: "background 0.15s"
});

// Hesaplama butonları
const flowBtnBlue = {
  width: "100%",
  padding: "16px 0",
  borderRadius: 14,
  border: "none",
  fontSize: 19,
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

export default FlowMenu;
