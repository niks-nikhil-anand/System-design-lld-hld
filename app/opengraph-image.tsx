import { ImageResponse } from "next/og";

export const alt = "System Design Mate — learn system design visually";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: "72px", color: "#f4f5ff", background: "linear-gradient(125deg, #070b14 0%, #10172b 62%, #241348 100%)", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", color: "#b5a2ff", fontSize: 24, fontWeight: 600 }}>
        <div style={{ width: 28, height: 28, borderRadius: 9, background: "linear-gradient(135deg, #55c8ff, #a875ff)" }} />
        System Design Mate
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ fontSize: 66, lineHeight: 1.08, fontWeight: 700, letterSpacing: -2 }}>Learn System Design</div>
        <div style={{ display: "flex", fontSize: 28, color: "#b8c1da" }}>Concepts · Algorithms · Real-world architectures</div>
      </div>
      <div style={{ display: "flex", gap: 16, fontSize: 18, color: "#91a3cc" }}>Visual lessons <span>•</span> Interactive diagrams <span>•</span> Guided practice</div>
    </div>,
    { ...size },
  );
}
