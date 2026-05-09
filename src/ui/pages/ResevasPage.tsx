import { useState } from 'react'

const horariosFalsos = [
  { id: 1, hora: "18:00 - 19:00", deporte: "Fútbol", disponible: true },
  { id: 2, hora: "19:00 - 20:00", deporte: "Voleibol", disponible: false },
  { id: 3, hora: "20:00 - 21:00", deporte: "Básquetbol", disponible: true },
]

export default function ReservasPage() {
  const [seleccionado, setSeleccionado] = useState<number | null>(null);

  return (
    <div className="px-4 pt-6">
      <h1 className="text-2xl font-bold mb-4">Reserva de Cancha</h1>
      
      <div className="flex flex-col gap-3">
        {horariosFalsos.map((h) => (
          <div key={h.id} 
              onClick={() => h.disponible ? setSeleccionado(h.id) : null}
              className={`card bg-base-100 shadow-sm cursor-pointer border-2 transition-all ${
                seleccionado === h.id ? 'border-primary' : 'border-transparent'
              } ${!h.disponible ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <div className="card-body p-4 flex-row justify-between items-center">
              <div>
                <h3 className="font-bold">{h.hora}</h3>
                <p className="text-sm text-base-content/60">{h.deporte}</p>
              </div>
              <span className={`btn btn-sm ${h.disponible ? 'btn-success' : 'btn-error'}`}>
                {h.disponible ? 'Disponible' : 'Ocupado'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {seleccionado && (
        <div className="mt-6 card bg-primary text-primary-content">
          <div className="card-body">
            <h3 className="font-bold text-lg">Confirmar Reserva</h3>
            <p>Has seleccionado el bloque de horas</p>
            <div className="flex flex-col gap-2 mt-2">
              <input type="text" placeholder="Tu nombre" className="input input-bordered w-full bg-white text-black" />
              <input type="tel" placeholder="Tu teléfono" className="input input-bordered w-full bg-white text-black" />
              <button className="btn bg-white text-primary hover:bg-gray-100 mt-2">Reservar Ahora</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}