const ramos = [
  { id: "precalculo", nombre: "Precálculo", requisitos: [], abre: ["calculo1"] },
  { id: "fisica1", nombre: "Física General", requisitos: [], abre: ["fisica2", "quimica_fisica"] },
  { id: "biologia", nombre: "Biología de la Célula", requisitos: [], abre: ["fisiologia"] },
  { id: "quimica1", nombre: "Química General", requisitos: [], abre: ["quimica2"] },
  { id: "calculo1", nombre: "Cálculo I", requisitos: ["precalculo"], abre: ["calculo2", "quimica_fisica"] },
  { id: "quimica2", nombre: "Química General II", requisitos: ["quimica1"], abre: ["organica1"] },
  { id: "fisica2", nombre: "Física General II", requisitos: ["fisica1"], abre: [] },
  { id: "fisiologia", nombre: "Fisiología", requisitos: ["biologia"], abre: ["fisiopatologia"] },
  { id: "organica1", nombre: "Química Orgánica I", requisitos: ["quimica2"], abre: ["organica2"] },
  { id: "organica2", nombre: "Química Orgánica II", requisitos: ["organica1"], abre: ["quimica_fisica", "bioquimica"] },
  { id: "calculo2", nombre: "Cálculo II", requisitos: ["calculo1"], abre: [] },
  { id: "quimica_fisica", nombre: "Química-Física", requisitos: ["calculo1", "fisica1", "organica2"], abre: ["farmaco1", "farmacocinetica"] },
  { id: "bioquimica", nombre: "Bioquímica", requisitos: ["organica2"], abre: ["farmacologia1", "bioquimica_clinica"] },
  { id: "fisiopatologia", nombre: "Fisiopatología", requisitos: ["fisiologia"], abre: ["farmacologia1", "bioquimica_clinica"] },
  { id: "farmaco1", nombre: "Fármaco Química I", requisitos: ["quimica_fisica"], abre: ["bioquimica_clinica"] },
  { id: "farmacocinetica", nombre: "Farmacocinética y Biofarmacia", requisitos: ["quimica_fisica"], abre: [] },
  { id: "farmacologia1", nombre: "Farmacología I", requisitos: ["fisiopatologia", "bioquimica"], abre: ["bioquimica_clinica"] },
  { id: "bioquimica_clinica", nombre: "Bioquímica Clínica", requisitos: ["farmaco1", "farmacologia1", "fisiopatologia", "bioquimica"], abre: [] },
];

const estado = {};
const malla = document.getElementById("malla");

// Crear un div por ramo
function crearRamo(ramo) {
  const div = document.createElement("div");
  div.classList.add("ramo");
  div.id = ramo.id;
  div.innerText = ramo.nombre;

  if (ramo.requisitos.length > 0) {
    div.classList.add("bloqueado");
  }

  div.addEventListener("click", () => {
    if (div.classList.contains("bloqueado") || div.classList.contains("aprobado")) return;

    div.classList.add("aprobado");
    estado[ramo.id] = true;

    // Desbloquear los ramos dependientes
    ramo.abre.forEach((idDesbloqueado) => {
      const siguiente = document.getElementById(idDesbloqueado);
      const requisitos = ramos.find((r) => r.id === idDesbloqueado).requisitos;

      if (requisitos.every((r) => estado[r])) {
        siguiente.classList.remove("bloqueado");
      }
    });
  });

  return div;
}

// Mostrar todos los ramos en la malla
ramos.forEach((r) => {
  const elemento = crearRamo(r);
  malla.appendChild(elemento);
});
