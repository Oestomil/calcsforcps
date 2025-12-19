import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function FormField({ label, value, onChange, placeholder }) {
  return (
    <div style={{
      marginBottom: "clamp(12px, 3.5vw, 14px)",
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
        step="0.01"
        style={inputStyle}
      />
    </div>
  );
}

function ResidenceTime() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [xKapasite, setXKapasite] = useState('');
  const [xPasta, setXPasta] = useState('');
  const [xR1, setXR1] = useState('');
  const [xR2, setXR2] = useState('');
  const [xR3, setXR3] = useState('');
  const [xR4, setXR4] = useState('');
  const [xR5, setXR5] = useState('');
  const [xPdensity, setXPdensity] = useState('');

  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);

  const calculate = () => {
    const kapasite = parseFloat(xKapasite) || 0;
    const pasta = parseFloat(xPasta) || 0;
    const r1 = parseFloat(xR1) || 0;
    const r2 = parseFloat(xR2) || 0;
    const r3 = parseFloat(xR3) || 0;
    const r4 = parseFloat(xR4) || 0;
    const r5 = parseFloat(xR5) || 0;
    const pdensity = parseFloat(xPdensity) || 0;

    // Level calculations
    const Plvl = 9843 * (pasta / 100);
    const R1lvl = 12216 * (r1 / 100);
    const R2lvl = 2664 * (r2 / 100);
    const R3lvl = 2174 * (r3 / 100);
    const R4lvl = 2568 * (r4 / 100);
    const R5lvl = (r5 / 100) * 9289.1 / 0.72;

    // Paki calculations
    const Pakis = kapasite * 0.0512;
    const Paklit = (Pakis / pdensity) * 1000;

    // Time calculations (in minutes)
    // Residence Time = Volume / Flow Rate
    // Pt: Pasta uses Paklit (volumetric flow L/h)
    const Pt = (Plvl / Paklit) * 60;
    // R1-R5: Reactors use Pakis (mass flow kg/h)
    const R1t = (R1lvl / Paklit) * 60;
    const R2t = (R2lvl / Paklit) * 60;
    const R3t = (R3lvl / Paklit) * 60;
    const R4t = (R4lvl / Paklit) * 60;
    const R5t = (R5lvl / Paklit) * 60;

    // Total calculations
    const Totmin = Pt + R1t + R2t + R3t + R4t + R5t;
    const Totminwopasta = R1t + R2t + R3t + R4t + R5t;
    const Tothr = Totmin / 60;
    const tothrwopasta = Totminwopasta / 60;

    setResults({
      Pt: isNaN(Pt) || !isFinite(Pt) ? 0 : Pt,
      R1t: isNaN(R1t) || !isFinite(R1t) ? 0 : R1t,
      R2t: isNaN(R2t) || !isFinite(R2t) ? 0 : R2t,
      R3t: isNaN(R3t) || !isFinite(R3t) ? 0 : R3t,
      R4t: isNaN(R4t) || !isFinite(R4t) ? 0 : R4t,
      R5t: isNaN(R5t) || !isFinite(R5t) ? 0 : R5t,
      Totmin: isNaN(Totmin) || !isFinite(Totmin) ? 0 : Totmin,
      Totminwopasta: isNaN(Totminwopasta) || !isFinite(Totminwopasta) ? 0 : Totminwopasta,
      Tothr: isNaN(Tothr) || !isFinite(Tothr) ? 0 : Tothr,
      tothrwopasta: isNaN(tothrwopasta) || !isFinite(tothrwopasta) ? 0 : tothrwopasta
    });

    setShowResults(true);
  };

  const resetForm = () => {
    setShowResults(false);
    setXKapasite('');
    setXPasta('');
    setXR1('');
    setXR2('');
    setXR3('');
    setXR4('');
    setXR5('');
    setXPdensity('');
    setResults(null);
  };

  return (
    <div style={outerStyle}>
      <div style={mainCard}>
        <div style={topBar}>
          <button style={backBtn} onClick={() => navigate(-1)} aria-label={t('back')}>
            <span style={backBtnText}>←</span>
          </button>
          <span style={headerText}>{t('Residence_Time')}</span>
        </div>

        {!showResults && (
          <form style={formStyle} onSubmit={(e) => { e.preventDefault(); calculate(); }}>
            <FormField
              label={t('Kapasite')}
              value={xKapasite}
              onChange={e => setXKapasite(e.target.value)}
              placeholder={t('Kapasiteyi girin')}
            />
            <FormField
              label={t('Pasta_Level')}
              value={xPasta}
              onChange={e => setXPasta(e.target.value)}
              placeholder={t('Pasta_Level_girin')}
            />
            <FormField
              label={t('R1_Level')}
              value={xR1}
              onChange={e => setXR1(e.target.value)}
              placeholder={t('R1_Level_girin')}
            />
            <FormField
              label={t('R2_Level')}
              value={xR2}
              onChange={e => setXR2(e.target.value)}
              placeholder={t('R2_Level_girin')}
            />
            <FormField
              label={t('R3_Level')}
              value={xR3}
              onChange={e => setXR3(e.target.value)}
              placeholder={t('R3_Level_girin')}
            />
            <FormField
              label={t('R4_Level')}
              value={xR4}
              onChange={e => setXR4(e.target.value)}
              placeholder={t('R4_Level_girin')}
            />
            <FormField
              label={t('R5_Level')}
              value={xR5}
              onChange={e => setXR5(e.target.value)}
              placeholder={t('R5_Level_girin')}
            />
            <FormField
              label={t('Pasta_Density')}
              value={xPdensity}
              onChange={e => setXPdensity(e.target.value)}
              placeholder={t('Pasta_Density_girin')}
            />
            <button type="submit" style={calcBtn}>
              {t('Hesapla')}
            </button>
          </form>
        )}

        {showResults && results && (
          <div style={resultsContainer}>
            <div style={resultsHeader}>{t('Results')}</div>

            <div style={resultCard}>
              <span style={resultLabel}>{t('Pasta_Time')}:</span>
              <span style={resultValue}>{results.Pt.toFixed(2)} {t('min')}</span>
            </div>

            <div style={resultCard}>
              <span style={resultLabel}>{t('R1_Time')}:</span>
              <span style={resultValue}>{results.R1t.toFixed(2)} {t('min')}</span>
            </div>

            <div style={resultCard}>
              <span style={resultLabel}>{t('R2_Time')}:</span>
              <span style={resultValue}>{results.R2t.toFixed(2)} {t('min')}</span>
            </div>

            <div style={resultCard}>
              <span style={resultLabel}>{t('R3_Time')}:</span>
              <span style={resultValue}>{results.R3t.toFixed(2)} {t('min')}</span>
            </div>

            <div style={resultCard}>
              <span style={resultLabel}>{t('R4_Time')}:</span>
              <span style={resultValue}>{results.R4t.toFixed(2)} {t('min')}</span>
            </div>

            <div style={resultCard}>
              <span style={resultLabel}>{t('R5_Time')}:</span>
              <span style={resultValue}>{results.R5t.toFixed(2)} {t('min')}</span>
            </div>

            <div style={dividerStyle}></div>

            <div style={{ ...resultCard, background: 'rgba(73, 120, 250, 0.15)', borderLeft: '3px solid #4978fa' }}>
              <span style={{ ...resultLabel, fontWeight: 700 }}>{t('Total_Time_Min')}:</span>
              <span style={{ ...resultValue, fontSize: "clamp(17px, 5vw, 20px)" }}>{results.Totmin.toFixed(2)} {t('min')}</span>
            </div>

            <div style={{ ...resultCard, background: 'rgba(73, 120, 250, 0.1)' }}>
              <span style={resultLabel}>{t('Total_Time_Hour')}:</span>
              <span style={resultValue}>{results.Tothr.toFixed(2)} {t('hour')}</span>
            </div>

            <div style={dividerStyle}></div>

            <div style={{ ...resultCard, background: 'rgba(255, 165, 80, 0.12)', borderLeft: '3px solid #ffa550' }}>
              <span style={{ ...resultLabel, color: '#ffc57a' }}>{t('Total_Without_Pasta_Min')}:</span>
              <span style={{ ...resultValue, color: '#ffc57a' }}>{results.Totminwopasta.toFixed(2)} {t('min')}</span>
            </div>

            <div style={{ ...resultCard, background: 'rgba(255, 165, 80, 0.08)' }}>
              <span style={{ ...resultLabel, color: '#ffc57a' }}>{t('Total_Without_Pasta_Hour')}:</span>
              <span style={{ ...resultValue, color: '#ffc57a' }}>{results.tothrwopasta.toFixed(2)} {t('hour')}</span>
            </div>

            <button style={{ ...calcBtn, background: '#464565', marginTop: 'clamp(14px, 3.5vw, 18px)' }} onClick={resetForm}>
              {t('reset_calc')}
            </button>
          </div>
        )}
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

// Styles
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
  maxWidth: 420,
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
  background: "linear-gradient(90deg,#4978fa 30%,#39d1fd 100%)",
  boxShadow: "0 1px 8px #39d1fd22",
  letterSpacing: "0.01em",
  marginTop: "clamp(10px, 2.5vw, 12px)",
  cursor: "pointer"
};

const resultsContainer = {
  width: "100%",
  marginTop: "clamp(12px, 3vw, 14px)",
  display: "flex",
  flexDirection: "column",
  gap: "clamp(8px, 2vw, 10px)"
};

const resultsHeader = {
  fontSize: "clamp(16px, 4.5vw, 18px)",
  fontWeight: 700,
  color: "#b9c7ff",
  marginBottom: "clamp(4px, 1vw, 6px)",
  textAlign: "center"
};

const resultCard = {
  width: "100%",
  background: "rgba(36,44,67,0.7)",
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
  color: "#ffdf99",
  fontSize: "clamp(15px, 4vw, 17px)",
  marginLeft: "clamp(6px, 2vw, 8px)"
};

const dividerStyle = {
  height: "1px",
  background: "rgba(255,255,255,0.1)",
  margin: "clamp(8px, 2vw, 10px) 0"
};

const footerStyle = {
  width: '100%',
  maxWidth: 420,
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

export default ResidenceTime;
