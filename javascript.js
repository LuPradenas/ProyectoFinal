function simularPrestamo() {
  let repetir = true;
  while (repetir) {
    const deseaCalcular = prompt(
      "¿Deseas calcular la cuota de un préstamo? (si/no)"
    );

    if (deseaCalcular === "si") {
      // Obtener datos ingresados por el usuario
      let monto = parseInt(prompt("ingrese monto inicial del préstamo"));
      let interes = parseFloat(prompt("ingrese monto de interés anual (%)"));
      let plazo = parseInt(prompt("ingrese plazo de meses a financiar"));
      // Validar los datos ingresados por el usuario
      if (isNaN(monto) || isNaN(interes) || isNaN(plazo)) {
        alert("Por favor, ingrese valores validos.");
      } else {
        let cuota = calcularCuota(monto, interes, plazo).toFixed(2); // Redondear a dos decimales
        alert(`La cuota de tu préstamo es: $ ${cuota} pesos`);
      }
    } else {
      repetir = false;
      alert("Gracias por usar el simulador de préstamos.");
    }
  }
}
function calcularCuota(monto, interes, plazo) {
  // Calculo de tasa mensual
  const tasaMensual = interes / 12;

  // Calculo de cuota pura
  const cuotaPura = monto / plazo;

  // Calculo de cuota con interes mensual
  const cuotaConInteres = cuotaPura + (cuotaPura * tasaMensual) / 100;

  return cuotaConInteres;
}
simularPrestamo();
