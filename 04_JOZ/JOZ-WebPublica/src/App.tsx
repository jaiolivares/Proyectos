import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import { PRIVATE_SITE_URL } from './config/appConfig'

const loginUrl = `${PRIVATE_SITE_URL}/login`

function LandingPage() {
  return (
    <div className="page-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">JOZ movilidad y gestion</p>
          <span className="brand">JOZ Publica</span>
        </div>
        <nav className="topbar-actions" aria-label="Acciones principales">
          <a className="ghost-link" href="#servicios">
            Servicios
          </a>
          <a className="ghost-link" href="#experiencia">
            Experiencia
          </a>
          <a className="primary-button" href={loginUrl}>
            LOGIN
          </a>
        </nav>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">Plataforma publica</p>
            <h1>Soluciones JOZ para gestionar flotas, ubicaciones y operacion.</h1>
            <p className="hero-text">
              Un sitio publico pensado para presentar la propuesta de valor, mostrar
              experiencia operativa y dirigir a los usuarios autenticados al portal
              privado de JOZ-Web.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href={loginUrl}>
                Ir al Login
              </a>
              <a className="secondary-button" href="#contacto">
                Ver contacto
              </a>
            </div>
            <dl className="stats-grid" aria-label="Indicadores destacados">
              <div>
                <dt>24/7</dt>
                <dd>Visibilidad operativa y seguimiento continuo</dd>
              </div>
              <div>
                <dt>+100</dt>
                <dd>Activos y procesos administrables desde la plataforma</dd>
              </div>
              <div>
                <dt>1 click</dt>
                <dd>Acceso directo al portal autenticado del equipo</dd>
              </div>
            </dl>
          </div>

          <aside className="hero-card" aria-label="Resumen visual">
            <div className="card-panel card-panel-primary">
              <span>Centro de control</span>
              <strong>Vehiculos, usuarios y ubicaciones integrados</strong>
            </div>
            <div className="card-panel card-panel-accent">
              <span>Acceso privado</span>
              <strong>Portal JOZ-Web enlazado desde el sitio publico</strong>
            </div>
            <div className="card-orbit orbit-one" aria-hidden="true"></div>
            <div className="card-orbit orbit-two" aria-hidden="true"></div>
          </aside>
        </section>

        <section className="info-strip" aria-label="Propuesta de valor">
          <p>
            Diseno claro, acceso inmediato y una capa publica preparada para dirigir
            al usuario correcto al sistema interno.
          </p>
        </section>

        <section className="content-grid" id="servicios">
          <article className="content-card">
            <p className="eyebrow">Servicios</p>
            <h2>Operacion trazable para equipos que necesitan control real.</h2>
            <ul>
              <li>Presentacion publica de capacidades y servicios de JOZ.</li>
              <li>Navegacion simple con foco en conversion hacia el login.</li>
              <li>Base React + TypeScript lista para crecer con nuevas secciones.</li>
            </ul>
          </article>

          <article className="content-card muted-card" id="experiencia">
            <p className="eyebrow">Experiencia</p>
            <h2>Una landing con presencia visual y estructura lista para negocio.</h2>
            <div className="timeline">
              <div>
                <span>01</span>
                <p>Hero principal con propuesta de valor y CTA al portal privado.</p>
              </div>
              <div>
                <span>02</span>
                <p>Bloques editoriales para servicios, confianza y contexto operativo.</p>
              </div>
              <div>
                <span>03</span>
                <p>Ruta comodin para URLs no validas con mensaje claro al usuario.</p>
              </div>
            </div>
          </article>
        </section>

        <section className="cta-section" id="contacto">
          <div>
            <p className="eyebrow">Acceso</p>
            <h2>Si ya tienes credenciales, entra directamente a JOZ-Web.</h2>
          </div>
          <a className="primary-button" href={loginUrl}>
            LOGIN
          </a>
        </section>
      </main>
    </div>
  )
}

function NotFoundPage() {
  return (
    <main className="not-found-shell">
      <div className="not-found-card">
        <p className="eyebrow">404</p>
        <h1>La URL solicitada no existe.</h1>
        <p>
          La direccion que intentaste abrir no corresponde a una ruta valida de
          JOZ Publica.
        </p>
        <div className="hero-actions">
          <Link className="secondary-button" to="/">
            Volver al inicio
          </Link>
          <a className="primary-button" href={loginUrl}>
            Ir a LOGIN
          </a>
        </div>
      </div>
    </main>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
