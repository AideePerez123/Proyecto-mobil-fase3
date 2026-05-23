import { useNavigate } from 'react-router-dom'
import { FaFutbol, FaBasketballBall, FaVolleyballBall, FaCalendarAlt, FaUserCheck, FaHandsHelping, FaTrophy, FaVoteYea } from "react-icons/fa";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="pb-10 animate-fade-in">
      
      <div className="relative w-full h-[400px] md:h-[500px] md:rounded-b-3xl overflow-hidden shadow-2xl mb-8 -mt-4 md:mt-0 bg-base-300 group">
        <img 
          src="/hero_banner.png" 
          alt="Academia" 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-base-content mb-2 tracking-tight drop-shadow-lg">
            Academia <span className="text-primary">Comtrin</span>
          </h1>
          <p className="text-lg md:text-xl text-base-content/ font-medium max-w-2xl">
            Formando buenas personas en el Barrio el Gallito a través del deporte y la disciplina.
          </p>
          
          <div className="flex gap-4 mt-6">
            <span className="flex items-center gap-2 bg-football-green text-base-content px-4 py-2 rounded-full font-bold shadow-md hover:scale-105 transition-transform">
              <FaFutbol /> Fútbol
            </span>
            <span className="flex items-center gap-2 bg-basketball-orange text-base-content px-4 py-2 rounded-full font-bold shadow-md hover:scale-105 transition-transform">
              <FaBasketballBall /> Básquet
            </span>
            <span className="flex items-center gap-2 bg-volleyball-blue text-base-content px-4 py-2 rounded-full font-bold shadow-md hover:scale-105 transition-transform">
              <FaVolleyballBall /> Vóley
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-0 space-y-10">
        
        <div className="glass-panel rounded-3xl p-6 relative overflow-hidden transition-all duration-500 hover:shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2 text-base-content">
            <FaTrophy className="text-warning" /> ¿De qué trata esta app?
          </h2>
          <p className="text-base-content/80 leading-relaxed font-medium">
            Somos una academia deportiva sin fines de lucro ubicada en el Barrio el Gallito. Nuestra misión es ofrecer un espacio seguro de formación para jóvenes de 9 a 18 años. Aquí podrás reservar la cancha para tus partidos nocturnos,en la reserva de cancha o el alquiler no importa tu edad, apadrinar a un joven en situación vulnerable, y como padre, monitorear la asistencia de tu hijo en tiempo real.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-2xl mb-5 text-base-content">Acceso Rápido</h3>
          <div className="grid grid-cols-2 gap-4">
            
            <button onClick={() => navigate('/reservas')} className="group relative overflow-hidden glass-panel rounded-3xl p-6 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-football-green/20">
              <div className="absolute inset-0 bg-football-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="bg-football-green/20 text-football-green w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-inner group-hover:scale-110 transition-transform duration-300">
                <FaCalendarAlt size={24} />
              </div>
              <h4 className="font-bold text-lg text-base-content mb-1">Reservas</h4>
              <p className="text-xs text-base-content/60">Canchas nocturnas</p>
            </button>

            <button onClick={() => navigate('/asistencia')} className="group relative overflow-hidden glass-panel rounded-3xl p-6 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-basketball-orange/20">
              <div className="absolute inset-0 bg-basketball-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="bg-basketball-orange/20 text-basketball-orange w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-inner group-hover:scale-110 transition-transform duration-300">
                <FaUserCheck size={24} />
              </div>
              <h4 className="font-bold text-lg text-base-content mb-1">Asistencia</h4>
              <p className="text-xs text-base-content/60">Portal de padres</p>
            </button>

            <button onClick={() => navigate('/padrinos')} className="group relative overflow-hidden glass-panel rounded-3xl p-6 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-volleyball-blue/20">
              <div className="absolute inset-0 bg-volleyball-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="bg-volleyball-blue/20 text-volleyball-blue w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-inner group-hover:scale-110 transition-transform duration-300">
                <FaHandsHelping size={24} />
              </div>
              <h4 className="font-bold text-lg text-base-content mb-1">Padrinos</h4>
              <p className="text-xs text-base-content/60">Apoya un talento</p>
            </button>

            <button onClick={() => navigate('/votaciones')} className="group relative overflow-hidden glass-panel rounded-3xl p-6 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-primary/20">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="bg-primary/20 text-primary w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-inner group-hover:scale-110 transition-transform duration-300">
                <FaVoteYea size={24} />
              </div>
              <h4 className="font-bold text-lg text-base-content mb-1">Torneos</h4>
              <p className="text-xs text-base-content/60">Vota por el próximo</p>
            </button>

          </div>
        </div>

      </div>
    </div>
  )
}