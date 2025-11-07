// src/index.ts
import * as readline from 'readline-sync';

function main(): void {
  console.log('=== Calculadora Básica en TypeScript ===');

  // Solicitar al usuario que ingrese dos números
  const num1 = readline.questionFloat('Ingrese el primer número: ');
  const num2 = readline.questionFloat('Ingrese el segundo número: ');

  // Mostrar menú de operaciones
  const operaciones = ['Sumar', 'Restar', 'Multiplicar', 'Dividir'];
  const indice = readline.keyInSelect(operaciones, 'Seleccione una operación: ');

  if (indice === -1) {
    console.log('Operación cancelada.');
    return;
  }

  let resultado: number;

  switch (indice) {
    case 0:
      resultado = num1 + num2;
      break;
    case 1:
      resultado = num1 - num2;
      break;
    case 2:
      resultado = num1 * num2;
      break;
    case 3:
      resultado = num2 !== 0 ? num1 / num2 : NaN;
      break;
    default:
      console.log('Opción inválida.');
      return;
  }

  console.log(`El resultado es: ${resultado}`);
}

main();
