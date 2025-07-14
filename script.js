// 📚 Lista de ramos con sus dependencias
const ramos = [
  { id: "precalculo", nombre: "Precálculo", requisitos: [], abre: ["calculo1"] },
  { id: "fisica1", nombre: "Física General", requisitos: [], abre: ["fisica2", "quimica_fisica"] },
  { id: "biologia", nombre: "Biología de la Célula", requisitos: [], abre: ["fisiologia"] },
  { id: "quimica1", nombre: "Química General", requisitos: [], abre: ["quimica2"] },
  // ... (continúa con el resto de los ramos como antes)
];

// 🎯 Estado de los ramos aprobados
const estado = {};

// 📦 Contenedor principal
const malla = document.getElementById("malla");

// 🏗️ Función para crear cada cuadro de ramo
function crearRamo(ramo) {
  const div = document.createElement("div");
  div.classList.add("ramo");
  div.id = ramo.id;
  div.innerText = ramo.nombre;

  // ⛔ Marcar como bloqueado si tiene requisitos no cumplidos
  if (ramo.requisitos.length > 0) {
    div.classList.add("bloqueado");
  }

  // ✅ Evento al hacer clic para aprobar ramo
  div.addEventListener("click", () => {
    if (div.classList.contains("bloqueado") || div.classList.contains("aprobado")) return;

    div.classList.add("aprobado");
    estado[ramo.id] = true;

    // 🔓 Desbloquear ramos que dependan de este
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

// 🧱 Construcción de la malla
ramos.forEach((r) => {
  const ramoEl = crearRamo(r);
  malla.appendChild(ramoEl);
});
