import { useState, useEffect } from 'react'
import logo from './assets/logo.png'
import './App.css'

function App() {
  const [status, setStatus] = useState("Checking connection...")
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    fetch('/api/v1/health')
      .then(res => res.json())
      .then(data => setStatus(data.status))
      .catch(() => setStatus("Backend unreachable"));
  }, [])

  return (
    <div className="container">
      <main className="content">
        <img src={logo} className="main-logo" alt="Kielibuddy Logo" />
        <h2 className="tagline">Finnish vocabulary, simplified.</h2>
        
        <div className="card">
          <h1>Coming Soon</h1>
          <p>Rapidly developing a smarter way to master the Finnish language.</p>
          <div className="badge">
            <span className="dot"></span> {status}
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>© {currentYear} Kielibuddy | Built by Thiwanka</p>
        <p className="version-tag">Version 0.1.0-alpha</p>
      </footer>
    </div>
  )
}

export default App