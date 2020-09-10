
const violeta = document.getElementById('violeta');
const celeste = document.getElementById('celeste');
const verde = document.getElementById('verde');
const naranja = document.getElementById('naranja');
const btnEmpezar = document.getElementById('btnEmpezar');
const navbarLinks = document.querySelectorAll(".navbar a");
const btnSwitch = document.getElementById("switch");
const navbarToggler = document.querySelector(".navbar-collapse");
const $header = document.getElementById('header');
const $main = document.getElementById('main');
const $main2 = document.getElementById('main2');
const $banner = document.getElementById('banner');
const $footer = document.getElementById('footer');
const $pic = document.getElementById('pic');
const nombre = document.getElementById("name");
const nivel = document.getElementById("level");
const tiempo = document.getElementById("time");
console.log($pic.hasAttribute('src'));
console.log($pic.getAttribute('src'));
// const navbarMenu = document.querySelector(".navbar ul");
// const anime = require('animejs');
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
        this.datos();
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
      }
      datos() {
        Swal.fire({
            icon: 'question',
            title: '¡Simon Dice!', 
            text: 'Ingresa Tu Nombre:',
            input: 'text',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              } 
          })
        .then((result) => {
        if (result.value) {
            nombre.innerHTML = JSON.stringify(result.value);
        } else {
            nombre.innerHTML = "Anónimo";
        }
        nivel.innerHTML = this.nivel = 1;
        tiempo.innerHTML = this.counter = 15;
        this.generarSEcuencia();
        setTimeout(this.siguienteNivel, 500);
        this.temporizador();
        });
      }
    temporizador() {
        this.timer = setInterval(() => {
          this.counter--;
          if (this.counter < 0) {
            clearInterval(this.timer);
            this.perdioElJuego();
          } else {
            tiempo.innerText = this.counter;
          }
        }, 1000);
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
                    clearInterval(this.timer);
                    this.ganoElJuego()
                    } else {
                        clearInterval(this.timer);
                        // setTimeout(this.siguienteNivel, 1500)
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: `Muy bien!, nivel: ${this.nivel}!`,
                            showConfirmButton: false,
                            timer: 1000
                          })
                        .then(() => {
                            nivel.innerHTML = this.nivel
                            tiempo.innerHTML = this.counter = 15;
                            this.temporizador();
                            setTimeout(this.siguienteNivel(), 1500);
                          })
                }
            }
        } else {
            clearInterval(this.timer);
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
          .then(() => {
            this.eliminarEventosClick();
            nombre.innerHTML = "Anónimo";
            nivel.innerHTML = "--";
            tiempo.innerHTML = "--";
            this.toggleBtnEmpezar();
          });
    }
    perdioElJuego() {
        swal({
            title: "Uhhh! 😓 ",
            text: `Tendras que esforzarte u poco mas`,
            icon: "error",
            button: "Volver a intentar!",
          })
          .then(() => {
            this.eliminarEventosClick();
            nombre.innerHTML = "Anónimo";
            nivel.innerHTML = "--";
            tiempo.innerHTML = "--";
            this.toggleBtnEmpezar();
        });
    }
}

function empezarJuego() {
   window.juego = new Juego();
}

// smoothScroll
navbarToggler.addEventListener("click", navbarTogglerClick);

function navbarTogglerClick() {   
  navbarToggler.classList.toggle("show");
//   navbarToggler.animate(keyframes = [], options = {})
}

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
    const altoDelHeader = 160;
    const targetPosition = document.querySelector(targetId).offsetTop - altoDelHeader;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1500;
    let start = null;
    window.requestAnimationFrame(step);
  
    function step(timestamp) {
      if (!start) start = timestamp;

      const progress = timestamp - start;
      //  aqui van las animaciones 
      // window.scrollTo(0, distance*(progress/duration) + startPosition);
      window.scrollTo(0, easeInOutQuad(progress, startPosition, distance, duration) - altoDelHeader);

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

    function CambiarFoto(url) {
        const logo_dark = 'https://i.imgur.com/LCbas6R.png' ;
        const logo_white = 'https://i.imgur.com/hRccxk7.png';
        if (url.src === logo_dark) {
            url.src = logo_white;
        }else if(url.src === logo_white) {
         url.src = logo_dark;
        }
    }
    // function CambiarFoto(url) {
    //     if (url.hasAttribute('src')) {
    //      url.setAttribute('src', 'https://i.imgur.com/hRccxk7.png')
    //     }else if(url.getAttribute('src') === 'https://i.imgur.com/hRccxk7.png') {
    //      url.setAttribute('src', 'https://i.imgur.com/LCbas6R.png')
    //     }
    // }
    //   switch bottom
    function cambiarState(btn) {
        btn.addEventListener('click', () =>{
        document.body.classList.toggle('bg-dark');
        CambiarFoto($pic)
        $header.classList.toggle('light');
        $main.classList.toggle('light');
        $main2.classList.toggle('light');
        $banner.classList.toggle('light');
        $footer.classList.toggle('light');
        btnSwitch.classList.toggle('active');
    })
}
cambiarState(btnSwitch);

