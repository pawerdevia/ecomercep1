
import { openCartModal } from './components/cart.js';
import {crearProductos} from './helpers/crear-products.js';
import {openCloseMenu} from './components/menu.js';
import {irArriba} from './components/btn-arriba.js';


//CREAR PRODUCTOS  Y ASIGNA FUNCIONES DE DETALLES Y CERRADO DE MODAL
crearProductos()

//AGREEGAR FUNCIONALIDAD DE ABRIR Y CERRAR MODAL DE MENU
openCloseMenu()

//AGREEGAR FUNCIONALIDAD DE ABRIR Y CERRAR MODAL DE MENU

openCartModal()

irArriba()



//AGREGAR  AL CARRIRTO DE COMPRAS EL ITEM