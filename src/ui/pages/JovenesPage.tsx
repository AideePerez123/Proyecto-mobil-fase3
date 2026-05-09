const mensajesFalsos = [
  { id: 1, titulo: "El trabajo en equipo", texto: "Juntos somos más fuertes. En la cancha aprendemos a confiar los unos en los otros.", img: "Teamwork" },
  { id: 2, titulo: "Disciplina diaria", texto: "Llegar a entrenar es el primer paso para ser campeón en la vida.", img: "Disciplina" },
  { id: 3, titulo: "Respeto", texto: "Respetar a tus compañeros, rivales y entrenadores te hace grande.", img: "Respeto" },
]

export default function JovenesPage() {
  return (
    <div className="px-4 pt-6">
      <h1 className="text-2xl font-bold mb-1">CLUB DE JOVENES</h1>
      <p className="text-base-content/70 mb-6">Motivación y valores para tu día.</p>

      <div className="flex flex-col gap-4">
        {mensajesFalsos.map((m) => (
          <div key={m.id} className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-lg">{m.titulo}</h2>
              <p className="text-sm">{m.texto}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}