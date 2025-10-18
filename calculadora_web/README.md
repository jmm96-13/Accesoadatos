# Calculadora Web en TypeScript

Proyecto realizado a partir del ejemplo del profesor, mejorado con nuevas funciones, soporte de teclado y un diseño personalizado.

## Descripción

Esta calculadora está desarrollada con **HTML**, **CSS** y **TypeScript**, utilizando **Vite** como servidor de desarrollo.  
Permite realizar operaciones básicas y funciones adicionales como porcentaje y raíz cuadrada, mostrando cómo usar tipado, eventos y manipulación del DOM con TypeScript y RxJS.

---

## Mejoras realizadas

### Funcionalidad
- Cálculo de raíz cuadrada (√): calcula la raíz del número mostrado.  
- Cálculo de porcentaje (%): convierte el número actual en porcentaje.  
- Botón AC (Clear All): limpia toda la memoria de la calculadora.  
- Botón C (Clear): limpia solo el número actual.  
- Botón ⌫ (Borrar): elimina el último dígito o carácter.  
- Soporte de teclado completo:  
  - Teclas numéricas y operadores.  
  - “Enter” o “=” para calcular.  
  - “C” o “Escape” para limpiar.  
  - “A” para limpiar todo (AC).  
  - “Backspace” para borrar el último número.  
- Validación de división por cero para evitar errores.

### Diseño
- Fondo degradado con colores suaves.  
- Botones redondeados con sombras y efecto de presión.  
- Pantalla con texto color menta sobre fondo oscuro.  
- Diseño centrado y adaptable con Flexbox y CSS Grid.  
- Preparado un modo oscuro opcional.  
- Colores con alto contraste para mejorar la legibilidad y accesibilidad.

### Código y estructura
- Código organizado y comentado en español, explicando cada función.  
- Tipado explícito en TypeScript (por ejemplo `key: string`).  
- Uso de RxJS para manejar eventos del teclado con observables.  
- Separación clara entre lógica (`index.ts`), estructura (`index.html`) y estilo (`styles.css`).  
- Tipado estricto activado en `tsconfig.json` para evitar errores.

---

## Accesibilidad y usabilidad

- Se añadió el atributo `aria-label` en la pantalla principal para lectores de pantalla.  
- Colores con alto contraste y disposición visual clara.  
- Todos los elementos interactivos (botones) son accesibles por teclado.

---

## Tecnologías utilizadas

- TypeScript  
- HTML5  
- CSS3  
- Vite  
- RxJS

---

## Cómo ejecutar el proyecto

1. Clonar o descargar este repositorio.  
2. Abrir la carpeta del proyecto en Visual Studio Code.  
3. Instalar las dependencias necesarias:
   ```bash
   npm install
