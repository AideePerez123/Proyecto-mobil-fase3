import { NavLink, Outlet } from 'react-router-dom'
import { FaHome, FaCalendarCheck, FaHandsHelping, FaClipboardCheck, FaVoteYea, FaStar } from 'react-icons/fa'

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-base-100 transition-colors duration-300">
      
      <header className="glass-navbar sticky top-0 z-50 text-base-content shadow-lg">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-xl font-extrabold tracking-tight text-primary drop-shadow-sm">
              COMTRIN
            </span>
          </div>

          <nav className="hidden md:flex gap-1 items-center">
            <NavLink to="/" end className={({ isActive }) => `px-4 py-2 rounded-full font-medium transition-all ${isActive ? 'bg-base-content/10 text-base-content' : 'text-base-content/70 hover:text-base-content hover:bg-base-content/5'}`}>Inicio</NavLink>
            <NavLink to="/reservas" className={({ isActive }) => `px-4 py-2 rounded-full font-medium transition-all ${isActive ? 'bg-base-content/10 text-base-content' : 'text-base-content/70 hover:text-base-content hover:bg-base-content/5'}`}>Reservas</NavLink>
            <NavLink to="/padrinos" className={({ isActive }) => `px-4 py-2 rounded-full font-medium transition-all ${isActive ? 'bg-base-content/10 text-base-content' : 'text-base-content/70 hover:text-base-content hover:bg-base-content/5'}`}>Padrinos</NavLink>
            <NavLink to="/asistencia" className={({ isActive }) => `px-4 py-2 rounded-full font-medium transition-all ${isActive ? 'bg-base-content/10 text-base-content' : 'text-base-content/70 hover:text-base-content hover:bg-base-content/5'}`}>Asistencia</NavLink>
            <NavLink to="/votaciones" className={({ isActive }) => `px-4 py-2 rounded-full font-medium transition-all ${isActive ? 'bg-base-content/10 text-base-content' : 'text-base-content/70 hover:text-base-content hover:bg-base-content/5'}`}>Votar</NavLink>
            <NavLink to="/jovenes" className={({ isActive }) => `px-4 py-2 rounded-full font-medium transition-all ${isActive ? 'bg-base-content/10 text-base-content' : 'text-base-content/70 hover:text-base-content hover:bg-base-content/5'}`}>Jóvenes</NavLink>
          </nav>
          
          <div className="md:hidden">
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto pb-24 md:pb-8">
        <Outlet />
      </main>

      <div className="md:hidden fixed bottom-0 left-0 right-0 glass-navbar border-t border-base-content/10 pb-safe z-50">
        <div className="flex justify-around items-center p-2">
          <NavLink to="/" end className={({ isActive }) => `flex flex-col items-center p-2 rounded-xl transition-all ${isActive ? 'text-base-content bg-base-content/10' : 'text-base-content/50'}`}>
            <FaHome className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">Inicio</span>
          </NavLink>
          <NavLink to="/reservas" className={({ isActive }) => `flex flex-col items-center p-2 rounded-xl transition-all ${isActive ? 'text-football-green bg-football-green/10' : 'text-base-content/50'}`}>
            <FaCalendarCheck className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">Reservas</span>
          </NavLink>
          <NavLink to="/padrinos" className={({ isActive }) => `flex flex-col items-center p-2 rounded-xl transition-all ${isActive ? 'text-volleyball-blue bg-volleyball-blue/10' : 'text-base-content/50'}`}>
            <FaHandsHelping className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">Padrinos</span>
          </NavLink>
          <NavLink to="/asistencia" className={({ isActive }) => `flex flex-col items-center p-2 rounded-xl transition-all ${isActive ? 'text-basketball-orange bg-basketball-orange/10' : 'text-base-content/50'}`}>
            <FaClipboardCheck className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">Asistencia</span>
          </NavLink>
          <NavLink to="/votaciones" className={({ isActive }) => `flex flex-col items-center p-2 rounded-xl transition-all ${isActive ? 'text-primary bg-primary/10' : 'text-base-content/50'}`}>
            <FaVoteYea className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">Votar</span>
          </NavLink>
          <NavLink to="/jovenes" className={({ isActive }) => `flex flex-col items-center p-2 rounded-xl transition-all ${isActive ? 'text-secondary bg-secondary/10' : 'text-base-content/50'}`}>
            <FaStar className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">Jóvenes</span>
          </NavLink>
        </div>
      </div>

    </div>
  )
}