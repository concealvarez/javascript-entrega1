const registros =  [];
const eliminados = [];


const usuario = document.getElementById("nombre");
const boton = document.getElementById("btn-nombre");
const saludo = document.getElementById("texto");

function saludar() {  
  let nombre = usuario.value;
  saludo.textContent = nombre 
    ? `Hola ${nombre}, un gusto saludarte <3`
    : "Por favor, ingresa tu nombre.";
}

boton.addEventListener("click", e => { 
  e.preventDefault();
  saludar();
});


const formulario = document.querySelector("#formulario");
const ingreso_egreso = document.getElementById("ingreso_egreso");
const monto = document.getElementById("monto");
const concepto = document.getElementById("concepto");
const cuerpoTabla = document.getElementById("cuerpo-tabla");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const ingresoEgresoValue = ingreso_egreso.value;
  const montoValue = parseFloat(monto.value); 
  const conceptoValue = concepto.value;

  if (!ingresoEgresoValue || isNaN(montoValue) || montoValue <= 0 || !conceptoValue) {
    alert("Por favor, llena todos los campos correctamente.");
    return;

  }

  registros.push({ 
    ingreso_egreso: ingresoEgresoValue, 
    monto: montoValue.toFixed(2), 
    concepto: conceptoValue 
  });

  formulario.reset();

  actualizarTabla();

  localStorage.setItem("registros", JSON.stringify(registros));
});

const actualizarTabla = () => {
  cuerpoTabla.innerHTML = ""; 

  registros.forEach((registro, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${registro.concepto}</td>
      <td>$${registro.monto}</td>
      <td>${registro.ingreso_egreso}</td>
      <td><button class="btn-eliminar" data-index="${index}">Eliminar</button></td>
    `;
    cuerpoTabla.appendChild(row);
  });


  document.querySelectorAll(".btn-eliminar").forEach(boton => {
    boton.addEventListener("click", eliminarRegistro);
  });
};


const eliminarRegistro = (e) => {
  const index = e.target.getAttribute("data-index");
  const registroEliminado = registros.splice(index, 1)[0]; 
  eliminados.push(registroEliminado); 
  localStorage.setItem("eliminados", JSON.stringify(eliminados)); 
  actualizarTabla();
};


const recuperarDatos = () => {
  if (eliminados.length > 0) {
    const registroRecuperado = eliminados.pop(); 
    registros.push(registroRecuperado); 
    localStorage.setItem("eliminados", JSON.stringify(eliminados)); 
    actualizarTabla();
  } else {
    alert("No hay registros eliminados para recuperar.");
  }
};

let recuperar = document.getElementById("btn-recuperar");
recuperar.addEventListener("click", recuperarDatos);

