function irArriba(){
    window.addEventListener('scroll', () => {
        var scroll = document.documentElement.scrollTop;
        var botonArriba = document.getElementById('botonArriba');

        if(scroll > 400){
            botonArriba.style.right = 2 + "rem" ;
        }   else {
            botonArriba.style.right = -100 + "px";
        }
    })
} 
irArriba();


export {irArriba}
