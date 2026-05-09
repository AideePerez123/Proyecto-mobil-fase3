import { useMemo, useState } from 'react'

const padresFalsos = [
  {
    id: 'p1',
    nombre: 'Padre de Carlos',
    email: 'padre.carlos@ejemplo.com',
    password: '1234',
    hijoId: 1,
    hijoCarnet: 'C-1001',
  },
  {
    id: 'p2',
    nombre: 'Padre de Ana',
    email: 'padre.ana@ejemplo.com',
    password: '5678',
    hijoId: 2,
    hijoCarnet: 'A-1002',
  },
]

const alumnosFalsos = [
  {
    id: 1,
    nombre: 'Carlos García',
    carnet: 'C-1001',
    grupo: 'Fútbol Infantil A',
    entrada: '14:00',
    salida: '16:00',
    estado: 'Presente',
    padreId: 'p1',
  },
  {
    id: 2,
    nombre: 'Ana López',
    carnet: 'A-1002',
    grupo: 'Voleibol Juvenil',
    entrada: '14:05',
    salida: '--:--',
    estado: 'En clase',
    padreId: 'p2',
  },
  {
    id: 3,
    nombre: 'José Ramírez',
    carnet: 'J-1003',
    grupo: 'Básquetbol Pre-Infantil',
    entrada: '--:--',
    salida: '--:--',
    estado: 'Ausente',
    padreId: 'p1',
  },
]

export default function AsistenciaPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [carnetHijo, setCarnetHijo] = useState('')
  const [padreActivoId, setPadreActivoId] = useState<string | null>(null)
  const [errorLogin, setErrorLogin] = useState('')

  const padreActivo = padresFalsos.find((padre) => padre.id === padreActivoId)

  const alumnoVisible = useMemo(() => {
    if (!padreActivo) return null
    return alumnosFalsos.find(
      (alumno) => alumno.id === padreActivo.hijoId && alumno.carnet === carnetHijo.trim()
    )
  }, [padreActivo, carnetHijo])

  const presentes = alumnoVisible?.estado === 'Presente' ? 1 : 0
  const enClase = alumnoVisible?.estado === 'En clase' ? 1 : 0
  const ausentes = alumnoVisible?.estado === 'Ausente' ? 1 : 0

  const handleLogin = () => {
    setErrorLogin('')

    const padreEncontrado = padresFalsos.find((padre) => padre.email === email.trim())
    if (!padreEncontrado) {
      setErrorLogin('Correo no registrado. Usa uno de los padres simulados.')
      setPadreActivoId(null)
      return
    }

    if (padreEncontrado.password !== password) {
      setErrorLogin('Contraseña incorrecta.')
      setPadreActivoId(null)
      return
    }

    if (!carnetHijo.trim()) {
      setErrorLogin('Ingresa el número de carné de tu hijo.')
      setPadreActivoId(null)
      return
    }

    if (padreEncontrado.hijoCarnet !== carnetHijo.trim()) {
      setErrorLogin('El carné no coincide con el hijo asignado a esta cuenta.')
      setPadreActivoId(null)
      return
    }

    setPadreActivoId(padreEncontrado.id)
    setErrorLogin('')
  }

  const handleLogout = () => {
    setPadreActivoId(null)
    setEmail('')
    setPassword('')
    setCarnetHijo('')
    setErrorLogin('')
  }

  return (
    <div className="px-4 pt-6">
      <h1 className="text-2xl font-bold mb-2">Asistencia para Padres</h1>
      <p className="text-base-content/70 mb-6">
        Ingresa tus credenciales y la de tu hij@
      </p>

      {!padreActivo ? (
        <div className="card bg-base-100 shadow-md mb-6">
          <div className="card-body">
            <h2 className="font-semibold text-lg mb-4">Ingreso de padre</h2>
            <div className="grid gap-4">
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full"
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Carné del hijo"
                value={carnetHijo}
                onChange={(e) => setCarnetHijo(e.target.value)}
                className="input input-bordered w-full"
              />
              <button type="button" onClick={handleLogin} className="btn btn-primary w-full">
                Ver asistencia
              </button>
              {errorLogin && <p className="text-sm text-error mt-2">{errorLogin}</p>}
            </div>
          </div>
        </div>
      ) : (
        <div className="card bg-base-100 shadow-md mb-6">
          <div className="card-body">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="font-semibold text-lg">Bienvenido, {padreActivo.nombre}</h2>
                <p className="text-sm text-base-content/70">Hijo asignado: {alumnoVisible?.nombre ?? 'No encontrado'}</p>
              </div>
              <button type="button" onClick={handleLogout} className="btn btn-outline btn-sm">
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}

      {padreActivo && (
        <>
          {!alumnoVisible ? (
            <div className="alert alert-error shadow-lg mb-6">
              <div>
                <span>El carné ingresado no coincide con el hijo asignado a esta cuenta</span>
              </div>
            </div>
          ) : (
            <>
              <div className="stats stats-vertical sm:stats-horizontal shadow w-full mb-6">
                <div className="stat">
                  <div className="stat-title">Presentes</div>
                  <div className="stat-value text-primary">{presentes}</div>
                </div>
                <div className="stat">
                  <div className="stat-title">En clase</div>
                  <div className="stat-value text-secondary">{enClase}</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Ausentes</div>
                  <div className="stat-value text-error">{ausentes}</div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-sm mb-6">
                <div className="card-body p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-base">{alumnoVisible.nombre}</h3>
                      <p className="text-xs text-base-content/60">{alumnoVisible.grupo}</p>
                    </div>
                    <div
                      className={`badge badge-lg ${
                        alumnoVisible.estado === 'Presente'
                          ? 'badge-success'
                          : alumnoVisible.estado === 'En clase'
                          ? 'badge-warning'
                          : 'badge-error'
                      }`}
                    >
                      {alumnoVisible.estado}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row sm:gap-6 mt-3 text-sm text-base-content/80">
                    <span>Entrada: <strong>{alumnoVisible.entrada}</strong></span>
                    <span>Salida: <strong>{alumnoVisible.salida}</strong></span>
                  </div>
                  <p className="mt-4 text-sm text-base-content/70">
                    Carné: {alumnoVisible.carnet}
                  </p>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}