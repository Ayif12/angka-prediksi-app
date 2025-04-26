
import { useState } from "react";

function App() {
  const [dataInput, setDataInput] = useState("");
  const [prediksi, setPrediksi] = useState([]);

  const hitungPrediksi = () => {
    const angkaArray = dataInput
      .split(/\s+/)
      .map((a) => a.trim())
      .filter((a) => a.length === 4 && !isNaN(a));

    const freq = { ribuan: {}, ratusan: {}, puluhan: {}, satuan: {} };

    angkaArray.forEach((angka) => {
      const [r, a, p, s] = angka.split("").map(Number);
      freq.ribuan[r] = (freq.ribuan[r] || 0) + 1;
      freq.ratusan[a] = (freq.ratusan[a] || 0) + 1;
      freq.puluhan[p] = (freq.puluhan[p] || 0) + 1;
      freq.satuan[s] = (freq.satuan[s] || 0) + 1;
    });

    const ambilTop = (obj) =>
      Object.entries(obj)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2)
        .map(([digit]) => digit);

    const ribuan = ambilTop(freq.ribuan);
    const ratusan = ambilTop(freq.ratusan);
    const puluhan = ambilTop(freq.puluhan);
    const satuan = ambilTop(freq.satuan);

    const hasil = [];
    for (let r of ribuan) {
      for (let a of ratusan) {
        for (let p of puluhan) {
          for (let s of satuan) {
            hasil.push(`${r}${a}${p}${s}`);
          }
        }
      }
    }

    setPrediksi(hasil.slice(0, 5));
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h1>Prediksi Angka 4 Digit</h1>
      <textarea
        rows="4"
        style={{ width: '100%' }}
        placeholder="Masukkan angka 4 digit, pisahkan dengan spasi"
        value={dataInput}
        onChange={(e) => setDataInput(e.target.value)}
      />
      <button onClick={hitungPrediksi}>Prediksi</button>

      {prediksi.length > 0 && (
        <div>
          <h2>Hasil Prediksi:</h2>
          <ul>
            {prediksi.map((angka, idx) => (
              <li key={idx}>{angka}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
