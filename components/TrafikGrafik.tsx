import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from "recharts";

// Veri tipini belirliyoruz
interface TrafikData {
  saat: string;
  ortalama_sure: number;
}

export const TrafikGrafik = () => {
  const [data, setData] = useState<TrafikData[]>([]); // Data tipini belirledik

  useEffect(() => {
    fetch("http://localhost:3000/trafik-analiz")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return (
    <View style={{ flexDirection: "column", alignItems: "center" }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Trafik Yoğunluğu Analizi
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* YAxis ve BarChart bileşenlerini doğru şekilde ilişkilendiriyoruz */}
        <YAxis
          dataKey="ortalama_sure" // Y-axis verisi için dataKey kullanıyoruz
          domain={["dataMin", "dataMax"]} // Y ekseninin ölçeği
          orientation="left"
        />
        <BarChart
          width={300}
          height={200}
          data={data}
          barSize={20}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="saat" />
          <Tooltip />
          <Legend />
          <Bar dataKey="ortalama_sure" fill="#8884d8" />
        </BarChart>
      </View>
    </View>
  );
};
