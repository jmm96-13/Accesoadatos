import { fromEvent, debounceTime, map } from 'rxjs';

// Variables que guardan el estado de la calculadora
let currentInput: string = '0'; // número que se muestra ahora
let operator: string = '';      // operador que se usa (+, -, *, /)
let previousInput: string = ''; // número anterior guardado

// Esta función se usa cuando se pulsa un número o un operador
function appendToDisplay(value: string): void {
  let update = false;

  // Si es un operador (+ - * /)
  if (['+', '-', '*', '/'].includes(value)) {
    if (currentInput !== '0' && currentInput !== '') {
      if (previousInput !== '' && operator !== '') {
        calculate(); // si ya había una operación, la calculo
      }
      previousInput = currentInput;
      operator = value;
      currentInput = '0';
    }
  }
  // Si se pulsa el botón de porcentaje
  else if (value === '%') {
    currentInput = (parseFloat(currentInput) / 100).toString();
    update = true;
  }
  // Si se pulsa el botón de raíz cuadrada
  else if (value === '√(') {
    const num = parseFloat(currentInput);
    currentInput = Math.sqrt(num).toString();
    update = true;
  }
  // Si es un número o el punto decimal
  else {
    update = true;
    if (currentInput === '0' && value !== '.') {
      currentInput = value;
    } else {
      currentInput += value;
    }
  }

  if (update) updateDisplay(); // actualiza la pantalla
}

// Muestra el número actual en el display
function updateDisplay(): void {
  const display = document.getElementById('display') as HTMLInputElement | null;
  if (display) {
    display.value = currentInput;
  }
}

// Limpia el número actual
function clearDisplay(): void {
  currentInput = '0';
  operator = '';
  previousInput = '';
  updateDisplay();
}

// Limpia todo (como si se reiniciara la calculadora)
function clearAll(): void {
  currentInput = '0';
  operator = '';
  previousInput = '';
  updateDisplay();
}

// Borra solo el último número o símbolo
function deleteLast(): void {
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = '0';
  }
  updateDisplay();
}

// Calcula el resultado según el operador y los números guardados
function calculate(): void {
  if (previousInput !== '' && currentInput !== '' && operator !== '') {
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result: number;

    switch (operator) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        if (current === 0) {
          alert('Error: División por cero');
          return;
        }
        result = prev / current;
        break;
      default:
        return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay();
  }
}

// Cuando se carga la página, se prepara todo
document.addEventListener('DOMContentLoaded', () => {
  updateDisplay();
  setupEventListeners();
});

// Conecta todos los botones con sus funciones
function setupEventListeners(): void {
  const buttonsContainer = document.querySelector('.buttons');
  
  if (buttonsContainer) {
    buttonsContainer.addEventListener('click', (event) => {
      const target = event.target as HTMLButtonElement;
      if (target.tagName === 'BUTTON') {
        const action = target.dataset.action;
        const value = target.dataset.value;

        if (action === 'clear') {
          clearDisplay();
        } else if (action === 'clearAll') {
          clearAll();
        } else if (action === 'delete') {
          deleteLast();
        } else if (action === 'calculate') {
          calculate();
        } else if (value) {
          appendToDisplay(value);
        }
      }
    });
  }

  setupKeyboardEvents(); // también permite usar el teclado
}

// Permite usar el teclado para escribir los números
function setupKeyboardEvents(): void {
  const keyboardEvents$ = fromEvent<KeyboardEvent>(document, 'keydown');

  keyboardEvents$
    .pipe(
      debounceTime(50), // espera un poco entre pulsaciones
      map((event) => event.key)
    )
    // 👇 aquí está el cambio importante (tipar 'key' como string)
    .subscribe((key: string) => {
      switch (key) {
        // Números del 0 al 9 y punto
        case '0': case '1': case '2': case '3': case '4':
        case '5': case '6': case '7': case '8': case '9':
        case '.':
          appendToDisplay(key);
          break;
        // Operadores
        case '+': case '-': case '*': case '/':
          appendToDisplay(key);
          break;
        // Teclas para calcular
        case 'Enter':
        case '=':
          calculate();
          break;
        // Teclas para limpiar
        case 'Escape':
        case 'c':
        case 'C':
          clearDisplay();
          break;
        // Teclas para limpiar todo
        case 'a':
        case 'A':
          clearAll();
          break;
        // Retroceso para borrar
        case 'Backspace':
          deleteLast();
          break;
        // Porcentaje con tecla %
        case '%':
          appendToDisplay('%');
          break;
      }
    });
}
