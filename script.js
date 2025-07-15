document.querySelectorAll('.ramo').forEach(ramo => {
  const requiere = ramo.dataset.requiere?.split(',') || [];
  const desbloquea = ramo.dataset.desbloquea?.split(',') || [];

  // Inhabilitar todos al inicio si tiene requisitos
  if (requiere.length > 0) {
    ramo.classList.remove('habilitado');
  } else {
    ramo.classList.add('habilitado');
  }

  ramo.addEventListener('click', () => {
    if (!ramo.classList.contains('habilitado')) return;

    ramo.classList.toggle('aprobado');

    const aprobados = new Set(
      [...document.querySelectorAll('.ramo.aprobado')].map(e => e.dataset.id)
    );

    document.querySelectorAll('.ramo').forEach(r => {
      const reqs = r.dataset.requiere?.split(',') || [];
      if (reqs.every(id => aprobados.has(id))) {
        r.classList.add('habilitado');
      } else if (reqs.length > 0) {
        r.classList.remove('habilitado');
        r.classList.remove('aprobado');
      }
    });
  });
});
