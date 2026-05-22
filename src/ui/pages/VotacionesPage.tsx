import { useState } from 'react'
import { FaVoteYea, FaFutbol, FaBasketballBall, FaVolleyballBall } from 'react-icons/fa'

const deportes = [
    { id: 1, nombre: 'Fútbol', icon: <FaFutbol />, votos: 45, color: 'text-football-green', bg: 'bg-football-green', from: 'from-football-green', to: 'to-emerald-700' },
    { id: 2, nombre: 'Básquetbol', icon: <FaBasketballBall />, votos: 32, color: 'text-basketball-orange', bg: 'bg-basketball-orange', from: 'from-basketball-orange', to: 'to-orange-700' },
    { id: 3, nombre: 'Voleibol', icon: <FaVolleyballBall />, votos: 28, color: 'text-volleyball-blue', bg: 'bg-volleyball-blue', from: 'from-volleyball-blue', to: 'to-blue-700' },
]

export default function VotacionesPage() {
    const [votos, setVotos] = useState(deportes)
    const [yaVoto, setYaVoto] = useState(false)

  const handleVotar = (id: number) => {
    if (yaVoto) return alert('Ya emitiste tu voto para este torneo.')
    setVotos(votos.map(d => d.id === id ? { ...d, votos: d.votos + 1 } : d))
    setYaVoto(true)
  }

  const totalVotos = votos.reduce((acc, curr) => acc + curr.votos, 0)

  return (
    <div className="px-4 pt-6 pb-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-base-content mb-2 flex items-center gap-3">
          <FaVoteYea className="text-primary" /> Votar Torneo
        </h1>
        <p className="text-base-content/70 font-medium">Elige qué deporte tendrá el próximo torneo del año.</p>
      </div>

      <div className="flex flex-col gap-5">
        {votos.map((deporte) => {
          const porcentaje = totalVotos === 0 ? 0 : ((deporte.votos / totalVotos) * 100);
          
          return (
          <div key={deporte.id} className="glass-panel rounded-3xl p-1 relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-32 h-32 ${deporte.bg}/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:scale-150`}></div>
            
            <div className="bg-base-100/80 rounded-[1.35rem] p-6 backdrop-blur-xl relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${deporte.bg}/20 flex items-center justify-center text-2xl ${deporte.color} border border-base-content/ shadow-inner`}>
                    {deporte.icon}
                  </div>
                  <h2 className="font-extrabold text-2xl text-base-content">{deporte.nombre}</h2>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-base-content">{deporte.votos}</p>
                  <p className="text-xs font-bold text-base-content/50 uppercase tracking-wider">Votos</p>
                </div>
              </div>
              
              <div className="w-full bg-base-200/50 rounded-full h-3 mb-2 border border-base-content/ overflow-hidden">
                <div 
                  className={`h-full rounded-full bg-gradient-to-r ${deporte.from} ${deporte.to} transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(255,255,255,0.3)]`}
                  style={{ width: `${porcentaje}%` }}
                ></div>
              </div>
              <div className="flex justify-end mb-5">
                <p className="text-xs font-bold text-base-content/60">{porcentaje.toFixed(1)}%</p>
              </div>

              <button 
                onClick={() => handleVotar(deporte.id)} 
                disabled={yaVoto}
                className={`w-full py-3.5 rounded-xl font-bold transition-all ${
                  yaVoto 
                    ? 'bg-base-200/50 text-base-content/40 cursor-not-allowed border border-base-content/' 
                    : `bg-gradient-to-r ${deporte.from} ${deporte.to} text-base-content shadow-lg hover:shadow-xl active:scale-[0.98]`
                }`}
              >
                {yaVoto ? 'Voto Registrado' : `Votar por ${deporte.nombre}`}
              </button>
            </div>
          </div>
        )})}
      </div>
    </div>
  )
}