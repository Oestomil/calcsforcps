import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ATO from "./ATO";
import ATG from "./ATG";
import Titan from "./Titan";
import Heat from "./Heat";

function FlowSayfasi() {
  const navigate = useNavigate();

  return (
    <div style={{padding: 32}}>
      <h2>Akışlar ve Isı Kapasitesi</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 300, marginBottom: 32 }}>
        <button onClick={() => navigate("ato")}>ATO</button>
        <button onClick={() => navigate("atg")}>ATG</button>
        <button onClick={() => navigate("titan")}>Titan</button>
        <button onClick={() => navigate("heat")}>Heat Capacity</button>
      </div>
      <Routes>
        <Route path="ato" element={<ATO />} />
        <Route path="atg" element={<ATG />} />
        <Route path="titan" element={<Titan />} />
        <Route path="heat" element={<Heat />} />
        {/* Boş route: sadece menü göster */}
        <Route index element={<div>Lütfen bir hesaplama seçin.</div>} />
      </Routes>
    </div>
  );
}

export default FlowSayfasi;
