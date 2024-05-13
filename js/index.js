/* 
 Codigo JS 

 consigna:

 Requerimientos Técnicos y Funcionales 

 CAMPOS DE ENTRADA DEL FORMULARIO 
 La calculadora deberá permitir al usuario cargar 3 campos diferentes para poder 
 realizar el cálculo del costo en pesos, los cuales son:

  ● Tipo de usuario (input radio de selección única): 
  ○ Residencial: aplica IVA 21% 
  ○ Industrial: aplica IVA 27% 

  ● Zona del domicilio (input select): 
  ○ Distrito Centro: $5,80 por kWh 
  ○ Distrito Sur: $5.40 por kWh 
  ○ Distrito Oeste: $5.35 por kWh 
  ○ Distrito Norte: $5.60 por kWh 
  
  ● Cantidad de kWh del mes (number) 

    VALIDACIONES
  Una vez que el usuario ingresa los 3 campos requeridos y presiona el botón 
  correspondiente para realizar el cálculo del costo, antes de realizar dicho 
  cálculo se deben realizar validaciones desde JavaScript para que se cumplan 
  las siguientes condiciones: 
  ● Tipo de usuario: es requerido que se seleccione alguna de las dos opciones 
  ● Zona del domicilio:  es requerido que se seleccione alguna de las 4 opciones 
  ● Cantidad de kWh del mes: el número que ingresa el usuario es requerido, 
  no debe ser 0 ni negativo. 
  Si no se cumple alguno de esos criterios, no se deberá continuar con el cálculo 
  y se deberá informar al usuario dicha situación. 

    CALCULO DEL COSTO / RESULTADO
  El resultado se debe calcular con la siguiente fórmula: 
  Total en $ = Costo de servicio + 
  (Cantidad de kWh * Costo según zona de domicilio) * (1 + IVA según Tipo de Usuario) 
  El costo de servicio debe definirse como un valor constante. 
  El valor actual es de 102 $/mes. 
  Ejemplo: un Residencial, con domicilio en el Distrito Centro y consumo de 60 kWh, 
  tomando el costo de servicio sugerido, debería pagar:
   102 $ + 60 kWh * 5.80 $/kWh * (1 + 0.21) = $ 523.08. 
 
 */
const costoServicio = 102;

ivaObject = {
  residencial: 0.21,
  industrial: 0.27,
};

zonaObject = {
  centro: 5.8,
  oeste: 5.35,
  norte: 5.6,
  sur: 5.4,
};

let btnCalcular = document.getElementById("btn-submit");
var consumoValidacion = 0;
var zonaValidacion = 0;

btnCalcular.onclick = function calculadora() {
  ivaValue = obtenerIva();
  zonaValue = obtenerZona();
  consumoValue = obtenerConsumo();

  if (zonaValue > 0) {
    zonaValidacion = 1;
  } else {
    alert("Por favor, seleccione la zona del domicilio.");
  }

  if (consumoValue > 0) {
    consumoValidacion = 1;
  } else {
    alert("El valor de consumo debe ser mayor a 0.");
  }

  if (consumoValidacion == 1 && zonaValidacion == 1) {
    costoTotal = costoServicio + consumoValue * zonaValue * (1 + ivaValue);
    costoTotal = costoTotal.toFixed(2);
    document.getElementById("costo-total").innerHTML = "$" + costoTotal;
    outputText = "IMPORTE TOTAL:";
    document.getElementById("output-text").innerHTML = outputText;
    return outputText, costoTotal;
  }
};

function obtenerIva() {
  var iva = document.querySelector("input[name=tipo-de-usuario]:checked").value;
  switch (iva) {
    case "residencial":
      return ivaObject.residencial;
    case "industrial":
      return ivaObject.industrial;
  }
}

function obtenerZona() {
  var zonaDomicilio = document.getElementById("zona-domicilio");
  var zona = zonaDomicilio.options[zonaDomicilio.selectedIndex].value;

  switch (zona) {
    case "centro":
      return zonaObject.centro;
    case "oeste":
      return zonaObject.oeste;
    case "norte":
      return zonaObject.norte;
    case "sur":
      return zonaObject.sur;
  }
}

function obtenerConsumo() {
  return document.getElementById("input-consumo").value;
}
