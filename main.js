
const registros = [];

let nombre = prompt("Indique su nombre");
alert(`Hola ${nombre}, un gusto saludarte`);

alert("A continuación, ingrese los siguientes datos");

const preguntarDatos = () => {
  let ingreso_egreso = prompt("Indique si es un ingreso o egreso");

  let monto = parseFloat(prompt("Indique el monto"));

  while (monto === 0 || isNaN(monto)) {
    alert("Por favor, ingrese un monto válido");
    monto = parseFloat(prompt("Indique el monto"));
  }

  let concepto = prompt("Indique el concepto");
  let fecha = prompt("Indique la fecha");

  registros.push({ ingreso_egreso, monto, concepto, fecha });
};

preguntarDatos();

while (confirm("¿Desea ingresar otro registro?")) {
  preguntarDatos();
}

console.table(registros);

const filtrarRegistro = (busqueda) => {
  return registros.filter(registro => {
    return Object.values(registro).some(propiedad => {
      return String(propiedad).toLowerCase().includes(busqueda.toLowerCase());
    });
  });
};

while (confirm("¿Desea buscar algún registro?")) {
  const busqueda = prompt("Ingrese el término que desea buscar");
  const resultado = filtrarRegistro(busqueda);
  console.table(resultado);
} 

alert(`besitos <3 ${nombre}`);