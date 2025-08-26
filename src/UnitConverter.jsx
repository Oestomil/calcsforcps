import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const fmt = (n) => {
  if (n === "" || n === null || Number.isNaN(n)) return "";
  const s = Number(n).toFixed(6);
  return s.replace(/\.?0+$/, "");
};

function PairRow({ title, leftLabel, rightLabel, kForward, kBackward }) {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");

  const onLeft = (e) => {
    const v = e.target.value;
    setLeft(v);
    if (v === "") return setRight("");
    const num = parseFloat(v);
    if (Number.isNaN(num)) return setRight("");
    const out = kForward(num);
    setRight(fmt(out));
  };

  const onRight = (e) => {
    const v = e.target.value;
    setRight(v);
    if (v === "") return setLeft("");
    const num = parseFloat(v);
    if (Number.isNaN(num)) return setLeft("");
    const out = kBackward(num);
    setLeft(fmt(out));
  };

  return (
    <div style={cardRow}>
      <div style={rowHeader}>
        <span>{title}</span>
      </div>
      <div style={rowGrid}>
        <div style={fieldCol}>
          <label style={labelStyle}>{leftLabel}</label>
          <input
            type="number"
            inputMode="decimal"
            value={left}
            onChange={onLeft}
            placeholder={leftLabel}
            style={inputStyle}
          />
        </div>
        <div style={arrowStyle}>⇄</div>
        <div style={fieldCol}>
          <label style={labelStyle}>{rightLabel}</label>
          <input
            type="number"
            inputMode="decimal"
            value={right}
            onChange={onRight}
            placeholder={rightLabel}
            style={inputStyle}
          />
        </div>
      </div>
    </div>
  );
}

export default function UnitConverter() {
  const nav = useNavigate();

  return (
    <div style={page}>
      <div style={topbar}>
        <button onClick={() => nav(-1)} aria-label="Geri" style={backBtn}>
          ←
        </button>
        <h1 style={title}>Unit Converter</h1>
      </div>

      <div style={container}>
        <PairRow
          title="Inch ↔ Centimeter"
          leftLabel="in"
          rightLabel="cm"
          kForward={(inch) => inch * 2.54}
          kBackward={(cm) => cm / 2.54}
        />

        <PairRow
          title="Liter ↔ Cubic Centimeter"
          leftLabel="L"
          rightLabel="cm³"
          kForward={(L) => L * 1000}
          kBackward={(cm3) => cm3 / 1000}
        />

        <PairRow
          title="bar ↔ mmHg"
          leftLabel="bar"
          rightLabel="mmHg"
          kForward={(bar) => bar * 750.061683}
          kBackward={(mmHg) => mmHg / 750.061683}
        />

        <PairRow
          title="bar ↔ MPa"
          leftLabel="bar"
          rightLabel="MPa"
          kForward={(bar) => bar * 0.1}
          kBackward={(MPa) => MPa / 0.1}
        />

        <PairRow
          title="Celsius ↔ Kelvin"
          leftLabel="°C"
          rightLabel="K"
          kForward={(c) => c + 273.15}
          kBackward={(k) => k - 273.15}
        />
      </div>

      <footer style={footer}>
        <span style={logo}>Σ</span>
        <span style={{ marginLeft: "clamp(6px, 2vw, 8px)" }}>
          powered by PhD. Umut Şafak Öztürk
        </span>
      </footer>
    </div>
  );
}

/* Styles */
const page = {
  minHeight: "100vh",
  width: "100%",
  background: "linear-gradient(135deg, #1a1d29 0%, #232942 100%)",
  color: "#e7eaff",
  padding: "clamp(10px, 3vw, 14px) clamp(12px, 3vw, 16px) clamp(20px, 5vw, 24px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxSizing: "border-box",
  overflowX: "hidden"
};

