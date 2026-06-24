export function iniciarDragDropSingle() {
    const tarjeta = document.getElementById('tarjeta-movil');
    const zonas = document.querySelectorAll('.zona'); 

    // Al arrancar, si la tarjeta ya está en una zona por defecto, la marcamos como ocupada
    if (tarjeta.parentElement.classList.contains('zona')) {
        tarjeta.parentElement.classList.add('zona-ocupada');
    }

    //aqui escuchamos el momento exacto en que el usuario hace clic y empieza a mover la tarjeta
    tarjeta.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.id);
        // e.dataTransfer: Es el portapapeles o "camión de mudanzas" nativo que viaja con el ratón.

        // setData('text/plain', e.target.id): Mete dentro del camión una etiqueta de tipo texto plano con el valor del id de tu tarjeta ('tarjeta-movil'). Es como meter la dirección de la tarjeta en una caja antes de arrancar

        // Le añadimos la clase de "levantada"
        tarjeta.classList.add('tarjeta-arrastrandose');

        // En el momento que empiezas a moverla, su zona actual deja de estar "ocupada" y vuelve a ser una zona normal con cuadritos
        tarjeta.parentElement.classList.remove('zona-ocupada');
    });

    // Al soltar el ratón (sea donde sea), limpiamos la tarjeta original
    tarjeta.addEventListener('dragend', () => {
        tarjeta.classList.remove('tarjeta-arrastrandose');
    });

    //Como tenemos varias zonas usamos un forEach()  para aplicarle las reglas a cada una de ellas por separado
    zonas.forEach((zona) => {

        // dragover: Este evento se dispara sin parar mientras la tarjeta flota por encima de una zona
        zona.addEventListener('dragover', (e) => {
            e.preventDefault(); // Por defecto, el navegador tiene prohibido soltar elementos en zonas HTML. Al ejecutar esto, cancelas esa prohibición y la zona se ilumina virtualmente diciendo: "¡Vale, aquí sí puedes soltar cosas!".
        });

        //Mejorando UX 
        // 1. Cuando la tarjeta entra en la zona
        zona.addEventListener('dragenter', () => {
            zona.classList.add('zona-hover');
        });

        // 2. Si el usuario pasa de largo y saca la tarjeta de la zona
        zona.addEventListener('dragleave', () => {
            zona.classList.remove('zona-hover');
        });

        // Cuando el usuario levanta el dedo del ratón sobre una zona válida, se desata el evento drop
        zona.addEventListener('drop', (e) => {
            e.preventDefault(); // Evita comportamientos raros por defecto del navegador (como que intente abrir el texto en una pestaña nueva)

            // 3. Limpiamos el color también al soltar la tarjeta dentro
            zona.classList.remove('zona-hover');

            // Limpiamos el estado "ocupada" de CUALQUIER otra zona antes de moverla
            zonas.forEach(z => z.classList.remove('zona-ocupada'));

            const id = e.dataTransfer.getData('text/plain'); // Abrimos el camión de mudanzas y sacamos lo que guardamos al principio. Ahora la variable id vale 'tarjeta-movil'

            const tarjetaArrastrada = document.getElementById(id);
            zona.appendChild(tarjetaArrastrada); // Esta es la magia del DOM. Buscas el elemento real usando ese ID extraído y lo introduces dentro de la zona actual. En JavaScript, cuando usas appendChild con un elemento que ya existe en la pantalla, no lo clona: lo mueve de sitio automáticamente, quitándolo de la zona vieja y metiéndolo en la nueva

            zona.classList.add('zona-ocupada');
        });
    });
}