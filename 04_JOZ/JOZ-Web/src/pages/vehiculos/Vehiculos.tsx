import React from "react";
import { Link } from "react-router-dom";

type Card = {
  title: string;
  to: string;
  img: string;
  desc?: string;
};

const cards: Card[] = [
  {
    title: "Mis vehículos",
    to: "/vehiculos/mis-vehiculos",
    img: "https://images.unsplash.com/photo-1515165562835-c3b4d6f0a6b9?w=1200&q=80",
    desc: "Catálogo y trámites de motocicletas",
  },
  {
    title: "Talleres",
    to: "/vehiculos/talleres",
    img: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=80",
    desc: "Gestión de talleres: alta, baja y mantenimiento",
  },
  //   {
  //     title: "Camiones",
  //     to: "/vehiculos/camiones",
  //     img: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=1200&q=80",
  //     desc: "Flotas y vehículos pesados",
  //   },
  //   {
  //     title: "Bicicletas",
  //     to: "/vehiculos/bicicletas",
  //     img: "https://images.unsplash.com/photo-1508766206392-8bd5cf550d1b?w=1200&q=80",
  //     desc: "Registro y accesorios para bicicletas",
  //   },
];

const Vehiculos: React.FC = () => {
  return (
    <div style={{ padding: 20 }}>
      <h1>Vehículos</h1>
      <p style={{ color: "#444", marginTop: 4 }}>Selecciona una categoría para ir al menú correspondiente.</p>

      <div
        style={{
          display: "grid",
          gap: 16,
          marginTop: 16,
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        }}
      >
        {cards.map((c) => (
          <Link key={c.to} to={c.to} style={{ textDecoration: "none", color: "inherit" }} aria-label={`Ir a ${c.title}`}>
            <article
              style={{
                border: "1px solid #e6e6e6",
                borderRadius: 10,
                overflow: "hidden",
                background: "#fff",
                boxShadow: "0 2px 8px rgba(16,24,40,0.06)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  height: 140,
                  backgroundImage: `url(${c.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div style={{ padding: 12, flex: 1 }}>
                <h3 style={{ margin: 0, marginBottom: 8 }}>{c.title}</h3>
                <p style={{ margin: 0, color: "#666", fontSize: 14 }}>{c.desc}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Vehiculos;
