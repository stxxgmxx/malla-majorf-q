const ramos = [
  { id: "precalculo", nombre: "Precálculo", requisitos: [], abre: ["calculo1"] },
  { id: "fisica1", nombre: "Física General", requisitos: [], abre: ["fisica2"] },
  { id: "biologia", nombre: "Biología de la Célula", requisitos: [], abre: ["fisiologia"] },
  { id: "quimica1", nombre: "Química General", requisitos: [], abre: ["quimica2"] },

  { id: "calculo1", nombre: "Cálculo I", requisitos: ["precalculo"], abre: ["calculo2"] },
  { id: "quimica2", nombre: "Química General II", requisitos: ["quimica1"], abre: [] },
  { id: "fisica2", nombre: "Física General II", requisitos: ["fisica1"], abre: [] },
  { id: "fisiologia", nombre: "Fisiología", requisitos: ["biologia"], abre: [] },

  { id: "calculo2", nombre: "Cálculo II", requisitos: ["calculo1"], abre: [] }
];

const semestres = [
  { nombre: "Semestre 1", cursos: ["precalculo", "fisica1", "biologia", "quimica1"] },
  { nombre: "Semestre 2", cursos: ["calculo1", "quimica2", "fisica2", "fisiologia"] },
  { nombre: "Semestre 3", cursos: ["calculo2"] }
];

const estado = {};
const malla = document.getElementById("malla");

function crearRamo(ramo) {
  const div = document.createElement("div");
  div.classList.add("ramo");
  div.id = ramo.id;
  div.innerText = ramo.nombre;

  if (ramo.requisitos.length > 0) {
    div.classList.add("bloqueado");
  }

  div.addEventListener("click", () => {
    if (div.classList.contains("aprobado")) {
      div.classList.remove("aprobado");
      estado[ramo.id] = false;
      actualizarBloqueos();
      return;
    }

    if (div.classList.contains("bloqueado")) return;

    div.classList.add("aprobado");
    estado[ramo.id] = true;
    actualizarBloqueos();
  });

  return div;
}

function actualizarBloqueos() {
  ramos.forEach((ramo) => {
    const elemento = document.getElementById(ramo.id);
    const cumplidos = ramo.requisitos.every((req) => estado[req]);
    if (cumplidos) {
      elemento.classList.remove("bloqueado");
    } else if (!estado[ramo.id]) {
      elemento.classList.add("bloqueado");
    }
  });
}

semestres.forEach((sem) => {
  const contenedor = document.createElement("div");
  contenedor.classList.add("semestre");

  const titulo = document.createElement("div");
  titulo.classList.add("semestre-title");
  titulo.textContent = sem.nombre;
  contenedor.appendChild(titulo);

  sem.cursos.forEach((id) => {
    const ramo = ramos.find((r) => r.id === id);
    if (ramo) {
      const el = crearRamo(ramo);
      contenedor.appendChild(el);
    }
  });

  malla.appendChild(contenedor);
});
