export function iniciarDragDropMulti() {
// Seleccionamos TODAS las tarjetas del proyecto
    const tarjetas = document.querySelectorAll('.tarjeta');
    const zones = document.querySelectorAll('.zona');

    // Comprobación inicial: si una zona arranca con tarjetas, le ponemos el borde sólido
    zones.forEach(zona => {
        if (zona.children.length > 0) {
            zona.classList.add('zona-ocupada');
        }
    });

    // Aplicamos los eventos a CADA tarjeta de la lista
    tarjetas.forEach((tarjeta) => {
        tarjeta.addEventListener('dragstart', (e) => {
            // Guardamos el ID específico de la tarjeta que se está levantando
            e.dataTransfer.setData('text/plain', e.target.id);
            e.dataTransfer.effectAllowed = 'move';

            tarjeta.classList.add('tarjeta-arrastrandose');
            
            // Al levantarla, si su zona se queda totalmente vacía (0 hijos), le quitamos el borde sólido
            const zonaPadre = tarjeta.parentElement;
            if (zonaPadre.children.length === 1) { // 1 porque aún no se ha ejecutado el movimiento físico
                zonaPadre.classList.remove('zona-ocupada');
            }
        });

        tarjeta.addEventListener('dragend', () => {
            tarjeta.classList.remove('tarjeta-arrastrandose');
        });
    });

    // Las zonas funcionan exactamente igual, pero refinando el final
    zones.forEach((zona) => {
        zona.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move'; // Forzamos al ratón a mostrar el icono de movimiento
        });

        zona.addEventListener('dragenter', () => {
            zona.classList.add('zona-hover');
        });

        zona.addEventListener('dragleave', () => {
            zona.classList.remove('zona-hover');
        });

        zona.addEventListener('drop', (e) => {
            e.preventDefault();
            zona.classList.remove('zona-hover');

            // Recuperamos el ID de la tarjeta concreta que viaja en el camión
            const id = e.dataTransfer.getData('text/plain');
            const tarjetaArrastrada = document.getElementById(id);
            
            // Antes de moverla, limpiamos el estado ocupado de la zona de donde venía la tarjeta
            tarjetaArrastrada.parentElement.classList.remove('zona-ocupada');

            // Movemos la tarjeta físicamente a la nueva zona
            zona.appendChild(tarjetaArrastrada);

            // Marcamos esta zona como ocupada porque ahora tiene componentes dentro
            zona.classList.add('zona-ocupada');
        });
    });
}