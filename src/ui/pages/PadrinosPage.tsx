import { useState } from 'react'

const muroInicial = [
  { id: 1, nombre: 'Juan Pérez', monto: 100, fecha: 'Hace 2 días' },
  { id: 2, nombre: 'Anónimo', monto: 50, fecha: 'Hace 5 horas' },
]

type Donacion = {
  id: number
  nombre: string
  monto: number
  fecha: string
}

export default function PadrinosPage() {
  const metaBeca = 200
  const [recaudadoBeca, setRecaudadoBeca] = useState(150)
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [montoSeleccionado, setMontoSeleccionado] = useState<number | null>(null)
  const [montoOtro, setMontoOtro] = useState('')
  const [metodoPago, setMetodoPago] = useState('Tarjeta')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [muroAgradecimiento, setMuroAgradecimiento] = useState<Donacion[]>(muroInicial)
  const [mensajeExito, setMensajeExito] = useState('')

  const faltante = Math.max(0, metaBeca - recaudadoBeca)
  const porcentaje = Math.min(100, (recaudadoBeca / metaBeca) * 100)

  const handlePago = () => {
    const montoFinal = montoSeleccionado || parseFloat(montoOtro)

    if (!nombre.trim()) {
      alert('Por favor, ingresa tu nombre.')
      return
    }
    if (!email.trim()) {
      alert('Por favor, ingresa tu correo electrónico.')
      return
    }
    if (!montoFinal || montoFinal <= 0) {
      alert('Por favor, selecciona o ingresa un monto válido.')
      return
    }

    if (metodoPago === 'Tarjeta') {
      if (!cardNumber.trim() || cardNumber.replace(/\s+/g, '').length < 12) {
        alert('Ingresa un número de tarjeta válido.')
        return
      }
      if (!expiry.trim()) {
        alert('Ingresa la fecha de expiración.')
        return
      }
      if (!cvc.trim() || cvc.length < 3) {
        alert('Ingresa el CVC.')
        return
      }
    }

    const nuevaDonacion: Donacion = {
      id: Date.now(),
      nombre: nombre.trim(),
      monto: montoFinal,
      fecha: 'Justo ahora',
    }

    setMuroAgradecimiento([nuevaDonacion, ...muroAgradecimiento])
    setRecaudadoBeca((current) => Math.min(metaBeca, current + montoFinal))
    setMensajeExito(`Pago simulado de Q ${montoFinal} realizado. ¡Gracias por tu apoyo!`)
    setNombre('')
    setEmail('')
    setMontoSeleccionado(null)
    setMontoOtro('')
    setCardNumber('')
    setExpiry('')
    setCvc('')
  }

  return (
    <div className="px-4 pt-6 pb-10">
      <h1 className="text-2xl font-bold mb-4">Club de Padrinos</h1>

      <div className="card bg-base-100 shadow-md mb-6">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-lg">Meta: Becar al próximo joven</h2>
          <p className="text-base-content/70 text-sm mb-2">
            Estamos a <span className="font-bold text-error">Q {faltante}</span> de lograrlo.
          </p>
          <div className="w-full">
            <progress className="progress progress-primary w-full" value={porcentaje} max="100"></progress>
            <div className="flex justify-between mt-2 text-xs font-bold text-base-content/60">
              <span>Q {recaudadoBeca} recaudados</span>
              <span>Meta: Q {metaBeca}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-md mb-6">
        <div className="card-body">
          <h3 className="font-semibold text-lg mb-4">Formulario de pago</h3>

          <div className="grid gap-4">
            <input
              type="text"
              placeholder="Nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="input input-bordered w-full"
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
            />

            <label className="text-sm font-medium">Selecciona un monto</label>
            <div className="grid grid-cols-4 gap-2">
              {[50, 100, 150, 200].map((monto) => (
                <button
                  key={monto}
                  type="button"
                  onClick={() => {
                    setMontoSeleccionado(monto)
                    setMontoOtro('')
                  }}
                  className={`btn btn-sm ${montoSeleccionado === monto ? 'btn-primary' : 'btn-outline btn-primary'}`}
                >
                  Q {monto}
                </button>
              ))}
            </div>

            <input
              type="number"
              placeholder="Otro monto (Q)"
              value={montoOtro}
              onChange={(e) => {
                setMontoOtro(e.target.value)
                setMontoSeleccionado(null)
              }}
              className="input input-bordered w-full"
              min="1"
            />

            <div>
              <label className="label text-sm">Método de pago</label>
              <select
                value={metodoPago}
                onChange={(e) => setMetodoPago(e.target.value)}
                className="select select-bordered w-full"
              >
                <option>Tarjeta</option>
                <option>Transferencia</option>
              </select>
            </div>

            {metodoPago === 'Tarjeta' && (
              <div className="grid gap-3">
                <input
                  type="text"
                  placeholder="Número de tarjeta"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="input input-bordered w-full"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="MM/AA"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="input input-bordered w-full"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
            )}

            <button type="button" onClick={handlePago} className="btn btn-primary w-full">
              Pagar {montoSeleccionado ? `Q ${montoSeleccionado}` : montoOtro ? `Q ${montoOtro}` : 'ahora'}
            </button>

            <p className="text-xs text-base-content/60">
            </p>
          </div>

          {mensajeExito && (
            <div className="alert alert-success mt-4 shadow-lg">
              <div>
                <span>{mensajeExito}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-3">Muro de Agradecimiento</h3>
        <div className="flex flex-col gap-3">
          {muroAgradecimiento.map((donacion) => (
            <div key={donacion.id} className="bg-base-200 p-4 rounded-box shadow-sm">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <p className="font-bold text-base-content">{donacion.nombre}</p>

                </div>
                <span className="badge badge-success badge-lg">Q {donacion.monto}</span>
              </div>
              <p className="text-sm text-base-content/80 mt-2 italic">
                "Gracias por apostar por el futuro de los jóvenes del Gallito."
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}