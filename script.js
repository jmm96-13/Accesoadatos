
// document: representa página web (el DOM).
// getElementById: busca el elemento que tenga el atributo id="btn" y lo devuelve para poder usarlo.
document.getElementById('btn').onclick = () => {

  // const: crea una variable cuyo valor no se reasigna.
  // prompt() muestra una ventana emergente que pide un texto y muestra lo que el usuario escribe.
  const nombre = prompt("Escribe tu nombre:");
  const edad   = prompt("Escribe tu edad:");

  // alert: muestra una ventana emergente con el texto que le pasamos.
  // Se combinan variables en un solo string usando plantillas (` `).
  alert(`Tu nombre es ${nombre}\nTu edad es ${edad}`);

  // document.write: escribe directamente en la página web.
  document.write(
    `Tu nombre es ${nombre}<br>` +
    `Tu edad es ${edad}`
  );
};
