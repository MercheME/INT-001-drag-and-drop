import './style.css'
//import { iniciarDragDrop, iniciarDragDropSingle } from './js/dragDrop-single.js'
import { iniciarDragDropMulti } from './js/dragDrop-multi.js';

document.querySelector('#app').innerHTML = `
<div class="contenedor">
        <div class="zona" id="zona-1">
            <div class="tarjeta" id="tarjeta-1" draggable="true">📄 Tarjeta A</div>
            <div class="tarjeta" id="tarjeta-2" draggable="true">📄 Tarjeta B jksdbfdlkc sdcjnsdfnsakdf sadfnasjdnfasjd csj dcjasd cas df</div>
            <div class="tarjeta" id="tarjeta-3" draggable="true">📄 Tarjeta C jksdbfdlkc sdcjnsdfnsakdf sadfnasjdnfasjd csj dcjasd cas df</div>
        </div>

        <div class="zona" id="zona-2"></div>

        <div class="zona" id="zona-3"></div>

        <div class="zona" id="zona-4"></div>

        <div class="zona" id="zona-5"></div>
    </div>

    <script src="script.js"></script>
`;

//Para la version de una tarjeta
//iniciarDragDropSingle();

//Para la versión con varias tarjetas
iniciarDragDropMulti();

// Esta tarjeta es para probar dragDrop-single
    // <div class="tarjeta" id="tarjeta-movil" draggable="true">
    //    📄 Tarjeta
    // </div>