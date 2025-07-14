// Datos de los ramos con sus requisitos y desbloqueos
const ramos = [
  { id: "precalculo", nombre: "Precálculo", requisitos: [], abre: ["calculo1"] },
  { id: "fisica1", nombre: "Física General", requisitos: [], abre: ["fisica2", "quimica_fisica"] },
  { id: "biologia", nombre: "Biología de la Célula", requisitos: [], abre: ["fisiologia"] },
  { id: "quimica1", nombre: "Química General", requisitos: [], abre: ["quimica2"] },
  { id: "calculo1", nombre: "Cálculo I", requisitos: ["precalculo"], abre: ["calculo2", "quimica_fisica"] },
  { id: "quimica2", nombre: "Química General II", requisitos: ["quimica1"], abre: ["organica1"] },
  { id: "fisica2", nombre: "Física General II", requisitos: ["fisica1"], abre: [] },
  { id: "labfisica2", nombre: "Lab Física General II", requisitos: ["fisica2"], abre: [] },
  { id: "calculo2", nombre: "Cálculo II", requisitos: ["calculo1"], abre: [] },
  { id: "organica1", nombre: "Química Orgánica I", requisitos: ["quimica2"], abre: ["organica2"] },
  { id: "organica2", nombre: "Química Orgánica II", requisitos: ["organica1"], abre: ["quimica_fisica", "bioquimica"] },
  { id: "fisiologia", nombre: "Fisiología", requisitos: ["biologia"], abre: ["fisiopatologia"] },
  { id: "estadistica", nombre: "EPC: Estadística", requisitos: ["calculo2"], abre: [] },
  { id: "optativo1", nombre: "Optativo Disciplinario", requisitos: [], abre: [] },
  { id: "bioquimica", nombre: "Bioquímica", requisitos: ["organica2"], abre: ["farmacologia1", "bioquimica_clinica"] },
  { id: "fisiopatologia", nombre: "Fisiopatología", requisitos: ["fisiologia"], abre: ["farmacologia1", "bioquimica_clinica"] },
  { id: "quimica_fisica", nombre: "Química-Física", requisitos: ["calculo1", "fisica1", "organica2"], abre: ["farmaco1", "farmacocinetica"] },
  { id: "farmaco1", nombre: "Fármaco Química I", requisitos: ["quimica_fisica"], abre: ["bioquimica_clinica"] },
  { id: "farmacocinetica", nombre: "Farmacocinética y Biofarmacia", requisitos: ["quimica_fisica"], abre: [] },
  { id: "farmacologia1", nombre: "Farmacología I", requisitos: ["fisiopatologia", "bioquimica"], abre: ["bioquimica_clinica"] },
  { id: "bioquimica_clinica", nombre: "Bioquímica Clínica", requisitos: ["farmaco1", "farmacologia1", "fisiopatologia", "bioquimica"], abre: [] },
  { id: "oe1", nombre: "OE: Intro Ciencias Farmacéuticas", requisitos: [], abre: [] },
  { id: "oe2", nombre: "OE: Botánica y Farmacognosia", requisitos: [], abre: [] },
  { id: "labquimicagen", nombre: "Lab Química General", requisitos: [], abre: [] },
  { id: "filosofia", nombre: "Filosofía", requisitos: [], abre: [] },
  { id: "analitica", nombre: "Química Analítica", requisitos: ["organica2"], abre: ["instrumental"] },
  { id: "oe3", nombre: "OE: Microbiología e Inmunología", requisitos: [], abre: [] },
  { id: "instrumental", nombre: "Análisis Instrumental", requisitos: ["analitica"], abre: [] },
  { id: "laborganica", nombre: "Lab Química Orgánica", requisitos: ["organica2"], abre: ["farmaco1"] },
  { id: "minor1", nombre: "Curso Minor", requisitos: [], abre: [] },
  { id: "minor2", nombre: "Curso Minor", requisitos: [], abre: [] },
  { id: "minor3", nombre: "Curso Minor", requisitos: [], abre: [] }
];

// Organización por semestres
const semestres = [
  { nombre: "Semestre 1", cursos: ["precalculo", "fisica1", "biologia", "quimica1"] },
  { nombre: "Semestre 2", cursos: ["calculo1", "quimica2", "fisica2", "labfisica2"] },
  { nombre: "Semestre 3", cursos: ["calculo2", "organica1", "oe1", "oe2", "labquimicagen"] },
  { nombre: "Semestre 4", cursos: ["estadistica", "optativo1", "organica2", "fisiologia", "filosofia"] },
  { nombre: "Semestre 5", cursos: ["quimica_fisica", "fisiopatologia", "bioquimica", "minor1"] },
  { nombre: "Semestre 6", cursos: ["analitica", "oe3", "minor2"] },
  { nombre: "Semestre 7", cursos: ["instrumental", "laborganica", "minor3"] },
  { nombre: "Semestre 8", cursos: ["farmaco1", "farmacocinetica", "farmacologia1", "bioquimica_clinica"] }
];

// Estado de cada ramo
const estado = {};
const malla = document.getElementById("malla");

// Crear y mostrar ramos
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

// Actualizar estado de los ramos según requisitos
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

// Construir la malla por semestres
semestres.forEach((sem) => {
  const contenedor = document.createElement("div");
  contenedor.classList.add("semestre");

  const titulo = document.createElement("div");
  titulo.classList.add("semestre-title");
  titulo.textContent = sem.nombre;
  contenedor.appendChild(titulo);

  const grid = document.createElement("div");
  grid.classList.add("ramos-grid");

  sem.cursos.forEach((id) => {
    const ramo = ramos.find((r) => r.id === id);
    if (ramo) {
      const el = crearRamo(ramo);
      grid.appendChild(el);
    }
  });

  contenedor.appendChild(grid);
  malla.appendChild(contenedor);
});
