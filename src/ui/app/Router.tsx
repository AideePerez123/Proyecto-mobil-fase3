import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import HomePage from '../pages/HomePage'
import ReservasPage from '../pages/ResevasPage'
import JovenesPage from '../pages/JovenesPage'
import PadrinosPage from '../pages/PadrinosPage'
import AsistenciaPage from '../pages/AsistenciaPage'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="reservas" element={<ReservasPage />} />
          <Route path="jovenes" element={<JovenesPage />} />
          <Route path="padrinos" element={<PadrinosPage />} />
          <Route path="asistencia" element={<AsistenciaPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}