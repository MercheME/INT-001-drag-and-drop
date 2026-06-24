# 🔬 Laboratorio 
## INT-001-drag-and-drop
1. ¿Qué eventos usa la Drag & Drop API y en qué orden se disparan?

El ciclo de vida se divide en dos actores principales: el elemento que se arrastra (origen) y el lugar donde se suelta (destino).

Sobre el elemento origen (la tarjeta):

- dragstart: Se dispara en el milisegundo en que empiezas a arrastrar el objeto. Siempre que quieras iniciar un arrastre se usa para configurara los datos que viajas (setData) y para cambiar la estética de la tarjeta original (por ejemplo, bajarle la opacidad para que se note que se esta 'levantando')

- drag: Se dispara continuamente (cada pocos milisegundos) mientras estás moviendo el ratón con el objeto a cuestas. Rara vez se usa, salvo que quieras hacer algo muy específico mientras el usuario se mueve, como actualizar unas coordenadas en pantalla en tiempo real o cambiar el aspecto de un elemento ajeno al arrastre.

- dragend: Se dispara cuando sueltas el ratón, indicando que la operación de arrastre ha terminado (haya tenido éxito o no). Muy recomendable en interfaces reales. Se usa para "limpiar". Si en el dragstart le bajaste la opacidad a la tarjeta o le pusiste un borde rojo, en el dragend se la restauras, se haya soltado con éxito o no.

Sobre el elemento destino (las zonas):

- dragenter: Se dispara una sola vez cuando el puntero del ratón (con el objeto arrastrado) entra en los límites visuales de la zona. Ideal para mejorar la experiencia de usuario (UX). Se usa para cambiar el estilo de la zona justo cuando la tarjeta entra. Por ejemplo, hacer que el fondo de la zona se vuelva verde o el borde se vuelva continuo para decirle al usuario: "¡Sí, suéltame aquí!".

- dragover: Se dispara de forma masiva e ininterrumpida mientras el ratón se mueva dentro de la zona de destino. Siempre que quieras permitir un drop (usando preventDefault). Al ejecutarse continuamente, evita meter lógica pesada aquí dentro (como llamadas a bases de datos) porque ralentizará el movimiento del ratón.

- dragleave: Se dispara si sacas el ratón de la zona sin haber soltado el objeto. Obligatorio si usas dragenter. Si cuando la tarjeta entró (dragenter) pintaste la zona de verde, cuando el usuario pase de largo sin soltar la tarjeta (dragleave), tienes que usar este evento para quitar ese color verde y dejar la zona como estaba antes.

- drop: Se dispara en la zona de destino en el momento en que sueltas el botón del ratón, siempre y cuando la zona esté "habilitada" para recibirlo. Siempre que quieras procesar el final de la acción. Aquí es donde se ejecuta la lógica de negocio: mover el elemento en el DOM, hacer un fetch o Axios para guardar la nueva posición en la base de datos, o activar un sonido de éxito.

En este ejercicio solo hemos necesitado 3 eventos:

- dragstart (en la tarjeta): Lo usamos para activar el "camión de mudanzas" (dataTransfer) y guardar el ID de la tarjeta que se está moviendo.

- dragover (en las zonas): Imprescindible. Lo usamos única y exclusivamente para meter el e.preventDefault() y decirle al navegador: "Oye, deja de bloquear, que esta zona sí admite que le suelten cosas".

- drop (en las zonas): El momento clave. Lo usamos para abrir el camión de mudanzas, recuperar el ID y meter la tarjeta físicamente en la nueva zona usando appendChild(). 

2. ¿Cuál es la función de dataTransfer?

Es el "camión de mudanzas" o el portapapeles de la API. Su función es almacenar y transportar los datos desde el elemento origen hasta el elemento destino.

En el dragstart, usas e.dataTransfer.setData('text/plain', idDeLaTarjeta) para meter el ID de la tarjeta en el camión.

En el drop, usas e.dataTransfer.getData('text/plain') para sacar ese ID y saber exactamente qué elemento tienes que mover con un appendChild().

⚠️ Curiosidad de laboratorio: Durante los eventos dragover o dragenter, si intentas leer los datos con getData(), verás que está vacío o protegido por motivos de seguridad del navegador. Solo se abre el cofre en el evento drop.

3. ¿Por qué hay que llamar a preventDefault() en dragover?

Por defecto, los navegadores web prohíben soltar cosas dentro de elementos HTML (para evitar que, por ejemplo, arrastres una imagen o un texto y el navegador intente abrirlo en una pestaña nueva o romper la página).

El comportamiento por defecto de una zona ante el evento dragover es: "Aquí no se puede soltar nada". Por lo tanto, al ejecutar e.preventDefault() dentro del listener de dragover, estás cancelando de forma explícita esa prohibición del navegador, transformando un elemento estático en una zona de drop válida. Si no lo pones, el evento drop jamás llegará a ejecutarse.

4. ¿Qué limitaciones tiene esta API?
Aunque es nativa y muy potente, tiene "dolores de cabeza" conocidos:

- Personalización visual limitada: La silueta translúcida que ves mientras arrastras el objeto la genera el propio sistema operativo/navegador. Es muy difícil meterle estilos CSS avanzados o animaciones fluidas a esa silueta mientras se mueve.

- Dispositivos móviles: La Drag & Drop API nativa de HTML5 tiene un soporte pésimo o nulo en pantallas táctiles (iOS/Android). Para móviles, habitualmente hay que recurrir a eventos de tipo touch (touchstart, touchmove, touchend) o usar librerías externas.

- Eventos caóticos: Al dispararse dragover tantas veces por segundo, si metes lógica pesada o modificaciones visuales complejas dentro de ese evento, puedes provocar caídas de rendimiento (lag) en la interfaz.