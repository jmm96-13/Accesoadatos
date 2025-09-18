const nombreUsuario = prompt("Introduce tu nombre:");
const edadUsuario = prompt("Introduce tu edad:");

alert("Hola, " + nombreUsuario + ". Tienes " + edadUsuario + " años.");

document.getElementById("saludo").innerHTML =
  "<h2>¡Hola, " + nombreUsuario + "!</h2>" +
  "<p>Tienes " + edadUsuario + " años.</p>";
  