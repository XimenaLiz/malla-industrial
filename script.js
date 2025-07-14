const csvURL = 'https://raw.githubusercontent.com/XimenaLiz/malla-industrial/main/malla.csv';

const estadoIcono = {
  '✅ Completado': 'completado',
  '💛 Disponible': 'disponible',
  '🔒 Bloqueado': 'bloqueado'
};

const estadoTexto = {
  '✅ Completado': 'Completado',
  '💛 Disponible': 'Disponible',
  '🔒 Bloqueado': 'Bloqueado'
};

async function cargarMalla() {
  const res = await fetch(csvURL);
  const text = await res.text();
  const filas = text.trim().split('\n');
  const encabezado = filas.shift().split('\t');

  const cursos = filas.map(fila => {
    const datos = fila.split('\t');
    const curso = {};
    encabezado.forEach((col, i) => {
      curso[col.trim()] = datos[i] ? datos[i].trim() : '';
    });
    return curso;
  });

  const ciclos = {};
  cursos.forEach(curso => {
    const ciclo = curso['Ciclo'];
    if (!ciclos[ciclo]) ciclos[ciclo] = [];
    ciclos[ciclo].push(curso);
  });

  const contenedor = document.getElementById('malla-container');
  contenedor.innerHTML = '';

  Object.keys(ciclos).sort((a, b) => a - b).forEach(ciclo => {
    const columna = document.createElement('div');
    const titulo = document.createElement('h2');
    titulo.textContent = `Ciclo ${ciclo}`;
    columna.appendChild(titulo);

    ciclos[ciclo].forEach(curso => {
      const card = document.createElement('div');
      const estadoClase = estadoIcono[curso['Estado Calculado']] || 'bloqueado';
      card.className = `card ${estadoClase}`;
      card.innerHTML = `
        <h3>${curso['Curso']}</h3>
        <p><strong>Código:</strong> ${curso['Codigo']}</p>
        <p><strong>Créditos:</strong> ${curso['Créditos']}</p>
      `;
      if (estadoClase !== 'bloqueado') {
        card.addEventListener('click', () => mostrarModal(curso));
      }
      columna.appendChild(card);
    });

    contenedor.appendChild(columna);
  });
}

function mostrarModal(curso) {
  document.getElementById('modal-title').textContent = curso['Curso'];
  document.getElementById('modal-codigo').textContent = curso['Codigo'];
  document.getElementById('modal-creditos').textContent = curso['Créditos'];
  document.getElementById('modal-area').textContent = curso['Área'];
  document.getElementById('modal-prerequisitos').textContent = curso['Prerrequisitos'];
  document.getElementById('modal-descripcion').textContent = curso['Descripción'];
  document.getElementById('modal').classList.remove('hidden');
}

document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById('modal').classList.add('hidden');
});

cargarMalla();
