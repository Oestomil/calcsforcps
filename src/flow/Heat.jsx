import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function FormField({ label, value, onChange, placeholder }) {
  return (
    <div style={{ 
      marginBottom: "clamp(14px, 4vw, 16px)",
      width: "100%",
      boxSizing: "border-box" 
    }}>
      <label style={{
        display: 'block',
        fontWeight: 600,
        fontSize: "clamp(13px, 3.5vw, 14px)",
        marginBottom: "clamp(4px, 1.5vw, 6px)",
        color: '#b3b8e0'
      }}>{label}</label>
      <input
        type="number"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={inputStyle}
      />
    </div>
  );
}

// Ana component aynı kalıyor
function Heat() {
  const { t } = useTranslation();
  const [flow, setFlow] = useState('');
  const [inputTemp, setInputTemp] = useState('');
  const [outletTemp, setOutletTemp] = useState('');
  const [result, setResult] = useState('');
  const navigate = useNavigate();

  const calculate = () => {
    const cap = parseFloat(flow) || 0;
    const inp = parseFloat(inputTemp) || 0;
    const out = parseFloat(outletTemp) || 0;
    let res = (cap * 792 * 2.65 * (out - inp)) / 4.184;
    setResult(isNaN(res) ? "-" : res.toFixed(2));
  };
  return (
    <div style={outerStyle}>
      <div style={mainCard}>
        <div style={topBar}>
          <button style={backBtn} onClick={() => navigate(-1)} aria-label={t('back')}>
            <span style={backBtnText}>←</span>
          </button>
          <span style={headerText}>{t('Isı Kapasitesi')}</span>
        </div>

        <form style={formStyle}>
          <FormField
            label={t('Flow')}
            value={flow}
            onChange={e => setFlow(e.target.value)}
            placeholder={t('Flow value')}
          />
          <FormField
            label={t('InputTemperature')}
            value={inputTemp}
            onChange={e => setInputTemp(e.target.value)}
            placeholder={t('Input temperature')}
          />
          <FormField
            label={t('OutputTemperature')}
            value={outletTemp}
            onChange={e => setOutletTemp(e.target.value)}
            placeholder={t('Output temperature')}
          />
          <button type="button" style={calcBtn} onClick={calculate}>
            {t('Hesapla')}
          </button>
        </form>

        <div style={resultBar}>
          <span style={resultLabel}>{t('Sonuç')}:</span>
          <span style={resultValue}>
            {result === "" ? "-" : `${result} kCal`}
          </span>
        </div>
      </div>

      <footer style={footerStyle}>
        <span style={logoStyle}>Σ</span>
        <span style={footerText}>
          powered by PhD. Umut Şafak Öztürk
        </span>
      </footer>
    </div>
  );
}

// Güncellenmiş stiller
const outerStyle = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #242539 0%, #181922 100%)',
  color: '#ececec',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: "clamp(16px, 7vw, 40px) clamp(12px, 4vw, 24px)",
  boxSizing: "border-box",
  overflowX: 'hidden'
};

const mainCard = {
  width: "100%",
  maxWidth: 370,
  background: "rgba(28,29,44,0.97)",
  borderRadius: "clamp(14px, 4vw, 18px)",
  boxShadow: "0 3px 18px #17172225",
  padding: "clamp(16px, 5vw, 20px)",
  display: "flex",
  flexDirection: "column",
  gap: "clamp(6px, 2vw, 8px)",
  boxSizing: "border-box"
};

const formStyle = {
  width: "100%",
  marginTop: "clamp(12px, 3vw, 14px)",
  boxSizing: "border-box"
};

const topBar = {
  display: "flex",
  alignItems: "center",
  gap: "clamp(8px, 2vw, 10px)",
  marginBottom: "clamp(4px, 1vw, 6px)"
};

const backBtn = {
  fontSize: "clamp(18px, 5vw, 20px)",
  border: 'none',
  background: 'rgba(44,47,80,0.54)',
  cursor: 'pointer',
  padding: "clamp(6px, 2vw, 8px) clamp(10px, 3vw, 12px)",
  borderRadius: "clamp(6px, 2vw, 8px)",
  transition: "background 0.13s"
};

const backBtnText = {
  fontSize: "clamp(18px, 5vw, 20px)",
  fontWeight: 800,
  color: "#bfc3ee"
};

const headerText = {
  fontSize: "clamp(16px, 4.5vw, 18.5px)",
  fontWeight: 700,
  color: "#e6eaff",
  flex: 1,
  textAlign: "left",
  letterSpacing: "0.01em"
};

const inputStyle = {
  width: '100%',
  padding: 'clamp(8px, 2.5vw, 10px)',
  fontSize: "clamp(14px, 4vw, 15.5px)",
  borderRadius: "clamp(6px, 2vw, 8px)",
  border: "1px solid #29294a",
  color: "#e3e7fc",
  background: "#20213a",
  outline: "none",
  boxSizing: "border-box",
  minHeight: "42px",
  '-webkit-appearance': 'none',
  '-moz-appearance': 'textfield'
};

const calcBtn = {
  width: "100%",
  padding: "clamp(10px, 3vw, 12px) 0",
  borderRadius: "clamp(8px, 2vw, 9px)",
  border: "none",
  fontSize: "clamp(15px, 4vw, 16.5px)",
  fontWeight: 700,
  color: "#f9faff",
  background: "linear-gradient(90deg,#f6c358 30%,#ef4857 100%)",
  boxShadow: "0 1px 8px #ef485722",
  letterSpacing: "0.01em",
  marginTop: "clamp(10px, 2.5vw, 12px)",
  cursor: "pointer"
};

const resultBar = {
  width: "100%",
  marginTop: "clamp(12px, 3vw, 14px)",
  background: "rgba(36,44,67,0.91)",
  borderRadius: "clamp(6px, 2vw, 8px)",
  padding: "clamp(10px, 2.5vw, 12px) clamp(12px, 3vw, 14px)",
  boxShadow: "0 1px 8px #22284c18",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxSizing: "border-box"
};

const resultLabel = {
  color: "#a4adcd",
  fontSize: "clamp(13px, 3.5vw, 14px)"
};

const resultValue = {
  fontWeight: 800,
  color: "#ffd980",
  fontSize: "clamp(16px, 4.5vw, 19px)",
  marginLeft: "clamp(6px, 2vw, 8px)"
};

const footerStyle = {
  width: '100%',
  maxWidth: 370,
  margin: "clamp(24px, 6vw, 28px) auto 0",
  padding: "clamp(8px, 2vw, 10px)",
  fontSize: "clamp(13px, 3.5vw, 14.2px)",
  color: '#a1a1b3',
  letterSpacing: 0.14,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: "clamp(6px, 2vw, 8px)"
};

const logoStyle = {
  fontSize: "clamp(17px, 4.5vw, 19px)",
  fontWeight: 800,
  color: '#fff',
  background: 'linear-gradient(135deg, #35345e 0%, #1976d2 100%)',
  borderRadius: '50%',
  width: "clamp(24px, 6vw, 26px)",
  height: "clamp(24px, 6vw, 26px)",
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0 1px 8px #1976d255'
};

const footerText = {
  marginLeft: "clamp(6px, 2vw, 8px)"
};

export default Heat;