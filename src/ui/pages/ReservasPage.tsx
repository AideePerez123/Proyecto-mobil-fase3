import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaRegCalendarCheck, FaClock } from 'react-icons/fa';
import { useReservations } from '../../application/reservation/useReservations';
import { createReservation } from '../../application/reservation/createReservation';
import type { Reservation } from '../../domain/reservation/reservation.type';

const horariosIniciales = [
  { id: 1, hora: "18:00 - 19:00", turno: "Tarde", disponible: true, deporte: "futbol" },
  { id: 2, hora: "20:00 - 21:00", turno: "Noche", disponible: true, deporte: "basquet" },
  { id: 3, hora: "21:00 - 22:00", turno: "Noche", disponible: true, deporte: "voley" },
];

export default function ReservasPage() {
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | null>(null);
  const [vistaMes, setVistaMes] = useState(new Date());
  const [mostrarFormulario, setMostrarFormulario] = useState<number | null>(null);
  const [horarios, setHorarios] = useState(horariosIniciales);
  const [formNombre, setFormNombre] = useState('');
  const [formTelefono, setFormTelefono] = useState('');

  const fechaStr = fechaSeleccionada 
    ? `${fechaSeleccionada.getFullYear()}-${String(fechaSeleccionada.getMonth() + 1).padStart(2, '0')}-${String(fechaSeleccionada.getDate()).padStart(2, '0')}`
    : null;

  const { reservations, refresh } = useReservations(fechaStr);


  useEffect(() => {
    if (!reservations) return;
    const idsOcupados = reservations.map((r: Reservation) => r.horarioId);
    setHorarios(prev =>
      prev.map(h => ({
        ...h,
        disponible: !idsOcupados.includes(h.id),
      }))
    );
  }, [reservations]);

  const year = vistaMes.getFullYear();
  const month = vistaMes.getMonth();
  const primerDiaSemana = new Date(year, month, 1).getDay();
  const diasEnMes = new Date(year, month + 1, 0).getDate();
  const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
  const diasMes = Array.from({ length: diasEnMes }, (_, i) => i + 1);

  const cambiarMes = (direccion: number) => {
    setVistaMes(new Date(year, month + direccion, 1));
    setFechaSeleccionada(null);
    setMostrarFormulario(null);
    setFormNombre('');
    setFormTelefono('');
  };

  const seleccionarDia = (dia: number) => {
    const fecha = new Date(year, month, dia);
    if (fecha >= hoy) {
      setFechaSeleccionada(fecha);
      setMostrarFormulario(null);
      setFormNombre('');
      setFormTelefono('');
      refresh(); 
    }
  };

  const handleReservar = async (horarioId: number) => {
    if (!fechaStr) return;
    if (!formNombre.trim()) {
      alert('Por favor, ingresa tu nombre.');
      return;
    }
    if (!formTelefono.trim()) {
      alert('Por favor, ingresa tu teléfono.');
      return;
    }
    try {
      await createReservation(fechaStr, horarioId, formNombre, formTelefono);
      await refresh();  
      setMostrarFormulario(null);
      setFormNombre('');
      setFormTelefono('');
      alert('¡Reserva confirmada!');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al reservar');
    }
  };

  const getColorDeporte = (deporte: string) => {
    switch (deporte) {
      case 'futbol': return 'border-football-green shadow-football-green/20';
      case 'basquet': return 'border-basketball-orange shadow-basketball-orange/20';
      default: return 'border-volleyball-blue shadow-volleyball-blue/20';
    }
  };

  return (
    <div className="px-4 pt-6 pb-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-base-content mb-2 flex items-center gap-3">
          <FaRegCalendarCheck className="text-primary" /> Reservar Cancha
        </h1>
        <p className="text-base-content/70 font-medium">Selecciona una fecha y un horario disponible.</p>
      </div>

      
      <div className="glass-panel rounded-3xl mb-8 p-1">
        <div className="bg-base-100/50 rounded-[1.35rem] p-4 md:p-6">
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => cambiarMes(-1)} className="btn btn-circle btn-sm btn-ghost"><FaChevronLeft /></button>
            <span className="font-bold text-lg capitalize">{vistaMes.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}</span>
            <button onClick={() => cambiarMes(1)} className="btn btn-circle btn-sm btn-ghost"><FaChevronRight /></button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-base-content/50 mb-3">Do Lu Ma Mi Ju Vi Sa</div>
          <div className="grid grid-cols-7 gap-1 md:gap-2 text-center">
            {Array(primerDiaSemana).fill(null).map((_, i) => <div key={`v-${i}`} className="p-2" />)}
            {diasMes.map(dia => {
              const fechaDia = new Date(year, month, dia);
              const esPasado = fechaDia < hoy;
              const esSeleccionado = fechaSeleccionada?.getDate() === dia;
              return (
                <button key={dia} disabled={esPasado} onClick={() => seleccionarDia(dia)}
                  className={`relative aspect-square flex items-center justify-center rounded-xl text-sm font-semibold transition-all
                    ${esPasado ? 'text-base-content/20 cursor-not-allowed' : 'hover:bg-base-content/10 cursor-pointer text-base-content/80'}
                    ${esSeleccionado ? 'bg-primary text-primary-content shadow-lg shadow-primary/30 scale-105' : ''}`}>
                  {dia}
                </button>
              );
            })}
          </div>
        </div>
      </div>

     
      {fechaSeleccionada && (
        <div className="mb-4 animate-slide-up">
          <h2 className="font-bold text-xl mb-4 flex items-center gap-2"><FaClock className="text-secondary" /> Horarios: {fechaSeleccionada.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}</h2>
          <div className="flex flex-col gap-4">
            {horarios.map((h) => (
              <div key={h.id} className={`glass-panel rounded-2xl overflow-hidden border-l-4 ${getColorDeporte(h.deporte)} transition-all cursor-pointer ${mostrarFormulario === h.id ? 'ring-2 ring-primary scale-[1.02]' : 'hover:scale-[1.01]'}`}
                onClick={() => h.disponible && setMostrarFormulario(h.id)}>
                <div className="p-5 flex justify-between items-center bg-base-100/40">
                  <div><h3 className="font-extrabold text-lg">{h.hora}</h3><p className="text-xs text-base-content/60 uppercase mt-1">{h.turno}</p></div>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${h.disponible ? 'bg-success/10 text-success border-success/20' : 'bg-error/10 text-error border-error/20'}`}>
                    {h.disponible ? 'Disponible' : 'Ocupado'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

  
      {mostrarFormulario && (
        <div className="mt-8 animate-slide-up">
          <div className="rounded-3xl p-1 bg-base-200 shadow-xl">
            <div className="rounded-[1.35rem] p-6 bg-base-200">
              <h3 className="font-bold text-xl text-base-content mb-2">Confirmar Reserva</h3>
              <p className="text-base-content/80 text-sm mb-6">
                Bloque: <span className="font-bold">{horarios.find(h => h.id === mostrarFormulario)?.hora}</span>
              </p>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={formNombre}
                  onChange={(e) => setFormNombre(e.target.value)}
                  className="input input-bordered w-full bg-base-100"
                />
                <input
                  type="tel"
                  placeholder="Teléfono"
                  value={formTelefono}
                  onChange={(e) => setFormTelefono(e.target.value)}
                  className="input input-bordered w-full bg-base-100"
                />
                <button
                  onClick={() => handleReservar(mostrarFormulario)}
                  className="btn btn-primary w-full"
                >
                  Confirmar Reserva
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}