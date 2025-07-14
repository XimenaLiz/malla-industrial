const cursos = [
  {
    nombre: "Matemática básica",
    codigo: "6382",
    ciclo: 1,
    creditos: 5,
    estado: "✅ Completado",
    descripcion: "Conjuntos, ecuaciones, funciones y geometría analítica.",
  },
  {
    nombre: "Cálculo I",
    codigo: "6503",
    ciclo: 2,
    creditos: 5,
    estado: "✅ Completado",
    descripcion: "Funciones, derivadas e integrales en una variable.",
  },
  {
    nombre: "Investigación de Operaciones I",
    codigo: "560048",
    ciclo: 5,
    creditos: 4,
    estado: "❌ Pendiente",
    descripcion: "Modelos de programación lineal para gestión de operaciones.",
  },
];

const contenedor = document.getElementById("contenedor-cursos");

cursos.forEach(curso => {
  const div = document.createElement("div");
  div.className = `curso ${curso.estado.includes("✅") ? "completado" : "pendiente"}`;
  div.innerHTML = `
    <h3>${curso.nombre}</h3>
    <p><strong>Código:</strong> ${curso.codigo}</p>
    <p><strong>Ciclo:</strong> ${curso.ciclo}</p>
    <p><strong>Créditos:</strong> ${curso.creditos}</p>
    <p><strong>Estado:</strong> ${curso.estado}</p>
    <p>${curso.descripcion}</p>
  `;
  contenedor.appendChild(div);
});