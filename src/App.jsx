import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Sayfalar
import FlowMenu from "./flow/FlowMenu";
import ATO from "./flow/ATO";
import ATG from "./flow/ATG";
import Titan from "./flow/Titan";
import Heat from "./flow/Heat";
import StokHesaplama from "./StokHesaplama";
import UnitConverter from "./UnitConverter";

function HomeMenu() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  return (
    <div style={homeWrap}>
      <div style={card}>
        <div style={{ textAlign: "center", marginBottom: 6 }}>
          <button
            onClick={() => i18n.changeLanguage("tr")}
            style={langBtn(i18n.language === "tr")}
          >
            TR
          </button>
          <button
            onClick={() => i18n.changeLanguage("en")}
            style={langBtn(i18n.language === "en")}
          >
            EN
          </button>
        </div>

        <div style={{ textAlign: "center" }}>
          <div style={titleStyle}>{t("main_title")}</div>
          <div style={subtitleStyle}>{t("main_subtitle")}</div>
        </div>

        <div style={btnCol}>
          <button style={btnPrimary} onClick={() => navigate("/flow")}>
            {t("btn_flows")}
          </button>
          <button style={btnAlt} onClick={() => navigate("/stok")}>
            {t("btn_stock")}
          </button>
          <button style={btnGhost} onClick={() => navigate("/unit")}>
            {t("btn_unit")}
          </button>
        </div>
      </div>

      <div style={footer}>
        <span style={logo}>Σ</span>
        <span style={{ marginLeft: 8 }}>powered by PhD. Umut Şafak Öztürk</span>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeMenu />} />
      <Route path="/flow" element={<FlowMenu />} />
      <Route path="/flow/ato" element={<ATO />} />
      <Route path="/flow/atg" element={<ATG />} />
      <Route path="/flow/titan" element={<Titan />} />
      <Route path="/flow/heat" element={<Heat />} />
      <Route path="/stok" element={<StokHesaplama />} />
      <Route path="/unit" element={<UnitConverter />} />
    </Routes>
  );
}

export default App;

// Stiller
const homeWrap = {
  minHeight: "100vh",
  width: "100%",
  background: "linear-gradient(135deg, #1a1d29 0%, #232942 100%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "clamp(16px, 5vw, 40px)",
  color: "#e7eeff",
  boxSizing: "border-box",
  overflowX: "hidden",
};

const card = {
  width: "100%",
  maxWidth: 460,
  background: "rgba(32,34,52,0.95)",
  borderRadius: "clamp(16px, 4vw, 24px)",
  boxShadow: "0 4px 32px #0005",
  padding: "clamp(20px, 4vw, 28px) clamp(16px, 3vw, 20px)",
  display: "flex",
  flexDirection: "column",
  gap: "clamp(16px, 3vw, 22px)",
  margin: "0 auto",
  boxSizing: "border-box",
};

const titleStyle = {
  fontWeight: 900,
  fontSize: "clamp(1.8rem, 5vw, 2.2rem)",
  letterSpacing: "0.5px",
  color: "#D6E2FF",
  marginBottom: "clamp(4px, 2vw, 8px)",
  textShadow: "0 4px 20px #0009",
  wordWrap: "break-word",
  lineHeight: 1.2,
};

const subtitleStyle = {
  fontWeight: 500,
  fontSize: "clamp(0.9rem, 3vw, 1.02rem)",
  color: "#8aa0d6",
  marginTop: "clamp(2px, 1vw, 4px)",
  padding: "0 clamp(5px, 2vw, 10px)",
  wordWrap: "break-word",
  lineHeight: 1.4,
};

const btnCol = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "clamp(12px, 3vw, 16px)",
  marginTop: "clamp(4px, 2vw, 6px)",
};

const btnPrimary = {
  width: "100%",
  minHeight: "50px",
  padding: "clamp(12px, 3vw, 16px) 0",
  borderRadius: "clamp(10px, 2vw, 14px)",
  border: "none",
  fontSize: "clamp(16px, 4vw, 18px)",
  fontWeight: 800,
  color: "#e7eeff",
  background: "linear-gradient(90deg,#2778ff 40%,#5145fd 100%)",
  boxShadow: "0 2px 24px #1846bf40",
  letterSpacing: "0.04em",
  cursor: "pointer",
  whiteSpace: "normal",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "transform 0.2s",
  "&:active": {
    transform: "scale(0.98)",
  },
};

const btnAlt = {
  ...btnPrimary,
  background: "linear-gradient(90deg,#ffc977 40%,#ff7e7e 100%)",
  color: "#232942",
  boxShadow: "0 2px 24px #8e332040",
};

const btnGhost = {
  ...btnPrimary,
  background: "linear-gradient(90deg, #34c759 40%, #32d184 100%)", // Yeşil gradient
  color: "#e7eeff", // Beyaz metin rengi
  border: "none", // Border'ı kaldırdık
  boxShadow: "0 2px 24px #15803d40", // Yeşil tonda gölge
};

const langBtn = (active) => ({
  background: active ? "#414158" : "#29293a",
  color: "#e0e0e0",
  border: "1px solid #363648",
  borderRadius: "clamp(6px, 1.5vw, 7px)",
  padding: "clamp(6px, 2vw, 7px) clamp(14px, 3vw, 18px)",
  fontSize: "clamp(14px, 3vw, 15px)",
  margin: "0 clamp(4px, 1vw, 6px)",
  fontWeight: 700,
  cursor: "pointer",
  boxShadow: "0 1px 4px #0002",
  transition: "background 0.15s",
});

const footer = {
  width: "100%",
  maxWidth: 460,
  marginTop: "clamp(16px, 4vw, 20px)",
  padding: "clamp(8px, 2vw, 10px)",
  color: "#97a3c7",
  fontSize: "clamp(12px, 3vw, 14px)",
  textAlign: "center",
  letterSpacing: "0.03em",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: "8px",
};

const logo = {
  fontSize: "clamp(16px, 4vw, 18px)",
  fontWeight: 900,
  color: "#fff",
  background: "linear-gradient(135deg, #35345e 0%, #1976d2 100%)",
  borderRadius: "50%",
  width: "clamp(24px, 6vw, 28px)",
  height: "clamp(24px, 6vw, 28px)",
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "0 1px 8px #1976d255",
};