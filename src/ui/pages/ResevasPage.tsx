import { useState, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight, FaRegCalendarCheck, FaClock } from 'react-icons/fa'

type Horario = {
  id: number
  hora: string
  turno: string
  disponible: boolean
  deporte: string
  reservadoPor?: string
}

const horariosIniciales: Horario[] = [
  { id: 1, hora: "18:00 - 19:00", turno: "Tarde", disponible: true, deporte: "futbol" },
  { id: 2, hora: "20:00 - 21:00", turno: "Noche", disponible: true, deporte: "basquet" },
  { id: 3, hora: "21:00 - 22:00", turno: "Noche", disponible: true, deporte: "voley" },
]

const DB_NAME = 'ComtrinDB'
const STORE_NAME = 'reservas'
let db: IDBDatabase | null = null

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (db) return resolve(db)
    const request = indexedDB.open(DB_NAME, 1)
    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      db = request.result
      resolve(db)
    }
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' })
      }
    }
  })
}

const getReservas = async (): Promise<Horario[]> => {
  const database = await openDB()
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, 'readonly')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.getAll()
    request.onsuccess = () => resolve(request.result as Horario[])
    request.onerror = () => reject(request.error)
  })
}

const guardarReserva = async (horario: Horario) => {
  const database = await openDB()
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.put(horario)
    request.onsuccess = () => resolve(true)
    request.onerror = () => reject(request.error)
  })
}

