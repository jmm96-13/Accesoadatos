const nombreUsuario = prompt("Introduce tu nombre:");
const edadUsuario = prompt("Introduce tu edad:");

  // cuando una variable se transforma a una constante? cuando ya no se puede cambiar
  //constantesç. variables que obtienen un valor fijo **/

alert("Hola, " + nombreUsuario + ". Tienes " + edadUsuario + " años.");

document.getElementById("saludo").innerHTML =
  "<h2>¡Hola, " + nombreUsuario + "!</h2>" +
  "<p>Tienes " + edadUsuario + " años.</p>";
  