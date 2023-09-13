document.addEventListener("DOMContentLoaded", function () {
  const seccionContainer = document.getElementById("section-container");
  const btnSiguiente = document.getElementById("btn-next");
  const btnPersona = document.getElementById("btn-persona");
  const btnEmpresa = document.getElementById("btn-empresa");

  let seccionActual = 1;
  const maxSecciones = 1;
  let tipoUsuario;

  let nombreCompleto;
  let dni;

  btnPersona.addEventListener("click", () => {
    tipoUsuario = "persona";
    cargarSeccion();
  });

  btnEmpresa.addEventListener("click", () => {
    tipoUsuario = "empresa";
    cargarSeccion();
  });

  btnSiguiente.addEventListener("click", () => {
    const datos = {
      nombreCompleto: nombreCompleto.value,
      dni: Number(dni.value),
    };
    const usuarioEncontrado = usuarios.filter((user) => {
      return (
        user.nombreCompleto === datos.nombreCompleto && user.dni === datos.dni
      );
    });

    if (usuarioEncontrado.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El nombre ingresado ya solicitó un préstamo. En caso de que no sea así, comuníquese al número 0800 555 333.",
      });
    } else {
      cargarSiguienteSeccion();
    }
  });

  function asignarEventListeners() {
    nombreCompleto = document.getElementById("nombreCompleto");
    dni = document.getElementById("dni");
    nombreEmpresa = document.getElementById("nombreEmpresa");
    cuit = document.getElementById("cuit");

    nombreCompleto.addEventListener("input", habilitarButtonSiguiente);
    dni.addEventListener("input", habilitarButtonSiguiente);
    nombreEmpresa.addEventListener("input", habilitarButtonSiguiente);
    cuit.addEventListener("input", habilitarButtonSiguiente);
  }

  function habilitarButtonSiguiente() {
    if (
      (nombreCompleto.value.trim() !== "" && dni.value.trim() !== "") ||
      (nombreEmpresa.value.trim() !== "" && cuit.value.trim() !== "")
    ) {
      btnSiguiente.disabled = false;
    } else {
      btnSiguiente.disabled = true;
    }
  }

  function cargarSeccion() {
    if (tipoUsuario === "persona") {
      fetch(`section/seccionPersona.html`)
        .then((response) => response.text())
        .then((data) => {
          seccionContainer.innerHTML = data;
          asignarEventListeners();
          habilitarButtonSiguiente();
        })
        .catch((error) =>
          console.error("Error al cargar la sección persona:", error)
        );
    } else if (tipoUsuario === "empresa") {
      fetch(`section/seccionEmpresa.html`)
        .then((response) => response.text())
        .then((data) => {
          seccionContainer.innerHTML = data;
          asignarEventListeners();
          habilitarButtonSiguiente();
        })
        .catch((error) =>
          console.error("Error al cargar la sección empresa:", error)
        );
    }
  }

  function cargarSiguienteSeccion() {
    if (seccionActual <= maxSecciones) {
      fetch(`section/section${seccionActual}.html`)
        .then((response) => response.text())
        .then((data) => {
          seccionContainer.innerHTML = data;
          asignarEventListeners();
          habilitarButtonSiguiente();
        })
        .catch((error) => console.error("Error al cargar la sección:", error));
      seccionActual++;
    }
  }
});

// function simularPrestamo() {
//   let repetir = true;
//   while (repetir) {
//     const deseaCalcular = prompt(
//       "¿Deseas calcular la cuota de un préstamo? (si/no)"
//     );

//     if (deseaCalcular === "si") {
//       // Obtener datos ingresados por el usuario
//       let monto = parseInt(prompt("ingrese monto inicial del préstamo"));
//       let interes = parseFloat(prompt("ingrese monto de interés anual (%)"));
//       let plazo = parseInt(prompt("ingrese plazo de meses a financiar"));
//       // Validar los datos ingresados por el usuario
//       if (isNaN(monto) || isNaN(interes) || isNaN(plazo)) {
//         alert("Por favor, ingrese valores validos.");
//       } else {
//         let cuota = calcularCuota(monto, interes, plazo).toFixed(2); // Redondear a dos decimales
//         alert(`La cuota de tu préstamo es: $ ${cuota} pesos`);
//         este alert de aca seria esta logica de codigo

// Swal.fire({
//   title: "Resultado de solicitud de préstamo",
//   html: `
//     <p>Monto ingresado: $monto_pesos</p>
//     <p>Tasa de interés: $tasa_interes%</p>
//     <p>Cuotas: $plazo meses</p>
//     <p>La cuota de tu préstamo es: $numero_pesos pesos</p>
//   `,
//   showCancelButton: true,
//   confirmButtonText: "Aceptar",
// }).then(async (result) => {
//   if (result.isConfirmed) {
//     const { value: email } = await Swal.fire({
//       title: "Ingresa tu email",
//       input: "email",
//       inputLabel: "Ingresa tu email",
//       inputPlaceholder: "Ingresa tu email",
//     });

//     if (email) {
//       Swal.fire("Solicitud enviada!", "", "success");
//     }
//   }
// });

// else{
//       Swal.fire("Gracias por usar el simulador de préstamos.", "", "success");
// }
// function calcularCuota(monto, interes, plazo) {
//   // Calculo de tasa mensual
//   const tasaMensual = interes / 12;

//   // Calculo de cuota pura
//   const cuotaPura = monto / plazo;

//   // Calculo de cuota con interes mensual
//   const cuotaConInteres = cuotaPura + (cuotaPura * tasaMensual) / 100;

//   return cuotaConInteres;
// }
