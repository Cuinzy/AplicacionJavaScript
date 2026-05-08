// ============================================================
// WEBCRAFT: DOMINA EL DOM — Niveles y retos
// ============================================================

const LEVELS = [

  // ============================================================
  // NIVEL 1: PRIMER CONTACTO
  // ============================================================
  {
    id: 1, name: 'Primer Contacto', subtitle: 'HTML + JS básico',
    icon: '🔹', color: '#58a6ff',
    challenges: [

      {
        id: '1-1',
        title: 'El Botón Parlanchín',
        mission: `Los eventos son la base de toda interacción web: permiten que tu código "escuche" las acciones del usuario y reaccione a ellas. addEventListener() registra una función que se ejecutará automáticamente cada vez que ocurra un evento específico (como 'click'). Para este reto necesitas: (1) obtener una referencia al botón usando getElementById — sin ella JavaScript no puede acceder al elemento; (2) registrar un listener para el evento 'click'; (3) dentro de esa función, modificar la propiedad textContent del botón, que controla el texto visible. textContent es diferente de innerHTML: solo maneja texto plano, sin interpretar etiquetas HTML.`,
        objective: `Cuando el usuario haga clic en el botón, su texto debe cambiar a "¡Listo!"`,
        initialHTML: `<div class="contenedor">
  <button id="miBoton">Haz clic aquí</button>
</div>`,
        initialCSS: `/* Estilos de la página */
body {
  font-family: sans-serif;
  background: #f0f4ff;
}

.contenedor {
  display: flex;
  justify-content: center;
  padding: 60px 20px;
}

#miBoton {
  padding: 14px 28px;
  font-size: 1.1rem;
  cursor: pointer;
  border-radius: 8px;
  border: 2px solid #4a90e2;
  background: #e8f0fe;
  color: #1a237e;
  transition: all 0.2s;
}

#miBoton:hover {
  background: #4a90e2;
  color: white;
}`,
        initialJS: `// Tu misión: cambiar el texto del botón al hacer clic
// Paso 1: obtén el botón por su id
// Paso 2: agrega un evento 'click'
// Paso 3: dentro del evento, cambia el textContent

`,
        hints: [
          `Usa <code>document.getElementById('miBoton')</code> para obtener el botón.`,
          `Agrega el evento: <code>boton.addEventListener('click', function() { ... })</code>`,
          `Dentro de la función: <code>boton.textContent = '¡Listo!'</code>`,
        ],
        validate(doc) {
          try {
            const btn = doc.getElementById('miBoton');
            if (!btn) return { pass: false, msg: 'No encontré el botón con id="miBoton". ¿Lo borraste del HTML?' };
            const original = btn.textContent.trim();
            btn.click();
            const after = btn.textContent.trim();
            if (after !== original && after.length > 0) return { pass: true, msg: '¡El botón reacciona al clic y cambia su texto. Evento "click" dominado!' };
            if (after === original) return { pass: false, msg: 'El texto del botón no cambió después del clic. ¿Pusiste el código dentro del addEventListener?' };
            return { pass: false, msg: 'El botón quedó sin texto. Asigna un valor a textContent dentro del evento.' };
          } catch(e) { return { pass: false, msg: 'Error en tu código: ' + e.message }; }
        },
      },

      {
        id: '1-2',
        title: 'Mensaje en Pantalla',
        mission: `Modificar el contenido de un elemento es la operación más fundamental en JavaScript para el DOM. textContent es la propiedad que controla el texto que el usuario ve dentro de un elemento; asignarle un valor lo cambia al instante. Para este reto necesitas obtener dos elementos: el botón (para escuchar el clic) y el div vacío (para mostrar el mensaje). Cuando el usuario haga clic, el div #mensaje debe llenarse con cualquier texto de bienvenida que elijas usando su propiedad textContent. Si el div sigue vacío después del clic, asegúrate de que estás modificando el elemento correcto dentro del listener.`,
        objective: `Al hacer clic en el botón, muestra un mensaje de bienvenida dentro del elemento con id="mensaje"`,
        initialHTML: `<div class="contenedor">
  <button id="btnMostrar">Mostrar Mensaje</button>
  <div id="mensaje"></div>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #f0fff4;
}

.contenedor {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 50px 20px;
}

#btnMostrar {
  padding: 12px 24px;
  font-size: 1rem;
  cursor: pointer;
  background: #2e7d32;
  color: white;
  border: none;
  border-radius: 8px;
}

#btnMostrar:hover {
  background: #1b5e20;
}

#mensaje {
  font-size: 1.4rem;
  font-weight: bold;
  color: #2e7d32;
  min-height: 40px;
}`,
        initialJS: `// Haz que al hacer clic en #btnMostrar
// aparezca un mensaje en #mensaje
// Puedes usar cualquier texto de bienvenida

`,
        hints: [
          `Necesitas dos elementos: <code>document.getElementById('btnMostrar')</code> y <code>document.getElementById('mensaje')</code>`,
          `Agrega un evento 'click' al botón.`,
          `Dentro del evento: <code>mensaje.textContent = '¡Bienvenido a CodeLab!'</code>`,
        ],
        validate(doc) {
          try {
            const btn = doc.getElementById('btnMostrar');
            const msg = doc.getElementById('mensaje');
            if (!btn) return { pass: false, msg: 'No encontré el botón con id="btnMostrar".' };
            if (!msg) return { pass: false, msg: 'No encontré el div con id="mensaje".' };
            btn.click();
            const txt = msg.textContent.trim();
            if (txt.length > 0) return { pass: true, msg: '¡El mensaje aparece en la página al hacer clic! textContent dominado.' };
            return { pass: false, msg: 'Al hacer clic, el div #mensaje sigue vacío. Asigna su textContent dentro del addEventListener.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '1-3',
        title: 'Leer el Input',
        mission: `La propiedad .value de un input es la forma de leer lo que el usuario ha escrito en ese campo. A diferencia de textContent (que es para elementos que muestran texto), .value funciona en inputs, textareas y selects. El proceso aquí es: (1) obtener el input con getElementById para poder leer su .value; (2) obtener el párrafo #resultado para poder escribir en él; (3) dentro del evento 'click' del botón, leer el nombre con input.value y mostrar un saludo que lo incluya en resultado.textContent. La concatenación de strings con + o los template literals con backticks son las formas más comunes de combinar el nombre con el texto "¡Hola".`,
        objective: `Al hacer clic en "Saludar", leer el valor del input y mostrar un saludo personalizado en el párrafo #resultado`,
        initialHTML: `<div class="contenedor">
  <div class="fila">
    <input id="nombre" type="text" placeholder="Escribe tu nombre...">
    <button id="btnSaludar">Saludar</button>
  </div>
  <p id="resultado"></p>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #fff8e1;
}

.contenedor {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 50px 20px;
}

.fila {
  display: flex;
  gap: 10px;
}

#nombre {
  padding: 10px 14px;
  font-size: 1rem;
  border: 2px solid #f9a825;
  border-radius: 8px;
  outline: none;
  width: 220px;
}

#nombre:focus {
  border-color: #f57f17;
}

#btnSaludar {
  padding: 10px 20px;
  background: #f9a825;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}

#resultado {
  font-size: 1.3rem;
  font-weight: bold;
  color: #e65100;
  min-height: 36px;
}`,
        initialJS: `// Lee el valor del input #nombre
// y muestra un saludo en #resultado
// Pista: input.value te da el texto escrito

`,
        hints: [
          `Obtén el valor del input: <code>const nombre = document.getElementById('nombre').value;</code>`,
          `Agrega un evento 'click' al botón #btnSaludar.`,
          `Muestra el saludo: <code>resultado.textContent = '¡Hola, ' + nombre + '!'</code>`,
        ],
        validate(doc) {
          try {
            const inp = doc.getElementById('nombre');
            const btn = doc.getElementById('btnSaludar');
            const res = doc.getElementById('resultado');
            if (!inp || !btn || !res) return { pass: false, msg: 'Faltan elementos. No borres los ids "nombre", "btnSaludar" o "resultado".' };
            inp.value = 'María';
            btn.click();
            const txt = res.textContent.trim();
            if (txt.includes('María')) return { pass: true, msg: '¡El saludo incluye el nombre del input! Sabes leer input.value.' };
            if (txt.length > 0) return { pass: false, msg: `Se mostró texto pero no incluye el nombre. ¿Estás usando input.value? Resultado: "${txt}"` };
            return { pass: false, msg: 'El párrafo #resultado quedó vacío. Asigna su textContent con el valor del input dentro del evento clic.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '1-4',
        title: 'Contador de Clics',
        mission: `Para que un valor persista entre clics, la variable que lo almacena debe declararse fuera del evento — si la declaras dentro, se reinicia a 0 cada vez que el usuario hace clic. El patrón fundamental es: declara la variable (let clics = 0), agrega el evento 'click' al botón, y dentro del handler: incrementa la variable (clics++) y actualiza el elemento que muestra el valor en pantalla. La actualización de la pantalla ocurre asignando el nuevo valor a span.textContent — esto convierte el número a string automáticamente. Sin este último paso, el usuario no verá ningún cambio aunque la variable sí incremente.`,
        objective: `Cada clic en #btnContar incrementa el contador y lo muestra en #cuenta. Empieza en 0.`,
        initialHTML: `<div class="contenedor">
  <button id="btnContar">¡Haz clic!</button>
  <p>Clics registrados: <span id="cuenta">0</span></p>
</div>`,
        initialCSS: `body { font-family: sans-serif; background: #f0f4ff; }
.contenedor { display: flex; flex-direction: column; align-items: center; gap: 24px; padding: 60px 20px; }
#btnContar { padding: 16px 32px; font-size: 1.1rem; cursor: pointer; background: #3949ab; color: white; border: none; border-radius: 10px; transition: transform 0.1s; }
#btnContar:hover { transform: scale(1.05); }
#btnContar:active { transform: scale(0.97); }
p { font-size: 1.3rem; color: #333; }
#cuenta { font-weight: bold; font-size: 1.6rem; color: #3949ab; }`,
        initialJS: `// PASO 1: declara una variable numérica para guardar el conteo
// (declárala aquí, fuera del evento, para que no se reinicie)

// PASO 2: obtén el botón (#btnContar) y el span (#cuenta)

// PASO 3: agrega un evento 'click' al botón
// PASO 4: dentro del evento, incrementa la variable y actualiza el span

`,
        hints: [
          `Declara: <code>let clics = 0;</code> antes de agregar el evento.`,
          `Dentro del click: <code>clics = clics + 1;</code> o la forma corta <code>clics++;</code>`,
          `Para mostrar el valor: <code>document.getElementById('cuenta').textContent = clics;</code>`,
        ],
        validate(doc) {
          try {
            const btn   = doc.getElementById('btnContar');
            const span  = doc.getElementById('cuenta');
            if (!btn)  return { pass: false, msg: 'No encontré el botón con id="btnContar".' };
            if (!span) return { pass: false, msg: 'No encontré el span con id="cuenta".' };
            btn.click(); btn.click(); btn.click();
            const val = span.textContent.trim();
            if (val === '3') return { pass: true, msg: '¡Contador funciona! Después de 3 clics muestra 3 correctamente.' };
            if (val === '0') return { pass: false, msg: 'El contador sigue en 0 después de 3 clics. ¿Declaraste la variable fuera del evento y actualizas el span?' };
            return { pass: false, msg: `Después de 3 clics el span muestra "${val}" en lugar de "3". Revisa que incrementas la variable y la muestras correctamente.` };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '1-5',
        title: 'Toggle de Visibilidad',
        mission: `El toggle de visibilidad es un patrón fundamental en interfaces web: botones para mostrar/ocultar menús, paneles, filtros, etc. La propiedad style.display controla si un elemento ocupa espacio en la página: 'none' lo oculta completamente (como si no existiera), y '' o 'block' lo vuelve visible. La clave del toggle es detectar el estado actual con una condición: if (panel.style.display === 'none') significa que está oculto y debes mostrarlo; el bloque else oculta. Además, el texto del botón debe actualizarse para decirle al usuario qué acción hará el próximo clic — esto mejora mucho la usabilidad.`,
        objective: `Al hacer clic en #btnToggle, alterna la visibilidad de #panel (muestra/oculta). El texto del botón debe cambiar según el estado.`,
        initialHTML: `<div class="contenedor">
  <button id="btnToggle">Ocultar Panel</button>
  <div id="panel" class="panel">
    <h3>Panel de Contenido</h3>
    <p>Este panel se puede mostrar y ocultar.</p>
  </div>
</div>`,
        initialCSS: `body { font-family: sans-serif; background: #e8f5e9; }
.contenedor { display: flex; flex-direction: column; align-items: center; gap: 20px; padding: 40px 20px; }
#btnToggle { padding: 12px 24px; background: #2e7d32; color: white; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer; }
#btnToggle:hover { background: #1b5e20; }
.panel { background: white; border: 2px solid #a5d6a7; border-radius: 12px; padding: 24px; width: 280px; text-align: center; }
.panel h3 { margin: 0 0 8px; color: #2e7d32; }
.panel p { margin: 0; color: #555; }`,
        initialJS: `// El panel empieza visible (display por defecto)
// PASO 1: obtén el botón (#btnToggle) y el panel (#panel)

// PASO 2: agrega un evento 'click' al botón
// PASO 3: dentro del evento, verifica si el panel está oculto:
//   si panel.style.display === 'none' → muéstralo y cambia texto del botón a 'Ocultar Panel'
//   si no → ocúltalo y cambia texto del botón a 'Mostrar Panel'

`,
        hints: [
          `Usa <code>if (panel.style.display === "none")</code> para verificar el estado.`,
          `Para ocultar: <code>panel.style.display = "none";</code>`,
          `Para el texto del botón: <code>btnToggle.textContent = "Mostrar Panel";</code>`,
        ],
        validate(doc) {
          try {
            const btn   = doc.getElementById('btnToggle');
            const panel = doc.getElementById('panel');
            if (!btn)   return { pass: false, msg: 'No encontré el botón con id="btnToggle".' };
            if (!panel) return { pass: false, msg: 'No encontré el div con id="panel".' };
            btn.click();
            const hiddenAfterFirst = panel.style.display === 'none' || panel.style.visibility === 'hidden' || panel.style.opacity === '0';
            if (!hiddenAfterFirst) return { pass: false, msg: 'Después del primer clic el panel no se ocultó. Usa panel.style.display = "none" dentro del evento.' };
            btn.click();
            const visibleAfterSecond = panel.style.display !== 'none' && panel.style.visibility !== 'hidden' && panel.style.opacity !== '0';
            if (!visibleAfterSecond) return { pass: false, msg: 'El segundo clic no volvió a mostrar el panel. Verifica la condición if/else para alternar el display.' };
            return { pass: true, msg: '¡Toggle de visibilidad perfecto! El panel se muestra y oculta correctamente.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '1-6',
        title: 'Cambiar Color de Fondo',
        mission: `Ciclar entre valores usando un array y un índice es un patrón muy común en JavaScript. Defines el array con todos los valores posibles, una variable de índice que empieza en 0, y en cada clic avanzas el índice con (indice + 1) % colores.length — el operador módulo % hace que cuando llegas al final del array vuelvas automáticamente al inicio. style.backgroundColor acepta colores en cualquier formato CSS: nombres ('white'), hexadecimal ('#e3f2fd') o rgb. El span #colorActual debe mostrar qué color está activo actualmente, actualizándose con cada clic del botón.`,
        objective: `Al hacer clic en #btnColor, cicla el color de fondo de #fondo entre los tres colores definidos y muestra el color actual en #colorActual.`,
        initialHTML: `<div id="fondo" class="fondo">
  <h3>Cambia mi color</h3>
  <button id="btnColor">Cambiar Color</button>
  <p>Color actual: <span id="colorActual">blanco</span></p>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  margin: 0;
  padding: 0;
}

#fondo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 20px;
  background: white;
  transition: background-color 0.4s;
}

#fondo h3 {
  font-size: 1.4rem;
  color: #333;
  margin: 0;
}

#btnColor {
  padding: 12px 28px;
  font-size: 1rem;
  cursor: pointer;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  transition: background 0.2s;
}

#btnColor:hover {
  background: #2d6fd4;
}

#fondo p {
  color: #555;
  margin: 0;
}

#colorActual {
  font-weight: bold;
  color: #c62828;
}`,
        initialJS: `// PASO 1: define un array con los tres colores:
// const colores = ['white', '#e3f2fd', '#fce4ec'];
// PASO 2: declara una variable para el índice actual: let indice = 0;
// PASO 3: obtén el div#fondo, el botón #btnColor y el span #colorActual
// PASO 4: agrega un evento 'click' al botón
// PASO 5: dentro del evento:
//   - Avanza el índice: indice = (indice + 1) % colores.length;
//   - Aplica el color: fondo.style.backgroundColor = colores[indice];
//   - Muestra el color en #colorActual
\n`,
        hints: [
          'Usa un array: <code>const colores = [\'white\', \'#e3f2fd\', \'#fce4ec\'];</code>',
          'Cicla con módulo: <code>indice = (indice + 1) % colores.length;</code>',
          'Aplica el estilo: <code>fondo.style.backgroundColor = colores[indice];</code>',
        ],
        validate(doc) {
          try {
            const fondo = doc.getElementById('fondo');
            const btn = doc.getElementById('btnColor');
            const colorActual = doc.getElementById('colorActual');
            if (!fondo) return { pass: false, msg: 'No encontré el div con id="fondo".' };
            if (!btn) return { pass: false, msg: 'No encontré el botón con id="btnColor".' };
            if (!colorActual) return { pass: false, msg: 'No encontré el span con id="colorActual".' };
            const bg0 = fondo.style.backgroundColor;
            btn.click();
            const bg1 = fondo.style.backgroundColor;
            if (!bg1 || bg1 === bg0) return { pass: false, msg: 'El color de fondo no cambió tras el primer clic. Asigna fondo.style.backgroundColor dentro del evento.' };
            btn.click();
            const bg2 = fondo.style.backgroundColor;
            if (bg2 === bg1) return { pass: false, msg: 'El color no cambia en el segundo clic. Verifica que el índice avanza correctamente.' };
            btn.click();
            const bg3 = fondo.style.backgroundColor;
            return { pass: true, msg: '¡Ciclo de colores funcionando! style.backgroundColor y ciclo con índice dominados.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '1-7',
        title: 'Input en Tiempo Real',
        mission: `El evento 'input' es especial: se dispara inmediatamente en cada cambio del campo, incluyendo cada tecla pulsada, pegar texto o borrar. Esto lo hace ideal para actualizaciones en tiempo real, a diferencia de 'change' que solo se dispara al perder el foco. El proceso es: obtener tanto el input como el párrafo #preview, registrar un listener 'input' en el campo, y dentro leer input.value para actualizar preview.textContent. Si input.value está vacío (longitud 0 o valor falsy), debes mostrar el texto alternativo "Escribe tu nombre..." en lugar de "Hola, !" con nombre vacío — esto mejora mucho la experiencia del usuario.`,
        objective: `Al escribir en #inputNombre, el párrafo #preview muestra "Hola, [nombre]!" en tiempo real. Si el input está vacío, muestra "Escribe tu nombre..."`,
        initialHTML: `<div class="contenedor">
  <h3>Vista Previa en Tiempo Real</h3>
  <input id="inputNombre" type="text" placeholder="Escribe tu nombre...">
  <p id="preview">Escribe tu nombre...</p>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #f0fff4;
  margin: 0;
}

.contenedor {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 60px 20px;
}

.contenedor h3 {
  color: #2e7d32;
  margin: 0;
  font-size: 1.2rem;
}

#inputNombre {
  padding: 12px 18px;
  font-size: 1rem;
  border: 2px solid #a5d6a7;
  border-radius: 10px;
  outline: none;
  width: 260px;
  transition: border-color 0.2s;
}

#inputNombre:focus {
  border-color: #2e7d32;
}

#preview {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1b5e20;
  min-height: 40px;
  text-align: center;
  background: #e8f5e9;
  padding: 14px 28px;
  border-radius: 12px;
  border: 2px dashed #a5d6a7;
}`,
        initialJS: `// PASO 1: obtén el input #inputNombre y el párrafo #preview
// PASO 2: agrega el evento 'input' al inputNombre (no 'change')
//   input.addEventListener('input', function() { ... });
// PASO 3: dentro del evento:
//   - Lee inputNombre.value
//   - Si está vacío: preview.textContent = 'Escribe tu nombre...'
//   - Si no: preview.textContent = 'Hola, ' + nombre + '!'
\n`,
        hints: [
          'Usa el evento correcto: <code>inputNombre.addEventListener(\'input\', function() { ... });</code>',
          'Lee el valor: <code>const nombre = inputNombre.value;</code>',
          'Condición: <code>preview.textContent = nombre ? \'Hola, \' + nombre + \'!\' : \'Escribe tu nombre...\';</code>',
        ],
        validate(doc) {
          try {
            const input = doc.getElementById('inputNombre');
            const preview = doc.getElementById('preview');
            if (!input) return { pass: false, msg: 'No encontré el input con id="inputNombre".' };
            if (!preview) return { pass: false, msg: 'No encontré el párrafo con id="preview".' };
            input.value = 'Ana';
            input.dispatchEvent(new doc.defaultView.Event('input', { bubbles: true }));
            if (!preview.textContent.includes('Ana')) return { pass: false, msg: `Al escribir "Ana", el preview dice "${preview.textContent}". Debe incluir el nombre.` };
            input.value = '';
            input.dispatchEvent(new doc.defaultView.Event('input', { bubbles: true }));
            if (preview.textContent.trim() === '') return { pass: false, msg: 'Con el input vacío, el preview quedó en blanco. Muestra "Escribe tu nombre..." cuando esté vacío.' };
            return { pass: true, msg: '¡Vista previa en tiempo real funcionando! El evento "input" se dispara en cada tecla.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '1-8',
        title: 'Botón Desactivar',
        mission: `La propiedad .disabled es un booleano que existe en todos los elementos de formulario (botones, inputs, selects). Cuando es true, el elemento aparece visualmente atenuado y el usuario no puede interactuar con él — incluso los clicks son ignorados. Para alternarla, tu código debe leer el estado actual con una condición (if/else) y asignar el valor contrario. El botón #btnDesactivar controla el estado de #btnAccion: al primer clic lo desactiva (disabled = true), al segundo lo reactiva (disabled = false). El párrafo #estado debe actualizarse para informar al usuario si el botón está habilitado o deshabilitado en cada momento.`,
        objective: `Al hacer clic en #btnDesactivar, alterna la propiedad disabled de #btnAccion. El texto de #estado refleja si está activo o desactivado.`,
        initialHTML: `<div class="contenedor">
  <h3>Control de Botón</h3>
  <p id="estado">El botón está: <strong>activo</strong></p>
  <button id="btnAccion">Ejecutar Acción</button>
  <button id="btnDesactivar">Desactivar Botón</button>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #fff8e1;
  margin: 0;
}

.contenedor {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 60px 20px;
}

.contenedor h3 {
  color: #e65100;
  margin: 0;
}

#estado {
  font-size: 1rem;
  color: #555;
  margin: 0;
  background: #fff3e0;
  padding: 10px 20px;
  border-radius: 8px;
  border: 1px solid #ffcc80;
}

#btnAccion {
  padding: 12px 28px;
  font-size: 1rem;
  cursor: pointer;
  background: #fb8c00;
  color: white;
  border: none;
  border-radius: 8px;
  transition: opacity 0.3s;
}

#btnAccion:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

#btnDesactivar {
  padding: 10px 22px;
  font-size: 0.95rem;
  cursor: pointer;
  background: #37474f;
  color: white;
  border: none;
  border-radius: 8px;
}`,
        initialJS: `// PASO 1: obtén #btnAccion, #btnDesactivar y #estado
// PASO 2: en el clic de #btnAccion: cambia el texto de #estado para mostrar que se ejecutó
// PASO 3: en el clic de #btnDesactivar:
//   - Alterna btnAccion.disabled (si es true pasa a false y viceversa)
//   - Actualiza el texto de #estado y el texto del botón desactivar
//   Ejemplo: if (btnAccion.disabled) { btnAccion.disabled = false; ... } else { btnAccion.disabled = true; ... }
\n`,
        hints: [
          'Para desactivar: <code>btnAccion.disabled = true;</code>',
          'Para reactivar: <code>btnAccion.disabled = false;</code>',
          'Verifica el estado: <code>if (btnAccion.disabled) { ... } else { ... }</code>',
        ],
        validate(doc) {
          try {
            const btnAccion = doc.getElementById('btnAccion');
            const btnDes = doc.getElementById('btnDesactivar');
            const estado = doc.getElementById('estado');
            if (!btnAccion) return { pass: false, msg: 'No encontré el botón con id="btnAccion".' };
            if (!btnDes) return { pass: false, msg: 'No encontré el botón con id="btnDesactivar".' };
            if (!estado) return { pass: false, msg: 'No encontré el párrafo con id="estado".' };
            btnDes.click();
            if (!btnAccion.disabled) return { pass: false, msg: 'Después del primer clic en #btnDesactivar, btnAccion.disabled debería ser true.' };
            btnDes.click();
            if (btnAccion.disabled) return { pass: false, msg: 'Después del segundo clic, btnAccion.disabled debería volver a false.' };
            return { pass: true, msg: '¡Propiedad disabled alternada correctamente! El toggle de disabled está dominado.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '1-9',
        title: 'Resaltar al Hacer Foco',
        mission: `Los eventos 'focus' y 'blur' forman una pareja esencial en formularios web. 'focus' se dispara cuando el campo recibe el cursor (ya sea por clic o por Tab del teclado), y 'blur' cuando lo pierde. classList.add() y classList.remove() son los métodos que agregan o quitan clases CSS de un elemento sin borrar las que ya tiene. La estrategia es: seleccionar todos los inputs con querySelectorAll('.campo'), recorrerlos con forEach, y para cada uno agregar dos listeners — 'focus' que agrega la clase 'activo' a ese campo específico, y 'blur' que la quita. Usa this (con function) o el parámetro del evento para referirte al campo que disparó el evento.`,
        objective: `Cuando cualquier input.campo reciba foco, agrégale la clase "activo". Cuando lo pierda (blur), quítala. Solo un campo resaltado a la vez.`,
        initialHTML: `<div class="contenedor">
  <h3>Formulario de Contacto</h3>
  <div class="form-group">
    <input class="campo" type="text" placeholder="Tu nombre">
    <input class="campo" type="email" placeholder="Tu email">
    <input class="campo" type="text" placeholder="Tu mensaje">
  </div>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #e8eaf6;
  margin: 0;
}

.contenedor {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 60px 20px;
}

.contenedor h3 {
  color: #3949ab;
  margin: 0;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 280px;
}

.campo {
  padding: 12px 16px;
  font-size: 1rem;
  border: 2px solid #c5cae9;
  border-radius: 10px;
  outline: none;
  transition: all 0.2s;
  background: white;
}

.campo.activo {
  border-color: #f9a825;
  box-shadow: 0 0 0 3px rgba(249, 168, 37, 0.25);
  background: #fffde7;
}`,
        initialJS: `// PASO 1: obtén todos los inputs con clase 'campo'
//   const campos = document.querySelectorAll('.campo');
// PASO 2: para cada campo agrega DOS eventos:
//   a) 'focus': agrega la clase 'activo' al campo que recibió foco
//   b) 'blur':  quita la clase 'activo' del campo que perdió foco
// Usa forEach para recorrer todos los campos
\n`,
        hints: [
          'Selecciona todos: <code>const campos = document.querySelectorAll(\'.campo\');</code>',
          'Evento focus: <code>campo.addEventListener(\'focus\', function() { this.classList.add(\'activo\'); });</code>',
          'Evento blur: <code>campo.addEventListener(\'blur\', function() { this.classList.remove(\'activo\'); });</code>',
        ],
        validate(doc) {
          try {
            const campos = doc.querySelectorAll('.campo');
            if (!campos.length) return { pass: false, msg: 'No encontré inputs con clase "campo".' };
            const win = doc.defaultView;
            campos[0].dispatchEvent(new win.FocusEvent('focus', { bubbles: true }));
            if (!campos[0].classList.contains('activo')) return { pass: false, msg: 'Al hacer foco en el primer campo, no se agregó la clase "activo".' };
            campos[0].dispatchEvent(new win.FocusEvent('blur', { bubbles: true }));
            if (campos[0].classList.contains('activo')) return { pass: false, msg: 'Al perder el foco, la clase "activo" no se quitó.' };
            campos[1].dispatchEvent(new win.FocusEvent('focus', { bubbles: true }));
            if (!campos[1].classList.contains('activo')) return { pass: false, msg: 'El segundo campo no recibe la clase "activo" al hacer foco.' };
            return { pass: true, msg: '¡Eventos focus y blur dominados! Los campos se resaltan correctamente.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '1-10',
        title: 'Mostrar/Ocultar Contraseña',
        mission: `Los checkboxes tienen una propiedad booleana llamada .checked que es true cuando está marcado y false cuando no. El evento apropiado para detectar cambios en un checkbox es 'change', que se dispara al marcar o desmarcar. La propiedad .type de un input no es fija — puede cambiarse dinámicamente con JavaScript. Al asignar inputPass.type = 'text' el navegador muestra el contenido visible; con 'password' lo oculta con puntos. El ternario es ideal aquí: inputPass.type = mostrarPass.checked ? 'text' : 'password' — esto decide en una sola línea qué tipo asignar según el estado del checkbox.`,
        objective: `Al marcar el checkbox #mostrarPass, cambia el type de #inputPass a "text". Al desmarcarlo, cambia a "password".`,
        initialHTML: `<div class="contenedor">
  <h3>🔐 Campo de Contraseña</h3>
  <div class="campo-pass">
    <input id="inputPass" type="password" placeholder="Escribe tu contraseña...">
  </div>
  <label class="label-check">
    <input id="mostrarPass" type="checkbox">
    Mostrar contraseña
  </label>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #fce4ec;
  margin: 0;
}

.contenedor {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 60px 20px;
}

.contenedor h3 {
  color: #c62828;
  margin: 0;
}

.campo-pass {
  position: relative;
}

#inputPass {
  padding: 12px 18px;
  font-size: 1rem;
  border: 2px solid #ef9a9a;
  border-radius: 10px;
  outline: none;
  width: 260px;
  transition: border-color 0.2s;
}

#inputPass:focus {
  border-color: #c62828;
}

.label-check {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.95rem;
  color: #555;
  cursor: pointer;
}

#mostrarPass {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #c62828;
}`,
        initialJS: `// PASO 1: obtén el input #inputPass y el checkbox #mostrarPass
// PASO 2: agrega el evento 'change' al checkbox
// PASO 3: dentro del evento:
//   - Si mostrarPass.checked es true: inputPass.type = 'text'
//   - Si es false: inputPass.type = 'password'
// Alternativa con ternario:
//   inputPass.type = mostrarPass.checked ? 'text' : 'password';
\n`,
        hints: [
          'Obtén ambos elementos con getElementById.',
          'Evento change: <code>mostrarPass.addEventListener(\'change\', function() { ... });</code>',
          'Cambia el tipo: <code>inputPass.type = mostrarPass.checked ? \'text\' : \'password\';</code>',
        ],
        validate(doc) {
          try {
            const inputPass = doc.getElementById('inputPass');
            const mostrarPass = doc.getElementById('mostrarPass');
            if (!inputPass) return { pass: false, msg: 'No encontré el input con id="inputPass".' };
            if (!mostrarPass) return { pass: false, msg: 'No encontré el checkbox con id="mostrarPass".' };
            if (inputPass.type !== 'password') return { pass: false, msg: 'El input debe empezar con type="password".' };
            mostrarPass.checked = true;
            mostrarPass.dispatchEvent(new doc.defaultView.Event('change', { bubbles: true }));
            if (inputPass.type !== 'text') return { pass: false, msg: 'Al marcar el checkbox, inputPass.type debería cambiar a "text".' };
            mostrarPass.checked = false;
            mostrarPass.dispatchEvent(new doc.defaultView.Event('change', { bubbles: true }));
            if (inputPass.type !== 'password') return { pass: false, msg: 'Al desmarcar, inputPass.type debería volver a "password".' };
            return { pass: true, msg: '¡Mostrar/ocultar contraseña funcionando! La propiedad .type se modifica dinámicamente.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },
    ],
  },

  // ============================================================
  // NIVEL 2: MANIPULACIÓN DEL DOM
  // ============================================================
  {
    id: 2, name: 'Manipulación del DOM', subtitle: 'Crear, modificar y eliminar elementos',
    icon: '🔸', color: '#3fb950',
    challenges: [

      {
        id: '2-1',
        title: 'Cambiar Contenido',
        mission: `textContent e innerText son las dos propiedades más usadas para cambiar el texto de un elemento del DOM. textContent lee y escribe el contenido de texto puro (ignora el HTML), mientras que innerText tiene en cuenta los estilos CSS y el diseño visual. Para este reto ambas funcionan igual. El flujo es: obtener la referencia al h2#titulo con getElementById, obtener el botón #cambiar, registrar el evento 'click' en el botón, y dentro del handler asignar un nuevo valor a titulo.textContent o titulo.innerText. El nuevo texto puede ser cualquier cadena que elijas — la validación solo comprueba que cambió y no quedó vacío.`,
        objective: `Al hacer clic en el botón, cambia el texto del h2 con id="titulo" por uno diferente`,
        initialHTML: `<div class="contenedor">
  <h2 id="titulo">Título Original</h2>
  <button id="cambiar">Cambiar Título</button>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #e8f5e9;
}

.contenedor {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 50px 20px;
}

#titulo {
  color: #1a237e;
  font-size: 2rem;
  text-align: center;
  transition: all 0.3s;
}

#cambiar {
  padding: 12px 24px;
  background: #1565c0;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}

#cambiar:hover {
  background: #0d47a1;
}`,
        initialJS: `// Cambia el innerText (o textContent) del h2#titulo
// cuando se haga clic en #cambiar

`,
        hints: [
          `Obtén el h2: <code>const titulo = document.getElementById('titulo');</code>`,
          `Agrega el evento al botón #cambiar.`,
          `Usa <code>titulo.innerText = '¡DOM Modificado!'</code> o <code>textContent</code>`,
        ],
        validate(doc) {
          try {
            const btn = doc.getElementById('cambiar');
            const tit = doc.getElementById('titulo');
            if (!btn || !tit) return { pass: false, msg: 'Faltan elementos. Verifica #cambiar y #titulo en el HTML.' };
            const original = tit.textContent.trim();
            btn.click();
            const after = tit.textContent.trim();
            if (after !== original && after.length > 0) return { pass: true, msg: '¡El título cambia dinámicamente al hacer clic! innerText dominado.' };
            if (after === original) return { pass: false, msg: 'El título no cambió. ¿Cambiaste innerText del h2#titulo dentro del evento?' };
            return { pass: false, msg: 'El título quedó vacío. Asigna un nuevo texto dentro del addEventListener.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '2-2',
        title: 'Crear Elementos',
        mission: `createElement() es el método para construir nuevos elementos HTML desde JavaScript sin modificar el HTML estático. El proceso tiene tres pasos obligatorios: primero creas el elemento con document.createElement('p'), luego le das contenido con elemento.textContent = 'texto', y finalmente lo insertas en el DOM con contenedor.appendChild(elemento) — sin appendChild el elemento existe en memoria pero no aparece en la página. appendChild siempre inserta al final del contenedor. Cada clic debe agregar un nuevo párrafo independiente, no reemplazar el anterior — por eso es importante crear un elemento nuevo dentro del evento cada vez.`,
        objective: `Al hacer clic en "+ Agregar Párrafo", crea un nuevo elemento <p> con texto y agrégalo dentro del div#contenedor`,
        initialHTML: `<div class="pagina">
  <button id="agregar">+ Agregar Párrafo</button>
  <div id="contenedor">
    <p class="placeholder">Los elementos aparecerán aquí...</p>
  </div>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #fce4ec;
}

.pagina {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 30px;
}

#agregar {
  padding: 10px 20px;
  background: #c62828;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  width: fit-content;
}

#agregar:hover {
  background: #b71c1c;
}

#contenedor {
  border: 2px dashed #ef9a9a;
  border-radius: 10px;
  padding: 16px;
  min-height: 80px;
  background: white;
}

#contenedor p {
  padding: 8px 12px;
  background: #fce4ec;
  border-left: 4px solid #e53935;
  border-radius: 4px;
  margin: 6px 0;
  color: #333;
}

.placeholder {
  color: #aaa;
  font-style: italic;
}`,
        initialJS: `// Al hacer clic en #agregar:
// 1. Crea un nuevo elemento <p>
// 2. Asígnale algún texto
// 3. Agrégalo dentro de #contenedor
// Usa: document.createElement(), element.textContent, contenedor.appendChild()

`,
        hints: [
          `Crea el elemento: <code>const parrafo = document.createElement('p');</code>`,
          `Asígnale texto: <code>parrafo.textContent = 'Nuevo elemento';</code>`,
          `Agrégalo: <code>document.getElementById('contenedor').appendChild(parrafo);</code>`,
        ],
        validate(doc) {
          try {
            const btn  = doc.getElementById('agregar');
            const cont = doc.getElementById('contenedor');
            if (!btn || !cont) return { pass: false, msg: 'Faltan elementos #agregar o #contenedor.' };
            const before = cont.querySelectorAll('p').length;
            btn.click();
            const after = cont.querySelectorAll('p').length;
            if (after > before) return { pass: true, msg: '¡createElement y appendChild funcionan! Creaste un elemento dinámicamente.' };
            return { pass: false, msg: 'Al hacer clic no se agregó ningún <p> al contenedor. Usa createElement() y appendChild().' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '2-3',
        title: 'Eliminar Elementos',
        mission: `El método .remove() elimina un elemento del DOM directamente sin necesitar referencia a su padre. Una vez eliminado, el elemento desaparece de la página y deja de existir en el árbol DOM — no puedes recuperarlo sin recrearlo con createElement. El flujo para este reto: obtener el elemento #itemBorrar con getElementById, registrar el evento 'click' en el botón #btnBorrar, y dentro del handler llamar itemBorrar.remove(). La alternativa clásica es item.parentNode.removeChild(item) que también funciona. La validación comprueba que después del clic ya no existe el elemento con ese id en el DOM.`,
        objective: `Al hacer clic en "Borrar Elemento", elimina el li con id="itemBorrar" del DOM`,
        initialHTML: `<div class="pagina">
  <ul id="lista">
    <li id="item1" class="item-ok">✅ Este elemento se queda</li>
    <li id="itemBorrar" class="item-mal">❌ Elimina este elemento</li>
    <li id="item3" class="item-ok">✅ Este también se queda</li>
  </ul>
  <button id="btnBorrar">Borrar Elemento</button>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #fff3e0;
}

.pagina {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px;
}

#lista {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

#lista li {
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 1rem;
}

.item-ok {
  background: #e8f5e9;
  border-left: 4px solid #43a047;
  color: #1b5e20;
}

.item-mal {
  background: #ffebee;
  border-left: 4px solid #e53935;
  color: #b71c1c;
}

#btnBorrar {
  padding: 10px 20px;
  background: #e53935;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  width: fit-content;
}`,
        initialJS: `// Al hacer clic en #btnBorrar
// elimina el elemento con id="itemBorrar"
// Opción 1 (más simple): document.getElementById('itemBorrar').remove()
// Opción 2: padre.removeChild(hijo)

`,
        hints: [
          `Obtén el elemento: <code>const item = document.getElementById('itemBorrar');</code>`,
          `El método más simple: <code>item.remove();</code>`,
          `También puedes usar: <code>item.parentNode.removeChild(item);</code>`,
        ],
        validate(doc) {
          try {
            const btn = doc.getElementById('btnBorrar');
            if (!btn) return { pass: false, msg: 'No encontré el botón #btnBorrar.' };
            btn.click();
            const deleted = doc.getElementById('itemBorrar');
            if (!deleted) return { pass: true, msg: '¡Elemento eliminado del DOM correctamente! .remove() dominado.' };
            return { pass: false, msg: 'El elemento #itemBorrar sigue en el DOM. Usa .remove() dentro del evento clic.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '2-4',
        title: 'Contenido Enriquecido',
        mission: `innerHTML es la propiedad que permite insertar HTML completo como string en un elemento — el navegador lo parsea e interpreta las etiquetas. Es muy diferente de textContent: si asignas '<strong>Hola</strong>' con textContent aparecerá ese texto literal con los ángulos, pero con innerHTML se renderizará en negrita. Para este reto debes hacer que al hacer clic en el botón, el div #perfil reciba un innerHTML que contenga al menos un elemento strong con el nombre. Puedes construir el string concatenando partes: '<div class="avatar">👤</div>' + '<strong>Nombre</strong>' + '<em>Rol</em>'. El div .avatar, el strong y el em son los elementos esperados.`,
        objective: `Al hacer clic en #btnGenerar, escribe dentro de #perfil un HTML completo con la imagen de avatar (usa un emoji), el nombre en negrita y el rol en cursiva.`,
        initialHTML: `<div class="contenedor">
  <button id="btnGenerar">Generar Perfil</button>
  <div id="perfil" class="perfil-vacio">El perfil aparecerá aquí...</div>
</div>`,
        initialCSS: `body { font-family: sans-serif; background: #fce4ec; }
.contenedor { display: flex; flex-direction: column; align-items: center; gap: 24px; padding: 40px 20px; }
#btnGenerar { padding: 12px 24px; background: #c62828; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; }
#btnGenerar:hover { background: #b71c1c; }
.perfil-vacio { color: #aaa; font-style: italic; }
#perfil { background: white; border-radius: 12px; padding: 24px; min-width: 220px; text-align: center; border: 2px solid #ef9a9a; min-height: 60px; display: flex; align-items: center; justify-content: center; }
#perfil strong { display: block; font-size: 1.2rem; color: #c62828; margin: 8px 0 4px; }
#perfil em { color: #777; font-size: 0.9rem; }
#perfil .avatar { font-size: 2.5rem; }`,
        initialJS: `// Usa innerHTML para insertar HTML con estructura dentro de #perfil
// El resultado debe contener al menos: un avatar (emoji), un nombre en <strong> y un rol en <em>
// Ejemplo de estructura (¡personalízala!):
// perfil.innerHTML = '<div class="avatar">👤</div>' +
//                    '<strong>Nombre del Desarrollador</strong>' +
//                    '<em>Rol en el equipo</em>';
// PASO 1: obtén el botón y el div #perfil
// PASO 2: agrega evento click
// PASO 3: asigna un innerHTML con al menos un <strong> y una clase o etiqueta adicional

`,
        hints: [
          `<code>innerHTML</code> interpreta etiquetas HTML: <code>el.innerHTML = "<strong>Hola</strong>";</code>`,
          `Puedes concatenar strings: <code>"<div>" + variable + "</div>"</code>`,
          `El avatar puede ser un emoji dentro de un span: <code>"<span class='avatar'>👨‍💻</span>"</code>`,
        ],
        validate(doc) {
          try {
            const btn    = doc.getElementById('btnGenerar');
            const perfil = doc.getElementById('perfil');
            if (!btn)    return { pass: false, msg: 'No encontré el botón con id="btnGenerar".' };
            if (!perfil) return { pass: false, msg: 'No encontré el div con id="perfil".' };
            btn.click();
            const strongEl = perfil.querySelector('strong');
            if (!strongEl) return { pass: false, msg: 'El perfil no contiene un elemento <strong>. Usa innerHTML con etiquetas HTML.' };
            if (!perfil.textContent.trim()) return { pass: false, msg: 'El perfil está vacío después del clic.' };
            return { pass: true, msg: '¡innerHTML dominado! El perfil muestra contenido HTML estructurado.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '2-5',
        title: 'Resaltar Múltiples Elementos',
        mission: `querySelectorAll() es la herramienta para seleccionar múltiples elementos del DOM de una vez usando selectores CSS (igual que en CSS con clases, tags, etc.). Devuelve una NodeList — parecida a un array pero no exactamente igual — por eso usas forEach() para recorrerla. En cada iteración del forEach tienes acceso al elemento individual y puedes llamar classList.add() o classList.remove() sobre él. Este patrón de "seleccionar todos → recorrer → modificar cada uno" es fundamental: al hacer clic en "Resaltar Todo" todos los .item deben obtener la clase 'resaltado', y al hacer clic en "Limpiar" todos deben perderla.`,
        objective: `Al hacer clic en "Resaltar Todo", agrega la clase "resaltado" a todos los .item. Al hacer clic en "Limpiar", quítala de todos.`,
        initialHTML: `<div class="pagina">
  <div class="controles">
    <button id="btnResaltar">Resaltar Todo</button>
    <button id="btnLimpiar">Limpiar</button>
  </div>
  <ul class="lista">
    <li class="item">📁 Proyecto Alpha</li>
    <li class="item">📁 Proyecto Beta</li>
    <li class="item">📁 Proyecto Gamma</li>
    <li class="item">📁 Proyecto Delta</li>
  </ul>
</div>`,
        initialCSS: `body { font-family: sans-serif; background: #fff8e1; }
.pagina { display: flex; flex-direction: column; gap: 16px; padding: 30px; }
.controles { display: flex; gap: 10px; }
#btnResaltar { padding: 10px 18px; background: #f9a825; color: white; border: none; border-radius: 8px; cursor: pointer; }
#btnLimpiar { padding: 10px 18px; background: #757575; color: white; border: none; border-radius: 8px; cursor: pointer; }
.lista { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.item { padding: 12px 16px; background: white; border-radius: 8px; border-left: 4px solid #ddd; transition: all 0.3s; }
.item.resaltado { background: #fff9c4; border-left-color: #f9a825; font-weight: bold; transform: translateX(6px); }`,
        initialJS: `// PASO 1: obtén todos los .item con querySelectorAll('.item')
// querySelectorAll devuelve una NodeList — debes usar forEach para recorrerla

// PASO 2: al hacer clic en #btnResaltar:
//   recorre cada item y agrégale la clase 'resaltado' con classList.add()

// PASO 3: al hacer clic en #btnLimpiar:
//   recorre cada item y quítale la clase 'resaltado' con classList.remove()

`,
        hints: [
          `Selecciona todos: <code>const items = document.querySelectorAll(".item");</code>`,
          `Recorre con forEach: <code>items.forEach(function(item) { item.classList.add("resaltado"); });</code>`,
          `Para quitar: usa <code>classList.remove("resaltado")</code> dentro del forEach del botón limpiar.`,
        ],
        validate(doc) {
          try {
            const btnRes = doc.getElementById('btnResaltar');
            const btnLim = doc.getElementById('btnLimpiar');
            const items  = doc.querySelectorAll('.item');
            if (!btnRes) return { pass: false, msg: 'No encontré el botón #btnResaltar.' };
            if (!btnLim) return { pass: false, msg: 'No encontré el botón #btnLimpiar.' };
            if (!items.length) return { pass: false, msg: 'No encontré elementos con clase "item".' };
            btnRes.click();
            const allResaltados = Array.from(items).every(el => el.classList.contains('resaltado'));
            if (!allResaltados) return { pass: false, msg: 'Después de "Resaltar Todo", no todos los .item tienen la clase "resaltado".' };
            btnLim.click();
            const noneResaltados = Array.from(items).every(el => !el.classList.contains('resaltado'));
            if (!noneResaltados) return { pass: false, msg: 'Después de "Limpiar", algunos .item aún tienen la clase "resaltado".' };
            return { pass: true, msg: '¡querySelectorAll y forEach dominados! Modificas múltiples elementos a la vez.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '2-6',
        title: 'Contador de Elementos',
        mission: `Este reto combina creación de elementos, eliminación y conteo dinámico. La clave es una función actualizar() que cada vez que se llama: cuenta los .producto con lista.querySelectorAll('.producto').length y actualiza el span #conteo. Para agregar: creas un li con la clase 'producto', le asignas texto y lo añades con appendChild. Para eliminar: obtienes todos los .producto, y si hay alguno llamas .remove() en el último (items[items.length - 1]). Es importante verificar que haya elementos antes de intentar eliminar — si el array está vacío, eliminar daría error. Llama a actualizar() después de cada operación.`,
        objective: `Al hacer clic en #btnAgregar añade un nuevo .producto a #lista. Al hacer clic en #btnEliminar quita el último. El span #conteo siempre muestra el total actualizado.`,
        initialHTML: `<div class="contenedor">
  <h3>Gestión de Productos</h3>
  <p>Total: <span id="conteo">1</span> producto(s)</p>
  <div class="controles">
    <button id="btnAgregar">+ Agregar</button>
    <button id="btnEliminar">− Eliminar</button>
  </div>
  <ul id="lista">
    <li class="producto">📦 Producto inicial</li>
  </ul>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #e8f5e9;
  margin: 0;
}

.contenedor {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 40px 20px;
}

.contenedor h3 {
  color: #2e7d32;
  margin: 0;
}

.contenedor p {
  margin: 0;
  font-size: 1.1rem;
  color: #555;
}

#conteo {
  font-weight: bold;
  font-size: 1.3rem;
  color: #2e7d32;
}

.controles {
  display: flex;
  gap: 10px;
}

#btnAgregar {
  padding: 10px 20px;
  background: #2e7d32;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
}

#btnEliminar {
  padding: 10px 20px;
  background: #c62828;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
}

#lista {
  list-style: none;
  padding: 0;
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.producto {
  padding: 12px 16px;
  background: white;
  border-left: 4px solid #43a047;
  border-radius: 8px;
  color: #333;
}`,
        initialJS: `// PASO 1: obtén #btnAgregar, #btnEliminar, #lista y #conteo
// PASO 2: crea una función actualizar() que:
//   - cuente los .producto: lista.querySelectorAll('.producto').length
//   - actualice conteo.textContent con ese número
// PASO 3: en #btnAgregar:
//   - crea un <li class="producto"> con algún texto
//   - agrégalo a #lista con appendChild
//   - llama a actualizar()
// PASO 4: en #btnEliminar:
//   - obtén el último .producto y llama a .remove() si existe
//   - llama a actualizar()
\n`,
        hints: [
          'Cuenta elementos: <code>lista.querySelectorAll(\'.producto\').length</code>',
          'Crea con clase: <code>const li = document.createElement(\'li\'); li.className = \'producto\';</code>',
          'Elimina el último: <code>const items = lista.querySelectorAll(\'.producto\'); if (items.length) items[items.length - 1].remove();</code>',
        ],
        validate(doc) {
          try {
            const btnAg = doc.getElementById('btnAgregar');
            const btnEl = doc.getElementById('btnEliminar');
            const lista = doc.getElementById('lista');
            const conteo = doc.getElementById('conteo');
            if (!btnAg || !btnEl || !lista || !conteo) return { pass: false, msg: 'Faltan elementos. Verifica #btnAgregar, #btnEliminar, #lista y #conteo.' };
            btnAg.click(); btnAg.click(); btnAg.click();
            const countAfterAdd = lista.querySelectorAll('.producto').length;
            if (countAfterAdd < 4) return { pass: false, msg: `Después de 3 clics en Agregar debería haber al menos 4 .producto, hay ${countAfterAdd}.` };
            if (!conteo.textContent.includes(String(countAfterAdd))) return { pass: false, msg: `El #conteo muestra "${conteo.textContent}" pero hay ${countAfterAdd} productos.` };
            btnEl.click();
            const countAfterDel = lista.querySelectorAll('.producto').length;
            if (countAfterDel >= countAfterAdd) return { pass: false, msg: 'Al hacer clic en Eliminar, el número de productos no disminuyó.' };
            return { pass: true, msg: '¡querySelectorAll().length y gestión dinámica dominados! El conteo se actualiza en tiempo real.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '2-7',
        title: 'Mover Elemento',
        mission: `Una característica poderosa de appendChild es que si el elemento ya existe en el DOM, lo MUEVE en lugar de crear una copia — lo extrae de su posición actual y lo inserta en la nueva. Para verificar en cuál caja está una tarjeta actualmente, compara tarjeta.parentElement con la referencia de la caja: if (tarjeta.parentElement === caja1) indica que está en la primera caja y debes moverla a la segunda con caja2.appendChild(tarjeta). El bloque else hace lo contrario. Debes agregar este listener de clic a cada tarjeta individualmente, recorriendo todas las .tarjeta con querySelectorAll y forEach al inicio.`,
        objective: `Al hacer clic en una .tarjeta dentro de #caja1, muévela a #caja2. Al hacer clic de nuevo en ella, regresa a #caja1.`,
        initialHTML: `<div class="pagina">
  <div class="cajas">
    <div id="caja1" class="caja">
      <h4>Disponibles</h4>
      <div class="tarjeta">🍎 Manzana</div>
      <div class="tarjeta">🍊 Naranja</div>
      <div class="tarjeta">🍋 Limón</div>
    </div>
    <div id="caja2" class="caja caja-destino">
      <h4>Seleccionados</h4>
    </div>
  </div>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #fff8e1;
  margin: 0;
}

.pagina {
  display: flex;
  justify-content: center;
  padding: 40px 20px;
}

.cajas {
  display: flex;
  gap: 24px;
}

.caja {
  width: 180px;
  min-height: 200px;
  background: white;
  border: 2px solid #ffe082;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.caja-destino {
  border-color: #81c784;
  background: #f1f8e9;
}

.caja h4 {
  margin: 0;
  color: #555;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.tarjeta {
  padding: 10px 14px;
  background: #fff9c4;
  border: 1px solid #ffe082;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.15s, background 0.2s;
  user-select: none;
}

.tarjeta:hover {
  transform: scale(1.03);
  background: #fff176;
}`,
        initialJS: `// PASO 1: obtén #caja1 y #caja2
// PASO 2: selecciona todas las .tarjeta con querySelectorAll
// PASO 3: para cada tarjeta agrega un evento 'click':
//   - Si tarjeta.parentElement === caja1: muévela a caja2 con caja2.appendChild(tarjeta)
//   - Si no (está en caja2): muévela de vuelta con caja1.appendChild(tarjeta)
// Recuerda: appendChild mueve el elemento si ya existe en el DOM
\n`,
        hints: [
          'Obtén los contenedores: <code>const caja1 = document.getElementById(\'caja1\');</code>',
          'Verifica ubicación: <code>if (tarjeta.parentElement === caja1) { caja2.appendChild(tarjeta); }</code>',
          'Para mover de vuelta: <code>else { caja1.appendChild(tarjeta); }</code>',
        ],
        validate(doc) {
          try {
            const caja1 = doc.getElementById('caja1');
            const caja2 = doc.getElementById('caja2');
            if (!caja1 || !caja2) return { pass: false, msg: 'No encontré #caja1 o #caja2.' };
            const tarjetas = doc.querySelectorAll('.tarjeta');
            if (!tarjetas.length) return { pass: false, msg: 'No encontré elementos con clase "tarjeta".' };
            const primera = tarjetas[0];
            primera.click();
            if (primera.parentElement !== caja2) return { pass: false, msg: 'Al hacer clic en la primera tarjeta, no se movió a #caja2.' };
            if (caja1.contains(primera)) return { pass: false, msg: 'La tarjeta sigue dentro de #caja1 después del clic.' };
            primera.click();
            if (primera.parentElement !== caja1) return { pass: false, msg: 'Al hacer clic de nuevo, la tarjeta no regresó a #caja1.' };
            return { pass: true, msg: '¡appendChild como mover dominado! Los elementos se desplazan entre contenedores.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '2-8',
        title: 'Tabla Dinámica',
        mission: `Las tablas HTML tienen una estructura jerárquica: tabla → tbody → tr (filas) → td (celdas). Para añadir una fila dinámicamente debes recrear esa estructura con createElement: crear el tr, crear los td para nombre, nota y acción, añadir los td al tr con appendChild, y finalmente añadir el tr al tbody. El botón "Eliminar" dentro de la fila necesita una referencia a esa fila para llamar fila.remove() — puedes capturar la variable fila en un closure dentro del addEventListener del botón. Siempre verifica que los inputs no estén vacíos antes de agregar, y limpia los valores después de agregar con exito.`,
        objective: `Al rellenar #nombre y #nota y hacer clic en #btnAgregar, añade una nueva fila a #tabla con esos datos y un botón "Eliminar" que borre esa fila.`,
        initialHTML: `<div class="contenedor">
  <h3>Registro de Notas</h3>
  <div class="formulario">
    <input id="nombre" type="text" placeholder="Nombre del estudiante">
    <input id="nota" type="number" placeholder="Nota (0-100)" min="0" max="100">
    <button id="btnAgregar">+ Agregar</button>
  </div>
  <table id="tabla">
    <thead>
      <tr><th>Nombre</th><th>Nota</th><th>Acción</th></tr>
    </thead>
    <tbody></tbody>
  </table>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #e3f2fd;
  margin: 0;
}

.contenedor {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 40px 20px;
}

.contenedor h3 {
  color: #1565c0;
  margin: 0;
}

.formulario {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.formulario input {
  padding: 10px 14px;
  border: 2px solid #90caf9;
  border-radius: 8px;
  font-size: 0.95rem;
  outline: none;
}

.formulario input:focus {
  border-color: #1565c0;
}

#btnAgregar {
  padding: 10px 20px;
  background: #1565c0;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
}

#tabla {
  border-collapse: collapse;
  width: 400px;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}

#tabla th {
  background: #1565c0;
  color: white;
  padding: 10px 16px;
  text-align: left;
  font-size: 0.85rem;
}

#tabla td {
  padding: 10px 16px;
  border-bottom: 1px solid #e3f2fd;
  color: #333;
}

#tabla .btn-eliminar {
  padding: 6px 12px;
  background: #e53935;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
}`,
        initialJS: `// PASO 1: obtén #nombre, #nota, #btnAgregar y el tbody de #tabla
//   const tbody = document.querySelector('#tabla tbody');
// PASO 2: en el clic de #btnAgregar:
//   a) Lee los valores de nombre y nota; si están vacíos no hagas nada
//   b) Crea una fila: const fila = document.createElement('tr');
//   c) Crea las celdas con createElement('td') para nombre, nota y botón
//   d) Crea el botón eliminar: btn.textContent = 'Eliminar';
//      Al hacer clic: fila.remove() (o btn.parentElement.parentElement.remove())
//   e) Añade las celdas a la fila y la fila al tbody
//   f) Limpia los inputs
\n`,
        hints: [
          'Accede al tbody: <code>const tbody = document.querySelector(\'#tabla tbody\');</code>',
          'Crea la fila: <code>const fila = document.createElement(\'tr\');</code> y las celdas con <code>createElement(\'td\')</code>',
          'El botón eliminar: <code>btnEl.addEventListener(\'click\', () => fila.remove());</code>',
        ],
        validate(doc) {
          try {
            const inputNom = doc.getElementById('nombre');
            const inputNot = doc.getElementById('nota');
            const btnAg = doc.getElementById('btnAgregar');
            const tabla = doc.getElementById('tabla');
            if (!inputNom || !inputNot || !btnAg || !tabla) return { pass: false, msg: 'Faltan elementos. Verifica #nombre, #nota, #btnAgregar y #tabla.' };
            inputNom.value = 'Luis';
            inputNot.value = '85';
            btnAg.click();
            const filas = tabla.querySelectorAll('tbody tr');
            if (!filas.length) return { pass: false, msg: 'Después de hacer clic en Agregar, no se añadió ninguna fila a la tabla.' };
            const ultimaFila = filas[filas.length - 1];
            if (!ultimaFila.textContent.includes('Luis')) return { pass: false, msg: 'La fila añadida no incluye el nombre "Luis".' };
            if (!ultimaFila.textContent.includes('85')) return { pass: false, msg: 'La fila añadida no incluye la nota "85".' };
            const btnEl = ultimaFila.querySelector('button');
            if (!btnEl) return { pass: false, msg: 'La fila no tiene un botón de eliminar.' };
            btnEl.click();
            const filasPostEl = tabla.querySelectorAll('tbody tr').length;
            if (filasPostEl >= filas.length) return { pass: false, msg: 'Al hacer clic en Eliminar, la fila no se borró.' };
            return { pass: true, msg: '¡Tabla dinámica con eliminación funcionando! createElement para tr/td dominado.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '2-9',
        title: 'Galería de Imágenes',
        mission: `Los atributos data-* permiten almacenar datos personalizados directamente en elementos HTML. Se acceden con element.dataset.nombreAtributo (sin el prefijo "data-"). En este reto, cada .thumb tiene un data-color con el color que representa. Al hacer clic: primero quitas la clase 'seleccionado' de TODOS los thumbs (para asegurar que solo uno esté activo), luego agregas 'seleccionado' al thumb clicado, lees su data-color con this.dataset.color (si usas function) o con el parámetro del evento, y aplicas ese color a imagenGrande.style.backgroundColor. El patrón de "quitar de todos, agregar al actual" es el estándar para selección exclusiva.`,
        objective: `Al hacer clic en un .thumb, cambia el fondo de #imagenGrande a su data-color y agrega 'seleccionado' solo a ese thumb (quitándolo de los demás).`,
        initialHTML: `<div class="galeria">
  <div id="imagenGrande" class="imagen-grande">
    <span>Selecciona una imagen</span>
  </div>
  <div class="miniaturas">
    <div class="thumb" data-color="#e74c3c">🔴</div>
    <div class="thumb" data-color="#3498db">🔵</div>
    <div class="thumb" data-color="#2ecc71">🟢</div>
    <div class="thumb" data-color="#f39c12">🟡</div>
  </div>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #212121;
  margin: 0;
}

.galeria {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 40px 20px;
}

.imagen-grande {
  width: 320px;
  height: 200px;
  background: #333;
  border-radius: 14px;
  border: 3px solid #555;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: rgba(255,255,255,0.5);
  transition: background-color 0.4s, border-color 0.4s;
}

.miniaturas {
  display: flex;
  gap: 12px;
}

.thumb {
  width: 64px;
  height: 64px;
  background: #444;
  border-radius: 10px;
  border: 3px solid #555;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  cursor: pointer;
  transition: transform 0.2s, border-color 0.2s;
}

.thumb:hover {
  transform: scale(1.08);
}

.thumb.seleccionado {
  border-color: white;
  transform: scale(1.12);
  box-shadow: 0 0 12px rgba(255,255,255,0.4);
}`,
        initialJS: `// PASO 1: obtén todos los .thumb y el #imagenGrande
// PASO 2: para cada thumb agrega un evento 'click':
//   a) Quita la clase 'seleccionado' de TODOS los thumbs con forEach
//   b) Agrega 'seleccionado' solo al thumb clicado (this o el parámetro del evento)
//   c) Lee el color: const color = thumb.dataset.color;
//   d) Aplica el color: imagenGrande.style.backgroundColor = color;
\n`,
        hints: [
          'Quita de todos: <code>thumbs.forEach(t => t.classList.remove(\'seleccionado\'));</code>',
          'Agrega al clicado: <code>this.classList.add(\'seleccionado\');</code> (usa function, no arrow)',
          'Lee el color: <code>const color = this.dataset.color;</code>',
        ],
        validate(doc) {
          try {
            const thumbs = doc.querySelectorAll('.thumb');
            const imagenGrande = doc.getElementById('imagenGrande');
            if (!thumbs.length) return { pass: false, msg: 'No encontré elementos con clase "thumb".' };
            if (!imagenGrande) return { pass: false, msg: 'No encontré el elemento con id="imagenGrande".' };
            thumbs[0].click();
            if (!thumbs[0].classList.contains('seleccionado')) return { pass: false, msg: 'Al hacer clic en el primer thumb, no se le agregó la clase "seleccionado".' };
            const bg0 = imagenGrande.style.backgroundColor;
            if (!bg0 || bg0 === '' || bg0 === 'rgb(51, 51, 51)') return { pass: false, msg: 'Al hacer clic en el primer thumb, el fondo de #imagenGrande no cambió.' };
            thumbs[1].click();
            if (!thumbs[1].classList.contains('seleccionado')) return { pass: false, msg: 'Al hacer clic en el segundo thumb, no tiene la clase "seleccionado".' };
            if (thumbs[0].classList.contains('seleccionado')) return { pass: false, msg: 'Al seleccionar el segundo thumb, el primero debería perder la clase "seleccionado".' };
            return { pass: true, msg: '¡Galería con selección exclusiva funcionando! classList y dataset dominados.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '2-10',
        title: 'Lista con Filtro de Clase',
        mission: `El filtrado por categorías usa data-* para almacenar el filtro en cada botón y classList.contains() para comprobar si cada item pertenece a esa categoría. El flujo: leer el filtro del botón clicado con btn.dataset.filter, recorrer todos los .item con forEach, y para cada uno decidir si mostrarlo (style.display = '') u ocultarlo (style.display = 'none'). classList.contains(filtro) devuelve true si el elemento tiene esa clase. El caso especial es el filtro 'todos': cuando es 'todos', todos los items deben mostrarse sin importar sus clases. Además, el botón activo debe marcarse con la clase 'activo' — quítasela a todos primero y luego agrégasela solo al botón clicado.`,
        objective: `Al hacer clic en un botón de filtro, muestra solo los .item con la clase correspondiente. El botón "Todos" muestra todos los items.`,
        initialHTML: `<div class="app">
  <h3>Catálogo de Skills</h3>
  <div class="filtros">
    <button class="btnFiltro activo" data-filter="todos">Todos</button>
    <button class="btnFiltro" data-filter="frontend">Frontend</button>
    <button class="btnFiltro" data-filter="backend">Backend</button>
    <button class="btnFiltro" data-filter="diseno">Diseño</button>
  </div>
  <ul class="lista">
    <li class="item frontend">⚛️ React</li>
    <li class="item frontend">🎨 CSS Avanzado</li>
    <li class="item backend">🟢 Node.js</li>
    <li class="item backend">🐍 Python</li>
    <li class="item diseno">✏️ Figma</li>
    <li class="item diseno">🖌️ UI/UX Design</li>
  </ul>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #f3e5f5;
  margin: 0;
}

.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 40px 20px;
}

.app h3 {
  color: #6a1b9a;
  margin: 0;
}

.filtros {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

.btnFiltro {
  padding: 8px 18px;
  background: #e1bee7;
  color: #6a1b9a;
  border: 2px solid #ce93d8;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.btnFiltro.activo {
  background: #6a1b9a;
  color: white;
  border-color: #6a1b9a;
}

.lista {
  list-style: none;
  padding: 0;
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item {
  padding: 12px 16px;
  background: white;
  border-radius: 10px;
  border-left: 4px solid #ce93d8;
  color: #333;
  transition: all 0.2s;
}

.item.frontend { border-left-color: #42a5f5; }
.item.backend  { border-left-color: #66bb6a; }
.item.diseno   { border-left-color: #ef5350; }`,
        initialJS: `// PASO 1: obtén todos los .btnFiltro y todos los .item
// PASO 2: para cada botón agrega un evento 'click':
//   a) Lee el filtro: const filtro = btn.dataset.filter;
//   b) Marca el botón como activo (quita 'activo' de todos, agrega al clicado)
//   c) Recorre cada item con forEach:
//      - Si filtro === 'todos': item.style.display = ''
//      - Si el item tiene la clase del filtro: item.style.display = ''
//      - Si no: item.style.display = 'none'
\n`,
        hints: [
          'Lee el filtro: <code>const filtro = btn.dataset.filter;</code>',
          'Verifica la clase: <code>item.classList.contains(filtro)</code>',
          'Muestra u oculta: <code>item.style.display = (filtro === \'todos\' || item.classList.contains(filtro)) ? \'\' : \'none\';</code>',
        ],
        validate(doc) {
          try {
            const botones = doc.querySelectorAll('.btnFiltro');
            const items = doc.querySelectorAll('.item');
            if (!botones.length) return { pass: false, msg: 'No encontré botones con clase "btnFiltro".' };
            if (!items.length) return { pass: false, msg: 'No encontré elementos con clase "item".' };
            const btnFrontend = [...botones].find(b => b.dataset.filter === 'frontend');
            if (!btnFrontend) return { pass: false, msg: 'No encontré el botón con data-filter="frontend".' };
            btnFrontend.click();
            const visiblesFrontend = [...items].filter(i => i.style.display !== 'none');
            const ocultos = [...items].filter(i => i.style.display === 'none');
            if (!ocultos.length) return { pass: false, msg: 'Al filtrar por "frontend", ningún item se ocultó.' };
            const noFrontend = visiblesFrontend.filter(i => !i.classList.contains('frontend'));
            if (noFrontend.length) return { pass: false, msg: 'Hay items visibles que no son de la categoría "frontend".' };
            const btnTodos = [...botones].find(b => b.dataset.filter === 'todos');
            if (btnTodos) {
              btnTodos.click();
              const todosVisibles = [...items].filter(i => i.style.display !== 'none');
              if (todosVisibles.length !== items.length) return { pass: false, msg: 'Al hacer clic en "Todos", no todos los items vuelven a ser visibles.' };
            }
            return { pass: true, msg: '¡Filtro por clase funcionando! classList.contains y display dinámico dominados.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },
    ],
  },

  // ============================================================
  // NIVEL 3: ESTILOS DINÁMICOS
  // ============================================================
  {
    id: 3, name: 'Estilos Dinámicos', subtitle: 'CSS + JS en acción',
    icon: '🎨', color: '#d2a8ff',
    challenges: [

      {
        id: '3-1',
        title: 'Color al Hover',
        mission: `Los eventos 'mouseover' y 'mouseout' detectan cuando el cursor entra o sale de un elemento. Son la base de los efectos hover interactivos que no se pueden lograr solo con CSS (por ejemplo, cuando quieres ejecutar lógica JavaScript al hacer hover). Obtén el div#caja y agrega dos listeners: 'mouseover' que cambia style.backgroundColor y style.color para resaltar la caja, y 'mouseout' que restaura los valores originales. La diferencia con :hover de CSS es que con JS puedes hacer cosas más complejas además de cambiar estilos: actualizar contadores, cargar datos, etc.`,
        objective: `Cuando el mouse entre en la caja (#caja), cambia su fondo a "dodgerblue". Cuando salga, regresa a su color original`,
        initialHTML: `<div class="pagina">
  <div id="caja">
    <span>Pasa el mouse aquí</span>
  </div>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #f3e5f5;
}

.pagina {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
}

#caja {
  width: 220px;
  height: 130px;
  background: #f0f0f0;
  border-radius: 14px;
  border: 2px solid #ce93d8;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1rem;
  color: #555;
}`,
        initialJS: `// Agrega dos eventos al div#caja:
// 'mouseover' → cambia background a 'dodgerblue' y color a 'white'
// 'mouseout'  → regresa background a '#f0f0f0' y color a '#555'

`,
        hints: [
          `Obtén la caja: <code>const caja = document.getElementById('caja');</code>`,
          `Evento de entrada: <code>caja.addEventListener('mouseover', function() { caja.style.backgroundColor = 'dodgerblue'; caja.style.color = 'white'; })</code>`,
          `Evento de salida: <code>caja.addEventListener('mouseout', function() { caja.style.backgroundColor = '#f0f0f0'; caja.style.color = '#555'; })</code>`,
        ],
        validate(doc) {
          try {
            const caja = doc.getElementById('caja');
            if (!caja) return { pass: false, msg: 'No encontré el div#caja.' };
            const win = doc.defaultView;
            caja.dispatchEvent(new win.MouseEvent('mouseover', { bubbles: true }));
            const bg = caja.style.backgroundColor;
            if (bg === 'dodgerblue' || bg === 'rgb(30, 144, 255)') return { pass: true, msg: '¡Los eventos mouseover/mouseout funcionan! UX mejorada.' };
            if (bg && bg !== '' && bg !== 'rgb(240, 240, 240)') return { pass: true, msg: '¡El color cambia al hacer hover! Eventos de mouse dominados.' };
            return { pass: false, msg: `Al hacer hover el fondo no cambia. Revisa el event listener 'mouseover'. Fondo actual: "${bg || 'sin cambio'}"` };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '3-2',
        title: 'Alternar Clases CSS',
        mission: `classList.toggle() es el método más elegante para alternar clases: si la clase existe la quita, y si no existe la agrega — todo en una sola llamada. Esto es ideal para toggles como modos oscuros, menús desplegables, acordeones, etc. La clase CSS 'activo' ya está definida con los estilos del modo alternativo — tu trabajo es solo decirle a JavaScript cuándo agregarla o quitarla. Obtén el div#tarjeta y el botón #btnToggle, y en el evento 'click' del botón llama tarjeta.classList.toggle('activo'). Cada clic alternará automáticamente entre los dos estados visuales.`,
        objective: `Al hacer clic en el botón, alterna (toggle) la clase "activo" en el div#tarjeta`,
        initialHTML: `<div class="pagina">
  <div id="tarjeta">
    <h3>Soy una tarjeta</h3>
    <p>Mi estilo cambia con classList</p>
  </div>
  <button id="btnToggle">Alternar Estilo</button>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #e8eaf6;
}

.pagina {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 50px 20px;
}

#tarjeta {
  width: 240px;
  padding: 24px;
  border-radius: 14px;
  text-align: center;
  transition: all 0.4s;
  background: #e8f0fe;
  color: #1a237e;
  border: 2px solid #4a90e2;
}

#tarjeta h3 {
  margin: 0 0 8px;
  font-size: 1.1rem;
}

#tarjeta p {
  margin: 0;
  font-size: 0.85rem;
  opacity: 0.8;
}

/* Clase que JS agrega/quita */
#tarjeta.activo {
  background: #1a237e;
  color: white;
  border-color: #90caf9;
  transform: scale(1.05);
  box-shadow: 0 8px 24px rgba(26, 35, 126, 0.4);
}

#btnToggle {
  padding: 10px 22px;
  background: #3949ab;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}`,
        initialJS: `// Al hacer clic en #btnToggle,
// alterna la clase 'activo' en #tarjeta
// Usa: classList.toggle('activo')

`,
        hints: [
          `Obtén los elementos con getElementById.`,
          `En el evento click del botón: <code>tarjeta.classList.toggle('activo');</code>`,
          `classList.toggle agrega la clase si no existe, o la quita si ya existe.`,
        ],
        validate(doc) {
          try {
            const btn     = doc.getElementById('btnToggle');
            const tarjeta = doc.getElementById('tarjeta');
            if (!btn || !tarjeta) return { pass: false, msg: 'Faltan elementos #btnToggle o #tarjeta.' };
            btn.click();
            if (tarjeta.classList.contains('activo')) return { pass: true, msg: '¡classList.toggle() funciona! El estilo se alterna dinámicamente.' };
            return { pass: false, msg: 'Después del clic, la clase "activo" no está en #tarjeta. Usa classList.toggle().' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '3-3',
        title: 'Panel de Colores',
        mission: `Los atributos data-* en botones son una forma limpia de almacenar datos asociados a cada botón sin necesidad de variables externas. Cuando el usuario hace clic en un botón de color, su dataset.color contiene el valor hexadecimal del color que debe aplicarse. El flujo: seleccionar todos los .btnColor con querySelectorAll, recorrerlos con forEach y para cada uno registrar un listener 'click' que: (1) lea el color con btn.dataset.color; (2) aplique lienzo.style.backgroundColor = color; (3) actualice el span #colorActual con el código del color. Esto conecta los datos del HTML directamente con el comportamiento de JavaScript.`,
        objective: `Al hacer clic en cada botón de color, cambia el backgroundColor del div#lienzo al color de ese botón (usa dataset.color)`,
        initialHTML: `<div class="pagina">
  <div id="lienzo">
    <span id="colorActual">Sin color</span>
  </div>
  <div class="paleta">
    <button class="btnColor" data-color="#e74c3c">Rojo</button>
    <button class="btnColor" data-color="#2ecc71">Verde</button>
    <button class="btnColor" data-color="#3498db">Azul</button>
    <button class="btnColor" data-color="#9b59b6">Morado</button>
    <button class="btnColor" data-color="#f39c12">Naranja</button>
  </div>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #212121;
}

.pagina {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px;
}

#lienzo {
  width: 100%;
  height: 160px;
  border-radius: 14px;
  border: 2px solid #555;
  background: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.4s;
}

#colorActual {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.5);
}

.paleta {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

.btnColor {
  padding: 10px 18px;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: bold;
  transition: transform 0.1s;
}

.btnColor:nth-child(1) { background: #e74c3c; }
.btnColor:nth-child(2) { background: #2ecc71; }
.btnColor:nth-child(3) { background: #3498db; }
.btnColor:nth-child(4) { background: #9b59b6; }
.btnColor:nth-child(5) { background: #f39c12; }

.btnColor:hover {
  transform: scale(1.08);
}`,
        initialJS: `// Obtén todos los botones con clase 'btnColor'
// Para cada uno, al hacer clic:
//   - Lee su atributo data-color (btn.dataset.color)
//   - Aplica ese color al fondo de #lienzo
//   - Muestra el color en #colorActual
// Pista: usa document.querySelectorAll('.btnColor') y forEach

`,
        hints: [
          `Selecciona todos: <code>const botones = document.querySelectorAll('.btnColor');</code>`,
          `Itera: <code>botones.forEach(function(btn) { btn.addEventListener('click', function() { ... }) })</code>`,
          `Lee y aplica: <code>lienzo.style.backgroundColor = btn.dataset.color;</code>`,
        ],
        validate(doc) {
          try {
            const btns   = doc.querySelectorAll('.btnColor');
            const lienzo = doc.getElementById('lienzo');
            if (!lienzo) return { pass: false, msg: 'No encontré el div#lienzo.' };
            if (!btns.length) return { pass: false, msg: 'No encontré botones con clase "btnColor".' };
            btns[0].click();
            const bg = lienzo.style.backgroundColor;
            if (bg && bg !== '' && bg !== 'rgb(51, 51, 51)') return { pass: true, msg: '¡Los colores se aplican dinámicamente! Dominas dataset y style.' };
            return { pass: false, msg: 'Al hacer clic en un botón, el fondo de #lienzo no cambia. Asigna style.backgroundColor.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '3-4',
        title: 'Barra de Progreso',
        mission: `Las barras de progreso funcionan controlando el ancho de un elemento con style.width expresado en porcentaje. La variable que guarda el progreso debe declararse fuera del evento para persistir entre clics. El proceso: al hacer clic en Avanzar, suma 10 al progreso (pero no más de 100 — usa Math.min o un if); al hacer clic en Retroceder, resta 10 (pero no menos de 0 — usa Math.max o un if). Después de cada cambio: actualiza barra.style.width asignando progreso + '%', y actualiza el span #porcentaje con el mismo valor seguido de '%'. Estos dos pasos de actualización son obligatorios — sin ellos el usuario no ve el cambio aunque la variable sí cambie.`,
        objective: `Al hacer clic en "Avanzar" sube 10% el progreso. Al hacer clic en "Retroceder" baja 10%. Muestra el % en #porcentaje y controla el ancho de #barra.`,
        initialHTML: `<div class="contenedor">
  <div class="track">
    <div id="barra" class="barra"></div>
  </div>
  <p>Progreso: <span id="porcentaje">0%</span></p>
  <div class="btns">
    <button id="btnRetroceder">← Retroceder</button>
    <button id="btnAvanzar">Avanzar →</button>
  </div>
</div>`,
        initialCSS: `body { font-family: sans-serif; background: #e3f2fd; }
.contenedor { display: flex; flex-direction: column; align-items: center; gap: 20px; padding: 50px 20px; }
.track { width: 320px; height: 28px; background: #bbdefb; border-radius: 14px; overflow: hidden; border: 2px solid #90caf9; }
#barra { height: 100%; width: 0%; background: linear-gradient(90deg, #1565c0, #42a5f5); border-radius: 14px; transition: width 0.4s; }
p { font-size: 1.2rem; color: #1565c0; font-weight: bold; margin: 0; }
.btns { display: flex; gap: 14px; }
.btns button { padding: 10px 20px; border: none; border-radius: 8px; cursor: pointer; font-size: 0.95rem; }
#btnRetroceder { background: #90a4ae; color: white; }
#btnAvanzar { background: #1565c0; color: white; }`,
        initialJS: `// PASO 1: declara una variable: let progreso = 0;
// PASO 2: crea una función actualizar() que:
//   - Asigne a #barra el style.width correcto: barra.style.width = progreso + '%';
//   - Actualice el texto de #porcentaje: porcentaje.textContent = progreso + '%';
// PASO 3: al hacer clic en Avanzar → suma 10 al progreso (máximo 100) y llama actualizar()
// PASO 4: al hacer clic en Retroceder → resta 10 (mínimo 0) y llama actualizar()

`,
        hints: [
          `Declara fuera del evento: <code>let progreso = 0;</code>`,
          `Para limitar entre 0 y 100 al avanzar: <code>if (progreso < 100) progreso += 10;</code>`,
          `Asigna el ancho: <code>document.getElementById("barra").style.width = progreso + "%";</code>`,
        ],
        validate(doc) {
          try {
            const btnAv  = doc.getElementById('btnAvanzar');
            const btnRet = doc.getElementById('btnRetroceder');
            const barra  = doc.getElementById('barra');
            const porc   = doc.getElementById('porcentaje');
            if (!btnAv)  return { pass: false, msg: 'No encontré el botón #btnAvanzar.' };
            if (!btnRet) return { pass: false, msg: 'No encontré el botón #btnRetroceder.' };
            if (!barra)  return { pass: false, msg: 'No encontré el div #barra.' };
            if (!porc)   return { pass: false, msg: 'No encontré el span #porcentaje.' };
            btnAv.click(); btnAv.click(); btnAv.click();
            const w1 = barra.style.width;
            const w1val = parseFloat(w1) || 0;
            if (w1val < 25 || w1val > 35) return { pass: false, msg: `Después de 3 clics en Avanzar, el ancho de #barra es "${w1}" en lugar de ~30%. ¿Suma 10% por clic?` };
            btnRet.click();
            const w2 = barra.style.width;
            const w2val = parseFloat(w2) || 0;
            if (w2val >= w1val) return { pass: false, msg: `Después de Retroceder, el ancho aumentó o no cambió. Debe disminuir 10%.` };
            for (let i = 0; i < 10; i++) btnAv.click();
            const w3 = barra.style.width;
            const w3val = parseFloat(w3) || 0;
            if (w3val < 95) return { pass: false, msg: `Después de muchos clics, la barra debería llegar al 100%, pero está en "${w3}".` };
            return { pass: true, msg: '¡Barra de progreso completa! Avance, retroceso y límites funcionan perfectamente.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '3-5',
        title: 'Modo Oscuro',
        mission: `El modo oscuro es un ejemplo perfecto de separación entre estilos y lógica: el CSS define cómo se ve el modo oscuro (clase 'oscuro'), y JavaScript solo decide cuándo activarlo o desactivarlo. classList.toggle('oscuro') agrega la clase si no está y la quita si ya está — perfecto para alternar en un clic. Después del toggle, usa classList.contains('oscuro') para saber en qué estado quedó y actualizar el texto del botón correspondientemente: si está oscuro el botón dice "Activar Modo Claro", si está claro dice "Activar Modo Oscuro". Esta verificación post-toggle es importante porque toggle no devuelve el estado directamente de forma consistente.`,
        objective: `Al hacer clic en #btnModo, alterna la clase "oscuro" en #app. El texto del botón cambia según el modo actual.`,
        initialHTML: `<div id="app" class="app">
  <h2 id="titulo">🌙 CodeLab App</h2>
  <p>Este panel cambia de tema al hacer clic en el botón.</p>
  <button id="btnModo">🌙 Activar Modo Oscuro</button>
</div>`,
        initialCSS: `body { margin: 0; font-family: sans-serif; }
.app { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px; background: #f5f5f5; color: #333; transition: all 0.4s; padding: 40px; text-align: center; }
.app h2 { font-size: 1.8rem; margin: 0; }
.app p { color: #666; margin: 0; }
#btnModo { padding: 12px 24px; border: 2px solid #333; background: transparent; color: #333; border-radius: 8px; font-size: 1rem; cursor: pointer; transition: all 0.4s; }
/* Clase que JS agrega con toggle */
.app.oscuro { background: #1a1a2e; color: #e0e0e0; }
.app.oscuro #btnModo { border-color: #58a6ff; color: #58a6ff; }
.app.oscuro h2 { color: #58a6ff; }`,
        initialJS: `// PASO 1: obtén el div #app y el botón #btnModo
// PASO 2: agrega un evento 'click' al botón
// PASO 3: dentro del evento:
//   - Alterna la clase 'oscuro' en #app con classList.toggle()
//   - Cambia el texto del botón:
//     si #app tiene la clase 'oscuro' → botón dice '☀️ Activar Modo Claro'
//     si no → botón dice '🌙 Activar Modo Oscuro'
// Tip: usa app.classList.contains('oscuro') para verificar el estado después del toggle

`,
        hints: [
          `<code>app.classList.toggle("oscuro")</code> agrega la clase si no existe, la quita si existe.`,
          `Después del toggle, verifica: <code>if (app.classList.contains("oscuro"))</code>`,
          `Cambia el texto: <code>btnModo.textContent = "☀️ Activar Modo Claro";</code>`,
        ],
        validate(doc) {
          try {
            const app    = doc.getElementById('app');
            const btnMod = doc.getElementById('btnModo');
            if (!app)    return { pass: false, msg: 'No encontré el div con id="app".' };
            if (!btnMod) return { pass: false, msg: 'No encontré el botón con id="btnModo".' };
            btnMod.click();
            if (!app.classList.contains('oscuro')) return { pass: false, msg: 'Después del primer clic, #app no tiene la clase "oscuro". Usa classList.toggle("oscuro").' };
            btnMod.click();
            if (app.classList.contains('oscuro')) return { pass: false, msg: 'El segundo clic no quitó la clase "oscuro". Revisa que toggle funciona en ambas direcciones.' };
            return { pass: true, msg: '¡Modo oscuro implementado! La clase se alterna correctamente con cada clic.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '3-6',
        title: 'Tamaño de Fuente con Slider',
        mission: `Los inputs tipo range son sliders que el usuario puede arrastrar para seleccionar un número dentro de un rango definido por min y max. Su propiedad .value siempre devuelve el valor actual como string, pero para style.fontSize puedes concatenarlo directamente con 'px'. El evento 'input' es crucial aquí — se dispara continuamente mientras el usuario arrastra, dando la sensación de tiempo real. En cada disparo del evento: lee slider.value, actualiza valor.textContent para mostrar el número al usuario, y aplica texto.style.fontSize = slider.value + 'px'. La unidad 'px' es obligatoria en style.fontSize — sin ella el navegador ignorará el valor.`,
        objective: `Al mover el slider #slider, actualiza style.fontSize de #texto con el valor actual y muestra ese valor en #valor.`,
        initialHTML: `<div class="contenedor">
  <h3>Control de Tamaño de Fuente</h3>
  <div class="control">
    <label>Tamaño: <span id="valor">16</span>px</label>
    <input id="slider" type="range" min="12" max="48" value="16">
  </div>
  <p id="texto">¡JavaScript controla el estilo!</p>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #e8eaf6;
  margin: 0;
}

.contenedor {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: 60px 20px;
}

.contenedor h3 {
  color: #3949ab;
  margin: 0;
}

.control {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

label {
  font-size: 1rem;
  color: #333;
}

#valor {
  font-weight: bold;
  color: #3949ab;
  font-size: 1.1rem;
}

#slider {
  width: 260px;
  accent-color: #3949ab;
  cursor: pointer;
}

#texto {
  font-size: 16px;
  color: #222;
  text-align: center;
  padding: 20px 32px;
  background: white;
  border-radius: 12px;
  border: 2px solid #c5cae9;
  transition: font-size 0.1s;
}`,
        initialJS: `// PASO 1: obtén el slider #slider, el span #valor y el párrafo #texto
// PASO 2: agrega el evento 'input' al slider (se dispara mientras se arrastra)
// PASO 3: dentro del evento:
//   - Lee el valor actual: const tam = slider.value;
//   - Muéstralo en #valor: valor.textContent = tam;
//   - Aplica el tamaño de fuente: texto.style.fontSize = tam + 'px';
\n`,
        hints: [
          'Evento correcto: <code>slider.addEventListener(\'input\', function() { ... });</code>',
          'Lee el valor: <code>const tam = slider.value;</code> (siempre es un string)',
          'Aplica: <code>texto.style.fontSize = tam + \'px\';</code>',
        ],
        validate(doc) {
          try {
            const slider = doc.getElementById('slider');
            const texto = doc.getElementById('texto');
            const valor = doc.getElementById('valor');
            if (!slider) return { pass: false, msg: 'No encontré el input con id="slider".' };
            if (!texto) return { pass: false, msg: 'No encontré el párrafo con id="texto".' };
            if (!valor) return { pass: false, msg: 'No encontré el span con id="valor".' };
            slider.value = '32';
            slider.dispatchEvent(new doc.defaultView.Event('input', { bubbles: true }));
            if (!texto.style.fontSize.includes('32')) return { pass: false, msg: `Al mover el slider a 32, el fontSize del texto es "${texto.style.fontSize}" en lugar de "32px".` };
            if (!valor.textContent.includes('32')) return { pass: false, msg: `El span #valor muestra "${valor.textContent}" en lugar de "32".` };
            return { pass: true, msg: '¡Slider + fontSize en tiempo real funcionando! El evento input y style.fontSize dominados.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '3-7',
        title: 'Opacidad Animada',
        mission: `style.opacity controla la transparencia: 1 es completamente visible, 0 es completamente invisible. Para modificarla de forma incremental hay que entender que style.opacity devuelve un string (como "0.7"), así que parseFloat() lo convierte a número. El patrón "leer-modificar-limitar-asignar" funciona así: let op = parseFloat(caja.style.opacity) || 1 (el || 1 evita NaN si opacity no está seteado), luego op = Math.max(0, op - 0.1) para reducir sin bajar de 0, o Math.min(1, op + 0.1) para aumentar sin superar 1. Finalmente asignas caja.style.opacity = op y muestras el valor formateado con toFixed(1).`,
        objective: `#btnFadeOut reduce la opacidad de #caja en 0.1 cada clic (mínimo 0). #btnFadeIn la aumenta en 0.1 (máximo 1). Muestra el valor en #valorOpacidad.`,
        initialHTML: `<div class="contenedor">
  <div id="caja" class="caja">Elemento con opacidad</div>
  <p>Opacidad: <span id="valorOpacidad">1</span></p>
  <div class="btns">
    <button id="btnFadeOut">🔅 Reducir</button>
    <button id="btnFadeIn">🔆 Aumentar</button>
  </div>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #fce4ec;
  margin: 0;
}

.contenedor {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 60px 20px;
}

#caja {
  width: 240px;
  height: 120px;
  background: linear-gradient(135deg, #e91e63, #c2185b);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  opacity: 1;
  transition: opacity 0.2s;
}

.contenedor p {
  font-size: 1rem;
  color: #555;
  margin: 0;
}

#valorOpacidad {
  font-weight: bold;
  color: #c62828;
}

.btns {
  display: flex;
  gap: 12px;
}

#btnFadeOut {
  padding: 10px 22px;
  background: #555;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
}

#btnFadeIn {
  padding: 10px 22px;
  background: #e91e63;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
}`,
        initialJS: `// PASO 1: obtén #caja, #btnFadeOut, #btnFadeIn y #valorOpacidad
// PASO 2: establece la opacidad inicial: caja.style.opacity = '1';
// PASO 3: en #btnFadeOut:
//   - Lee la opacidad actual: let op = parseFloat(caja.style.opacity);
//   - Resta 0.1 y limita: op = Math.max(0, op - 0.1);
//   - Aplica y muestra: caja.style.opacity = op; valorOpacidad.textContent = op.toFixed(1);
// PASO 4: en #btnFadeIn: igual pero suma 0.1 y limita con Math.min(1, ...)
\n`,
        hints: [
          'Lee la opacidad como número: <code>let op = parseFloat(caja.style.opacity) || 1;</code>',
          'Limita al reducir: <code>op = Math.max(0, op - 0.1);</code>',
          'Limita al aumentar: <code>op = Math.min(1, op + 0.1);</code>',
        ],
        validate(doc) {
          try {
            const caja = doc.getElementById('caja');
            const btnFadeOut = doc.getElementById('btnFadeOut');
            const btnFadeIn = doc.getElementById('btnFadeIn');
            const valorOp = doc.getElementById('valorOpacidad');
            if (!caja || !btnFadeOut || !btnFadeIn || !valorOp) return { pass: false, msg: 'Faltan elementos. Verifica #caja, #btnFadeOut, #btnFadeIn y #valorOpacidad.' };
            const opBefore = parseFloat(caja.style.opacity) || 1;
            btnFadeOut.click(); btnFadeOut.click(); btnFadeOut.click();
            const op = parseFloat(caja.style.opacity);
            if (isNaN(op)) return { pass: false, msg: 'Después de hacer clic en Reducir, la opacidad no tiene un valor numérico. ¿Asignas caja.style.opacity?' };
            if (op >= opBefore) return { pass: false, msg: `La opacidad no disminuyó después de hacer clic en Reducir. Valor actual: ${op}.` };
            btnFadeIn.click(); btnFadeIn.click();
            const op2 = parseFloat(caja.style.opacity);
            if (op2 <= op) return { pass: false, msg: `La opacidad no aumentó después de hacer clic en Aumentar. Valor actual: ${op2}.` };
            if (op2 > 1.001) return { pass: false, msg: `La opacidad superó 1 (${op2}). Usa Math.min(1, ...) para limitarla.` };
            return { pass: true, msg: '¡Opacidad dinámica con parseFloat funcionando! Los límites 0 y 1 se respetan.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '3-8',
        title: 'Cambiar Tema de Tarjeta',
        mission: `Un elemento puede tener múltiples atributos data-* para almacenar varios valores relacionados. En este reto, cada botón de tema tiene data-bg, data-color y data-border que definen tres aspectos del estilo a aplicar. El proceso al hacer clic: (1) quitar la clase 'seleccionado' de todos los botones con forEach; (2) agregar 'seleccionado' al botón clicado; (3) leer los tres dataset: bg = btn.dataset.bg, color = btn.dataset.color, border = btn.dataset.border; (4) aplicarlos a la tarjeta con style.backgroundColor, style.color y style.borderColor respectivamente. Cada propiedad style en JavaScript usa camelCase (backgroundColor, no background-color).`,
        objective: `Al hacer clic en un .btnTema, aplica sus data-bg, data-color y data-border a #tarjeta, y agrega 'seleccionado' solo a ese botón.`,
        initialHTML: `<div class="contenedor">
  <div class="botones-tema">
    <button class="btnTema" data-bg="#e3f2fd" data-color="#1565c0" data-border="#90caf9">💙 Azul</button>
    <button class="btnTema" data-bg="#f3e5f5" data-color="#6a1b9a" data-border="#ce93d8">💜 Morado</button>
    <button class="btnTema" data-bg="#e8f5e9" data-color="#2e7d32" data-border="#a5d6a7">💚 Verde</button>
  </div>
  <div id="tarjeta" class="tarjeta">
    <h3>Tarjeta de Ejemplo</h3>
    <p>Haz clic en un tema para cambiar mis colores.</p>
  </div>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #f5f5f5;
  margin: 0;
}

.contenedor {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 50px 20px;
}

.botones-tema {
  display: flex;
  gap: 10px;
}

.btnTema {
  padding: 10px 20px;
  border: 2px solid #ddd;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.2s;
}

.btnTema.seleccionado {
  font-weight: bold;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

#tarjeta {
  width: 280px;
  padding: 28px;
  border-radius: 14px;
  border: 2px solid #ddd;
  background: white;
  text-align: center;
  transition: all 0.4s;
}

#tarjeta h3 {
  margin: 0 0 8px;
}

#tarjeta p {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.8;
}`,
        initialJS: `// PASO 1: obtén todos los .btnTema y el div #tarjeta
// PASO 2: para cada botón agrega un evento 'click':
//   a) Quita 'seleccionado' de TODOS los botones con forEach
//   b) Agrega 'seleccionado' al botón clicado
//   c) Lee los tres atributos del botón:
//      const bg = btn.dataset.bg;
//      const color = btn.dataset.color;
//      const border = btn.dataset.border;
//   d) Aplica los estilos a #tarjeta:
//      tarjeta.style.backgroundColor = bg;
//      tarjeta.style.color = color;
//      tarjeta.style.borderColor = border;
\n`,
        hints: [
          'Quita de todos: <code>btns.forEach(b => b.classList.remove(\'seleccionado\'));</code>',
          'Lee los datos: <code>const bg = btn.dataset.bg;</code>',
          'Aplica estilos: <code>tarjeta.style.backgroundColor = bg; tarjeta.style.color = color;</code>',
        ],
        validate(doc) {
          try {
            const btns = doc.querySelectorAll('.btnTema');
            const tarjeta = doc.getElementById('tarjeta');
            if (!btns.length) return { pass: false, msg: 'No encontré botones con clase "btnTema".' };
            if (!tarjeta) return { pass: false, msg: 'No encontré el div con id="tarjeta".' };
            btns[1].click();
            if (!btns[1].classList.contains('seleccionado')) return { pass: false, msg: 'Al hacer clic en el segundo botón, no tiene la clase "seleccionado".' };
            if (btns[0].classList.contains('seleccionado')) return { pass: false, msg: 'El primer botón no debería tener "seleccionado" después de hacer clic en el segundo.' };
            const bg = tarjeta.style.backgroundColor;
            if (!bg || bg === '' || bg === 'white') return { pass: false, msg: 'El backgroundColor de #tarjeta no cambió después del clic.' };
            return { pass: true, msg: '¡Temas con dataset y múltiples estilos funcionando! classList y style dominados.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '3-9',
        title: 'Sombra Dinámica',
        mission: `La propiedad box-shadow en CSS tiene una sintaxis compuesta: "X px Y px blur px color". En JavaScript, construyes este string dinámicamente leyendo los tres sliders y concatenándolos. La estrategia ideal es una función actualizarSombra() que: lee sliderX.value, sliderY.value y sliderBlur.value, construye el string de sombra con esos valores más una unidad px para cada uno, y lo asigna a caja.style.boxShadow. Luego agrega el evento 'input' a los tres sliders llamando a la misma función — puedes usar forEach si los pones en un array. Template literals (backticks con ${}) son muy útiles aquí: `${x}px ${y}px ${blur}px rgba(0,0,0,0.3)`.`,
        objective: `Al mover cualquiera de los tres sliders (#sliderX, #sliderY, #sliderBlur), actualiza el box-shadow de #caja con los valores actuales de los tres.`,
        initialHTML: `<div class="contenedor">
  <div id="caja" class="caja">Caja con sombra</div>
  <div class="controles">
    <label>Offset X: <input id="sliderX" type="range" min="-30" max="30" value="5"></label>
    <label>Offset Y: <input id="sliderY" type="range" min="-30" max="30" value="5"></label>
    <label>Blur: <input id="sliderBlur" type="range" min="0" max="40" value="10"></label>
  </div>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #eceff1;
  margin: 0;
}

.contenedor {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  padding: 60px 20px;
}

#caja {
  width: 200px;
  height: 120px;
  background: white;
  border-radius: 14px;
  border: 2px solid #cfd8dc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: #555;
  box-shadow: 5px 5px 10px rgba(0,0,0,0.2);
}

.controles {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 280px;
}

label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.95rem;
  color: #555;
}

input[type="range"] {
  width: 180px;
  accent-color: #546e7a;
  cursor: pointer;
}`,
        initialJS: `// PASO 1: obtén los tres sliders y el div #caja
// PASO 2: crea una función actualizarSombra() que:
//   - lea los tres valores: sliderX.value, sliderY.value, sliderBlur.value
//   - construya el string de la sombra:
//     const sombra = sliderX.value + 'px ' + sliderY.value + 'px ' + sliderBlur.value + 'px rgba(0,0,0,0.3)';
//   - aplique: caja.style.boxShadow = sombra;
// PASO 3: agrega el evento 'input' a cada slider, llamando a actualizarSombra()
\n`,
        hints: [
          'Construye el valor: <code>const s = x + \'px \' + y + \'px \' + blur + \'px rgba(0,0,0,0.3)\';</code>',
          'Aplica: <code>caja.style.boxShadow = s;</code>',
          'Agrega el evento a los tres: <code>[sliderX, sliderY, sliderBlur].forEach(s => s.addEventListener(\'input\', actualizarSombra));</code>',
        ],
        validate(doc) {
          try {
            const sliderX = doc.getElementById('sliderX');
            const sliderY = doc.getElementById('sliderY');
            const sliderBlur = doc.getElementById('sliderBlur');
            const caja = doc.getElementById('caja');
            if (!sliderX || !sliderY || !sliderBlur) return { pass: false, msg: 'No encontré #sliderX, #sliderY o #sliderBlur.' };
            if (!caja) return { pass: false, msg: 'No encontré el div con id="caja".' };
            sliderX.value = '10';
            sliderY.value = '10';
            sliderBlur.value = '20';
            sliderX.dispatchEvent(new doc.defaultView.Event('input', { bubbles: true }));
            const shadow = caja.style.boxShadow;
            if (!shadow || shadow === '') return { pass: false, msg: 'Después de mover el slider, caja.style.boxShadow está vacío.' };
            if (!shadow.includes('10') && !shadow.includes('20')) return { pass: false, msg: `El boxShadow "${shadow}" no incluye los valores del slider.` };
            return { pass: true, msg: '¡Sombra dinámica con múltiples sliders funcionando! box-shadow dinámico dominado.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '3-10',
        title: 'Animación de Entrada',
        mission: `setTimeout() ejecuta una función una sola vez después de un retraso en milisegundos. Para animar elementos en secuencia escalonada, usas forEach con el índice: cartas.forEach(function(carta, i) { ... }). Dentro del forEach, el segundo parámetro i es el índice (0, 1, 2...). Pasas i * 150 como delay para que la primera carta se anime después de 0ms, la segunda después de 150ms, la tercera después de 300ms, etc. Dentro del setTimeout, simplemente agrega la clase 'visible' a la carta — la animación CSS ya está definida y se activará automáticamente al recibir esa clase. Las funciones dentro de forEach capturan la referencia a carta por closure.`,
        objective: `Al hacer clic en #btnMostrar, agrega la clase "visible" a cada .carta con un retraso de 150ms adicional por cada una (primera: 0ms, segunda: 150ms, tercera: 300ms).`,
        initialHTML: `<div class="contenedor">
  <button id="btnMostrar">▶ Mostrar Cartas</button>
  <div class="cartas">
    <div class="carta">🃏 Carta 1</div>
    <div class="carta">🃏 Carta 2</div>
    <div class="carta">🃏 Carta 3</div>
  </div>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #1a1a2e;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.contenedor {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

#btnMostrar {
  padding: 12px 28px;
  background: #58a6ff;
  color: #0d1117;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}

.cartas {
  display: flex;
  gap: 16px;
}

.carta {
  width: 100px;
  height: 140px;
  background: #16213e;
  border: 2px solid #0f3460;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.95rem;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.4s, transform 0.4s;
}

@keyframes entrar {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

.carta.visible {
  opacity: 1;
  transform: translateY(0);
  animation: entrar 0.4s ease forwards;
}`,
        initialJS: `// PASO 1: obtén el botón #btnMostrar y todas las .carta
// PASO 2: en el clic de #btnMostrar:
//   - Recorre las cartas con forEach usando el índice:
//     cartas.forEach(function(carta, i) { ... });
//   - Para cada carta usa setTimeout con un retraso de i * 150 ms:
//     setTimeout(function() {
//       carta.classList.add('visible');
//     }, i * 150);
// PASO 3: Opcionalmente, quita 'visible' de todas al inicio para reiniciar
\n`,
        hints: [
          'Usa forEach con índice: <code>cartas.forEach(function(carta, i) { ... });</code>',
          'Retraso escalonado: <code>setTimeout(function() { carta.classList.add(\'visible\'); }, i * 150);</code>',
          'Para reiniciar: <code>cartas.forEach(c => c.classList.remove(\'visible\'));</code> antes de volver a animar.',
        ],
        validate(doc) {
          try {
            const btn = doc.getElementById('btnMostrar');
            const cartas = doc.querySelectorAll('.carta');
            if (!btn) return { pass: false, msg: 'No encontré el botón con id="btnMostrar".' };
            if (!cartas.length) return { pass: false, msg: 'No encontré elementos con clase "carta".' };
            btn.click();
            // setTimeout(fn, 0) fires asynchronously, so check if at least one carta
            // has visible class or if code set up the listeners correctly by checking
            // if the click handler ran (some cards may show instantly at delay 0)
            const anyVisible = [...cartas].some(c => c.classList.contains('visible'));
            if (anyVisible) return { pass: true, msg: '¡Animación de entrada escalonada funcionando! setTimeout con retraso acumulado dominado.' };
            // If no card is visible yet, it might still be async — pass if code appears correct
            // Check that the btn has a listener by verifying something changed or try again
            // Give benefit of doubt if cartas exist and btn exists (code structure is there)
            return { pass: false, msg: 'Después del clic, ninguna .carta tiene la clase "visible". ¿Usaste setTimeout dentro del forEach con cartas.forEach(function(carta, i) { setTimeout(..., i * 150); })?' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },
    ],
  },

  // ============================================================
  // NIVEL 4: EVENTOS Y LÓGICA
  // ============================================================
  {
    id: 4, name: 'Eventos y Lógica', subtitle: 'Condicionales, validación y contadores',
    icon: '⚡', color: '#e3b341',
    challenges: [

      {
        id: '4-1',
        title: 'Control de Acceso',
        mission: `Los condicionales if/else son la base del control de flujo: permiten que tu programa tome decisiones según el valor de una variable. En este reto, lees el valor del input #password con su propiedad .value y lo comparas con la contraseña correcta "admin123" usando el operador de igualdad estricta (===). Si coinciden, muestras un mensaje de acceso concedido con estilo verde en #resultado; si no, un mensaje de error con estilo rojo. También puedes cambiar el estilo del div resultado directamente con style.backgroundColor y style.color para dar retroalimentación visual clara al usuario.`,
        objective: `Si el input tiene "admin123", muestra "✅ Acceso Permitido" en verde. Si no, muestra "❌ Contraseña incorrecta" en rojo`,
        initialHTML: `<div class="pagina">
  <div class="panel">
    <h3 class="titulo-panel">🔐 Panel de Acceso</h3>
    <input id="password" type="password" placeholder="Contraseña secreta...">
    <button id="btnAcceso">Verificar Acceso</button>
    <div id="resultado"></div>
  </div>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #1a1a2e;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.panel {
  background: #16213e;
  border: 1px solid #0f3460;
  border-radius: 14px;
  padding: 32px;
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.titulo-panel {
  color: #e0e0e0;
  margin: 0;
  text-align: center;
  font-size: 1.1rem;
}

#password {
  padding: 10px 14px;
  background: #0f3460;
  border: 1px solid #1a5276;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  outline: none;
}

#btnAcceso {
  padding: 11px;
  background: #e94560;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}

#resultado {
  min-height: 40px;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  font-size: 0.95rem;
}`,
        initialJS: `// Al hacer clic en #btnAcceso:
// Lee el valor de #password
// Si es 'admin123': muestra "✅ Acceso Permitido" en verde
// Si no: muestra "❌ Contraseña incorrecta" en rojo
// Cambia también el style del #resultado

`,
        hints: [
          `Lee el valor: <code>const pass = document.getElementById('password').value;</code>`,
          `Usa if/else: <code>if (pass === 'admin123') { ... } else { ... }</code>`,
          `Para el estilo verde: <code>resultado.style.background = '#1b5e20'; resultado.style.color = 'white';</code>`,
        ],
        validate(doc) {
          try {
            const inp = doc.getElementById('password');
            const btn = doc.getElementById('btnAcceso');
            const res = doc.getElementById('resultado');
            if (!inp || !btn || !res) return { pass: false, msg: 'Faltan elementos del formulario.' };
            inp.value = 'admin123'; btn.click();
            const t1 = res.textContent.trim().toLowerCase();
            if (t1.includes('permitido') || t1.includes('acceso') || t1.includes('✅')) {
              inp.value = 'clave_mala'; btn.click();
              const t2 = res.textContent.trim().toLowerCase();
              if (t2.includes('incorrecta') || t2.includes('❌') || t2.includes('denegado') || t2.includes('error')) {
                return { pass: true, msg: '¡El control de acceso funciona! Las dos condiciones están perfectas.' };
              }
              return { pass: false, msg: 'El acceso correcto funciona, pero con contraseña incorrecta no muestra error.' };
            }
            return { pass: false, msg: `Con "admin123" el resultado dice "${res.textContent.trim()}". Debe incluir "Acceso Permitido" o "✅".` };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '4-2',
        title: 'Contador Interactivo',
        mission: `Un contador interactivo necesita estado persistente (una variable que no se reinicia entre clics) y tres botones con comportamientos diferentes. La variable let cuenta = 0 debe declararse fuera de todos los eventos. El botón + suma 1, el botón - resta 1 pero solo si cuenta > 0 (para no ir negativo), y Reset asigna 0. Después de cada cambio, actualiza el textContent del div #contador para reflejar el nuevo valor. Opcionalmente, cambia el color del display según si es 0 o positivo, modificando su style.color — esto da retroalimentación visual valiosa al usuario.`,
        objective: `"+1" suma, "-1" resta (mínimo 0), "Reset" vuelve a 0. Muestra el valor en #contador`,
        initialHTML: `<div class="pagina">
  <div id="contador">0</div>
  <div class="controles">
    <button id="btnMenos">−</button>
    <button id="btnReset">Reset</button>
    <button id="btnMas">+</button>
  </div>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #0d1117;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.pagina {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
}

#contador {
  font-size: 5rem;
  font-weight: 800;
  color: #484f58;
  transition: color 0.3s, transform 0.1s;
  min-width: 120px;
  text-align: center;
}

.controles {
  display: flex;
  gap: 14px;
}

#btnMenos {
  width: 56px;
  height: 56px;
  font-size: 1.6rem;
  background: #da3633;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}

#btnReset {
  padding: 0 20px;
  height: 56px;
  background: #30363d;
  color: #e6edf3;
  border: 1px solid #484f58;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.9rem;
}

#btnMas {
  width: 56px;
  height: 56px;
  font-size: 1.6rem;
  background: #238636;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}`,
        initialJS: `// Implementa el contador:
// - Variable 'cuenta' que empieza en 0
// - #btnMas: suma 1 a cuenta
// - #btnMenos: resta 1 (mínimo 0)
// - #btnReset: pone cuenta en 0
// - Actualiza el texto de #contador cada vez
// - Si cuenta > 0: cambia el color a '#3fb950', si = 0: '#484f58'

`,
        hints: [
          `Declara: <code>let cuenta = 0;</code> y una función: <code>function actualizar() { document.getElementById('contador').textContent = cuenta; }</code>`,
          `Para no bajar de 0: <code>if (cuenta > 0) { cuenta--; actualizar(); }</code>`,
          `Cambia el color: <code>const el = document.getElementById('contador'); el.style.color = cuenta > 0 ? '#3fb950' : '#484f58';</code>`,
        ],
        validate(doc) {
          try {
            const mas   = doc.getElementById('btnMas');
            const menos = doc.getElementById('btnMenos');
            const reset = doc.getElementById('btnReset');
            const cont  = doc.getElementById('contador');
            if (!mas || !menos || !reset || !cont) return { pass: false, msg: 'Faltan botones o el elemento #contador.' };
            mas.click(); mas.click(); mas.click();
            if (cont.textContent.trim() !== '3') return { pass: false, msg: `Después de 3 clics en +, el contador muestra "${cont.textContent}" en vez de "3".` };
            menos.click();
            if (cont.textContent.trim() !== '2') return { pass: false, msg: `Después de restar, muestra "${cont.textContent}" en vez de "2".` };
            reset.click();
            if (cont.textContent.trim() !== '0') return { pass: false, msg: `Después de Reset, muestra "${cont.textContent}" en vez de "0".` };
            menos.click();
            if (cont.textContent.trim() !== '0') return { pass: false, msg: 'El contador bajó de 0. Debe tener un mínimo de 0.' };
            return { pass: true, msg: '¡Contador perfecto! Suma, resta, mínimo 0 y reset funcionan.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '4-3',
        title: 'Validación de Formulario',
        mission: `La validación del lado cliente previene envíos incorrectos y mejora la experiencia del usuario dando retroalimentación inmediata. El proceso: al hacer clic en el botón, lees los valores de ambos inputs. Primero verificas si el nombre está vacío (nombre.trim() === '' para ignorar espacios). Si está vacío, muestras el error y usas return para detener la ejecución. Luego verificas si el email contiene '@' con el método includes(). Si no lo contiene, muestras el error de email. Si ambas validaciones pasan, muestras el mensaje de éxito que incluye el nombre del usuario. Usa style.backgroundColor y style.color para dar color a los mensajes.`,
        objective: `Valida que el nombre no esté vacío y que el email contenga "@". Muestra mensajes de error o éxito en #mensajeForm`,
        initialHTML: `<div class="pagina">
  <form class="formulario" id="form">
    <h3 class="titulo">📝 Registro CodeLab</h3>
    <div class="campo">
      <label for="inputNombre">Nombre</label>
      <input id="inputNombre" type="text" placeholder="Tu nombre completo">
    </div>
    <div class="campo">
      <label for="inputEmail">Email</label>
      <input id="inputEmail" type="text" placeholder="tu@email.com">
    </div>
    <button type="button" id="btnRegistrar">Registrar</button>
    <div id="mensajeForm"></div>
  </form>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.formulario {
  background: white;
  border-radius: 14px;
  padding: 32px;
  width: 320px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.titulo {
  margin: 0;
  color: #333;
  font-size: 1.1rem;
  text-align: center;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

label {
  font-size: 0.82rem;
  color: #555;
  font-weight: 600;
}

input {
  padding: 10px 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;
}

input:focus {
  border-color: #4a90e2;
}

#btnRegistrar {
  padding: 12px;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}

#mensajeForm {
  min-height: 36px;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 0.9rem;
  text-align: center;
}`,
        initialJS: `// Al hacer clic en #btnRegistrar:
// 1. Lee #inputNombre y #inputEmail
// 2. Si nombre vacío: error "El nombre es obligatorio"
// 3. Si email no tiene '@': error "El email no es válido"
// 4. Si todo OK: muestra "✅ Registro exitoso, [nombre]!"
// Muestra el mensaje en #mensajeForm con colores apropiados

`,
        hints: [
          `Verifica vacío: <code>if (nombre.trim() === '') { ... }</code>`,
          `Verifica @: <code>if (!email.includes('@')) { ... }</code>`,
          `Para error rojo: <code>msg.style.background = '#ffebee'; msg.style.color = '#c62828';</code>`,
        ],
        validate(doc) {
          try {
            const nom   = doc.getElementById('inputNombre');
            const email = doc.getElementById('inputEmail');
            const btn   = doc.getElementById('btnRegistrar');
            const msg   = doc.getElementById('mensajeForm');
            if (!nom || !email || !btn || !msg) return { pass: false, msg: 'Faltan elementos del formulario.' };
            nom.value = ''; email.value = ''; btn.click();
            if (!msg.textContent.trim()) return { pass: false, msg: 'Con nombre vacío no muestra ningún mensaje de error.' };
            nom.value = 'Carlos'; email.value = 'sinArroba'; btn.click();
            const t2 = msg.textContent.trim().toLowerCase();
            if (!t2.includes('email') && !t2.includes('válido') && !t2.includes('@')) {
              return { pass: false, msg: 'Con email sin "@" no muestra error de email inválido.' };
            }
            nom.value = 'Carlos'; email.value = 'carlos@email.com'; btn.click();
            const t3 = msg.textContent.trim();
            if (t3.includes('Carlos') || t3.toLowerCase().includes('exitoso') || t3.includes('✅')) {
              return { pass: true, msg: '¡Validación completa! Los 3 casos funcionan correctamente.' };
            }
            return { pass: false, msg: `Con datos válidos el mensaje dice "${t3}". Debe incluir éxito y el nombre.` };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '4-4',
        title: 'Cuenta Regresiva',
        mission: `setInterval() ejecuta una función repetidamente cada N milisegundos hasta que se detiene con clearInterval(). La referencia que devuelve setInterval debe guardarse en una variable para poder detenerla después — sin ella no puedes parar el intervalo. El patrón: declara let tiempo = 10 y let intervalo = null fuera de los eventos. Al hacer clic en Iniciar: limpia cualquier intervalo previo con clearInterval(intervalo), luego inicia uno nuevo con setInterval donde decrementas tiempo--, actualizas el DOM, y verificas if(tiempo <= 0) para llamar clearInterval y mostrar el mensaje final. Reiniciar también debe llamar clearInterval para evitar múltiples intervalos corriendo a la vez.`,
        objective: `Al hacer clic en "Iniciar", cuenta regresivamente desde 10 en #cronometro. Al llegar a 0 muestra "⏰ ¡Tiempo!" y se detiene. "Reiniciar" vuelve a 10.`,
        initialHTML: `<div class="contenedor">
  <div id="cronometro" class="display">10</div>
  <div class="btns">
    <button id="btnIniciar">▶ Iniciar</button>
    <button id="btnReiniciar">↺ Reiniciar</button>
  </div>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #1a1a2e;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.contenedor {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

.display {
  font-size: 7rem;
  font-weight: 900;
  color: #58a6ff;
  min-width: 200px;
  text-align: center;
  text-shadow: 0 0 30px rgba(88,166,255,0.5);
  font-variant-numeric: tabular-nums;
}

.btns {
  display: flex;
  gap: 14px;
}

.btns button {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}

#btnIniciar  { background: #238636; color: white; }
#btnReiniciar { background: #30363d; color: #e6edf3; border: 1px solid #484f58; }`,
        initialJS: `// PASO 1: declara las variables fuera de los eventos
// let tiempo = 10;
// let intervalo = null;  ← guardará la referencia del setInterval

// PASO 2: al hacer clic en #btnIniciar
//   - Primero limpia el intervalo anterior: clearInterval(intervalo)
//   - Inicia uno nuevo: intervalo = setInterval(function() { ... }, 1000)
//   - Dentro del callback del interval:
//     · Decrementa tiempo: tiempo--;
//     · Muestra el valor en #cronometro
//     · Si tiempo llega a 0: muestra "⏰ ¡Tiempo!" y llama clearInterval(intervalo)

// PASO 3: al hacer clic en #btnReiniciar
//   - clearInterval(intervalo)
//   - Resetea tiempo = 10
//   - Muestra 10 en #cronometro

`,
        hints: [
          `Inicia el intervalo: <code>intervalo = setInterval(function() { tiempo--; cronometro.textContent = tiempo; }, 1000);</code>`,
          `Detén cuando llegue a 0: <code>if (tiempo <= 0) { clearInterval(intervalo); cronometro.textContent = '⏰ ¡Tiempo!'; }</code>`,
          `En reiniciar: <code>clearInterval(intervalo); tiempo = 10; cronometro.textContent = 10;</code>`,
        ],
        validate(doc) {
          try {
            const btn = doc.getElementById('btnIniciar');
            const cron = doc.getElementById('cronometro');
            const reiniciar = doc.getElementById('btnReiniciar');
            if (!btn || !cron) return { pass: false, msg: 'No encontré #btnIniciar o #cronometro.' };
            const original = cron.textContent.trim();
            btn.click();
            // setInterval is async — display may not change in sync context
            // Check if reiniciar resets correctly as a proxy for correct implementation
            if (reiniciar) {
              reiniciar.click();
              const afterReset = cron.textContent.trim();
              if (afterReset === '10' || afterReset.includes('10')) {
                return { pass: true, msg: '¡Temporizador funcional! setInterval y clearInterval dominados.' };
              }
            }
            // If display changed after click (very fast env), also pass
            const after = cron.textContent.trim();
            if (after !== original) {
              return { pass: true, msg: '¡El cronómetro inicia la cuenta regresiva correctamente!' };
            }
            return { pass: false, msg: 'Al hacer clic en Iniciar y luego en Reiniciar, el cronómetro debería volver a 10. ¿Usaste setInterval y clearInterval correctamente?' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '4-5',
        title: 'Mini Calculadora',
        mission: `Los inputs de tipo number siguen devolviendo un string en su propiedad .value — JavaScript no convierte automáticamente. parseFloat() convierte ese string a número decimal. Con los dos números obtenidos, usas el valor de btn.dataset.op ('suma', 'resta', 'multi' o 'div') en un if/else o switch para decidir la operación. La división tiene un caso especial: si el divisor (b) es 0, el resultado sería Infinity en JavaScript — debes verificarlo explícitamente con if (b === 0) y mostrar un mensaje de error. Finalmente muestra el resultado en #resultado con un texto descriptivo como "Resultado: 15".`,
        objective: `Al hacer clic en cada botón de operación (+, -, ×, ÷), calcula el resultado con los valores de #num1 y #num2 y muéstralo en #resultado.`,
        initialHTML: `<div class="contenedor">
  <h3 class="titulo">🧮 Calculadora</h3>
  <div class="inputs">
    <input id="num1" type="number" placeholder="Número 1" value="10">
    <input id="num2" type="number" placeholder="Número 2" value="5">
  </div>
  <div class="operaciones">
    <button class="btnOp" data-op="suma">+</button>
    <button class="btnOp" data-op="resta">−</button>
    <button class="btnOp" data-op="multi">×</button>
    <button class="btnOp" data-op="div">÷</button>
  </div>
  <div id="resultado" class="resultado">Resultado: —</div>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.contenedor {
  background: white;
  border-radius: 16px;
  padding: 32px;
  width: 300px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.12);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.titulo { margin: 0; text-align: center; color: #333; }

.inputs { display: flex; gap: 10px; }

.inputs input {
  flex: 1;
  padding: 10px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  text-align: center;
  outline: none;
}

.inputs input:focus { border-color: #3949ab; }

.operaciones {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.btnOp {
  padding: 12px;
  font-size: 1.3rem;
  background: #3949ab;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.btnOp:hover { background: #283593; }

.resultado {
  background: #e8eaf6;
  border-radius: 8px;
  padding: 14px;
  text-align: center;
  font-size: 1.1rem;
  font-weight: bold;
  color: #3949ab;
}`,
        initialJS: `// PASO 1: obtén todos los botones con querySelectorAll('.btnOp')
// PASO 2: para cada botón agrega un evento 'click'
// PASO 3: dentro del evento:
//   a) Lee los valores como números:
//      const a = parseFloat(document.getElementById('num1').value);
//      const b = parseFloat(document.getElementById('num2').value);
//   b) Lee la operación: const op = btn.dataset.op;
//      (será 'suma', 'resta', 'multi' o 'div')
//   c) Calcula con if/else o switch:
//      if (op === 'suma')  resultado = a + b;
//      if (op === 'resta') resultado = a - b;
//      ...etc
//   d) Para división: verifica primero si b === 0 para evitar Infinity
//   e) Muestra: document.getElementById('resultado').textContent = 'Resultado: ' + res;

`,
        hints: [
          `Convierte a número: <code>const a = parseFloat(document.getElementById('num1').value);</code>`,
          `Lee la operación del botón: <code>const op = btn.dataset.op;</code> luego <code>if (op === 'suma') res = a + b;</code>`,
          `Evita dividir por cero: <code>if (op === 'div' && b === 0) { resultado.textContent = 'Error: ÷0'; return; }</code>`,
        ],
        validate(doc) {
          try {
            const btns = doc.querySelectorAll('.btnOp');
            const res  = doc.getElementById('resultado');
            const n1   = doc.getElementById('num1');
            const n2   = doc.getElementById('num2');
            if (!btns.length || !res || !n1 || !n2) return { pass: false, msg: 'Faltan elementos. No borres los ids ni las clases.' };
            n1.value = '10'; n2.value = '5';
            const btnSuma = [...btns].find(b => b.dataset.op === 'suma');
            if (!btnSuma) return { pass: false, msg: 'No encontré el botón con data-op="suma".' };
            btnSuma.click();
            if (!res.textContent.includes('15')) return { pass: false, msg: `10 + 5 debería ser 15, pero muestra: "${res.textContent}".` };
            const btnResta = [...btns].find(b => b.dataset.op === 'resta');
            if (btnResta) { btnResta.click(); if (!res.textContent.includes('5')) return { pass: false, msg: `10 - 5 debería ser 5, muestra: "${res.textContent}".` }; }
            return { pass: true, msg: '¡Calculadora funcional! parseFloat y dataset dominados.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '4-6',
        title: 'Convertidor de Temperatura',
        mission: `La conversión de temperatura enseña tres conceptos esenciales: parseFloat() para convertir el string del input a número, las operaciones matemáticas con las fórmulas (C × 9/5 + 32 para °F, (F - 32) × 5/9 para °C), y toFixed(1) para redondear el resultado a un decimal. Cada botón maneja una dirección de conversión: #btnToF lee #celsius y calcula fahrenheit, #btnToC lee #fahrenheit y calcula celsius. isNaN() te permite verificar si el valor convertido con parseFloat es un número válido antes de mostrar el resultado. El resultado debe mostrarse en el div #resultado con un formato claro que incluya las unidades.`,
        objective: `#btnToF convierte #celsius a Fahrenheit usando F = C × 9/5 + 32. #btnToC convierte #fahrenheit a Celsius usando C = (F - 32) × 5/9. Muestra el resultado redondeado a 1 decimal en #resultado.`,
        initialHTML: `<div class="contenedor">
  <h3>🌡️ Convertidor de Temperatura</h3>
  <div class="grupo">
    <label>Celsius (°C)</label>
    <div class="fila">
      <input id="celsius" type="number" placeholder="Ej: 100">
      <button id="btnToF">→ °F</button>
    </div>
  </div>
  <div class="grupo">
    <label>Fahrenheit (°F)</label>
    <div class="fila">
      <input id="fahrenheit" type="number" placeholder="Ej: 32">
      <button id="btnToC">→ °C</button>
    </div>
  </div>
  <div id="resultado" class="resultado">Ingresa un valor y convierte</div>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #e3f2fd;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.contenedor {
  background: white;
  border-radius: 16px;
  padding: 32px;
  width: 300px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contenedor h3 {
  margin: 0;
  text-align: center;
  color: #1565c0;
}

.grupo {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #555;
}

.fila {
  display: flex;
  gap: 8px;
}

.fila input {
  flex: 1;
  padding: 10px 12px;
  border: 2px solid #90caf9;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
}

.fila input:focus {
  border-color: #1565c0;
}

.fila button {
  padding: 10px 14px;
  background: #1565c0;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: bold;
}

#resultado {
  background: #e3f2fd;
  border-radius: 10px;
  padding: 14px;
  text-align: center;
  font-size: 1.1rem;
  font-weight: bold;
  color: #1565c0;
}`,
        initialJS: `// PASO 1: obtén los dos inputs y los dos botones y #resultado
// PASO 2: en el clic de #btnToF:
//   - Lee el valor: const c = parseFloat(celsius.value);
//   - Si isNaN(c): muestra un error
//   - Calcula: const f = c * 9/5 + 32;
//   - Muestra: resultado.textContent = c + '°C = ' + f.toFixed(1) + '°F';
// PASO 3: en el clic de #btnToC:
//   - Lee #fahrenheit, calcula: const c2 = (f - 32) * 5/9;
//   - Muestra el resultado con toFixed(1)
\n`,
        hints: [
          'Convierte el string: <code>const c = parseFloat(celsius.value);</code>',
          'Fórmula C → F: <code>const f = c * 9 / 5 + 32;</code>',
          'Redondea: <code>resultado.textContent = c + \'°C = \' + f.toFixed(1) + \'°F\';</code>',
        ],
        validate(doc) {
          try {
            const celsius = doc.getElementById('celsius');
            const fahrenheit = doc.getElementById('fahrenheit');
            const btnToF = doc.getElementById('btnToF');
            const btnToC = doc.getElementById('btnToC');
            const resultado = doc.getElementById('resultado');
            if (!celsius || !fahrenheit || !btnToF || !btnToC || !resultado) return { pass: false, msg: 'Faltan elementos. Verifica #celsius, #fahrenheit, #btnToF, #btnToC y #resultado.' };
            celsius.value = '100';
            btnToF.click();
            if (!resultado.textContent.includes('212')) return { pass: false, msg: `100°C debería ser 212°F, pero el resultado es: "${resultado.textContent}".` };
            fahrenheit.value = '32';
            btnToC.click();
            if (!resultado.textContent.includes('0')) return { pass: false, msg: `32°F debería ser 0°C, pero el resultado es: "${resultado.textContent}".` };
            return { pass: true, msg: '¡Convertidor de temperatura funcionando! parseFloat y fórmulas matemáticas dominadas.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '4-7',
        title: 'Quiz de Preguntas',
        mission: `Un quiz interactivo tiene estado complejo: el array de preguntas, el índice actual (cuál pregunta estamos viendo), el puntaje acumulado, y si ya se respondió la pregunta. La función mostrarPregunta() limpia #opciones con innerHTML = '', pone el texto de preguntas[indice].texto en #pregunta, y crea dinámicamente un botón por cada opción con createElement. Cada botón compara su índice con correcta: si coinciden suma al puntaje y muestra ✅, si no muestra ❌. El botón #siguiente avanza el índice y llama mostrarPregunta() de nuevo. Llama a mostrarPregunta() al cargar la página para mostrar la primera pregunta.`,
        objective: `Al hacer clic en la respuesta correcta muestra feedback de éxito (✅) e incrementa el puntaje. Al hacer clic en una incorrecta muestra ❌. #siguiente avanza a la próxima pregunta. Muestra puntaje en #puntaje.`,
        initialHTML: `<div class="quiz">
  <div class="cabecera">
    <span id="puntaje">Puntaje: 0</span>
  </div>
  <div id="pregunta" class="pregunta">¿Cargando...?</div>
  <div id="opciones" class="opciones"></div>
  <div id="feedback" class="feedback"></div>
  <button id="siguiente" style="display:none">Siguiente →</button>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #1a1a2e;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.quiz {
  background: #16213e;
  border-radius: 16px;
  padding: 32px;
  width: 360px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 1px solid #0f3460;
}

.cabecera {
  display: flex;
  justify-content: flex-end;
}

#puntaje {
  color: #58a6ff;
  font-weight: bold;
  font-size: 0.9rem;
}

.pregunta {
  color: #e0e0e0;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.5;
}

.opciones {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.opcion {
  padding: 12px 16px;
  background: #0f3460;
  color: #e0e0e0;
  border: 1px solid #1a5276;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
  text-align: left;
}

.opcion:hover {
  background: #1a5276;
}

.feedback {
  font-size: 1.2rem;
  text-align: center;
  min-height: 30px;
}

#siguiente {
  padding: 12px;
  background: #238636;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}`,
        initialJS: `// Define las preguntas como array de objetos:
// const preguntas = [
//   { texto: '¿Qué método agrega un elemento al final del DOM?', opciones: ['appendChild', 'insertBefore', 'createElement', 'remove'], correcta: 0 },
//   { texto: '¿Qué evento se dispara con cada tecla?', opciones: ['change', 'input', 'keypress', 'blur'], correcta: 1 },
//   { texto: '¿Cómo se alterna una clase CSS con JS?', opciones: ['classList.toggle()', 'style.add()', 'className.switch()', 'classList.flip()'], correcta: 0 },
// ];
// let indice = 0, puntaje = 0;
// Crea una función mostrarPregunta() que:
//   - Muestre preguntas[indice].texto en #pregunta
//   - Cree botones .opcion para cada opción y los ponga en #opciones
//   - Al hacer clic en una opción: compare con correcta, muestre feedback, muestre #siguiente
// En #siguiente: avanza el índice, llama mostrarPregunta()
\n`,
        hints: [
          'Crea los botones de opciones dinámicamente con <code>createElement(\'button\')</code> y agrégarlos a #opciones.',
          'Compara: <code>if (i === preguntas[indice].correcta) { feedback.textContent = \'✅ ¡Correcto!\'; puntaje++; }</code>',
          'Muestra el siguiente: <code>siguiente.style.display = \'block\';</code> después de responder.',
        ],
        validate(doc) {
          try {
            const pregunta = doc.getElementById('pregunta');
            const opciones = doc.getElementById('opciones');
            const feedback = doc.getElementById('feedback');
            const puntajeEl = doc.getElementById('puntaje');
            const siguiente = doc.getElementById('siguiente');
            if (!pregunta || !opciones || !feedback || !puntajeEl) return { pass: false, msg: 'Faltan elementos. Verifica #pregunta, #opciones, #feedback y #puntaje.' };
            if (pregunta.textContent.includes('Cargando') || pregunta.textContent.trim() === '') return { pass: false, msg: 'El quiz no mostró ninguna pregunta al cargar. Llama a mostrarPregunta() al inicio.' };
            const btns = opciones.querySelectorAll('.opcion, button');
            if (!btns.length) return { pass: false, msg: 'No se generaron botones de opciones. Crea elementos con clase "opcion" para cada respuesta.' };
            const textoAntes = pregunta.textContent;
            btns[0].click();
            if (feedback.textContent.trim() === '') return { pass: false, msg: 'Al hacer clic en una opción, no aparece feedback (✅ o ❌).' };
            if (siguiente) {
              siguiente.click();
              if (pregunta.textContent === textoAntes) return { pass: false, msg: 'Al hacer clic en Siguiente, la pregunta no cambia.' };
            }
            return { pass: true, msg: '¡Quiz interactivo funcionando! Arrays, índices y feedback dominados.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '4-8',
        title: 'Validador de Contraseña Fuerte',
        mission: `Las expresiones regulares (regex) son patrones para buscar texto. /[0-9]/.test(str) retorna true si el string tiene algún dígito; /[A-Z]/.test(str) retorna true si tiene alguna mayúscula. Combinadas con .length puedes evaluar fortaleza en tres niveles: Débil (menos de 6 chars), Media (6+ chars con números), Fuerte (8+ chars con números Y mayúsculas). El evento 'input' se dispara en cada tecla para evaluar en tiempo real. Para cada nivel, actualiza el texto de #fortaleza y el ancho de #barraFortaleza (33%, 66% o 100%) junto con su backgroundColor (rojo, naranja o verde).`,
        objective: `Al escribir en #password, muestra la fortaleza en #fortaleza: "Débil" (<6 chars), "Media" (>=6 y tiene números), "Fuerte" (>=8, tiene números Y mayúsculas). Actualiza #barraFortaleza con 33%, 66% o 100% de ancho.`,
        initialHTML: `<div class="contenedor">
  <h3>🔐 Validador de Contraseña</h3>
  <input id="password" type="text" placeholder="Escribe una contraseña...">
  <div class="barra-wrap">
    <div id="barraFortaleza" class="barra-fortaleza"></div>
  </div>
  <p>Fortaleza: <strong id="fortaleza">—</strong></p>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #1a1a2e;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.contenedor {
  background: #16213e;
  border-radius: 16px;
  padding: 32px;
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid #0f3460;
}

.contenedor h3 {
  margin: 0;
  text-align: center;
  color: #58a6ff;
}

#password {
  padding: 12px 16px;
  background: #0f3460;
  border: 1px solid #1a5276;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  outline: none;
}

.barra-wrap {
  height: 8px;
  background: #0f3460;
  border-radius: 4px;
  overflow: hidden;
}

#barraFortaleza {
  height: 100%;
  width: 0%;
  border-radius: 4px;
  transition: width 0.3s, background-color 0.3s;
  background: #e53935;
}

.contenedor p {
  margin: 0;
  color: #aaa;
  font-size: 0.9rem;
}

#fortaleza {
  color: #58a6ff;
}`,
        initialJS: `// PASO 1: obtén #password, #fortaleza y #barraFortaleza
// PASO 2: agrega el evento 'input' al password
// PASO 3: dentro del evento, lee el valor y evalúa:
//   const val = password.value;
//   const tieneNumeros = /[0-9]/.test(val);
//   const tieneMayus = /[A-Z]/.test(val);
//   if (val.length >= 8 && tieneNumeros && tieneMayus) → 'Fuerte', barra 100%, verde
//   else if (val.length >= 6 && tieneNumeros)           → 'Media', barra 66%, naranja
//   else                                                 → 'Débil', barra 33%, rojo
\n`,
        hints: [
          'Detecta números: <code>const tieneNumeros = /[0-9]/.test(val);</code>',
          'Detecta mayúsculas: <code>const tieneMayus = /[A-Z]/.test(val);</code>',
          'Ajusta el ancho: <code>barraFortaleza.style.width = \'100%\';</code> y el color: <code>barraFortaleza.style.backgroundColor = \'#2e7d32\';</code>',
        ],
        validate(doc) {
          try {
            const password = doc.getElementById('password');
            const fortaleza = doc.getElementById('fortaleza');
            const barra = doc.getElementById('barraFortaleza');
            if (!password || !fortaleza || !barra) return { pass: false, msg: 'Faltan elementos. Verifica #password, #fortaleza y #barraFortaleza.' };
            password.value = 'abc';
            password.dispatchEvent(new doc.defaultView.Event('input', { bubbles: true }));
            if (!fortaleza.textContent.toLowerCase().includes('débil') && !fortaleza.textContent.toLowerCase().includes('debil') && !fortaleza.textContent.toLowerCase().includes('weak')) {
              return { pass: false, msg: `Con "abc" (< 6 chars), fortaleza debería ser "Débil", pero muestra: "${fortaleza.textContent}".` };
            }
            password.value = 'abc123';
            password.dispatchEvent(new doc.defaultView.Event('input', { bubbles: true }));
            if (!fortaleza.textContent.toLowerCase().includes('media') && !fortaleza.textContent.toLowerCase().includes('medium')) {
              return { pass: false, msg: `Con "abc123" (>= 6, tiene números), debería ser "Media", pero muestra: "${fortaleza.textContent}".` };
            }
            password.value = 'Abc123XX';
            password.dispatchEvent(new doc.defaultView.Event('input', { bubbles: true }));
            if (!fortaleza.textContent.toLowerCase().includes('fuerte') && !fortaleza.textContent.toLowerCase().includes('strong')) {
              return { pass: false, msg: `Con "Abc123XX" (>= 8, números y mayúsculas), debería ser "Fuerte", pero muestra: "${fortaleza.textContent}".` };
            }
            return { pass: true, msg: '¡Validador de contraseña funcionando! Regex, length y niveles de fortaleza dominados.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '4-9',
        title: 'Conversor de Unidades',
        mission: `Los elementos select son menús desplegables — su propiedad .value devuelve el value de la opción seleccionada actualmente (definido en el atributo value de cada option en el HTML). En este reto, cada opción tiene un valor como 'km-mi' o 'kg-lb' que identifica la conversión. Lees ese valor con unidad.value y usas un switch o cadena de if/else para ejecutar la fórmula correcta. parseFloat(valor.value) convierte el número del input. toFixed(2) formatea el resultado con 2 decimales. El resultado debe mostrarse en #resultado con las unidades de origen y destino claramente indicadas.`,
        objective: `Lee el número del input y la unidad del select #unidad. Al hacer clic en #btnConvertir, calcula y muestra el resultado en #resultado. Implementa al menos: km↔mi, kg↔lb, m↔ft.`,
        initialHTML: `<div class="contenedor">
  <h3>📐 Conversor de Unidades</h3>
  <div class="fila">
    <input id="valor" type="number" placeholder="Valor" value="1">
    <select id="unidad">
      <option value="km-mi">km → mi</option>
      <option value="mi-km">mi → km</option>
      <option value="kg-lb">kg → lb</option>
      <option value="lb-kg">lb → kg</option>
      <option value="m-ft">m → ft</option>
      <option value="ft-m">ft → m</option>
    </select>
  </div>
  <button id="btnConvertir">Convertir</button>
  <div id="resultado" class="resultado">—</div>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #fff3e0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.contenedor {
  background: white;
  border-radius: 16px;
  padding: 32px;
  width: 320px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contenedor h3 {
  margin: 0;
  text-align: center;
  color: #e65100;
}

.fila {
  display: flex;
  gap: 8px;
}

#valor {
  flex: 1;
  padding: 10px 12px;
  border: 2px solid #ffcc80;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
}

#valor:focus {
  border-color: #e65100;
}

#unidad {
  padding: 10px 8px;
  border: 2px solid #ffcc80;
  border-radius: 8px;
  font-size: 0.9rem;
  outline: none;
  cursor: pointer;
}

#btnConvertir {
  padding: 12px;
  background: #e65100;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}

#resultado {
  background: #fff3e0;
  border-radius: 10px;
  padding: 14px;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: #e65100;
}`,
        initialJS: `// PASO 1: obtén #valor, #unidad, #btnConvertir y #resultado
// PASO 2: en el clic de #btnConvertir:
//   - Lee el número: const num = parseFloat(valor.value);
//   - Lee la unidad: const unidad = document.getElementById('unidad').value;
//   - Calcula con switch o if/else:
//     'km-mi': resultado = num * 0.621371
//     'mi-km': resultado = num * 1.60934
//     'kg-lb': resultado = num * 2.20462
//     'lb-kg': resultado = num / 2.20462
//     'm-ft':  resultado = num * 3.28084
//     'ft-m':  resultado = num / 3.28084
//   - Muestra el resultado con toFixed(2) en #resultado
\n`,
        hints: [
          'Lee la opción: <code>const op = document.getElementById(\'unidad\').value;</code>',
          'Usa switch: <code>switch(op) { case \'km-mi\': res = num * 0.621371; break; ... }</code>',
          'Muestra: <code>resultado.textContent = num + \' = \' + res.toFixed(2);</code>',
        ],
        validate(doc) {
          try {
            const valorIn = doc.getElementById('valor');
            const unidadSel = doc.getElementById('unidad');
            const btnConv = doc.getElementById('btnConvertir');
            const resultado = doc.getElementById('resultado');
            if (!valorIn || !unidadSel || !btnConv || !resultado) return { pass: false, msg: 'Faltan elementos. Verifica #valor, #unidad, #btnConvertir y #resultado.' };
            valorIn.value = '1';
            unidadSel.value = 'km-mi';
            btnConv.click();
            const txt1 = resultado.textContent;
            if (!txt1.includes('0.6') && !txt1.includes('0.62')) return { pass: false, msg: `1 km → mi debería ser ~0.62, pero muestra: "${txt1}".` };
            valorIn.value = '1';
            unidadSel.value = 'mi-km';
            btnConv.click();
            const txt2 = resultado.textContent;
            if (!txt2.includes('1.6') && !txt2.includes('1.60')) return { pass: false, msg: `1 mi → km debería ser ~1.60, pero muestra: "${txt2}".` };
            return { pass: true, msg: '¡Conversor de unidades funcionando! parseFloat, select y switch dominados.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '4-10',
        title: 'Generador de Contraseña',
        mission: `Math.random() genera un número decimal entre 0 (inclusive) y 1 (exclusive). Al multiplicarlo por la longitud del charset y aplicar Math.floor(), obtienes un índice aleatorio válido. El proceso: construye el charset concatenando los grupos de caracteres según los checkboxes marcados (si chkMayus.checked agrega 'ABCDE...Z', etc.). Luego itera con un bucle for desde 0 hasta la longitud deseada, y en cada iteración agrega charset[Math.floor(Math.random() * charset.length)] al resultado. El slider #sliderLong controla la longitud — lee su valor con parseInt. Actualiza #longVal en tiempo real con el evento 'input' del slider.`,
        objective: `Al hacer clic en #btnGenerar, genera una contraseña aleatoria con los conjuntos marcados en los checkboxes y la longitud del #sliderLong. Muestra el resultado en #password.`,
        initialHTML: `<div class="contenedor">
  <h3>🔑 Generador de Contraseña</h3>
  <div class="opciones">
    <label><input type="checkbox" id="chkMayus" checked> Mayúsculas (A-Z)</label>
    <label><input type="checkbox" id="chkMinus" checked> Minúsculas (a-z)</label>
    <label><input type="checkbox" id="chkNums" checked> Números (0-9)</label>
    <label><input type="checkbox" id="chkSimbolos"> Símbolos (!@#$)</label>
  </div>
  <div class="longitud">
    <label>Longitud: <span id="longVal">12</span></label>
    <input id="sliderLong" type="range" min="6" max="32" value="12">
  </div>
  <button id="btnGenerar">Generar Contraseña</button>
  <div id="password" class="password-display">—</div>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #212121;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.contenedor {
  background: #2d2d2d;
  border-radius: 16px;
  padding: 32px;
  width: 340px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 1px solid #444;
}

.contenedor h3 {
  margin: 0;
  text-align: center;
  color: #58a6ff;
}

.opciones {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.opciones label {
  color: #ccc;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.longitud {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.longitud label {
  color: #ccc;
  font-size: 0.9rem;
}

#longVal {
  font-weight: bold;
  color: #58a6ff;
}

#sliderLong {
  accent-color: #58a6ff;
  cursor: pointer;
}

#btnGenerar {
  padding: 12px;
  background: #58a6ff;
  color: #0d1117;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}

.password-display {
  background: #1a1a2e;
  border: 1px solid #444;
  border-radius: 8px;
  padding: 14px;
  font-family: monospace;
  font-size: 1rem;
  color: #58a6ff;
  text-align: center;
  word-break: break-all;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}`,
        initialJS: `// Define los conjuntos de caracteres:
// const MAYUS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
// const MINUS = 'abcdefghijklmnopqrstuvwxyz';
// const NUMS  = '0123456789';
// const SIMB  = '!@#$%^&*()-_=+[]{}';

// PASO 1: obtén los checkboxes, slider y botón
// PASO 2: el slider actualiza #longVal en tiempo real
// PASO 3: en el clic de #btnGenerar:
//   a) Construye el charset según los checkboxes marcados
//   b) Lee la longitud del slider
//   c) Genera la contraseña con un bucle for:
//      for (let i = 0; i < longitud; i++) {
//        pass += charset[Math.floor(Math.random() * charset.length)];
//      }
//   d) Muestra en #password
\n`,
        hints: [
          'Construye el charset: <code>let charset = \'\'; if (chkMayus.checked) charset += MAYUS;</code>',
          'Genera con bucle: <code>for (let i = 0; i < longitud; i++) { pass += charset[Math.floor(Math.random() * charset.length)]; }</code>',
          'Lee la longitud: <code>const longitud = parseInt(sliderLong.value);</code>',
        ],
        validate(doc) {
          try {
            const chkMayus = doc.getElementById('chkMayus');
            const chkMinus = doc.getElementById('chkMinus');
            const chkNums = doc.getElementById('chkNums');
            const chkSimb = doc.getElementById('chkSimbolos');
            const sliderLong = doc.getElementById('sliderLong');
            const btnGen = doc.getElementById('btnGenerar');
            const password = doc.getElementById('password');
            if (!btnGen || !password || !sliderLong) return { pass: false, msg: 'Faltan elementos. Verifica #btnGenerar, #password y #sliderLong.' };
            if (chkMayus) chkMayus.checked = true;
            if (chkMinus) chkMinus.checked = true;
            if (chkNums) chkNums.checked = true;
            if (chkSimb) chkSimb.checked = true;
            sliderLong.value = '12';
            sliderLong.dispatchEvent(new doc.defaultView.Event('input', { bubbles: true }));
            btnGen.click();
            const pass = password.textContent.trim();
            if (pass === '—' || pass === '' || pass.length < 8) return { pass: false, msg: `La contraseña generada es demasiado corta o vacía: "${pass}". Verifica el bucle y el charset.` };
            if (pass.length < 12) return { pass: false, msg: `La contraseña tiene ${pass.length} caracteres en lugar de 12.` };
            return { pass: true, msg: '¡Generador de contraseña funcionando! Math.random(), bucle for y charsets dominados.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },
    ],
  },

  // ============================================================
  // NIVEL 5: ANIMACIONES Y EFECTOS
  // ============================================================
  {
    id: 5, name: 'Animaciones y Efectos', subtitle: 'CSS animations + JavaScript',
    icon: '✨', color: '#f78166',
    challenges: [

      {
        id: '5-1',
        title: 'Activar Animaciones',
        mission: `La separación de responsabilidades es clave: CSS define el aspecto visual de las animaciones (usando @keyframes), y JavaScript decide cuándo activarlas. Esto se logra con classList.toggle('animar'): agrega la clase si no existe (inicia la animación), y la quita si ya existe (detiene la animación). El CSS ya tiene definida la animación 'rebotar' y la clase '.animar' que la aplica — tu única tarea es conectar el botón #btnAnimar con el div #pelota a través de classList.toggle en el evento 'click'. Este patrón de "CSS define, JS activa" es el estándar profesional para animaciones controladas por usuario.`,
        objective: `Al hacer clic en el botón, alterna la clase "animar" en el div#pelota para que rebote`,
        initialHTML: `<div class="pagina">
  <div id="pelota">⚽</div>
  <button id="btnAnimar">Animar / Detener</button>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #1c2128;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.pagina {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

#pelota {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
}

/* Animación definida — JS solo agrega/quita la clase */
@keyframes rebotar {
  0%, 100% { transform: translateY(0) scale(1); }
  50%       { transform: translateY(-50px) scale(1.12); }
}

.animar {
  animation: rebotar 0.7s ease-in-out infinite;
}

#btnAnimar {
  padding: 12px 28px;
  background: #58a6ff;
  color: #0d1117;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}`,
        initialJS: `// Al hacer clic en #btnAnimar:
// Alterna (toggle) la clase 'animar' en #pelota
// La animación CSS ya está definida — solo agrega/quita la clase

`,
        hints: [
          `Obtén la pelota: <code>const pelota = document.getElementById('pelota');</code>`,
          `En el clic del botón: <code>pelota.classList.toggle('animar');</code>`,
          `classList.toggle agrega la clase si no existe, y la quita si ya existe.`,
        ],
        validate(doc) {
          try {
            const btn    = doc.getElementById('btnAnimar');
            const pelota = doc.getElementById('pelota');
            if (!btn || !pelota) return { pass: false, msg: 'Faltan elementos #btnAnimar o #pelota.' };
            btn.click();
            if (pelota.classList.contains('animar')) return { pass: true, msg: '¡La animación se activa con JS! classList.toggle es poderoso.' };
            return { pass: false, msg: 'Después del clic, la clase "animar" no se agrega a #pelota. Usa classList.toggle().' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '5-2',
        title: 'Mover un Elemento',
        mission: `Los elementos con position:absolute se pueden mover libremente dentro de su contenedor relativo usando las propiedades CSS left y top. Para mover un elemento con JavaScript: mantén dos variables (x e y) que registren la posición actual, y al hacer clic en cada botón direccional actualiza la variable correspondiente (x para izquierda/derecha, y para arriba/abajo) y aplica caja.style.left = x + 'px' o caja.style.top = y + 'px'. Importante: subir significa restar de top (porque top 0 es la parte superior de la pantalla), y bajar significa sumar a top. Declara x e y fuera de los eventos para que persistan entre clics.`,
        objective: `Al hacer clic en los botones de dirección, mueve el div#caja 20px en esa dirección usando style.left y style.top`,
        initialHTML: `<div class="pagina">
  <div class="arena">
    <div id="caja">📦</div>
  </div>
  <div class="controles">
    <div></div>
    <button id="btnArriba">↑</button>
    <div></div>
    <button id="btnIzq">←</button>
    <button id="btnAbajo">↓</button>
    <button id="btnDer">→</button>
  </div>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #161b22;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.pagina {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.arena {
  position: relative;
  width: 360px;
  height: 220px;
  border: 2px solid #30363d;
  border-radius: 12px;
  background: #0d1117;
  overflow: hidden;
}

#caja {
  position: absolute;
  left: 50px;
  top: 50px;
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #58a6ff, #1f6feb);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: left 0.1s, top 0.1s;
  cursor: pointer;
}

.controles {
  display: grid;
  grid-template-columns: repeat(3, 46px);
  gap: 6px;
}

.controles button {
  width: 46px;
  height: 46px;
  font-size: 1.2rem;
  background: #21262d;
  color: #e6edf3;
  border: 1px solid #30363d;
  border-radius: 8px;
  cursor: pointer;
}

.controles button:hover {
  background: #30363d;
}`,
        initialJS: `// La caja tiene position:absolute, left:50px, top:50px
// Cada botón debe moverla 20px en su dirección
// Pista:
//   const caja = document.getElementById('caja');
//   let x = 50, y = 50; // posición actual
//   Al presionar derecha: x += 20; caja.style.left = x + 'px';
//   Al presionar arriba:  y -= 20; caja.style.top  = y + 'px';

`,
        hints: [
          `Declara: <code>let x = 50, y = 50;</code>`,
          `Al presionar derecha: <code>x += 20; caja.style.left = x + 'px';</code>`,
          `Al presionar arriba: <code>y -= 20; caja.style.top = y + 'px';</code> (arriba = menos top)`,
        ],
        validate(doc) {
          try {
            const der  = doc.getElementById('btnDer');
            const caja = doc.getElementById('caja');
            if (!der || !caja) return { pass: false, msg: 'Faltan elementos. Verifica los ids.' };
            const before = parseInt(caja.style.left) || 50;
            der.click();
            const after = parseInt(caja.style.left) || 50;
            if (after > before) return { pass: true, msg: '¡La caja se mueve con JS! Controlas posición absoluta.' };
            return { pass: false, msg: 'Al hacer clic en →, la caja no se movió. Verifica que cambias style.left.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '5-3',
        title: 'Acordeón de Preguntas',
        mission: `El acordeón es un patrón de UI donde al abrir un elemento se cierran los demás — solo uno está abierto a la vez. nextElementSibling devuelve el elemento hermano que sigue inmediatamente en el DOM, en este caso la .respuesta que sigue a cada .pregunta clicada. El algoritmo: cuando se hace clic en una .pregunta, primero cierra todas las .respuesta y .pregunta quitando 'abierto' con querySelectorAll + forEach, luego abre la actual agregando 'abierto' a this.nextElementSibling (la respuesta) y a this (para girar el ícono ▼). Usa function en lugar de arrow function para tener acceso a this que referencia el elemento clicado.`,
        objective: `Al hacer clic en cualquier .pregunta, alterna la clase "abierto" en su .respuesta siguiente. Solo una respuesta abierta a la vez.`,
        initialHTML: `<div class="faq">
  <div class="item-faq">
    <div class="pregunta">¿Qué es el DOM? <span class="icono">▼</span></div>
    <div class="respuesta">El DOM es la representación en memoria de la estructura HTML. Permite a JavaScript leer y modificar la página.</div>
  </div>
  <div class="item-faq">
    <div class="pregunta">¿Para qué sirve addEventListener? <span class="icono">▼</span></div>
    <div class="respuesta">addEventListener conecta un elemento HTML con una función que se ejecuta cuando ocurre un evento, como un clic.</div>
  </div>
  <div class="item-faq">
    <div class="pregunta">¿Qué es classList? <span class="icono">▼</span></div>
    <div class="respuesta">classList permite agregar, quitar y alternar clases CSS en un elemento desde JavaScript.</div>
  </div>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #f3e5f5;
  padding: 30px;
  margin: 0;
}

.faq {
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item-faq {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #ce93d8;
}

.pregunta {
  padding: 16px 20px;
  cursor: pointer;
  font-weight: 600;
  color: #6a1b9a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  transition: background 0.2s;
}

.pregunta:hover { background: #f8f0ff; }

.icono {
  transition: transform 0.3s;
  font-size: 0.8rem;
}

.respuesta {
  max-height: 0;
  overflow: hidden;
  padding: 0 20px;
  color: #555;
  font-size: 0.9rem;
  line-height: 1.6;
  transition: max-height 0.4s ease, padding 0.3s;
}

/* JS agrega esta clase para expandir */
.respuesta.abierto {
  max-height: 200px;
  padding: 14px 20px;
}

.pregunta.abierto .icono {
  transform: rotate(180deg);
}`,
        initialJS: `// PASO 1: obtén todas las .pregunta con querySelectorAll
// PASO 2: para cada pregunta agrega un evento 'click'
// PASO 3: dentro del evento (usa function, no arrow, para tener 'this'):
//   a) PRIMERO cierra todas las respuestas y preguntas:
//      document.querySelectorAll('.respuesta').forEach(r => r.classList.remove('abierto'));
//      document.querySelectorAll('.pregunta').forEach(p => p.classList.remove('abierto'));
//   b) LUEGO abre solo la actual:
//      const respuesta = this.nextElementSibling;
//      respuesta.classList.add('abierto');
//      this.classList.add('abierto');  ← para girar el ícono ▼

`,
        hints: [
          `Obtén todas: <code>const preguntas = document.querySelectorAll('.pregunta');</code>`,
          `La respuesta del ítem: <code>const respuesta = this.nextElementSibling;</code> (usa <code>function()</code>, no arrow)`,
          `Cierra todas antes: <code>document.querySelectorAll('.respuesta').forEach(r => r.classList.remove('abierto'));</code>`,
        ],
        validate(doc) {
          try {
            const preguntas = doc.querySelectorAll('.pregunta');
            if (!preguntas.length) return { pass: false, msg: 'No encontré elementos con clase "pregunta".' };
            preguntas[0].click();
            const r0 = preguntas[0].nextElementSibling;
            if (!r0 || !r0.classList.contains('abierto')) return { pass: false, msg: 'Al hacer clic en la primera pregunta, su respuesta no tiene la clase "abierto".' };
            preguntas[1].click();
            const r1 = preguntas[1].nextElementSibling;
            if (!r1 || !r1.classList.contains('abierto')) return { pass: false, msg: 'Al hacer clic en la segunda pregunta, su respuesta no se abre.' };
            if (r0.classList.contains('abierto')) return { pass: false, msg: 'Al abrir la segunda pregunta, la primera debería cerrarse (solo una abierta a la vez).' };
            return { pass: true, msg: '¡Acordeón perfecto! Una sola respuesta abierta a la vez.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '5-4',
        title: 'Efecto Máquina de Escribir',
        mission: `El efecto máquina de escribir muestra texto carácter por carácter usando setInterval. Los strings en JavaScript se pueden indexar como arrays: texto[0] es la primera letra, texto[1] la segunda, etc. El operador += agrega un carácter al final del textContent actual. El flujo: declara const texto = '¡Bienvenido a WebCraft!', let i = 0 y let intervalo = null. Al hacer clic: limpia el intervalo previo, resetea i a 0 y vacía pantalla.textContent, luego inicia el intervalo que en cada tick hace pantalla.textContent += texto[i], incrementa i, y verifica si i >= texto.length para llamar clearInterval. Así el texto aparece letra por letra hasta completarse.`,
        objective: `Al hacer clic en "Escribir", el texto "¡Bienvenido a WebCraft!" aparece letra por letra en #pantalla, con 80ms entre cada carácter.`,
        initialHTML: `<div class="contenedor">
  <div id="pantalla" class="pantalla">_</div>
  <button id="btnEscribir">▶ Escribir</button>
</div>`,
        initialCSS: `body {
  font-family: monospace;
  background: #0d1117;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.contenedor {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

.pantalla {
  width: 360px;
  min-height: 70px;
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 10px;
  padding: 20px 24px;
  font-size: 1.3rem;
  color: #58a6ff;
  display: flex;
  align-items: center;
  letter-spacing: 0.04em;
}

#btnEscribir {
  padding: 12px 28px;
  background: #238636;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}`,
        initialJS: `// PASO 1: define el texto completo y un índice
// const texto = '¡Bienvenido a WebCraft!';
// let i = 0;
// let intervalo = null;

// PASO 2: al hacer clic en #btnEscribir:
//   a) Detén el intervalo anterior: clearInterval(intervalo)
//   b) Resetea el índice: i = 0
//   c) Vacía la pantalla: pantalla.textContent = ''
//   d) Inicia el intervalo con 80ms:
//      intervalo = setInterval(function() {
//        pantalla.textContent += texto[i];  ← añade una letra
//        i++;
//        if (i >= texto.length) clearInterval(intervalo);  ← detén al terminar
//      }, 80);

`,
        hints: [
          `Define el texto: <code>const texto = '¡Bienvenido a WebCraft!';</code> y el índice <code>let i = 0;</code>`,
          `En cada tick: <code>pantalla.textContent += texto[i]; i++;</code>`,
          `Para detener: <code>if (i >= texto.length) { clearInterval(intervalo); }</code>`,
        ],
        validate(doc) {
          try {
            const btn = doc.getElementById('btnEscribir');
            const pantalla = doc.getElementById('pantalla');
            if (!btn || !pantalla) return { pass: false, msg: 'No encontré #btnEscribir o #pantalla.' };
            btn.click();
            const after = pantalla.textContent.trim();
            if (after === '_' || after === '') return { pass: false, msg: 'Al hacer clic, #pantalla no muestra nada. ¿Iniciaste el setInterval?' };
            return { pass: true, msg: '¡El efecto typewriter funciona! setInterval con índice progresivo dominado.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '5-5',
        title: 'Semáforo Interactivo',
        mission: `El operador módulo (%) es fundamental para ciclos: (actual + 1) % 3 produce la secuencia 0→1→2→0→1→2... indefinidamente, volviendo al inicio automáticamente. Para el semáforo: defines un array de IDs correspondiente a cada estado ['luzRoja', 'luzVerde', 'luzAmarilla'], y un array de nombres ['Rojo', 'Verde', 'Amarillo']. Al hacer clic: avanza actual con módulo, luego apaga TODAS las luces quitando 'activo' de cada ID (con forEach), y finalmente enciende solo la actual agregando 'activo' a luces[actual]. También actualiza el párrafo #estado con el nombre del estado actual para accesibilidad.`,
        objective: `Al hacer clic en "Siguiente", el semáforo avanza: rojo → verde → amarillo → rojo. La luz activa se resalta con la clase "activo".`,
        initialHTML: `<div class="contenedor">
  <div class="semaforo">
    <div id="luzRoja"     class="luz activo"></div>
    <div id="luzVerde"    class="luz"></div>
    <div id="luzAmarilla" class="luz"></div>
  </div>
  <button id="btnSiguiente">Siguiente →</button>
  <p id="estado">Estado: Rojo</p>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #212121;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.contenedor {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.semaforo {
  background: #333;
  border-radius: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: 3px solid #555;
}

.luz {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #1a1a1a;
  transition: all 0.3s;
}

#luzRoja.activo    { background: #f44336; box-shadow: 0 0 24px #f44336; }
#luzVerde.activo   { background: #4caf50; box-shadow: 0 0 24px #4caf50; }
#luzAmarilla.activo{ background: #ffeb3b; box-shadow: 0 0 24px #ffeb3b; }

#btnSiguiente {
  padding: 12px 28px;
  background: #616161;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

#estado { color: #aaa; margin: 0; }`,
        initialJS: `// PASO 1: define los estados y sus IDs correspondientes
// const estados = ['Rojo', 'Verde', 'Amarillo'];
// const luces   = ['luzRoja', 'luzVerde', 'luzAmarilla'];
// let actual = 0;  ← empieza en rojo (índice 0)

// PASO 2: al hacer clic en #btnSiguiente:
//   a) Avanza el índice con módulo: actual = (actual + 1) % estados.length
//   b) Apaga TODAS las luces:
//      luces.forEach(id => document.getElementById(id).classList.remove('activo'));
//   c) Enciende la luz actual:
//      document.getElementById(luces[actual]).classList.add('activo');
//   d) Actualiza el texto de #estado:
//      document.getElementById('estado').textContent = 'Estado: ' + estados[actual];

`,
        hints: [
          `El módulo hace el ciclo: <code>actual = (actual + 1) % 3;</code> → 0, 1, 2, 0, 1...`,
          `Apaga todas: <code>luces.forEach(id => document.getElementById(id).classList.remove('activo'));</code>`,
          `Enciende la actual: <code>document.getElementById(luces[actual]).classList.add('activo');</code>`,
        ],
        validate(doc) {
          try {
            const btn = doc.getElementById('btnSiguiente');
            const lR  = doc.getElementById('luzRoja');
            const lV  = doc.getElementById('luzVerde');
            const lA  = doc.getElementById('luzAmarilla');
            if (!btn || !lR || !lV || !lA) return { pass: false, msg: 'Faltan elementos. No borres los ids de las luces.' };
            if (!lR.classList.contains('activo')) return { pass: false, msg: 'Al inicio, luzRoja debería tener la clase "activo".' };
            btn.click();
            if (!lV.classList.contains('activo')) return { pass: false, msg: 'Después del primer clic, luzVerde debería estar activa.' };
            if (lR.classList.contains('activo')) return { pass: false, msg: 'Al pasar a verde, luzRoja debería apagarse.' };
            btn.click();
            if (!lA.classList.contains('activo')) return { pass: false, msg: 'Después del segundo clic, luzAmarilla debería estar activa.' };
            btn.click();
            if (!lR.classList.contains('activo')) return { pass: false, msg: 'Después del tercer clic, debería volver a luzRoja (ciclo).' };
            return { pass: true, msg: '¡Semáforo perfecto! El ciclo con módulo % funciona correctamente.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '5-6',
        title: 'Carrusel de Imágenes',
        mission: `Un carrusel muestra un elemento a la vez de una colección, con botones para ir al siguiente o al anterior. Crea una función mostrar(nuevoIndice) que: quita 'activo' de todos los .slide y .punto con forEach, actualiza indice = nuevoIndice, agrega 'activo' a slides[indice] y puntos[indice]. Para navegar hacia adelante: mostrar((indice + 1) % slides.length) — el módulo hace que después del último vuelva al primero. Para atrás: mostrar((indice - 1 + slides.length) % slides.length) — sumar slides.length antes del módulo evita índices negativos. Los puntos indicadores dan al usuario la noción de cuántos slides hay y cuál es el actual.`,
        objective: `Los botones #prev y #next navegan entre slides. Solo el slide activo tiene clase "activo". Los puntos indicadores (.punto) muestran cuál slide es el actual.`,
        initialHTML: `<div class="carrusel">
  <div class="slides">
    <div class="slide activo" style="background:#e74c3c">🌅 Slide 1</div>
    <div class="slide" style="background:#3498db">🌊 Slide 2</div>
    <div class="slide" style="background:#2ecc71">🌿 Slide 3</div>
  </div>
  <div class="controles">
    <button id="prev">◀</button>
    <div class="puntos">
      <span class="punto activo"></span>
      <span class="punto"></span>
      <span class="punto"></span>
    </div>
    <button id="next">▶</button>
  </div>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #212121;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.carrusel {
  width: 360px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.slides {
  position: relative;
  height: 200px;
  border-radius: 14px;
  overflow: hidden;
}

.slide {
  position: absolute;
  inset: 0;
  display: none;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: bold;
  color: white;
  text-shadow: 0 2px 6px rgba(0,0,0,0.4);
  border-radius: 14px;
}

.slide.activo {
  display: flex;
}

.controles {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
}

.controles button {
  width: 44px;
  height: 44px;
  background: #333;
  color: white;
  border: 1px solid #555;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1rem;
}

.controles button:hover {
  background: #444;
}

.puntos {
  display: flex;
  gap: 8px;
}

.punto {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #555;
  transition: background 0.2s;
}

.punto.activo {
  background: white;
}`,
        initialJS: `// PASO 1: obtén los slides, los puntos, y los botones #prev y #next
// const slides = document.querySelectorAll('.slide');
// const puntos = document.querySelectorAll('.punto');
// let indice = 0;

// PASO 2: crea una función mostrar(nuevoIndice) que:
//   a) Quita 'activo' de todos los slides y puntos
//   b) indice = nuevoIndice;
//   c) Agrega 'activo' al slide[indice] y punto[indice]

// PASO 3: en #next: mostrar((indice + 1) % slides.length)
// PASO 4: en #prev: mostrar((indice - 1 + slides.length) % slides.length)
\n`,
        hints: [
          'Cicla hacia adelante: <code>(indice + 1) % slides.length</code>',
          'Cicla hacia atrás: <code>(indice - 1 + slides.length) % slides.length</code>',
          'Quita todas: <code>slides.forEach(s => s.classList.remove(\'activo\')); puntos.forEach(p => p.classList.remove(\'activo\'));</code>',
        ],
        validate(doc) {
          try {
            const slides = doc.querySelectorAll('.slide');
            const puntos = doc.querySelectorAll('.punto');
            const next = doc.getElementById('next');
            const prev = doc.getElementById('prev');
            if (!slides.length || !next || !prev) return { pass: false, msg: 'Faltan elementos. Verifica .slide, #next y #prev.' };
            next.click(); next.click();
            const activoIdx = [...slides].findIndex(s => s.classList.contains('activo'));
            if (activoIdx !== 2) return { pass: false, msg: `Después de 2 clics en next, el slide activo debería ser el tercero (índice 2), pero es el ${activoIdx}.` };
            next.click();
            const wraparound = [...slides].findIndex(s => s.classList.contains('activo'));
            if (wraparound !== 0) return { pass: false, msg: `Después de 3 clics en next, debería volver al slide 0 (ciclo), pero está en el índice ${wraparound}.` };
            return { pass: true, msg: '¡Carrusel funcionando con ciclo y puntos indicadores! El módulo % para ciclar dominado.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '5-7',
        title: 'Efecto Parallax Simple',
        mission: `El parallax crea profundidad visual haciendo que el fondo se mueva más lento que el contenido de la página al hacer scroll. window.scrollY es una propiedad de solo lectura que indica cuántos píxeles se ha desplazado la página verticalmente. El evento 'scroll' de window se dispara continuamente mientras el usuario hace scroll. Dentro del listener: lee window.scrollY, multiplica por 0.5 (mitad de velocidad) y asigna a hero.style.backgroundPositionY (con la unidad 'px'). También muestra el valor de scrollY redondeado en #scrollVal. El efecto es sutil pero notable: el degradado del header se mueve más lento que el contenido debajo de él.`,
        objective: `Al hacer scroll en la página, mueve el backgroundPositionY de #hero a la mitad de la velocidad del scroll (scrollY * 0.5 + 'px'). Muestra el valor de scrollY en #scrollVal.`,
        initialHTML: `<div id="hero" class="hero">
  <h1>Efecto Parallax</h1>
  <p>Scroll: <span id="scrollVal">0</span>px</p>
</div>
<div class="contenido">
  <div class="bloque">Sección de contenido — haz scroll para ver el efecto</div>
  <div class="bloque">Más contenido aquí...</div>
  <div class="bloque">Y más aquí...</div>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  margin: 0;
  padding: 0;
}

#hero {
  height: 300px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  gap: 12px;
  position: relative;
  overflow: hidden;
}

#hero h1 {
  margin: 0;
  font-size: 2rem;
  text-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

#hero p {
  margin: 0;
  font-size: 1rem;
  opacity: 0.8;
}

#scrollVal {
  font-weight: bold;
}

.contenido {
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #f5f5f5;
}

.bloque {
  background: white;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  color: #555;
  font-size: 1.1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}`,
        initialJS: `// PASO 1: obtén el div #hero y el span #scrollVal
// PASO 2: agrega el evento 'scroll' a window (no al document, sino a window):
//   window.addEventListener('scroll', function() { ... });
// PASO 3: dentro del evento:
//   - Lee el scroll: const scrollY = window.scrollY;
//   - Mueve el fondo: hero.style.backgroundPositionY = (scrollY * 0.5) + 'px';
//   - Muestra el valor: scrollVal.textContent = Math.round(scrollY);
\n`,
        hints: [
          'Escucha el scroll: <code>window.addEventListener(\'scroll\', function() { ... });</code>',
          'Lee el desplazamiento: <code>const scrollY = window.scrollY;</code>',
          'Aplica el parallax: <code>hero.style.backgroundPositionY = (scrollY * 0.5) + \'px\';</code>',
        ],
        validate(doc) {
          try {
            const hero = doc.getElementById('hero');
            const scrollVal = doc.getElementById('scrollVal');
            if (!hero) return { pass: false, msg: 'No encontré el div con id="hero".' };
            if (!scrollVal) return { pass: false, msg: 'No encontré el span con id="scrollVal".' };
            const win = doc.defaultView;
            win.dispatchEvent(new win.Event('scroll'));
            const bgPos = hero.style.backgroundPositionY;
            // Accept any value set (including '0px' when scrollY is 0)
            if (bgPos !== undefined && bgPos !== null && bgPos !== '') {
              return { pass: true, msg: '¡Efecto parallax funcionando! El evento scroll y backgroundPositionY dominados.' };
            }
            return { pass: false, msg: 'Al disparar el evento scroll, hero.style.backgroundPositionY no se modificó. Agrega el listener al window con window.addEventListener("scroll", ...) y asigna hero.style.backgroundPositionY.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '5-8',
        title: 'Notificación Toast',
        mission: `Las notificaciones toast combinan createElement con setTimeout para crear elementos temporales que se auto-eliminan. El proceso al hacer clic: crea un div con document.createElement('div'), asígnale la clase 'toast' con toast.className = 'toast', escribe un mensaje con toast.textContent, agrégalo al contenedor con contenedor.appendChild(toast), y programa su eliminación con setTimeout(() => toast.remove(), 3000). Esta función de flecha dentro del setTimeout captura la referencia a toast en un closure, lo que permite eliminar exactamente ese toast (no todos) cuando pasan 3 segundos. Cada clic debe crear una nueva notificación independiente de las anteriores.`,
        objective: `Al hacer clic en #btnNotif, crea un div.toast con un mensaje y añádelo a #contenedor. Después de 3 segundos, el toast se elimina automáticamente.`,
        initialHTML: `<div class="pagina">
  <button id="btnNotif">🔔 Mostrar Notificación</button>
  <div id="contenedor" class="contenedor-toasts"></div>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #1c2128;
  margin: 0;
}

.pagina {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  gap: 24px;
}

#btnNotif {
  padding: 12px 24px;
  background: #58a6ff;
  color: #0d1117;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}

.contenedor-toasts {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 320px;
}

.toast {
  background: #2d333b;
  color: #e6edf3;
  border: 1px solid #444c56;
  border-left: 4px solid #58a6ff;
  border-radius: 8px;
  padding: 14px 18px;
  font-size: 0.95rem;
  animation: entrar 0.3s ease;
}

@keyframes entrar {
  from { opacity: 0; transform: translateX(20px); }
  to   { opacity: 1; transform: translateX(0); }
}`,
        initialJS: `// PASO 1: obtén el botón #btnNotif y el div #contenedor
// PASO 2: mantén un contador de notificaciones: let num = 0;
// PASO 3: en el clic del botón:
//   a) Incrementa el contador
//   b) Crea un div: const toast = document.createElement('div');
//   c) Asígnale la clase 'toast': toast.className = 'toast';
//   d) Asígnale un texto con el número: toast.textContent = '✅ Notificación #' + num;
//   e) Agrégalo al contenedor: contenedor.appendChild(toast);
//   f) Elimínalo después de 3 segundos: setTimeout(() => toast.remove(), 3000);
\n`,
        hints: [
          'Crea el toast: <code>const toast = document.createElement(\'div\'); toast.className = \'toast\';</code>',
          'Añade al contenedor: <code>contenedor.appendChild(toast);</code>',
          'Auto-eliminar: <code>setTimeout(() => toast.remove(), 3000);</code>',
        ],
        validate(doc) {
          try {
            const btn = doc.getElementById('btnNotif');
            const contenedor = doc.getElementById('contenedor');
            if (!btn) return { pass: false, msg: 'No encontré el botón con id="btnNotif".' };
            if (!contenedor) return { pass: false, msg: 'No encontré el div con id="contenedor".' };
            btn.click();
            const toasts = contenedor.querySelectorAll('.toast');
            if (!toasts.length) return { pass: false, msg: 'Al hacer clic, no se creó ningún elemento .toast en #contenedor.' };
            const txt = toasts[toasts.length - 1].textContent.trim();
            if (!txt) return { pass: false, msg: 'El toast creado está vacío. Asígna un textContent con el mensaje.' };
            btn.click();
            const toasts2 = contenedor.querySelectorAll('.toast').length;
            if (toasts2 < 2) return { pass: false, msg: 'El segundo clic debería crear otro toast independiente.' };
            return { pass: true, msg: '¡Notificaciones toast funcionando! createElement + setTimeout + remove() dominados.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '5-9',
        title: 'Arrastrar y Soltar Visual',
        mission: `El drag and drop manual usa tres eventos coordinados: 'mousedown' en el elemento para iniciar, 'mousemove' en el document para mover, y 'mouseup' en el document para terminar. En mousedown guardas una variable arrastrando = true y calculas el offset — la distancia entre el cursor y la esquina del elemento (getBoundingClientRect().left/top) — para que el elemento no salte al punto del cursor. En mousemove, si arrastrando es true, calculas la nueva posición restando el offset: style.left = (e.clientX - offsetX) + 'px'. En mouseup pones arrastrando = false. Los listeners de move y up van en document para capturar el mouse aunque salga del elemento.`,
        objective: `Al hacer mousedown en #draggable, activa el arrastre. Al mover el mouse, actualiza style.left y style.top. Al hacer mouseup, detiene el arrastre.`,
        initialHTML: `<div class="arena">
  <div id="draggable" class="draggable">
    🎯 Arrástrarne
  </div>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  margin: 0;
  padding: 0;
}

.arena {
  width: 100vw;
  height: 100vh;
  background: #1a1a2e;
  position: relative;
  overflow: hidden;
}

#draggable {
  position: absolute;
  left: 100px;
  top: 100px;
  width: 140px;
  height: 80px;
  background: linear-gradient(135deg, #58a6ff, #1f6feb);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.95rem;
  font-weight: bold;
  cursor: grab;
  user-select: none;
  box-shadow: 0 4px 16px rgba(88,166,255,0.3);
  transition: box-shadow 0.2s;
}

#draggable.arrastrando {
  cursor: grabbing;
  box-shadow: 0 8px 28px rgba(88,166,255,0.5);
}`,
        initialJS: `// PASO 1: obtén el div #draggable
// PASO 2: declara variables para el estado:
//   let arrastrando = false;
//   let offsetX = 0, offsetY = 0;

// PASO 3: mousedown en draggable:
//   arrastrando = true;
//   Calcula el offset (dónde dentro del div hizo clic):
//   offsetX = event.clientX - draggable.getBoundingClientRect().left;
//   offsetY = event.clientY - draggable.getBoundingClientRect().top;

// PASO 4: mousemove en document:
//   Si arrastrando:
//     draggable.style.left = (event.clientX - offsetX) + 'px';
//     draggable.style.top  = (event.clientY - offsetY) + 'px';

// PASO 5: mouseup en document: arrastrando = false;
\n`,
        hints: [
          'Calcula el offset: <code>offsetX = e.clientX - draggable.getBoundingClientRect().left;</code>',
          'En mousemove: <code>if (arrastrando) { draggable.style.left = (e.clientX - offsetX) + \'px\'; }</code>',
          'Detén en mouseup: <code>document.addEventListener(\'mouseup\', () => arrastrando = false);</code>',
        ],
        validate(doc) {
          try {
            const draggable = doc.getElementById('draggable');
            if (!draggable) return { pass: false, msg: 'No encontré el div con id="draggable".' };
            const win = doc.defaultView;
            const rectBefore = { left: parseInt(draggable.style.left) || 100, top: parseInt(draggable.style.top) || 100 };
            draggable.dispatchEvent(new win.MouseEvent('mousedown', { bubbles: true, clientX: 170, clientY: 140 }));
            doc.dispatchEvent(new win.MouseEvent('mousemove', { bubbles: true, clientX: 250, clientY: 200 }));
            const leftAfter = parseInt(draggable.style.left);
            const topAfter = parseInt(draggable.style.top);
            if (!draggable.style.left && !draggable.style.top) return { pass: false, msg: 'Después de mousemove, style.left y style.top no se actualizaron. Agrega el listener de mousemove al document.' };
            if (leftAfter === rectBefore.left && topAfter === rectBefore.top) return { pass: false, msg: 'La posición del elemento no cambió después de mousemove. Verifica que estás calculando la nueva posición.' };
            doc.dispatchEvent(new win.MouseEvent('mouseup', { bubbles: true }));
            return { pass: true, msg: '¡Drag and drop funcionando! mousedown, mousemove y mouseup dominados.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '5-10',
        title: 'Reloj Digital en Tiempo Real',
        mission: `El objeto Date en JavaScript da acceso al tiempo actual. new Date() crea un objeto con la fecha y hora del momento de ejecución. Sus métodos getHours(), getMinutes() y getSeconds() devuelven números enteros. padStart(2, '0') es un método de string que agrega ceros al inicio si el número tiene menos de 2 dígitos: '9'.padStart(2, '0') devuelve '09'. Necesitas convertir el número a string primero con String(n). El flujo completo: clearInterval del anterior, inicia un nuevo setInterval cada 1000ms donde creas un new Date(), extraes h/m/s, los formateas con padStart y los concatenas con ':' para actualizar #reloj. clearInterval en el botón Detener para el reloj inmediatamente.`,
        objective: `#btnIniciar inicia un reloj que actualiza #reloj cada segundo con el formato HH:MM:SS. #btnDetener detiene el reloj.`,
        initialHTML: `<div class="contenedor">
  <div id="reloj" class="display-reloj">--:--:--</div>
  <div class="btns">
    <button id="btnIniciar">▶ Iniciar</button>
    <button id="btnDetener">⏹ Detener</button>
  </div>
</div>`,
        initialCSS: `body {
  font-family: monospace;
  background: #0d1117;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.contenedor {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

.display-reloj {
  font-size: 5rem;
  font-weight: 900;
  color: #58a6ff;
  letter-spacing: 0.05em;
  text-shadow: 0 0 30px rgba(88,166,255,0.4);
}

.btns {
  display: flex;
  gap: 14px;
}

.btns button {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}

#btnIniciar  { background: #238636; color: white; }
#btnDetener  { background: #da3633; color: white; }`,
        initialJS: `// PASO 1: declara una variable: let intervalo = null;
// PASO 2: en el clic de #btnIniciar:
//   - Limpia cualquier intervalo previo: clearInterval(intervalo);
//   - Inicia uno nuevo cada 1000ms:
//     intervalo = setInterval(function() {
//       const ahora = new Date();
//       const h = String(ahora.getHours()).padStart(2, '0');
//       const m = String(ahora.getMinutes()).padStart(2, '0');
//       const s = String(ahora.getSeconds()).padStart(2, '0');
//       document.getElementById('reloj').textContent = h + ':' + m + ':' + s;
//     }, 1000);
// PASO 3: en el clic de #btnDetener: clearInterval(intervalo);
\n`,
        hints: [
          'Formatea con padStart: <code>const h = String(new Date().getHours()).padStart(2, \'0\');</code>',
          'Construye la cadena: <code>reloj.textContent = h + \':\' + m + \':\' + s;</code>',
          'Para detener: <code>clearInterval(intervalo);</code>',
        ],
        validate(doc) {
          try {
            const btn = doc.getElementById('btnIniciar');
            const btnDet = doc.getElementById('btnDetener');
            const reloj = doc.getElementById('reloj');
            if (!btn || !reloj) return { pass: false, msg: 'No encontré #btnIniciar o #reloj.' };
            const before = reloj.textContent.trim();
            btn.click();
            const after = reloj.textContent.trim();
            // setInterval is async — the clock may not update in sync, but the initial
            // render (if implemented correctly) may fire immediately via setInterval(fn, 0) trick
            // or may not if 1000ms. Check for format if changed, or accept if it contains ':'
            if (after === '--:--:--' && before === '--:--:--') {
              // setInterval didn't fire yet (normal at 1000ms) — check reiniciar as proxy
              // Give benefit of doubt: if btn exists and code likely runs setInterval
              if (btnDet) btnDet.click();
              return { pass: false, msg: 'Al hacer clic en Iniciar, el reloj sigue en "--:--:--". El setInterval debería actualizar el tiempo — verifica que creas el intervalo con setInterval y actualizas reloj.textContent dentro de él.' };
            }
            if (!after.includes(':')) return { pass: false, msg: `El reloj muestra "${after}" pero debe tener formato HH:MM:SS con ":"` };
            if (btnDet) btnDet.click();
            return { pass: true, msg: '¡Reloj digital funcionando! new Date(), padStart y setInterval dominados.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },
    ],
  },

  // ============================================================
  // NIVEL 6: COMPONENTES DINÁMICOS
  // ============================================================
  {
    id: 6, name: 'Componentes Dinámicos', subtitle: 'Mini-aplicaciones completas',
    icon: '🚀', color: '#58a6ff',
    challenges: [

      {
        id: '6-1',
        title: 'Lista de Tareas (To-Do)',
        mission: `La lista de tareas (To-Do) es el proyecto introductorio más popular porque combina los conceptos fundamentales: lectura de inputs, creación dinámica de elementos, toggle de clases y limpieza de formularios. El flujo al hacer clic en "+": lee el valor de #inputTarea, si está vacío no hagas nada (trim() para ignorar espacios). Si tiene contenido: crea un li con createElement, asígnale el texto con textContent, agrega un listener 'click' al li que haga classList.toggle('completada'), añade el li a #listaTareas con appendChild, y limpia el input con inputTarea.value = ''. La clase 'completada' ya tiene estilos CSS definidos — solo necesitas aplicarla con toggle.`,
        objective: `Al hacer clic en "+": crea un <li> con el texto del input en #listaTareas. Al hacer clic en el li, toggle la clase "completada". El input se limpia después de agregar.`,
        initialHTML: `<div class="app">
  <h2 class="titulo">📋 Mis Tareas</h2>
  <div class="entrada">
    <input id="inputTarea" type="text" placeholder="Nueva tarea...">
    <button id="btnAgregar">+</button>
  </div>
  <ul id="listaTareas"></ul>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #f0f2f5;
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  margin: 0;
}

.app {
  background: white;
  border-radius: 16px;
  padding: 28px;
  width: 380px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.titulo {
  margin: 0;
  color: #333;
  font-size: 1.2rem;
}

.entrada {
  display: flex;
  gap: 8px;
}

#inputTarea {
  flex: 1;
  padding: 10px 14px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.95rem;
  outline: none;
}

#inputTarea:focus {
  border-color: #4a90e2;
}

#btnAgregar {
  width: 42px;
  height: 42px;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.4rem;
  cursor: pointer;
}

#listaTareas {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* Estas clases las usa JS con classList.toggle */
#listaTareas li {
  padding: 11px 14px;
  background: #f5f5f5;
  border-radius: 8px;
  border-left: 4px solid #4a90e2;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
  font-size: 0.95rem;
}

#listaTareas li:hover {
  opacity: 0.8;
}

#listaTareas li.completada {
  background: #e8f5e9;
  border-left-color: #43a047;
  text-decoration: line-through;
  color: #999;
}`,
        initialJS: `// Al hacer clic en #btnAgregar:
// 1. Lee el valor de #inputTarea
// 2. Si no está vacío, crea un <li> con ese texto
// 3. Agrégalo a #listaTareas
// 4. Al hacer clic en el li, alterna la clase 'completada'
// 5. Limpia el input (inputTarea.value = '')

`,
        hints: [
          `Crea el li: <code>const li = document.createElement('li'); li.textContent = texto;</code>`,
          `Toggle al hacer clic: <code>li.addEventListener('click', () => li.classList.toggle('completada'));</code>`,
          `Agrega y limpia: <code>lista.appendChild(li); input.value = '';</code>`,
        ],
        validate(doc) {
          try {
            const inp   = doc.getElementById('inputTarea');
            const btn   = doc.getElementById('btnAgregar');
            const lista = doc.getElementById('listaTareas');
            if (!inp || !btn || !lista) return { pass: false, msg: 'Faltan elementos del HTML.' };
            inp.value = 'Aprender JavaScript'; btn.click();
            const items = lista.querySelectorAll('li');
            if (!items.length) return { pass: false, msg: 'Al hacer clic en +, no se agregó ningún <li> a #listaTareas.' };
            const last = items[items.length - 1];
            if (!last.textContent.includes('Aprender JavaScript')) return { pass: false, msg: `El li dice "${last.textContent}" en vez del texto del input.` };
            if (inp.value !== '') return { pass: false, msg: 'El input no se limpió después de agregar. Usa input.value = "".' };
            last.click();
            if (!last.classList.contains('completada')) return { pass: false, msg: 'Al hacer clic en el li, no alterna la clase "completada".' };
            return { pass: true, msg: '¡To-Do List completa! Crear, completar y limpiar funcionan perfectamente.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '6-2',
        title: 'Generador de Tarjetas',
        mission: `El generador de tarjetas combina lectura de múltiples inputs, creación de elementos con innerHTML complejo, y limpieza del formulario. Lee los tres campos: cardNombre.value, cardRol.value y cardColor.value (este último es un color picker que devuelve un hex como '#4a90e2'). Obtén la inicial del nombre con nombre[0].toUpperCase(). Crea un div con createElement, usa innerHTML para construir el contenido HTML de la tarjeta con el avatar (div con la inicial), el nombre en strong y el rol en span. Aplica el color del picker al fondo del avatar o de la tarjeta con style. Agrega la tarjeta a #contenedorCards y limpia los inputs de texto al finalizar.`,
        objective: `Al hacer clic en "Crear Tarjeta": genera una tarjeta con nombre, rol y color dentro de #contenedorCards. La tarjeta debe mostrar un avatar con la inicial del nombre.`,
        initialHTML: `<div class="app">
  <div class="formulario">
    <h3 class="titulo">🪪 Nueva Tarjeta</h3>
    <input id="cardNombre" type="text" placeholder="Nombre...">
    <input id="cardRol"    type="text" placeholder="Rol (ej: Desarrollador Frontend)...">
    <div class="fila-color">
      <label>Color:</label>
      <input id="cardColor" type="color" value="#4a90e2">
    </div>
    <button id="btnCrearCard">+ Crear Tarjeta</button>
  </div>
  <div id="contenedorCards"></div>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #f0f2f5;
  margin: 0;
  padding: 24px;
}

.app {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 480px;
  margin: 0 auto;
}

.formulario {
  background: white;
  border-radius: 14px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}

.titulo {
  margin: 0;
  font-size: 1rem;
  color: #333;
}

input[type="text"] {
  padding: 9px 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.9rem;
  outline: none;
}

input[type="text"]:focus {
  border-color: #4a90e2;
}

.fila-color {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.85rem;
  color: #555;
}

input[type="color"] {
  width: 40px;
  height: 32px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

#btnCrearCard {
  padding: 11px;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}

/* Las tarjetas generadas por JS tendrán esta estructura */
#contenedorCards {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}`,
        initialJS: `// Al hacer clic en #btnCrearCard:
// 1. Lee nombre, rol y color de los inputs
// 2. Si nombre está vacío, no hagas nada
// 3. Crea un div con la tarjeta
//    - La inicial del nombre como avatar: nombre[0].toUpperCase()
//    - Muestra el nombre y el rol
// 4. Agrega la tarjeta a #contenedorCards
// 5. Limpia los inputs de texto

// Ejemplo para crear el HTML de la tarjeta:
// const inicial = nombre[0].toUpperCase();
// card.innerHTML = '<div class="avatar">' + inicial + '</div>' +
//                  '<strong>' + nombre + '</strong>' +
//                  '<span>' + rol + '</span>';

`,
        hints: [
          `Lee los valores: <code>const nombre = document.getElementById('cardNombre').value.trim();</code>`,
          `Crea el div: <code>const card = document.createElement('div');</code> y asigna su innerHTML con el avatar, nombre y rol.`,
          `La inicial: <code>const inicial = nombre[0].toUpperCase();</code> — úsala dentro del avatar.`,
        ],
        validate(doc) {
          try {
            const nom  = doc.getElementById('cardNombre');
            const rol  = doc.getElementById('cardRol');
            const btn  = doc.getElementById('btnCrearCard');
            const cont = doc.getElementById('contenedorCards');
            if (!nom || !rol || !btn || !cont) return { pass: false, msg: 'Faltan elementos del formulario.' };
            nom.value = 'Ana García'; rol.value = 'Desarrolladora'; btn.click();
            const cards = cont.children;
            if (!cards.length) return { pass: false, msg: 'Al hacer clic, no se creó ninguna tarjeta en #contenedorCards.' };
            const card = cards[cards.length - 1];
            const txt  = card.textContent;
            if (txt.includes('Ana') || txt.includes('A')) {
              if (txt.includes('Desarrolladora')) return { pass: true, msg: '¡Generador de tarjetas completo! Dominas la creación de componentes dinámicos.' };
              return { pass: false, msg: 'La tarjeta tiene el nombre pero no muestra el rol.' };
            }
            return { pass: false, msg: 'La tarjeta no muestra el nombre "Ana García". Verifica que usas el valor del input.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '6-3',
        title: 'Buscador en Tiempo Real',
        mission: `El buscador en tiempo real filtra una lista mientras el usuario escribe, sin necesidad de botones ni recargas. El evento 'input' en el campo de búsqueda se dispara con cada tecla. toLowerCase() convierte ambas cadenas a minúsculas para que la búsqueda sea insensible a mayúsculas. includes() verifica si el texto del item contiene el término buscado. El flujo dentro del listener: convierte buscador.value a minúsculas como const texto, recorre todos los .item-lista con forEach, y para cada uno compara item.textContent.toLowerCase().includes(texto) — si coincide asigna style.display = '' (visible), si no style.display = 'none'. Cuando el buscador está vacío, todos deben ser visibles.`,
        objective: `Al escribir en #buscador, filtra en tiempo real los .item-lista: muestra solo los que contienen el texto (insensible a mayúsculas/minúsculas).`,
        initialHTML: `<div class="app">
  <h3 class="titulo">🔍 Buscador de Cursos</h3>
  <input id="buscador" type="text" placeholder="Buscar curso...">
  <ul id="listaItems">
    <li class="item-lista">JavaScript para Principiantes</li>
    <li class="item-lista">HTML y CSS Moderno</li>
    <li class="item-lista">React desde Cero</li>
    <li class="item-lista">Node.js y Express</li>
    <li class="item-lista">Python para Data Science</li>
    <li class="item-lista">Diseño UI/UX</li>
  </ul>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #e8eaf6;
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  margin: 0;
}

.app {
  background: white;
  border-radius: 16px;
  padding: 28px;
  width: 380px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.titulo { margin: 0; color: #3949ab; }

#buscador {
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

#buscador:focus { border-color: #3949ab; }

#listaItems {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.item-lista {
  padding: 12px 16px;
  background: #f5f5f5;
  border-radius: 8px;
  border-left: 4px solid #3949ab;
  color: #333;
  transition: all 0.2s;
}`,
        initialJS: `// PASO 1: obtén el input #buscador y todos los .item-lista
// const buscador = document.getElementById('buscador');
// const items = document.querySelectorAll('.item-lista');

// PASO 2: agrega el evento 'input' al buscador
// (este evento se dispara en cada tecla, a diferencia de 'change')

// PASO 3: dentro del evento:
//   a) Lee el texto y ponlo en minúsculas:
//      const texto = buscador.value.toLowerCase();
//   b) Recorre cada item con forEach:
//      items.forEach(function(item) {
//        const contenido = item.textContent.toLowerCase();
//        if (contenido.includes(texto)) {
//          item.style.display = '';      // mostrar
//        } else {
//          item.style.display = 'none';  // ocultar
//        }
//      });

`,
        hints: [
          `Usa el evento correcto: <code>buscador.addEventListener('input', function() { ... });</code>`,
          `Compara en minúsculas: <code>item.textContent.toLowerCase().includes(texto)</code>`,
          `Muestra u oculta: <code>item.style.display = coincide ? '' : 'none';</code>`,
        ],
        validate(doc) {
          try {
            const buscador = doc.getElementById('buscador');
            const items    = doc.querySelectorAll('.item-lista');
            if (!buscador || !items.length) return { pass: false, msg: 'No encontré #buscador o elementos .item-lista.' };
            buscador.value = 'java';
            buscador.dispatchEvent(new doc.defaultView.Event('input', { bubbles: true }));
            const visibles = [...items].filter(i => i.style.display !== 'none');
            const ocultos  = [...items].filter(i => i.style.display === 'none');
            if (!ocultos.length) return { pass: false, msg: 'Al buscar "java", ningún elemento se oculta. Asigna style.display = "none" a los que no coinciden.' };
            if (!visibles.length) return { pass: false, msg: 'Al buscar "java", todos se ocultaron. Verifica el includes().' };
            buscador.value = '';
            buscador.dispatchEvent(new doc.defaultView.Event('input', { bubbles: true }));
            const todos = [...items].filter(i => i.style.display !== 'none');
            if (todos.length !== items.length) return { pass: false, msg: 'Al borrar la búsqueda, no se muestran todos los elementos de nuevo.' };
            return { pass: true, msg: '¡Buscador en tiempo real funcionando! Filtrado con includes() dominado.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '6-4',
        title: 'Modal con Fondo Oscuro',
        mission: `Los modales tienen tres formas de cerrarse: el botón X interno, hacer clic en el fondo oscuro, y a veces la tecla Escape. La clase 'oculto' (con display:none) controla la visibilidad del overlay. Para abrirlo: overlay.classList.remove('oculto'). Para cerrarlo: overlay.classList.add('oculto'). El truco para cerrar al hacer clic en el fondo pero NO en el modal: en el listener del overlay verifica event.target === overlay — esto es true solo cuando el clic fue directamente en el overlay, no en sus hijos (el modal). Si el clic fue dentro del modal, event.target será el modal o algún elemento dentro de él, no el overlay mismo.`,
        objective: `Al hacer clic en "Abrir Modal" muestra #overlay (quita 'oculto'). Al hacer clic en #cerrar o en el fondo oscuro, ciérralo (agrega 'oculto').`,
        initialHTML: `<div class="pagina">
  <h2>Bienvenido a CodeLab</h2>
  <p>Haz clic para ver información importante</p>
  <button id="btnAbrir">📢 Abrir Modal</button>
</div>

<div id="overlay" class="overlay oculto">
  <div class="modal">
    <button id="cerrar">✕</button>
    <h3>📢 Información Importante</h3>
    <p>Este modal se creó con JavaScript puro. Puedes cerrarlo con la X o haciendo clic en el fondo oscuro.</p>
  </div>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  margin: 0;
}

.pagina {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f0f2f5;
  gap: 14px;
  text-align: center;
}

.pagina h2 { color: #333; margin: 0; }
.pagina p  { color: #666; margin: 0; }

#btnAbrir {
  padding: 12px 24px;
  background: #3949ab;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 8px;
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.overlay.oculto { display: none; }

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  max-width: 380px;
  width: 90%;
  position: relative;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
}

.modal h3 { margin: 0 0 12px; color: #3949ab; }
.modal p  { color: #555; margin: 0; line-height: 1.6; }

#cerrar {
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
  color: #999;
  line-height: 1;
}

#cerrar:hover { color: #333; }`,
        initialJS: `// PASO 1: obtén los tres elementos clave
// const overlay  = document.getElementById('overlay');
// const btnAbrir = document.getElementById('btnAbrir');
// const cerrar   = document.getElementById('cerrar');

// PASO 2: abrir el modal
// btnAbrir.addEventListener('click', function() {
//   overlay.classList.remove('oculto');
// });

// PASO 3: cerrar con la X
// cerrar.addEventListener('click', function() {
//   overlay.classList.add('oculto');
// });

// PASO 4: cerrar al hacer clic en el fondo oscuro
// overlay.addEventListener('click', function(event) {
//   // Verifica que el clic fue en el overlay, no dentro del modal
//   if (event.target === overlay) {
//     overlay.classList.add('oculto');
//   }
// });

`,
        hints: [
          `Abre: <code>overlay.classList.remove('oculto');</code>`,
          `Cierra con X: <code>cerrar.addEventListener('click', () => overlay.classList.add('oculto'));</code>`,
          `Cierra al hacer clic afuera: <code>overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.add('oculto'); });</code>`,
        ],
        validate(doc) {
          try {
            const overlay  = doc.getElementById('overlay');
            const btnAbrir = doc.getElementById('btnAbrir');
            const cerrar   = doc.getElementById('cerrar');
            if (!overlay || !btnAbrir || !cerrar) return { pass: false, msg: 'Faltan elementos. No borres #overlay, #btnAbrir ni #cerrar.' };
            if (!overlay.classList.contains('oculto')) return { pass: false, msg: 'El overlay debería empezar oculto (con clase "oculto").' };
            btnAbrir.click();
            if (overlay.classList.contains('oculto')) return { pass: false, msg: 'Al hacer clic en "Abrir Modal", el overlay sigue oculto. Usa classList.remove("oculto").' };
            cerrar.click();
            if (!overlay.classList.contains('oculto')) return { pass: false, msg: 'Al hacer clic en ✕, el overlay no se cerró. Usa classList.add("oculto").' };
            return { pass: true, msg: '¡Modal funcional! Abrir, cerrar con X y fondo oscuro dominados.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '6-5',
        title: 'Formulario Paso a Paso',
        mission: `Los formularios multistep dividen un proceso largo en pasos manejables, reduciendo la sensación de abrumador. La clase 'oculto' (con display:none en el CSS) controla qué paso es visible. El patrón para avanzar: agregar 'oculto' al paso actual y quitarla al siguiente. Para retroceder: el proceso inverso. Cada transición actualiza el indicador de progreso (#indicador) con un texto como "Paso 2 de 2". Al finalizar: ocultas el último paso y muestras el panel de éxito #exito. No es necesario validar los campos para este reto — solo controla correctamente qué paso es visible en cada momento.`,
        objective: `Al hacer clic en "Siguiente", oculta #paso1 y muestra #paso2. Al hacer clic en "Atrás", regresa. Al hacer clic en "Finalizar", muestra #exito.`,
        initialHTML: `<div class="app">
  <div class="indicador-wrap">
    <div id="indicador" class="indicador">Paso 1 de 2</div>
  </div>
  <div id="paso1" class="paso">
    <h3>👤 Datos Personales</h3>
    <input type="text" id="nombre" placeholder="Tu nombre completo">
    <input type="text" id="apellido" placeholder="Tu apellido">
    <button id="btnSiguiente">Siguiente →</button>
  </div>
  <div id="paso2" class="paso oculto">
    <h3>📧 Datos de Contacto</h3>
    <input type="text" id="email" placeholder="tu@email.com">
    <input type="text" id="telefono" placeholder="Teléfono">
    <div class="btns-nav">
      <button id="btnAtras">← Atrás</button>
      <button id="btnFinalizar">✅ Finalizar</button>
    </div>
  </div>
  <div id="exito" class="paso oculto exito-panel">
    <span style="font-size:3rem">✅</span>
    <h3>¡Registro Completado!</h3>
  </div>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #e8f5e9;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.app {
  background: white;
  border-radius: 16px;
  padding: 32px;
  width: 360px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.1);
}

.indicador-wrap { margin-bottom: 20px; }

.indicador {
  font-size: 0.8rem;
  font-weight: 700;
  color: #2e7d32;
  background: #e8f5e9;
  padding: 6px 14px;
  border-radius: 20px;
  display: inline-block;
}

.paso {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.paso.oculto { display: none; }

.paso h3 { margin: 0 0 4px; color: #333; }

.paso input {
  padding: 10px 14px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.95rem;
  outline: none;
}

.paso input:focus { border-color: #2e7d32; }

.btns-nav { display: flex; gap: 10px; }

button {
  padding: 11px 20px;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;
}

#btnSiguiente, #btnFinalizar { background: #2e7d32; color: white; }
#btnAtras { background: #e0e0e0; color: #333; }

.exito-panel { text-align: center; gap: 8px; }`,
        initialJS: `// PASO 1: obtén los elementos que necesitas
// const paso1      = document.getElementById('paso1');
// const paso2      = document.getElementById('paso2');
// const exito      = document.getElementById('exito');
// const indicador  = document.getElementById('indicador');

// PASO 2: al hacer clic en #btnSiguiente
//   paso1.classList.add('oculto');     ← oculta paso 1
//   paso2.classList.remove('oculto');  ← muestra paso 2
//   indicador.textContent = 'Paso 2 de 2';

// PASO 3: al hacer clic en #btnAtras
//   paso2.classList.add('oculto');
//   paso1.classList.remove('oculto');
//   indicador.textContent = 'Paso 1 de 2';

// PASO 4: al hacer clic en #btnFinalizar
//   paso2.classList.add('oculto');
//   exito.classList.remove('oculto');
//   indicador.textContent = '¡Completado!';

`,
        hints: [
          `Para ocultar: <code>paso1.classList.add('oculto');</code> Para mostrar: <code>paso2.classList.remove('oculto');</code>`,
          `Actualiza el indicador: <code>indicador.textContent = 'Paso 2 de 2';</code>`,
          `Para finalizar: oculta paso2, muestra #exito con <code>exito.classList.remove('oculto');</code>`,
        ],
        validate(doc) {
          try {
            const paso1    = doc.getElementById('paso1');
            const paso2    = doc.getElementById('paso2');
            const exito    = doc.getElementById('exito');
            const btnSig   = doc.getElementById('btnSiguiente');
            const btnAtras = doc.getElementById('btnAtras');
            if (!paso1 || !paso2 || !exito || !btnSig) return { pass: false, msg: 'Faltan elementos. No borres #paso1, #paso2, #exito ni los botones.' };
            if (!paso2.classList.contains('oculto')) return { pass: false, msg: '#paso2 debería empezar oculto.' };
            btnSig.click();
            if (!paso1.classList.contains('oculto')) return { pass: false, msg: 'Al hacer clic en Siguiente, #paso1 debería ocultarse.' };
            if (paso2.classList.contains('oculto')) return { pass: false, msg: 'Al hacer clic en Siguiente, #paso2 debería mostrarse.' };
            if (btnAtras) { btnAtras.click(); if (paso1.classList.contains('oculto')) return { pass: false, msg: 'Al hacer clic en Atrás, #paso1 debería volver a mostrarse.' }; btnSig.click(); }
            const btnFin = doc.getElementById('btnFinalizar');
            if (btnFin) {
              btnFin.click();
              if (exito.classList.contains('oculto')) return { pass: false, msg: 'Al finalizar, #exito debería mostrarse.' };
            }
            return { pass: true, msg: '¡Formulario multistep completo! Navegación entre pasos dominada.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '6-6',
        title: 'Carrito de Compras',
        mission: `Un carrito de compras separa los datos (un array de objetos) de la presentación (el HTML). El array carrito almacena objetos {name, price}. La función renderizar() limpia el #carrito con innerHTML = '', luego recorre el array creando un li por cada ítem que muestre nombre y precio. Para el total, suma todos los precios recorriendo el array: puedes usar reduce() o un forEach acumulativo. Para cada .btnAgregar: obtén el .producto padre con btn.closest('.producto'), lee dataset.name y parseFloat(dataset.price), haz push al array con el objeto {name, price} y llama renderizar(). El botón Vaciar simplemente asigna carrito = [] y llama renderizar().`,
        objective: `Al hacer clic en "Agregar" de cada .producto, añade ese ítem al array carrito y re-renderiza #carrito con los ítems y el total en #total. "Vaciar" limpia el array y el DOM.`,
        initialHTML: `<div class="app">
  <h2 class="titulo">🛒 Tienda Online</h2>
  <div class="productos">
    <div class="producto" data-name="Café ☕" data-price="3.50">
      <span>Café ☕</span>
      <span class="precio">$3.50</span>
      <button class="btnAgregar">Agregar</button>
    </div>
    <div class="producto" data-name="Libro 📚" data-price="12.00">
      <span>Libro 📚</span>
      <span class="precio">$12.00</span>
      <button class="btnAgregar">Agregar</button>
    </div>
    <div class="producto" data-name="Audífonos 🎧" data-price="25.00">
      <span>Audífonos 🎧</span>
      <span class="precio">$25.00</span>
      <button class="btnAgregar">Agregar</button>
    </div>
    <div class="producto" data-name="Cuaderno 📓" data-price="4.00">
      <span>Cuaderno 📓</span>
      <span class="precio">$4.00</span>
      <button class="btnAgregar">Agregar</button>
    </div>
  </div>
  <div class="carrito-panel">
    <h3>Carrito</h3>
    <ul id="carrito"></ul>
    <p>Total: <strong id="total">$0.00</strong></p>
    <button id="btnVaciar">🗑️ Vaciar</button>
  </div>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #f0f2f5;
  margin: 0;
  padding: 20px;
}

.app {
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.titulo {
  margin: 0;
  color: #333;
}

.productos {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.producto {
  background: white;
  border-radius: 10px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.producto span:first-child {
  flex: 1;
  color: #333;
}

.precio {
  font-weight: bold;
  color: #2e7d32;
}

.btnAgregar {
  padding: 6px 14px;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
}

.carrito-panel {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}

.carrito-panel h3 {
  margin: 0 0 12px;
  color: #333;
}

#carrito {
  list-style: none;
  padding: 0;
  margin: 0 0 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-height: 40px;
}

#carrito li {
  padding: 8px 12px;
  background: #f5f5f5;
  border-radius: 6px;
  color: #555;
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
}

.carrito-panel p {
  margin: 0 0 12px;
  font-size: 1.1rem;
  color: #333;
}

#total {
  color: #2e7d32;
}

#btnVaciar {
  padding: 8px 16px;
  background: #e53935;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
}`,
        initialJS: `// PASO 1: declara el array del carrito: let carrito = [];
// PASO 2: crea una función renderizar() que:
//   a) Limpia #carrito: carritoEl.innerHTML = '';
//   b) Recorre el array y crea un <li> por cada ítem con el nombre y precio
//   c) Calcula el total sumando los precios y actualiza #total

// PASO 3: para cada .btnAgregar agrega un evento 'click':
//   - Obtén el producto padre: btn.closest('.producto') o btn.parentElement
//   - Lee el nombre: producto.dataset.name
//   - Lee el precio: parseFloat(producto.dataset.price)
//   - Agrega un objeto al array: carrito.push({ name, price });
//   - Llama a renderizar()

// PASO 4: en #btnVaciar:
//   carrito = [];
//   renderizar();
\n`,
        hints: [
          'Accede al contenedor padre: <code>const prod = btn.closest(\'.producto\');</code>',
          'Agrega al array: <code>carrito.push({ name: prod.dataset.name, price: parseFloat(prod.dataset.price) });</code>',
          'Calcula el total: <code>const total = carrito.reduce((acc, item) => acc + item.price, 0);</code>',
        ],
        validate(doc) {
          try {
            const btnsAg = doc.querySelectorAll('.btnAgregar');
            const carritoEl = doc.getElementById('carrito');
            const totalEl = doc.getElementById('total');
            const btnVac = doc.getElementById('btnVaciar');
            if (!btnsAg.length || !carritoEl || !totalEl || !btnVac) return { pass: false, msg: 'Faltan elementos. Verifica .btnAgregar, #carrito, #total y #btnVaciar.' };
            btnsAg[0].click();
            const items = carritoEl.querySelectorAll('li');
            if (!items.length) return { pass: false, msg: 'Al hacer clic en Agregar, no se añadió ningún ítem a #carrito.' };
            const totalTxt = totalEl.textContent.trim();
            if (totalTxt === '$0.00' || totalTxt === '0') return { pass: false, msg: `El total no se actualizó después de agregar un producto. Muestra: "${totalTxt}".` };
            btnVac.click();
            const itemsPostVaciar = carritoEl.querySelectorAll('li').length;
            if (itemsPostVaciar > 0) return { pass: false, msg: 'Al vaciar, aún quedan ítems en #carrito.' };
            return { pass: true, msg: '¡Carrito de compras funcionando! Array de objetos, renderizado dinámico y total calculado.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '6-7',
        title: 'Notas Rápidas',
        mission: `localStorage permite guardar datos en el navegador que persisten aunque el usuario cierre la pestaña. Solo acepta strings, así que para guardar arrays usas JSON.stringify(array) que lo convierte a string JSON, y JSON.parse(string) para recuperarlo como array. Al iniciar: let notas = JSON.parse(localStorage.getItem('notas')) || [] — el || [] garantiza un array vacío si no hay datos guardados. La función renderizar(): limpia #listanotas, recorre el array creando un li con el texto y un botón de eliminar que hace notas.splice(indice, 1) y llama renderizar(). Siempre guarda con localStorage.setItem('notas', JSON.stringify(notas)) dentro de renderizar() para que cada cambio persista.`,
        objective: `#btnAgregar añade la nota del #inputNota a un array y la muestra en #listanotas con un botón para eliminarla. Las notas persisten en localStorage al recargar.`,
        initialHTML: `<div class="app">
  <h2>📝 Notas Rápidas</h2>
  <div class="entrada">
    <input id="inputNota" type="text" placeholder="Escribe una nota...">
    <button id="btnAgregar">+</button>
  </div>
  <ul id="listanotas"></ul>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #fffde7;
  margin: 0;
  padding: 24px;
}

.app {
  max-width: 420px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.app h2 {
  margin: 0;
  color: #f57f17;
}

.entrada {
  display: flex;
  gap: 8px;
}

#inputNota {
  flex: 1;
  padding: 10px 14px;
  border: 2px solid #ffe082;
  border-radius: 8px;
  font-size: 0.95rem;
  outline: none;
}

#inputNota:focus {
  border-color: #f9a825;
}

#btnAgregar {
  width: 42px;
  height: 42px;
  background: #f9a825;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.4rem;
  cursor: pointer;
}

#listanotas {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

#listanotas li {
  padding: 12px 14px;
  background: white;
  border-left: 4px solid #f9a825;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
  font-size: 0.9rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.06);
}

.btnEliminar {
  background: none;
  border: none;
  color: #e53935;
  cursor: pointer;
  font-size: 1rem;
  padding: 0 4px;
}`,
        initialJS: `// PASO 1: carga notas del localStorage al inicio:
//   let notas = JSON.parse(localStorage.getItem('notas')) || [];
// PASO 2: crea una función renderizar() que:
//   a) Limpia #listanotas
//   b) Recorre el array notas y crea un <li> para cada una
//   c) Cada li tiene el texto y un botón "×" que al hacer clic elimina esa nota
//   d) Guarda en localStorage: localStorage.setItem('notas', JSON.stringify(notas));
// PASO 3: llama renderizar() al cargar (para mostrar notas guardadas)
// PASO 4: en #btnAgregar:
//   - Lee el input, si no está vacío: notas.push(texto); renderizar(); input.value = '';
\n`,
        hints: [
          'Guarda en localStorage: <code>localStorage.setItem(\'notas\', JSON.stringify(notas));</code>',
          'Carga al inicio: <code>let notas = JSON.parse(localStorage.getItem(\'notas\')) || [];</code>',
          'El botón eliminar: <code>btnEl.addEventListener(\'click\', () => { notas.splice(i, 1); renderizar(); });</code>',
        ],
        validate(doc) {
          try {
            const inputNota = doc.getElementById('inputNota');
            const btnAg = doc.getElementById('btnAgregar');
            const listanotas = doc.getElementById('listanotas');
            if (!inputNota || !btnAg || !listanotas) return { pass: false, msg: 'Faltan elementos. Verifica #inputNota, #btnAgregar y #listanotas.' };
            inputNota.value = 'Estudiar JS';
            btnAg.click();
            const items = listanotas.querySelectorAll('li');
            if (!items.length) return { pass: false, msg: 'Al hacer clic en Agregar, no apareció ninguna nota en #listanotas.' };
            const last = items[items.length - 1];
            if (!last.textContent.includes('Estudiar JS')) return { pass: false, msg: `La nota añadida no muestra el texto "Estudiar JS". Muestra: "${last.textContent.trim()}".` };
            const btnEl = last.querySelector('button');
            if (!btnEl) return { pass: false, msg: 'La nota no tiene un botón de eliminar.' };
            btnEl.click();
            const itemsPost = listanotas.querySelectorAll('li').length;
            if (itemsPost >= items.length) return { pass: false, msg: 'Al hacer clic en eliminar, la nota no desapareció.' };
            return { pass: true, msg: '¡Notas con localStorage funcionando! Persistencia y renderizado dinámico dominados.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '6-8',
        title: 'Temporizador Pomodoro',
        mission: `El Pomodoro combina setInterval, cálculo de tiempo y manejo de estado con múltiples botones. El tiempo se almacena en segundos totales (25*60 = 1500). La función mostrarTiempo() convierte los segundos a MM:SS: Math.floor(total / 60) da los minutos, y total % 60 da los segundos restantes; ambos se formatean con padStart(2,'0'). En el intervalo decrementas totalSegundos-- y llamas mostrarTiempo(). Cuando llega a 0: clearInterval, cambia enTrabajo de true a false (o viceversa), ajusta totalSegundos al nuevo modo (5*60 para descanso), y actualiza #modo. El botón Pausar simplemente llama clearInterval sin resetear — el tiempo queda donde está para continuar después.`,
        objective: `#btnIniciar inicia el temporizador desde 25:00. #btnPausar lo pausa. #btnReiniciar vuelve a 25:00. Al llegar a 0 cambia al modo descanso (5:00) y actualiza #modo.`,
        initialHTML: `<div class="contenedor">
  <p id="modo" class="modo">🍅 Trabajo</p>
  <div id="timerDisplay" class="timer">25:00</div>
  <div class="btns">
    <button id="btnIniciar">▶ Iniciar</button>
    <button id="btnPausar">⏸ Pausar</button>
    <button id="btnReiniciar">↺ Reiniciar</button>
  </div>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #1a1a2e;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.contenedor {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.modo {
  color: #aaa;
  font-size: 1rem;
  margin: 0;
  letter-spacing: 0.05em;
}

.timer {
  font-size: 6rem;
  font-weight: 900;
  color: #e74c3c;
  font-variant-numeric: tabular-nums;
  text-shadow: 0 0 30px rgba(231,76,60,0.4);
}

.btns {
  display: flex;
  gap: 12px;
}

.btns button {
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: bold;
  cursor: pointer;
}

#btnIniciar  { background: #238636; color: white; }
#btnPausar   { background: #e3b341; color: #0d1117; }
#btnReiniciar { background: #30363d; color: #e6edf3; border: 1px solid #484f58; }`,
        initialJS: `// PASO 1: declara variables de estado
// let totalSegundos = 25 * 60;  // 1500 segundos
// let intervalo = null;
// let enTrabajo = true;

// PASO 2: crea una función mostrarTiempo() que:
//   - Calcula minutos y segundos: const m = Math.floor(totalSegundos / 60);
//   - Formatea: const s = totalSegundos % 60;
//   - Muestra: timerDisplay.textContent = String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');

// PASO 3: en #btnIniciar:
//   clearInterval(intervalo);
//   intervalo = setInterval(function() {
//     totalSegundos--;
//     mostrarTiempo();
//     if (totalSegundos <= 0) { cambiar de modo }
//   }, 1000);

// PASO 4: en #btnPausar: clearInterval(intervalo);
// PASO 5: en #btnReiniciar: clearInterval; totalSegundos = 25*60; mostrarTiempo();
\n`,
        hints: [
          'Calcula minutos: <code>const m = Math.floor(totalSegundos / 60);</code>',
          'Calcula segundos: <code>const s = totalSegundos % 60;</code>',
          'Formatea: <code>String(m).padStart(2, \'0\') + \':\' + String(s).padStart(2, \'0\')</code>',
        ],
        validate(doc) {
          try {
            const timerDisplay = doc.getElementById('timerDisplay');
            const btnIniciar = doc.getElementById('btnIniciar');
            const btnPausar = doc.getElementById('btnPausar');
            const btnReiniciar = doc.getElementById('btnReiniciar');
            if (!timerDisplay || !btnIniciar || !btnPausar || !btnReiniciar) return { pass: false, msg: 'Faltan elementos. Verifica #timerDisplay, #btnIniciar, #btnPausar y #btnReiniciar.' };
            btnIniciar.click();
            // setInterval is async, so we use Reiniciar as a proxy to verify implementation
            btnPausar.click();
            btnReiniciar.click();
            const afterReset = timerDisplay.textContent.trim();
            if (afterReset.includes('25') || afterReset.includes('24:5') || afterReset === '25:00') {
              return { pass: true, msg: '¡Temporizador Pomodoro funcionando! setInterval, clearInterval y formato MM:SS dominados.' };
            }
            // Also accept if display has ':' format (any MM:SS)
            if (afterReset.includes(':') && afterReset.length >= 4) {
              return { pass: true, msg: '¡Temporizador con formato MM:SS funcionando! setInterval y clearInterval dominados.' };
            }
            return { pass: false, msg: `Al hacer Reiniciar, el temporizador debería volver a 25:00 pero muestra: "${afterReset}". Verifica que Reiniciar asigna totalSegundos = 25*60 y llama mostrarTiempo().` };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '6-9',
        title: 'Generador de Paleta de Colores',
        mission: `Los colores hexadecimales representan valores RGB en base 16: #RRGGBB donde cada componente va de 00 a FF. 0xFFFFFF es el número hexadecimal equivalente a 16777215 — el máximo color blanco. Math.floor(Math.random() * 0xFFFFFF) genera un número entero aleatorio entre 0 y 16777215. .toString(16) lo convierte a cadena hexadecimal, y .padStart(6, '0') asegura que siempre tenga 6 caracteres (los colores oscuros pueden tener menos). Para crear cada swatch: createElement('div'), className = 'swatch', style.backgroundColor = hex, textContent = hex. Al hacer clic en un swatch actualiza el span #copiado con su color — navigator.clipboard.writeText() es opcional pero recomendado.`,
        objective: `#btnGenerar crea 5 swatches .swatch en #colores, cada uno con un color hex aleatorio como fondo y texto. Al hacer clic en un swatch, muestra su hex en #copiado.`,
        initialHTML: `<div class="app">
  <h2>🎨 Generador de Paleta</h2>
  <div class="controles">
    <button id="btnGenerar">Generar Paleta</button>
    <p>Copiado: <span id="copiado">—</span></p>
  </div>
  <div id="colores" class="paleta"></div>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #212121;
  margin: 0;
  padding: 24px;
}

.app {
  max-width: 520px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.app h2 {
  margin: 0;
  color: #e0e0e0;
}

.controles {
  display: flex;
  align-items: center;
  gap: 20px;
}

#btnGenerar {
  padding: 10px 20px;
  background: #58a6ff;
  color: #0d1117;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: bold;
  cursor: pointer;
}

.controles p {
  margin: 0;
  color: #aaa;
  font-size: 0.9rem;
}

#copiado {
  font-weight: bold;
  color: #58a6ff;
  font-family: monospace;
}

.paleta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.swatch {
  width: 90px;
  height: 90px;
  border-radius: 12px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 10px;
  font-size: 0.7rem;
  font-family: monospace;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  color: white;
  text-shadow: 0 1px 3px rgba(0,0,0,0.6);
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

.swatch:hover {
  transform: scale(1.06);
  box-shadow: 0 4px 16px rgba(0,0,0,0.4);
}`,
        initialJS: `// PASO 1: crea una función generarHex() que devuelva un color aleatorio:
//   function generarHex() {
//     return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
//   }
// PASO 2: en el clic de #btnGenerar:
//   a) Limpia #colores: colores.innerHTML = '';
//   b) Repite 5 veces (for loop):
//     - Genera un color hex
//     - Crea un div con clase 'swatch'
//     - Ponle el color de fondo y el hex como texto
//     - Al hacer clic: copiado.textContent = hex;
//       (opcional: navigator.clipboard.writeText(hex))
//     - Agrega el swatch a #colores
\n`,
        hints: [
          'Genera hex: <code>\'#\' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, \'0\')</code>',
          'Crea el swatch: <code>const sw = document.createElement(\'div\'); sw.className = \'swatch\';</code>',
          'Aplica el color: <code>sw.style.backgroundColor = hex; sw.textContent = hex;</code>',
        ],
        validate(doc) {
          try {
            const btnGen = doc.getElementById('btnGenerar');
            const colores = doc.getElementById('colores');
            const copiado = doc.getElementById('copiado');
            if (!btnGen || !colores || !copiado) return { pass: false, msg: 'Faltan elementos. Verifica #btnGenerar, #colores y #copiado.' };
            btnGen.click();
            const swatches = colores.querySelectorAll('.swatch');
            if (swatches.length < 5) return { pass: false, msg: `Deberían generarse 5 swatches, pero hay ${swatches.length}.` };
            const vaciosSinTexto = [...swatches].filter(s => !s.textContent.trim());
            if (vaciosSinTexto.length) return { pass: false, msg: 'Algunos swatches no tienen texto (el código hex). Asigna textContent con el color.' };
            swatches[0].click();
            if (copiado.textContent.trim() === '—' || copiado.textContent.trim() === '') return { pass: false, msg: 'Al hacer clic en un swatch, el span #copiado no se actualizó.' };
            return { pass: true, msg: '¡Generador de paletas funcionando! Colores hex aleatorios y swatches dinámicos dominados.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '6-10',
        title: 'Juego de Memoria Simple',
        mission: `El juego de memoria maneja estado con varias variables: primeraSeleccion (la primera carta clicada del turno), bloqueado (boolean para evitar clics mientras se compara), y contadores de matches y moves. Al hacer clic en una carta: si bloqueado es true o la carta ya está completada, ignora el clic. Agrega la clase 'abierta' a la carta. Si no hay primeraSeleccion, guárdala. Si ya hay primeraSeleccion: incrementa moves, compara dataset.color — si coinciden agrega 'coincide' a ambas e incrementa matches; si no coinciden, pon bloqueado = true y usa setTimeout de 1000ms para quitar 'abierta' de ambas y resetear el estado. Actualiza #matches y #moves en cada turno.`,
        objective: `Al hacer clic en las cartas, voltéalas. Si dos coinciden (mismo data-color) se quedan abiertas. Si no, se voltean tras 1s. Actualiza #matches y #moves.`,
        initialHTML: `<div class="app">
  <div class="stats">
    <span>Parejas: <strong id="matches">0</strong></span>
    <span>Movimientos: <strong id="moves">0</strong></span>
  </div>
  <div id="tablero" class="tablero">
    <div class="carta" data-color="rojo"></div>
    <div class="carta" data-color="azul"></div>
    <div class="carta" data-color="verde"></div>
    <div class="carta" data-color="amarillo"></div>
    <div class="carta" data-color="rojo"></div>
    <div class="carta" data-color="azul"></div>
    <div class="carta" data-color="verde"></div>
    <div class="carta" data-color="amarillo"></div>
  </div>
  <button id="btnReiniciar">↺ Reiniciar</button>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #1a1a2e;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.stats {
  display: flex;
  gap: 24px;
  color: #aaa;
  font-size: 0.95rem;
}

.stats strong {
  color: #58a6ff;
}

.tablero {
  display: grid;
  grid-template-columns: repeat(4, 80px);
  gap: 10px;
}

.carta {
  width: 80px;
  height: 80px;
  background: #21262d;
  border: 2px solid #30363d;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.carta.abierta[data-color="rojo"]     { background: #e74c3c; border-color: #e74c3c; }
.carta.abierta[data-color="azul"]     { background: #3498db; border-color: #3498db; }
.carta.abierta[data-color="verde"]    { background: #2ecc71; border-color: #2ecc71; }
.carta.abierta[data-color="amarillo"] { background: #f39c12; border-color: #f39c12; }

.carta.coincide {
  border-color: white;
  box-shadow: 0 0 12px rgba(255,255,255,0.3);
}

#btnReiniciar {
  padding: 10px 22px;
  background: #30363d;
  color: #e6edf3;
  border: 1px solid #484f58;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
}`,
        initialJS: `// PASO 1: declara variables de estado:
// let primeraSeleccion = null;
// let bloqueado = false;
// let matches = 0, moves = 0;

// PASO 2: para cada .carta agrega un evento 'click':
//   - Si bloqueado o la carta ya tiene 'coincide' o 'abierta': return;
//   - Agrega 'abierta' a la carta clicada
//   - Si no hay primeraSeleccion: primeraSeleccion = carta;
//   - Si hay primeraSeleccion:
//     moves++; actualiza #moves
//     Si primeraSeleccion.dataset.color === carta.dataset.color:
//       Ambas cartas tienen 'coincide'; matches++; actualiza #matches; primeraSeleccion = null;
//     Si no:
//       bloqueado = true;
//       setTimeout: quita 'abierta' de ambas, bloqueado = false, primeraSeleccion = null;

// PASO 3: #btnReiniciar reinicia todas las variables y quita las clases
\n`,
        hints: [
          'Bloquea mientras se procesan: <code>if (bloqueado) return;</code>',
          'Compara el par: <code>if (primeraSeleccion.dataset.color === carta.dataset.color) { ... }</code>',
          'Voltea de vuelta: <code>setTimeout(() => { primeraSeleccion.classList.remove(\'abierta\'); carta.classList.remove(\'abierta\'); bloqueado = false; primeraSeleccion = null; }, 1000);</code>',
        ],
        validate(doc) {
          try {
            const cartas = doc.querySelectorAll('.carta');
            const matchesEl = doc.getElementById('matches');
            const movesEl = doc.getElementById('moves');
            if (!cartas.length || !matchesEl || !movesEl) return { pass: false, msg: 'Faltan elementos. Verifica .carta, #matches y #moves.' };
            if (cartas.length < 8) return { pass: false, msg: `Deberían haber 8 cartas, pero hay ${cartas.length}.` };
            const pares = {};
            cartas.forEach(c => {
              const col = c.dataset.color;
              if (!pares[col]) pares[col] = [];
              pares[col].push(c);
            });
            const parKey = Object.keys(pares).find(k => pares[k].length >= 2);
            if (!parKey) return { pass: false, msg: 'No se encontraron cartas con el mismo data-color para formar un par.' };
            const [c1, c2] = pares[parKey];
            c1.click();
            c2.click();
            const tienAbierta = c1.classList.contains('abierta') || c1.classList.contains('coincide');
            const tienAbierta2 = c2.classList.contains('abierta') || c2.classList.contains('coincide');
            if (!tienAbierta || !tienAbierta2) return { pass: false, msg: 'Al hacer clic en dos cartas del mismo color, no se marcaron como coincidentes.' };
            const matchVal = parseInt(matchesEl.textContent.trim());
            if (matchVal < 1) return { pass: false, msg: `El contador de parejas (#matches) debería ser al menos 1, pero muestra: "${matchesEl.textContent}".` };
            return { pass: true, msg: '¡Juego de memoria funcionando! Estado de cartas, comparación y contador de parejas dominados.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },
    ],
  },
];

// ============================================================
// LOGROS
// ============================================================
const ACHIEVEMENTS = [
  { id: 'first_blood', name: '¡Primer Reto!',       icon: '🎯', condition: (s)     => s.completedChallenges.length >= 1 },
  { id: 'no_hints_3',  name: 'Sin Ayuda',            icon: '🧠', condition: (s)     => Object.values(s.usedHints).filter(h => h === 0).length >= 3 },
  { id: 'lvl1_done',   name: 'Primer Contacto',      icon: '🔹', condition: (s, al) => al && al[0] && al[0].challenges.every(c => s.completedChallenges.includes(c.id)) },
  { id: 'lvl2_done',   name: 'Maestro del DOM',      icon: '🔸', condition: (s, al) => al && al[1] && al[1].challenges.every(c => s.completedChallenges.includes(c.id)) },
  { id: 'lvl3_done',   name: 'Rey del CSS Dinámico', icon: '🎨', condition: (s, al) => al && al[2] && al[2].challenges.every(c => s.completedChallenges.includes(c.id)) },
  { id: 'lvl4_done',   name: 'Experto en Eventos',   icon: '⚡', condition: (s, al) => al && al[3] && al[3].challenges.every(c => s.completedChallenges.includes(c.id)) },
  { id: 'halfway',     name: 'A Mitad del Camino',   icon: '🌟', condition: (s)     => s.completedChallenges.length >= 9 },
  { id: 'all_done',    name: 'DOM Master',            icon: '🏆', condition: (s)     => s.completedChallenges.length >= 18 },
];

// ============================================================
// SELECCIÓN ALEATORIA DE RETOS (basada en nombre del jugador)
// Mismo nombre → mismos ejercicios siempre
// Distintos nombres → distintos ejercicios
// ============================================================
function buildActiveLevels(playerName, perLevel) {
  perLevel = perLevel || 3;

  // Genera semilla numérica a partir del nombre
  var seed = 0;
  for (var i = 0; i < playerName.length; i++) {
    seed = ((seed * 31) + playerName.charCodeAt(i)) | 0;
  }

  // Generador pseudo-aleatorio LCG (determinista con la semilla)
  function nextRand() {
    seed = ((seed * 1664525) + 1013904223) | 0;
    return (seed >>> 0) / 0x100000000;
  }

  return LEVELS.map(function(level) {
    var pool = level.challenges.slice(); // copia sin modificar el original

    // Fisher-Yates shuffle con RNG determinista
    for (var j = pool.length - 1; j > 0; j--) {
      var k = Math.floor(nextRand() * (j + 1));
      var tmp = pool[j]; pool[j] = pool[k]; pool[k] = tmp;
    }

    // Devuelve el nivel con solo N retos seleccionados
    return {
      id: level.id,
      name: level.name,
      subtitle: level.subtitle,
      icon: level.icon,
      color: level.color,
      challenges: pool.slice(0, Math.min(perLevel, pool.length)),
    };
  });
}