export default function ReservasPage() {
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | null>(null)
  const [vistaMes, setVistaMes] = useState(new Date())
  const [mostrarFormulario, setMostrarFormulario] = useState<number | null>(null)
  const [horarios, setHorarios] = useState<Horario[]>(horariosIniciales)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const cargarReservas = async () => {
      try {
        const reservasGuardadas = await getReservas()
        if (reservasGuardadas.length > 0) {
          setHorarios(reservasGuardadas)
        } else {
          await Promise.all(horariosIniciales.map(h => guardarReserva(h)))
          setHorarios(horariosIniciales)
        }
      } catch (error) {
        console.error('Error cargando reservas:', error)
      } finally {
        setCargando(false)
      }
    }
    cargarReservas()
  }, [])

  const year = vistaMes.getFullYear()
  const month = vistaMes.getMonth()
  const primerDiaSemana = new Date(year, month, 1).getDay()
  const diasEnMes = new Date(year, month + 1, 0).getDate()
  const hoy = new Date(); hoy.setHours(0,0,0,0)

  const diasMes = Array.from({ length: diasEnMes }, (_, i) => i + 1)

  const cambiarMes = (direccion: number) => {
    setVistaMes(new Date(year, month + direccion, 1))
    setFechaSeleccionada(null)
    setMostrarFormulario(null)
  }

  const seleccionarDia = (dia: number) => {
    const fecha = new Date(year, month, dia)
    if (fecha >= hoy) {
      setFechaSeleccionada(fecha)
      setMostrarFormulario(null)
    }
  }

  const handleReserva = async (nombre: string, telefono: string, horarioId: number) => {
    const horarioActualizado = horarios.find(h => h.id === horarioId)
    if (!horarioActualizado || !horarioActualizado.disponible) return

    const nuevoHorario = {
      ...horarioActualizado,
      disponible: false,
      reservadoPor: `${nombre} (${telefono})`
    }
    await guardarReserva(nuevoHorario)
    setHorarios(horarios.map(h => h.id === horarioId ? nuevoHorario : h))
    setMostrarFormulario(null)
    alert(`¡Reserva confirmada para ${horarioActualizado.hora}!`)
  }

  const getColorDeporte = (deporte: string) => {
    switch(deporte) {
      case 'futbol': return 'border-football-green shadow-football-green/20'
      case 'basquet': return 'border-basketball-orange shadow-basketball-orange/20'
      default: return 'border-volleyball-blue shadow-volleyball-blue/20'
    }
  }

  if (cargando) return <div className="p-10 text-center">Cargando horarios...</div>

  return (
    <div className="px-4 pt-6 pb-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-base-content mb-2 flex items-center gap-3">
          <FaRegCalendarCheck className="text-primary" /> Reservar Cancha
        </h1>
        <p className="text-base-content/70 font-medium">Selecciona una fecha y un horario disponible para tu equipo.</p>
      </div>
      
      {/* CALENDARIO (igual que antes) */}
      <div className="glass-panel rounded-3xl mb-8 p-1">
        <div className="bg-base-100/50 rounded-[1.35rem] p-4 md:p-6">
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => cambiarMes(-1)} className="btn btn-circle btn-sm btn-ghost hover:bg-base-content/10 text-base-content">
              <FaChevronLeft />
            </button>
            <span className="font-bold text-lg capitalize text-base-content tracking-wide">
              {vistaMes.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}
            </span>
            <button onClick={() => cambiarMes(1)} className="btn btn-circle btn-sm btn-ghost hover:bg-base-content/10 text-base-content">
              <FaChevronRight />
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-base-content/50 mb-3 uppercase tracking-wider">
            <span>Do</span><span>Lu</span><span>Ma</span><span>Mi</span><span>Ju</span><span>Vi</span><span>Sa</span>
          </div>
          
          <div className="grid grid-cols-7 gap-1 md:gap-2 text-center">
            {Array(primerDiaSemana).fill(null).map((_, i) => <div key={`v-${i}`} className="p-2" />)}
            {diasMes.map((dia) => {
              const fechaDia = new Date(year, month, dia)
              const esPasado = fechaDia < hoy
              const esSeleccionado = fechaSeleccionada?.getDate() === dia
              
              return (
                <button key={dia} disabled={esPasado} onClick={() => seleccionarDia(dia)}
                  className={`relative aspect-square flex items-center justify-center rounded-xl text-sm font-semibold transition-all
                    ${esPasado ? 'text-base-content/20 cursor-not-allowed' : 'hover:bg-base-content/10 cursor-pointer text-base-content/80'}
                    ${esSeleccionado ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105' : ''}`}>
                  {dia}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* HORARIOS */}
      {fechaSeleccionada && (
        <div className="mb-4 animate-slide-up">
          <h2 className="font-bold text-xl text-base-content mb-4 flex items-center gap-2">
            <FaClock className="text-secondary" /> Horarios: {fechaSeleccionada.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
          </h2>
          <div className="flex flex-col gap-4">
            {horarios.map((h) => (
              <div key={h.id} className={`glass-panel rounded-2xl overflow-hidden border-l-4 ${getColorDeporte(h.deporte)} transition-all cursor-pointer ${mostrarFormulario === h.id ? 'ring-2 ring-primary scale-[1.02]' : 'hover:scale-[1.01]'}`}
                onClick={() => h.disponible ? setMostrarFormulario(h.id) : null}>
                <div className="p-5 flex justify-between items-center bg-base-100/40">
                  <div>
                    <h3 className="font-extrabold text-lg text-base-content tracking-tight">{h.hora}</h3>
                    <p className="text-xs text-base-content/60 font-medium uppercase tracking-wider mt-1">{h.turno}</p>
                    {!h.disponible && <p className="text-xs text-error mt-1">Reservado por: {h.reservadoPor}</p>}
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${h.disponible ? 'bg-success/10 text-success border-success/20' : 'bg-error/10 text-error border-error/20'}`}>
                    {h.disponible ? 'Disponible' : 'Ocupado'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FORMULARIO DE RESERVA */}
      {mostrarFormulario && (
        <div className="mt-8 animate-slide-up">
          <div className="glass-panel bg-primary text-primary-content rounded-3xl p-1">
            <div className="bg-base-100/80 rounded-[1.35rem] p-6 backdrop-blur-xl">
              <h3 className="font-bold text-xl text-base-content mb-2">Confirmar Reserva</h3>
              <p className="text-base-content/80 text-sm mb-6">Bloque seleccionado: <span className="text-base-content font-bold">{horarios.find(h => h.id === mostrarFormulario)?.hora}</span></p>
              <form onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                const nombre = formData.get('nombre') as string
                const telefono = formData.get('telefono') as string
                if (nombre && telefono) handleReserva(nombre, telefono, mostrarFormulario)
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-base-content/70 uppercase tracking-wider mb-1 block">Tu Nombre</label>
                    <input name="nombre" type="text" required className="w-full bg-base-200/50 border border-base-content/20 rounded-xl px-4 py-3 text-base-content focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-base-content/70 uppercase tracking-wider mb-1 block">Teléfono</label>
                    <input name="telefono" type="tel" required className="w-full bg-base-200/50 border border-base-content/20 rounded-xl px-4 py-3 text-base-content focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                  </div>
                  <button type="submit" className="w-full bg-primary text-white hover:from-primary/90 hover:to-accent/90 font-bold py-4 rounded-xl shadow-lg shadow-primary/30 transition-all active:scale-95 mt-4">
                    Confirmar Reserva Ahora
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}