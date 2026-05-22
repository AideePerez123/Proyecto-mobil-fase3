import { useState } from 'react'
import { FaHandsHelping, FaHeart, FaUniversity } from 'react-icons/fa'
import { useDonations } from '../../application/donation/useDonation'
import { createDonation } from '../../application/donation/createDonation'

export default function PadrinosPage() {
  const { donations, refresh } = useDonations()
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    montoSeleccionado: 100,
    otroMonto: '',
    metodo: 'Transferencia',
    comprobante: '',
  })
  const [mensajeExito, setMensajeExito] = useState('')

  const montoFinal = form.otroMonto ? parseFloat(form.otroMonto) : form.montoSeleccionado

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMensajeExito('')

    if (!form.nombre.trim() || !form.email.trim()) {
      alert('Por favor, completa nombre y correo.')
      return
    }
    if (!montoFinal || montoFinal <= 0) {
      alert('Selecciona o ingresa un monto válido.')
      return
    }

    try {
      await createDonation(
        form.nombre,
        montoFinal,
        form.metodo,
        form.comprobante.trim() || undefined
      )
      refresh() 
      setMensajeExito(`¡Gracias ${form.nombre}! Tu donación de Q${montoFinal} por ${form.metodo} ha sido registrada.`)
      setForm({
        nombre: '',
        email: '',
        montoSeleccionado: 100,
        otroMonto: '',
        metodo: 'Transferencia',
        comprobante: '',
      })
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al registrar la donación.')
    }
  }

  return (
    <div className="px-4 pt-6 pb-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-base-content mb-2 flex items-center gap-3">
          <FaHandsHelping className="text-volleyball-blue" /> Hazte Padrino
        </h1>
        <p className="text-base-content/70 font-medium">
          Cambia la vida de un joven a través del deporte y la educación.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[300px] md:h-auto group bg-base-300">
          <img
            src="/padrinos_image.png"
            alt="Apadrina un joven"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
            <h2 className="font-extrabold text-2xl text-white mb-2">¿Por qué ser padrino?</h2>
            <p className="text-white/90 text-sm md:text-base leading-relaxed">
              Con tu donación, un niño o joven accede a entrenamiento, uniformes y materiales deportivos.
            </p>
            <div className="flex gap-3 mt-4">
              <span className="px-3 py-1 rounded-full bg-football-green/80 text-white text-xs font-bold">Fútbol</span>
              <span className="px-3 py-1 rounded-full bg-basketball-orange/80 text-white text-xs font-bold">Básquet</span>
              <span className="px-3 py-1 rounded-full bg-volleyball-blue/80 text-white text-xs font-bold">Vóley</span>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-1 border-t-4 border-t-volleyball-blue">
          <div className="bg-base-100/80 rounded-[1.35rem] p-6 backdrop-blur-xl">
            <h2 className="font-bold text-xl text-base-content mb-6 flex items-center gap-2">
              <FaHeart className="text-error" /> Realiza tu aporte
            </h2>

            <div className="mb-6 p-3 bg-base-200 rounded-xl text-sm">
              <p className="font-bold flex items-center gap-2">
                <FaUniversity /> Cuenta destino (simulación):
              </p>
              <p className="text-base-content/80">
                Banco Industrial • Cuenta: 1234-5678-9012345<br />
                Alias: comtrin.academia
              </p>
              <p className="text-xs text-base-content/60 mt-1">
                *Transferencia o depósito a esta cuenta
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-base-content/70 uppercase">Nombre Completo</label>
                <input
                  type="text"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  className="w-full bg-base-200/50 border rounded-xl px-4 py-3"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-base-content/70 uppercase">Correo Electrónico</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-base-200/50 border rounded-xl px-4 py-3"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-base-content/70 uppercase">Monto a donar (Q)</label>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {[50, 100, 150, 200].map((m) => (
                    <button
                      type="button"
                      key={m}
                      onClick={() =>
                        setForm({
                          ...form,
                          montoSeleccionado: m,
                          otroMonto: '',
                        })
                      }
                      className={`btn btn-sm ${
                        form.montoSeleccionado === m && !form.otroMonto
                          ? 'btn-primary'
                          : 'btn-outline'
                      }`}
                    >
                      Q{m}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="Otro monto"
                  value={form.otroMonto}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      otroMonto: e.target.value,
                      montoSeleccionado: 0,
                    })
                  }
                  className="w-full bg-base-200/50 border rounded-xl px-4 py-3"
                  min="1"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-base-content/70 uppercase">Método de pago</label>
                <div className="flex gap-4 mt-1">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="metodo"
                      value="Transferencia"
                      checked={form.metodo === 'Transferencia'}
                      onChange={() => setForm({ ...form, metodo: 'Transferencia' })}
                    />{' '}
                    Transferencia
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="metodo"
                      value="Depósito"
                      checked={form.metodo === 'Depósito'}
                      onChange={() => setForm({ ...form, metodo: 'Depósito' })}
                    />{' '}
                    Depósito en ventanilla
                  </label>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-base-content/70 uppercase">
                  Número de comprobante (opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ej. 123456"
                  value={form.comprobante}
                  onChange={(e) => setForm({ ...form, comprobante: e.target.value })}
                  className="w-full bg-base-200/50 border rounded-xl px-4 py-3"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-volleyball-blue to-blue-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95"
              >
                Donar Q {montoFinal || '...'}
              </button>
            </form>

            {mensajeExito && (
              <div className="alert alert-success mt-6 shadow-lg">
                <div>
                  <span>{mensajeExito}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="font-bold text-2xl mb-5 flex items-center gap-2">
          <FaHeart className="text-error" /> Muro de agradecimiento
        </h3>
        <div className="flex flex-col gap-4">
          {donations.length === 0 ? (
            <p className="text-center text-base-content/50 py-8">Aún no hay donaciones. ¡Sé el primero!</p>
          ) : (
            donations.map((donacion) => (
              <div
                key={donacion.id}
                className="bg-base-200/70 rounded-2xl p-5 border-l-4 border-volleyball-blue"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="font-bold text-lg">{donacion.nombre}</p>
                    <p className="text-xs text-base-content/60">
                      {donacion.fecha} • {donacion.metodo}
                    </p>
                  </div>
                  <span className="bg-primary/20 text-primary px-4 py-1.5 rounded-full font-bold">
                    Q {donacion.monto}
                  </span>
                </div>
                {donacion.comprobante && (
                  <p className="text-xs mt-1 text-base-content/50">Comprobante: {donacion.comprobante}</p>
                )}
                <p className="mt-3 italic">“Gracias por apostar y apoyar a los joves del barrio el Gallito.”</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}