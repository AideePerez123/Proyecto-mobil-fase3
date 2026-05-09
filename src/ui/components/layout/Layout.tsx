import { NavLink, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      
      <header className="navbar bg-primary text-primary-content shadow-lg sticky top-0 z-50">
        

        <div className="navbar-start">
          <span className="text-xl font-bold tracking-tight">Comtrin </span>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">
            <li>
              <NavLink to="/" end className={({ isActive }) => isActive ? 'rounded-box font-bold bg-base-100 text-base-content' : ''}>Inicio</NavLink>
            </li>
            <li>
              <NavLink to="/reservas" className={({ isActive }) => isActive ? 'rounded-box font-bold bg-base-100 text-base-content' : ''}>Reservas</NavLink>
            </li>
            <li>
              <NavLink to="/jovenes" className={({ isActive }) => isActive ? 'rounded-box font-bold bg-base-100 text-base-content' : ''}>Jóvenes</NavLink>
            </li>
            <li>
              <NavLink to="/padrinos" className={({ isActive }) => isActive ? 'rounded-box font-bold bg-base-100 text-base-content' : ''}>Padrinos</NavLink>
            </li>
            <li>
              <NavLink to="/asistencia" className={({ isActive }) => isActive ? 'rounded-box font-bold bg-base-100 text-base-content' : ''}>Asistencia</NavLink>
            </li>
          </ul>
        </div>

        
        <div className="navbar-end lg:hidden">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-base-content">
              <li><NavLink to="/" end className={({ isActive }) => isActive ? 'active font-bold' : ''}>Inicio</NavLink></li>
              <li><NavLink to="/reservas" className={({ isActive }) => isActive ? 'active font-bold' : ''}>Reservas</NavLink></li>
              <li><NavLink to="/jovenes" className={({ isActive }) => isActive ? 'active font-bold' : ''}>Jóvenes</NavLink></li>
              <li><NavLink to="/padrinos" className={({ isActive }) => isActive ? 'active font-bold' : ''}>Padrinos</NavLink></li>
              <li><NavLink to="/asistencia" className={({ isActive }) => isActive ? 'active font-bold' : ''}>Asistencia</NavLink></li>
            </ul>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6 max-w-5xl mx-auto w-full">
        <Outlet />
      </main>


      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p className="font-bold">Academia Deportiva Comtrin</p>
          <p>Barrio el Gallito, Zona 3</p>
          
        </aside>
      </footer>

    </div>
  )
}