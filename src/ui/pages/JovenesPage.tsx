import { FaStar } from 'react-icons/fa'

const mensajesFalsos = [
  { id: 1, titulo: "El trabajo en equipo", texto: "Juntos somos más fuertes. En la cancha aprendemos a confiar los unos en los otros y a luchar por un mismo objetivo.", img: "https://placehold.co/800x600/10b981/ffffff?text=Trabajo+en+Equipo", deporte: "futbol", color: "text-football-green", bg: "bg-football-green" },
  { id: 2, titulo: "Disciplina diaria", texto: "Llegar a entrenar incluso cuando estás cansado es el primer paso para ser campeón no solo en la cancha, sino en la vida.", img: "https://placehold.co/800x600/f97316/ffffff?text=Disciplina", deporte: "basquet", color: "text-basketball-orange", bg: "bg-basketball-orange" },
  { id: 3, titulo: "Respeto ante todo", texto: "Respetar a tus compañeros, rivales y entrenadores te hace grande. El verdadero trofeo es el carácter que forjas.", img: "https://placehold.co/800x600/0ea5e9/ffffff?text=Respeto", deporte: "voley", color: "text-volleyball-blue", bg: "bg-volleyball-blue" },
]

export default function JovenesPage() {
  return (
    <div className="px-4 pt-6 pb-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-base-content mb-2 flex items-center gap-3">
          <FaStar className="text-secondary" /> Club de Jovenes
        </h1>
        <p className="text-base-content/70 font-medium">Inspiración y valores para tu día a día en la academia.</p>
      </div>

      <div className="flex flex-col gap-8">
        {mensajesFalsos.map((m) => (
          <div key={m.id} className="group relative rounded-3xl overflow-hidden shadow-2xl h-[400px]">
            <img 
              src={m.img} 
              alt={m.titulo} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-primary text-primary-content"></div>
            
            <div className="absolute top-4 right-4">
              <span className={`px-4 py-1.5 rounded-full ${m.bg}/20 backdrop-blur-md ${m.color} text-xs font-bold border border-base-content/ uppercase tracking-widest`}>
                {m.deporte}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transform transition-transform duration-500">
              <h2 className="font-extrabold text-2xl md:text-3xl text-base-content mb-3 tracking-tight drop-shadow-md">
                {m.titulo}
              </h2>
              <p className="text-base-content/ font-medium text-sm md:text-base leading-relaxed max-w-2xl drop-shadow-sm">
                "{m.texto}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}