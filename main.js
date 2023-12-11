

let navbar = document.querySelector('#navbar')

window.addEventListener('scroll', () => {
  let scrolled = window.scrollY
  if (scrolled > 300) {
    navbar.classList.add('navbarScroll')
  } else {
    navbar.classList.remove('navbarScroll')
  }
})

let navbarButton = document.querySelector('#navbarButton')

window.addEventListener('scroll', () => {
  let scrolled = window.scrollY
  if (scrolled > 300) {
    navbar.classList.add('navbarScroll')
  } else {
    navbar.classList.remove('navbarScroll')
  }
})

// **numbers

let number1 = document.querySelector('#number1')
console.log(number1);
let number2 = document.querySelector('#number2')
let number3 = document.querySelector('#number3')


// **numbers counters

// ! Chiamate asincrone: fanno partire una funzione, ma in un altro momento

// ? SETINTERVAL: inizia una chiamata asincrona mentre CLEARINTERVAL ne pone fine bloccando il loop di SETINTERVAL

// ? function CreateInterval (numero da ripetere,elemento catturato,tempo per raggiungere il numero) {}

let confirm = true

function CreateInterval(n, element, time) {
  let counter = 0
  let interval = setInterval(() => {
    if (counter < n) {
      counter++
      element.innerHTML = counter
    } else {
      clearInterval(interval)
    }
  }, time);

  // ? setTimeout crea un ritardo della funzione per evitare bug. Fuori dalla funzione create interval va messa una variabile let true per farlo funzionare.

  setTimeout(() => {
    confirm = true
  }, 5000)
}

// ? INTERSECTIONOBSERVER: funzione di java che fa partire una funzione subordinata quando una variabile viene inquadrata sul browser. Vuole il "new" prima o non parte.

let observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && confirm) {
      CreateInterval(100, number1, 20)
      // il tempo, il terzo parametro, è segnato in millisecondi e indica il tempo del singolo incremento. Quindi 100=1 secondo per fare un singolo incremento
      CreateInterval(200, number2, 20)
      CreateInterval(30, number3, 100)
      confirm = false
    }
  })
})

observer.observe(number1)
// segniamo numer1 perchè facciamo partire la funzione appena lo schermo intercetta il primo elemento









// <!-- Initialize Swiper -->

var swiper = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});




























