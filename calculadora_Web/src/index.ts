// Alumna: Josefa Macias Manceras
// Lógica de la calculadora: añadir dígitos/operadores al display,
// limpiar, borrar último carácter y calcular con control de errores.

document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display") as HTMLInputElement;
    const buttons = document.querySelectorAll("button");
  
    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");
        const action = button.getAttribute("data-action");
  
        if (value) {
          // Añade números u operadores al display
          display.value += value;
        } else if (action) {
          switch (action) {
            case "clear":
              // Limpia toda la pantalla
              display.value = "";
              break;
            case "delete":
              // Borra el último carácter
              display.value = display.value.slice(0, -1);
              break;
            case "calculate":
              try {
                // Control básico de división entre cero
                if (display.value.includes("/0")) {
                  display.value = "Error";
                  break;
                }
                // Evalúa la expresión (solo para práctica)
                display.value = eval(display.value).toString();
              } catch {
                display.value = "Error";
              }
              break;
          }
        }
      });
    });
  });
  