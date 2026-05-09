export default function HomePage() {
  return (
    <div className="px-4 pt-6">
      <h1 className="text-3xl font-bold text-primary mb-2">Academia Comtrin</h1>
      <p className="text-base-content/70 mb-6">Barrio el Gallito, Zona 3</p>
      
      <div className="card bg-base-100 shadow-md">
        <figure><img src="https://placehold.co/600x300/1e293b/ffffff?text=Cancha+Comtrin" alt="Cancha" className="w-full"/></figure>
        <div className="card-body">
          <h2 className="card-title">Un espacio seguro para el deporte</h2>
          <p>Formamos jóvenes a través del fútbol, básquetbol y voleibol. Alejándolos de las calles y dándoles una oportunidad de superación.</p>
        </div>
      </div>
    </div>
  )
}