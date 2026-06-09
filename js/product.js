export const products = [
  {
    type: "MOTORCYCLE",
    date: 2026,
    name: "NINJA® 500",
    price: 7200,
    img: ["../image/products/moto-1-1.webp", "../image/products/moto-1-2.webp", "../image/products/moto-1-3.webp", "../image/products/moto-1-4.webp"],
    img_background: "../image/products/moto-1.webp",
    features: ["Assist & Slipper Clutch", "Lightweight trellis frame", "Uni-Trak® rear suspension", "Available with Anti-lock Brake System (ABS)"]
  },
  {
    type: "MOTORCYCLE",
    date: 2026,
    name: "NINJA® ZX™-6R",
    price: 14800,
    img: ["../image/products/moto-2-1.webp", "../image/products/moto-2-2.webp", "../image/products/moto-2-3.webp", "../image/products/moto-2-4.webp"],
    img_background: "../image/products/moto-2.webp",
    features: ["Distinct Ninja® Styling", "Kawasaki Intelligent anti-lock Brake System (KIBS)", "TFT Color Instrumentation", "All-LED lighting", "Pressed-aluminum perimeter frame", "Pirelli Diablo™ Rosso IV tires"]
  },
  {
    type: "MOTORCYCLE",
    date: 2026,
    name: "NINJA® 300 ABS",
    price: 6600,
    img: ["../image/products/moto-3-1.webp", "../image/products/moto-3-2.webp", "../image/products/moto-3-3.webp", "../image/products/moto-3-4.webp"],
    img_background: "../image/products/moto-3.webp",
    features: ["Lightweight steel-tube diamond frame", "Uni-Trak® rear suspension", "Large analogue-style tachometer and multi-function LCD display", "Heat management technology for rider comfort", "Petal disc brakes", "Equipped with Anti-lock Brake System (ABS)", "Floating-style windscreen"]
  },
  {
    type: "MOTORCYCLE",
    date: 2025,
    name: "NINJA® ZX™-14R ABS",
    price: 19900,
    img: ["../image/products/moto-4-1.jpg", "../image/products/moto-4-2.jpg", "../image/products/moto-4-3.jpg"],
    img_background: "../image/products/moto-4.jpg",
    features: ["Dual power modes", "Back-torque limiting slipper clutch", "3-mode Kawasaki TRaction Control (KTRC)", "High-grade dash meter", "Stainless steel braided clutch and brake lines", "Brembo 4-piston M50 monobloc calipers", "Dual semi-floating 310mm discs"]
  },
  {
    type: "MULE",
    date: 2026,
    name: "MULE PRO-FX™ 820 EPS",
    price: 17400,
    img: ["../image/products/mule-5-1.webp", "../image/products/mule-5-2.webp", "../image/products/mule-5-3.webp", "../image/products/mule-5-4.webp"],
    img_background: "../image/products/mule-5.jpg",
    features: ["Massive 20-sq-ft cargo bed", "Continuously Variable Transmission (CVT)", "Electrically selectable 2WD/4WD/dual-mode rear differential with diff. lock", "Rack-and-pinion steering", "Speed-sensitive Electric Power Steering (EPS)"]
  },
  {
    type: "MULE",
    date: 2027,
    name: "MULE PRO-FX™ 1000 HD",
    price: 20100,
    img: ["../image/products/mule-6-1.webp", "../image/products/mule-6-2.webp", "../image/products/mule-6-3.webp", "../image/products/mule-6-4.webp"],
    img_background: "../image/products/mule-6.webp",
    features: ["1-ton towing capacity", "Massive 20-sq-ft cargo bed with hydraulic lift", "Electrically selectable 2WD/4WD/dual-mode differential with diff. lock", "Speed-sensitive Electric Power Steering (EPS) and tilt steering", "Plastic Roof", "Under-seat storage (driver/center)", "Rearview mirror", "Kawasaki STRONG 3-Year Limited Factory Warranty"]
  },
  {
    type: "TERYX",
    date: 2025,
    name: "TERYX4™",
    price: 18500,
    img: ["../image/products/teryx-7-1.jpg", "../image/products/teryx-7-2.jpg", "../image/products/teryx-7-3.jpg"],
    img_background: "../image/products/teryx-7.jpg",
    features: ["Maxxis® Bighorn tires", "FOX Podium 2.0 piggyback shocks", "Additional DC outlet in rear"]
  },
  {
    type: "TERYX",
    date: 2027,
    name: "TERYX® KRX4™ 1000 TR",
    price: 26900,
    img: ["../image/products/teryx-8-1.webp", "../image/products/teryx-8-2.webp", "../image/products/teryx-8-3.webp", "../image/products/teryx-8-4.webp"],
    img_background: "../image/products/teryx-8.webp",
    features: ["64-in trail-ready stance for tight wooded trails", "Comfort-focused suspension settings", "31-in Maxxis® Carnivore tires with 15-in alloy wheels", "Showa 2.5 piggyback shocks", "Steel skid plates with drain holes", "Downhill engine braking", "Exclusive TR badging"]
  },
  {
    type: "JET SKI",
    date: 2024,
    name: "JET SKI® SX-R™ 160",
    price: 13800,
    img: ["../image/products/jetski-9-1.jpg", "../image/products/jetski-9-2.jpg", "../image/products/jetski-9-3.jpg"],
    img_background: "../image/products/jetski-9.jpg",
    features: ["Easy to manage power", "Outstanding acceleration", "Large deck", "Small-item storage, low fuel and engine warning lights"]
  },
  {
    type: "JET SKI",
    date: 2025,
    name: "JET SKI® ULTRA® 160LX-S ANGLER",
    price: 21500,
    img: ["../image/products/jetski-10-1.jpg", "../image/products/jetski-10-2.jpg", "../image/products/jetski-10-3.jpg"],
    img_background: "../image/products/jetski-10.jpg",
    features: ["Launch control and power mode selection", "Electronic cruise control", "LED accent lights", "Front fishing rod holder", "Large fuel tank capacity (21.1 gallons)", "Flat two-section fishing bench seat", "ORCA 58QT cooler"]
  }
];

 document.querySelector(".discover").addEventListener("click",(x)=>{document.querySelector(".inner-1").classList.toggle("inner-1-show")});
  document.querySelector(".brand").addEventListener("click",(x)=>{document.querySelector(".inner-2").classList.toggle("inner-2-show")});
document.querySelector(".menu-btn").addEventListener("click",(x)=>{
  document.querySelector(".menu").classList.add("show");
})
document.querySelector(".menu-close-btn").addEventListener("click",(x)=>{
   document.querySelector(".menu").classList.remove("show");
})