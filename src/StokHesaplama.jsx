import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";

function Input({ label, value, onChange }) {
  return (
    <div style={{ 
      marginBottom: "clamp(14px, 4vw, 18px)",
      width: "100%",
      boxSizing: "border-box" 
    }}>
      <label style={{
        display: 'block',
        marginBottom: "clamp(4px, 1.5vw, 6px)",
        color: "#b3b8e0",
        fontWeight: 500,
        fontSize: "clamp(14px, 3.5vw, 16px)",
        letterSpacing: 0.1
      }}>{label}</label>
      <input
        type="number"
        value={value}
        onChange={onChange}
        placeholder={label}
        style={{
          width: "100%",
          padding: "clamp(10px, 3vw, 13px) clamp(12px, 3.5vw, 14px)",
          borderRadius: "clamp(8px, 2vw, 10px)",
          border: "1.5px solid #2a2d4a",
          background: "#22233a",
          color: "#ececec",
          fontSize: "clamp(15px, 4vw, 17px)",
          outline: "none",
          boxShadow: "0 2px 7px #1c1c2735",
          boxSizing: "border-box",
          '-webkit-appearance': 'none',
          '-moz-appearance': 'textfield'
        }}
      />
    </div>
  );
}

function StokHesaplama() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [kapasite, setKapasite] = useState("");
  const [pta, setPta] = useState("");
  const [meg, setMeg] = useState("");
  const [ato, setAto] = useState("");
  const [atg, setAtg] = useState("");
  const [titan, setTitan] = useState("");
  const [showTable, setShowTable] = useState(false);

  function hesaplaBolum(girdi, katsayi) {
    if (
      girdi === "" ||
      kapasite === "" ||
      Number(kapasite) === 0 ||
      Number(katsayi) === 0
    )
      return t("none");
    const val = parseFloat(girdi) / (parseFloat(kapasite) * katsayi);
    return isNaN(val) ? t("none") : val.toFixed(2);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setShowTable(true);
  }

  function resetForm() {
    setShowTable(false);
  }

  function handleDownload() {
    const dailyUsage = {
      PTA: parseFloat(kapasite) * 0.859,
      MEG: parseFloat(kapasite) * 0.333,
      ATO: parseFloat(kapasite) * 0.0004578,
      ATG: parseFloat(kapasite) * 0.0004996,
      TiO2: parseFloat(kapasite) * 0.0033
    };

    const data = [
      {
        [t("PTA")]: hesaplaBolum(pta, 0.859),
        [t("MEG")]: hesaplaBolum(meg, 0.333),
        [t("ATO")]: hesaplaBolum(ato, 0.0004578),
        [t("ATG")]: hesaplaBolum(atg, 0.0004996),
        [t("TitanBaryum")]: hesaplaBolum(titan, 0.0033),
      },
      {}, // Empty row for spacing
      {
        [t("Daily_Usage")]: "kg/day",
        [t("PTA")]: dailyUsage.PTA.toFixed(2),
        [t("MEG")]: dailyUsage.MEG.toFixed(2),
        [t("ATO")]: dailyUsage.ATO.toFixed(4),
        [t("ATG")]: dailyUsage.ATG.toFixed(4),
        [t("TiO2")]: dailyUsage.TiO2.toFixed(4),
      }
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, t("stok_results_sheet"));
    const excelBuffer = XLSX.write(workbook, { type: "array", bookType: "xlsx" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "stok_sonuc.xlsx");
  }

  return (
    <div style={containerStyle}>
      <div style={topBarStyle}>
        <button style={backBtnStyle} onClick={() => navigate(-1)} aria-label={t("back")}>
          ←
        </button>
        <span style={titleStyle}>{t("stok_title")}</span>
      </div>

      {!showTable && (
        <form onSubmit={handleSubmit} style={formStyle}>
          <Input label={t("Capacity")} value={kapasite} onChange={e => setKapasite(e.target.value)} />
          <Input label={t("PTA")} value={pta} onChange={e => setPta(e.target.value)} />
          <Input label={t("MEG")} value={meg} onChange={e => setMeg(e.target.value)} />
          <Input label={t("ATO")} value={ato} onChange={e => setAto(e.target.value)} />
          <Input label={t("ATG")} value={atg} onChange={e => setAtg(e.target.value)} />
          <Input label={t("TitanBaryum")} value={titan} onChange={e => setTitan(e.target.value)} />
          <button style={buttonStyle} type="submit">{t("calculate")}</button>
        </form>
      )}

      {showTable && (
        <div style={tableWrapStyle}>
          {/* İlk Tablo - Yeterlilik Günleri */}
          <div style={tableHeaderStyle}>
            {t("sufficient_days")}
          </div>
          <div style={tableScrollWrapper}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={tableCellStyle}>{t("PTA")}</th>
                  <th style={tableCellStyle}>{t("MEG")}</th>
                  <th style={tableCellStyle}>{t("ATO")}</th>
                  <th style={tableCellStyle}>{t("ATG")}</th>
                  <th style={tableCellStyle}>{t("TitanBaryum")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={tableCellStyle}>{hesaplaBolum(pta, 0.859)}</td>
                  <td style={tableCellStyle}>{hesaplaBolum(meg, 0.333)}</td>
                  <td style={tableCellStyle}>{hesaplaBolum(ato, 0.0004578)}</td>
                  <td style={tableCellStyle}>{hesaplaBolum(atg, 0.0004996)}</td>
                  <td style={tableCellStyle}>{hesaplaBolum(titan, 0.0033)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* İkinci Tablo - Günlük Kullanım */}
          <div style={{...tableHeaderStyle, marginTop: "clamp(24px, 6vw, 30px)"}}>
            Capacity for Daily Dosage
          </div>
          <div style={tableScrollWrapper}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={tableCellStyle}>PTA</th>
                  <th style={tableCellStyle}>MEG</th>
                  <th style={tableCellStyle}>ATO</th>
                  <th style={tableCellStyle}>ATG</th>
                  <th style={tableCellStyle}>TiO2</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={tableCellStyle}>
                    {kapasite ? `${(parseFloat(kapasite) * 0.859).toFixed(2)} kg/day` : "-"}
                  </td>
                  <td style={tableCellStyle}>
                    {kapasite ? `${(parseFloat(kapasite) * 0.333).toFixed(2)} kg/day` : "-"}
                  </td>
                  <td style={tableCellStyle}>
                    {kapasite ? `${(parseFloat(kapasite) * 0.0004578).toFixed(4)} kg/day` : "-"}
                  </td>
                  <td style={tableCellStyle}>
                    {kapasite ? `${(parseFloat(kapasite) * 0.0004996).toFixed(4)} kg/day` : "-"}
                  </td>
                  <td style={tableCellStyle}>
                    {kapasite ? `${(parseFloat(kapasite) * 0.0033).toFixed(4)} kg/day` : "-"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={noteStyle}>
            {t("stok_note")}
          </div>
          <div style={buttonGroupStyle}>
            <button style={buttonStyle} onClick={handleDownload}>
              {t("download_excel")}
            </button>
            <button style={{...buttonStyle, background: "#464565"}} onClick={resetForm}>
              {t("reset_calc")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Styles remain the same
const containerStyle = {
  minHeight: '100vh',
  width: '100%',
  background: 'linear-gradient(135deg, #23242b 0%, #18181e 100%)',
  color: '#ececec',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: "clamp(12px, 3vw, 14px)",
  boxSizing: "border-box",
  overflowX: 'hidden'
};

const topBarStyle = {
  width: "100%",
  maxWidth: 420,
  display: "flex",
  alignItems: "center",
  gap: "clamp(10px, 2.5vw, 12px)",
  margin: "clamp(24px, 6vw, 34px) auto clamp(8px, 2vw, 10px)",
  padding: "0 clamp(8px, 2vw, 10px)"
};

const backBtnStyle = {
  fontSize: "clamp(24px, 6vw, 28px)",
  border: "none",
  background: "none",
  color: "#a9cbfc",
  cursor: "pointer",
  padding: "clamp(3px, 1vw, 4px) clamp(10px, 2.5vw, 14px) clamp(3px, 1vw, 4px) 0"
};

const titleStyle = {
  fontSize: "clamp(20px, 5vw, 23px)",
  fontWeight: 800,
  color: "#7fc4ff",
  letterSpacing: 0.2,
  margin: 0,
  textShadow: "0 2px 18px #1e7eff44"
};

const formStyle = {
  width: "100%",
  maxWidth: 410,
  background: "rgba(30,32,50,0.98)",
  borderRadius: "clamp(14px, 4vw, 18px)",
  boxShadow: "0 4px 26px #2759ea26",
  padding: "clamp(20px, 5vw, 26px) clamp(16px, 4vw, 20px) clamp(14px, 3.5vw, 18px)",
  marginBottom: "clamp(18px, 4.5vw, 22px)",
  boxSizing: "border-box"
};

const buttonStyle = {
  width: "100%",
  padding: "clamp(12px, 3vw, 15px) 0",
  borderRadius: "clamp(9px, 2.5vw, 11px)",
  border: "none",
  fontSize: "clamp(15px, 4vw, 17px)",
  fontWeight: 700,
  color: "#fff",
  background: "linear-gradient(90deg,#3491ff 10%,#9e6fff 100%)",
  cursor: "pointer",
  marginTop: "clamp(6px, 2vw, 8px)",
  marginBottom: 0,
  boxShadow: "0 2px 8px #3849e855"
};

const tableWrapStyle = {
  margin: "clamp(20px, 5vw, 25px) auto 0",
  width: "100%",
  maxWidth: 430,
  background: "rgba(36,41,66,0.97)",
  borderRadius: "clamp(12px, 3vw, 16px)",
  boxShadow: "0 1px 18px #365ce274",
  padding: "clamp(18px, 4.5vw, 23px) clamp(8px, 2vw, 10px) clamp(14px, 3.5vw, 18px)",
  boxSizing: "border-box"
};

const tableHeaderStyle = {
  fontWeight: 700,
  fontSize: "clamp(16px, 4.5vw, 19px)",
  marginBottom: "clamp(8px, 2vw, 10px)",
  letterSpacing: 0.4,
  color: "#fae7aa",
  textAlign: "center"
};

const tableScrollWrapper = {
  overflowX: "auto",
  width: "100%",
  paddingBottom: "clamp(6px, 1.5vw, 8px)"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  color: "#aee7ff",
  fontSize: "clamp(14px, 3.5vw, 16px)",
  background: "none"
};

const tableCellStyle = {
  padding: "clamp(8px, 2vw, 10px)",
  textAlign: "center",
  whiteSpace: "nowrap"
};

const noteStyle = {
  margin: "clamp(16px, 4vw, 18px) 0 clamp(4px, 1vw, 6px)",
  fontSize: "clamp(13px, 3.5vw, 15px)",
  color: "#ffc57a",
  fontWeight: 500,
  textAlign: "center"
};

const buttonGroupStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "clamp(8px, 2vw, 10px)",
  marginTop: "clamp(14px, 3.5vw, 16px)"
};

export default StokHesaplama;