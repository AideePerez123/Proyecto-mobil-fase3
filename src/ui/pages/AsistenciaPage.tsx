import { useState } from 'react'
import { FaUserShield, FaSignOutAlt, FaCircle } from 'react-icons/fa'

const padresFalsos = [
  { id: 'p1', nombre: 'Padre de Carlos', email: 'padre.carlos@ejemplo.com', password: '1234', hijosIds: [1] },
  { id: 'p2', nombre: 'Padre de Ana', email: 'padre.ana@ejemplo.com', password: '5678', hijosIds: [2] },
]

const alumnosFalsos = [
  { id: 1, nombre: 'Carlos García', grupo: 'Fútbol Infantil A', entrada: '14:00', salida: '16:00', estado: 'Presente', deporte: 'futbol' },
  { id: 2, nombre: 'Ana López', grupo: 'Voleibol Juvenil', entrada: '14:05', salida: '--:--', estado: 'En clase', deporte: 'voley' },
  { id: 3, nombre: 'José Ramírez', grupo: 'Básquetbol Pre-Infantil', entrada: '--:--', salida: '--:--', estado: 'Ausente', deporte: 'basquet' },
]

export default function AsistenciaPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [padreActivoId, setPadreActivoId] = useState<string | null>(null)
  const [errorLogin, setErrorLogin] = useState('')

  const padreActivo = padresFalsos.find((p) => p.id === padreActivoId)
  const hijosDelPadre = padreActivo ? alumnosFalsos.filter(a => padreActivo.hijosIds.includes(a.id)) : []

  const handleLogin = () => {
    setErrorLogin('')
    const emailLimpio = email.trim()
    const passwordLimpio = password.trim()

    if (!emailLimpio || !passwordLimpio) {
      setErrorLogin('Por favor, ingresa correo y contraseña.')
      return
    }

    const padreEncontrado = padresFalsos.find((p) => p.email === emailLimpio)
    if (!padreEncontrado) {
      setErrorLogin('Correo no registrado.')
      return
    }

    if (padreEncontrado.password !== passwordLimpio) {
      setErrorLogin('Contraseña incorrecta.')
      return
    }

    setPadreActivoId(padreEncontrado.id)
  }

  const handleLogout = () => {
    setPadreActivoId(null)
    setEmail('')
    setPassword('')
    setErrorLogin('')
  }

  const getBorderColor = (deporte: string) => {
    switch(deporte) {
      case 'futbol': return 'border-l-football-green';
      case 'basquet': return 'border-l-basketball-orange';
      default: return 'border-l-volleyball-blue';
    }
  }

  return (
    <div className="px-4 pt-6 pb-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-base-content mb-2 flex items-center gap-3">
          <FaUserShield className="text-secondary" /> Portal de Padres
        </h1>
        <p className="text-base-content/70 font-medium">Monitorea la asistencia y seguridad de tus hijos en tiempo real.</p>
      </div>

      {!padreActivo ? (
        <div className="glass-panel rounded-3xl p-1 border-t-4 border-t-secondary/50">
          <div className="bg-base-100/80 rounded-[1.35rem] p-6 backdrop-blur-xl">
            <h2 className="font-bold text-xl text-base-content mb-6">Iniciar Sesión</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-base-content/70 uppercase tracking-wider mb-1 block">Correo Electrónico</label>
                <input type="email" placeholder="ejemplo@correo.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-base-200/50 border border-base-content/ rounded-xl px-4 py-3 text-base-content focus:outline-none focus:ring-2 focus:ring-secondary transition-all" />
              </div>
              <div>
                <label className="text-xs font-bold text-base-content/70 uppercase tracking-wider mb-1 block">Contraseña</label>
                <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-base-200/50 border border-base-content/ rounded-xl px-4 py-3 text-base-content focus:outline-none focus:ring-2 focus:ring-secondary transition-all" />
              </div>
              <button type="button" onClick={handleLogin} className="w-full bg-primary text-primary-content hover:from-secondary/90 hover:to-orange-500/90 text-base-content font-bold py-4 rounded-xl shadow-lg shadow-secondary/30 transition-all active:scale-95 mt-2">
                Acceder al Portal
              </button>
              {errorLogin && <p className="text-sm text-error mt-2 font-medium bg-error/10 p-3 rounded-lg border border-error/20">{errorLogin}</p>}
              
              <div className="mt-4 p-4 bg-base-200/30 rounded-xl border border-base-content/ text-xs text-base-content/60">
                <p><strong>Demo Credenciales:</strong></p>
                <p>Correo: padre.carlos@ejemplo.com | Pass: 1234</p>
                <p>Correo: padre.ana@ejemplo.com | Pass: 5678</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="animate-slide-up">
          <div className="glass-panel rounded-2xl mb-8 p-5 flex flex-row items-center justify-between border-l-4 border-l-secondary">
            <div>
              <p className="text-xs font-bold text-base-content/60 uppercase tracking-wider">Sesión Iniciada</p>
              <h2 className="font-extrabold text-xl text-base-content mt-1">{padreActivo.nombre}</h2>
            </div>
            <button type="button" onClick={handleLogout} className="btn btn-circle btn-ghost text-base-content/60 hover:text-base-content hover:bg-base-content/">
              <FaSignOutAlt size={20} />
            </button>
          </div>

          <h3 className="font-bold text-lg text-base-content mb-4">Estado de tus hijos hoy</h3>
          <div className="flex flex-col gap-4">
            {hijosDelPadre.map((alumno) => (
              <div key={alumno.id} className={`glass-panel rounded-2xl border-l-4 ${getBorderColor(alumno.deporte)} overflow-hidden hover:scale-[1.01] transition-all`}>
                <div className="p-5 bg-base-100/40">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-extrabold text-lg text-base-content">{alumno.nombre}</h3>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 border ${alumno.estado === 'Presente' ? 'bg-success/10 text-success border-success/20' : alumno.estado === 'En clase' ? 'bg-warning/10 text-warning border-warning/20' : 'bg-error/10 text-error border-error/20'}`}>
                      <FaCircle className="w-2 h-2" /> {alumno.estado}
                    </div>
                  </div>
                  <p className="text-xs font-bold text-base-content/60 uppercase tracking-wider mb-4 bg-base-200/50 inline-block px-3 py-1 rounded-md">{alumno.grupo}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm bg-base-200/30 p-3 rounded-xl border border-base-content/">
                    <div>
                      <p className="text-xs text-base-content/50 uppercase font-bold mb-1">Entrada</p>
                      <p className="font-bold text-base-content flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-success"></span> {alumno.entrada}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-base-content/50 uppercase font-bold mb-1">Salida</p>
                      <p className="font-bold text-base-content flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-error"></span> {alumno.salida}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}