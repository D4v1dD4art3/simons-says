const violeta = document.getElementById('violeta');
const celeste = document.getElementById('celeste');
const verde = document.getElementById('verde');
const naranja = document.getElementById('naranja');
const btnEmpezar = document.getElementById('btnEmpezar');
const navbarLinks = document.querySelectorAll(".navbar a");
const ULTIMO_NIVEL = 10;

class Juego {
    constructor(){
        this.inicializar = this.inicializar.bind(this)
        this.inicializar()
        this.generarSEcuencia()
        setTimeout(this.siguienteNivel, 500)
    }
    inicializar() {
        this.elegirColor = this.elegirColor.bind(this)
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.toggleBtnEmpezar()
        this.nivel = 1
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
      }
    toggleBtnEmpezar() {
        btnEmpezar.classList.toggle('hide');
    }
    generarSEcuencia() {
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }
    siguienteNivel() {
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }
    transformarNumeroAColor(num) {
        switch(num) {
            case 0: return 'celeste'
            case 1: return 'violeta'
            case 2: return 'naranja'
            case 3: return 'verde'
        }
    }

    transformarColorANumero(color) {
        switch(color) {
            case 'celeste': return 0 
            case 'violeta': return 1
            case 'naranja': return 2 
            case 'verde': return 3
        }
    }
    iluminarSecuencia(){
        for (let i = 0; i < this.nivel; i++) {
            const color = this.transformarNumeroAColor(this.secuencia[i])
            setTimeout(() =>  this.iluminarColor(color), 1000 * i) 
        }
    }
    iluminarColor(color) {
        this.colores[color].classList.add('light')
        setTimeout(() => this.apagarColor(color), 350)
    }
    apagarColor(color){
        this.colores[color].classList.remove('light')
    }
    agregarEventosClick() {
        this.colores.celeste.addEventListener('click', this.elegirColor);
        this.colores.verde.addEventListener('click', this.elegirColor);
        this.colores.naranja.addEventListener('click', this.elegirColor);
        this.colores.violeta.addEventListener('click', this.elegirColor);
    }
    eliminarEventosClick() {
        this.colores.celeste.removeEventListener('click', this.elegirColor);
        this.colores.verde.removeEventListener('click', this.elegirColor);
        this.colores.naranja.removeEventListener('click', this.elegirColor);
        this.colores.violeta.removeEventListener('click', this.elegirColor);
    }
    elegirColor(event) {
        const nombreColor = event.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)
        if(numeroColor === this.secuencia[this.subnivel]) {
            this.subnivel++
            if(this.subnivel === this.nivel) {
                this.nivel++
                this.eliminarEventosClick()
                if(this.nivel === (ULTIMO_NIVEL +1)) {
                    this.ganoElJuego()
                    } else {
                        setTimeout(this.siguienteNivel, 1500)
                }
            }
        } else {
            this.perdioElJuego()
        }
    }
    ganoElJuego() {
        swal({
            title: "Good job! 😎",
            text: `Felicidades has superado el nivel ${this.nivel}`,
            icon: "success",
            button: "Ve por mas!",
          })
          .then(this.inicializar)
    }
    perdioElJuego() {
        swal({
            title: "Uhhh! 😓 ",
            text: `Tendras que esforzarte u poco mas`,
            icon: "error",
            button: "Volver a intentar!",
          })
          .then(() => {
              this.eliminarEventosClick()
              this.inicializar()
          })
    }
}

function empezarJuego() {
   window.juego = new Juego();
}

// smoothScroll

for(let i=0; i < navbarLinks.length; i++) {
    navbarLinks[i].addEventListener("click", navbarLinkClick);
  }
  
  function navbarLinkClick(event) {
  
    smoothScroll(event); // Call the "smoothScroll" function
    
  }
  // Smooth-Scrolling

// APPROACH #1 - window.scrollTo() (window.scroll())
// function smoothScroll(event) {
//   event.preventDefault();
//   const targetId = event.currentTarget.getAttribute("href");
//   window.scrollTo({
//     top: targetId==="#" ? 0 : document.querySelector(targetId).offsetTop,
//     behavior: "smooth"
//   });
// }

// APPROACH #2 - element.scrollIntoView()
// function smoothScroll(event) {
//   event.preventDefault();
//   const targetId = event.currentTarget.getAttribute("href")==="#" ? "header" : event.currentTarget.getAttribute("href");
//   document.querySelector(targetId).scrollIntoView({
//     behavior: "smooth",
//     block: "start"
//   });
// }

// APPROACH #3 - window.requestAnimationFrame()
function smoothScroll(event) {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute("href")==="#" ? "header" : event.currentTarget.getAttribute("href");
    const altoDelHeader = 110;
    const targetPosition = document.querySelector(targetId).offsetTop - altoDelHeader;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1500;
    let start = null;
    console.log(startPosition);
    window.requestAnimationFrame(step);
  
    function step(timestamp) {
        console.log(timestamp)
      if (!start) start = timestamp;

      const progress = timestamp - start;
      //  aqui van las animaciones 
      // window.scrollTo(0, distance*(progress/duration) + startPosition);
      window.scrollTo(0, easeInOutQuad(progress, startPosition, distance, duration) - 1);

      if (progress < duration) window.requestAnimationFrame(step);
    }
  }
  
  // Easing Functions en estas funciones se pasan los mismos parametros que easeInoutCubic
  
  function linear(t, b, c, d) {
      return c*t/d + b;
  };
  
  function easeInOutQuad(t, b, c, d) {
      t /= d/2;
      if (t < 1) return c/2*t*t + b;
      t--;
      return -c/2 * (t*(t-2) - 1) + b;
  };
  
  function easeInOutCubic(t, b, c, d) {
      t /= d/2;
      if (t < 1) return c/2*t*t*t + b;
      t -= 2;
      return c/2*(t*t*t + 2) + b;
  };