const topbar = {
  width: "100%",
  maxWidth: 480,
  display: "flex",
  alignItems: "center",
  gap: "clamp(8px, 2vw, 10px)",
  margin: "clamp(16px, 4vw, 20px) auto clamp(4px, 1vw, 6px)",
  padding: "0 clamp(4px, 1vw, 6px)"
};

const backBtn = {
  fontSize: "clamp(22px, 5.5vw, 26px)",
  border: "none",
  background: "transparent",
  color: "#bcd1ff",
  cursor: "pointer",
  padding: "clamp(3px, 1vw, 4px) clamp(8px, 2vw, 10px) clamp(3px, 1vw, 4px) 0"
};

const title = {
  fontSize: "clamp(18px, 4.5vw, 22px)",
  fontWeight: 800,
  margin: 0,
  color: "#d9e5ff",
  letterSpacing: 0.3,
  textShadow: "0 2px 12px #0066ff22"
};

const container = {
  width: "100%",
  maxWidth: 480,
  display: "flex",
  flexDirection: "column",
  gap: "clamp(12px, 3vw, 16px)",
  marginTop: "clamp(8px, 2vw, 10px)",
  padding: "0 clamp(2px, 0.5vw, 4px)"
};

const cardRow = {
  background: "rgba(32,34,52,0.98)",
  border: "1px solid #2c3150",
  borderRadius: "clamp(12px, 3vw, 14px)",
  boxShadow: "0 2px 16px #0b0f1f66",
  padding: "clamp(12px, 3vw, 14px) clamp(10px, 2.5vw, 12px)",
  boxSizing: "border-box"
};

const rowHeader = {
  marginBottom: "clamp(8px, 2vw, 10px)",
  color: "#b9c7ff",
  fontSize: "clamp(14px, 3.5vw, 16px)",
  letterSpacing: 0.3,
  textAlign: "center",
  width: "100%",
  fontWeight: "700"
};

const rowGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 40px 1fr",
  gap: "clamp(8px, 2vw, 10px)",
  alignItems: "end"
};

const fieldCol = { 
  display: "flex", 
  flexDirection: "column",
  width: "100%",
  boxSizing: "border-box"
};

const labelStyle = {
  color: "#8fa0d8",
  fontSize: "clamp(12px, 3vw, 13px)",
  marginBottom: "clamp(4px, 1vw, 6px)",
  fontWeight: 600,
  letterSpacing: 0.2
};

const inputStyle = {
  width: "100%",
  padding: "clamp(10px, 2.5vw, 12px)",
  fontSize: "clamp(14px, 3.5vw, 16px)",
  borderRadius: "clamp(8px, 2vw, 10px)",
  border: "1px solid #2a2f4b",
  outline: "none",
  background: "#1f2340",
  color: "#f1f3ff",
  boxShadow: "inset 0 0 0 1px #00000020",
  boxSizing: "border-box",
  '-webkit-appearance': 'none',
  '-moz-appearance': 'textfield'
};

const arrowStyle = {
  textAlign: "center",
  alignSelf: "center",
  color: "#8ea9ff",
  fontWeight: 800,
  fontSize: "clamp(16px, 4vw, 18px)",
  userSelect: "none"
};

const footer = {
  width: "100%",
  maxWidth: 480,
  marginTop: "clamp(16px, 4vw, 18px)",
  textAlign: "center",
  padding: "clamp(8px, 2vw, 10px)",
  fontSize: "clamp(12px, 3vw, 14px)",
  color: "#a1a9cc",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  letterSpacing: 0.2,
  boxSizing: "border-box"
};

const logo = {
  fontSize: "clamp(16px, 4vw, 18px)",
  fontWeight: 900,
  color: "#fff",
  background: "linear-gradient(135deg, #35345e 0%, #1976d2 100%)",
  borderRadius: "50%",
  width: "clamp(24px, 6vw, 26px)",
  height: "clamp(24px, 6vw, 26px)",
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "0 1px 8px #1976d255"
};

