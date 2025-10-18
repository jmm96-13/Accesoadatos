import { fromEvent, debounceTime, map } from 'rxjs';

// Variables que guardan los valores de la calculadora
let currentInput: string = '0';
let operator: string = '';
let previousInput: string = '';

// Esta función añade números u operadores al display
function appendToDisplay(value: string): void {
  let update = false;

  // Si el valor es un operador (+ - * /)
  if (['+', '-', '*', '/'].includes(value)) {
    if (currentInput !== '0' && currentInput !== '') {
      if (previousInput !== '' && operator !== '') {
        calculate();
      }
      previousInput = currentInput;
      operator = value;
      currentInput = '0';
    }
  } 
  // MEJORA: añadí soporte para el porcentaje (%)
  else if (value === '%') {
    currentInput = (parseFloat(currentInput) / 100).toString();
    update = true;
  } 
  // MEJORA: añadí la raíz cuadrada (√)
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

  if (update) updateDisplay(); // Actualiza la pantalla
}

// Actualiza el número que se muestra en la pantalla
function updateDisplay(): void {
  const display = document.getElementById('display') as HTMLInputElement;
  display.value = currentInput;
}

// Limpia el número actual del display
function clearDisplay(): void {
  currentInput = '0';
  operator = '';
  previousInput = '';
  updateDisplay();
}

// MEJORA: añadí la función clearAll() (AC) que limpia todo
function clearAll(): void {
  currentInput = '0';
  operator = '';
  previousInput = '';
  updateDisplay();
}

// Borra el último número o símbolo escrito
function deleteLast(): void {
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = '0';
  }
  updateDisplay();
}

// Calcula el resultado de la operación
function calculate(): void {
  if (previousInput !== '' && currentInput !== '0' && currentInput !== '' && operator !== '') {
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

// Escucha los clics de los botones
function setupEventListeners(): void {
  const buttonsContainer = document.querySelector('.buttons');
  
  if (buttonsContainer) {
    buttonsContainer.addEventListener('click', (event) => {
      const target = event.target as HTMLButtonElement;

      if (target.tagName === 'BUTTON') {
        const action = target.dataset.action;
        const value = target.dataset.value;

        // Si se pulsa "C", limpia el número actual
        if (action === 'clear') {
          clearDisplay();
        } 
        // MEJORA: añadí soporte para el botón "AC" (limpia todo)
        else if (action === 'clearAll') {
          clearAll();
        } 
        // Borrar último carácter
        else if (action === 'delete') {
          deleteLast();
        } 
        // Calcular resultado
        else if (action === 'calculate') {
          calculate();
        } 
        // Cualquier otro valor (número u operador)
        else if (value) {
          appendToDisplay(value);
        }
      }
    });
  }

  setupKeyboardEvents(); // Se mantiene el soporte para teclado
}

// Permite usar el teclado para escribir o calcular
function setupKeyboardEvents(): void {
  const keyboardEvents$ = fromEvent<KeyboardEvent>(document, 'keydown');

  keyboardEvents$
    .pipe(
      debounceTime(50),
      map(event => event.key)
    )
    // MEJORA: añadí el tipo (key: string) para evitar errores de TypeScript
    .subscribe((key: string) => {
      switch (key) {
        // Números y punto decimal
        case '0': case '1': case '2': case '3': case '4':
        case '5': case '6': case '7': case '8': case '9':
        case '.':
          appendToDisplay(key);
          break;
        // Operadores básicos
        case '+': case '-': case '*': case '/':
          appendToDisplay(key);
          break;
        // Calcular
        case 'Enter':
        case '=':
          calculate();
          break;
        // Limpiar número actual
        case 'Escape':
        case 'c':
        case 'C':
          clearDisplay();
          break;
        // MEJORA: añadí tecla "a" o "A" para limpiar todo (AC)
        case 'a':
        case 'A':
          clearAll();
          break;
        // Borrar último carácter
        case 'Backspace':
          deleteLast();
          break;
        // MEJORA: soporte para tecla %
        case '%':
          appendToDisplay('%');
          break;
      }
    });
}