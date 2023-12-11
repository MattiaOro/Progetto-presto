let navbar = document.querySelector('#navbar')

window.addEventListener('scroll', () => {
    let scrolled = window.scrollY
    if (scrolled > 300) {
        navbar.classList.add('navbarScroll')
    } else {
        navbar.classList.remove('navbarScroll')
    }
})

// Collegamento al file json = Chiamata asincrona FETCH per collegare al file json e ottenere una promise, un oggetto
//  poi  un primo .THEN per converstire la promise in file json composto di dati primitivi
//  poi  un secondo THEN per convertire ogni dato del json in un array di oggetti che può essere utilizzato

//**Filtro categoria

fetch('./annunci.json').then((response) => response.json()).then((data) => {
    console.log(data);

    data.sort((a, b) => a.price - b.price)

    let inputCategory = document.querySelector('#InputCategory')
    console.log(inputCategory);
    let containerCard = document.querySelector('#containerCard')

    function radioCreate() {
        let categories = data.map((annuncio) => annuncio.category)
        // analizza le categorie e non le inserisce nella varabile se già presente, per evitare ripetizioni
        let uniqueCategories = new Set(categories)
        uniqueCategories.forEach((categoria) => {
            let div = document.createElement('div')
            div.innerHTML = ` 
                <input class="form-check-input" type = "radio" name = "categoria" id = "${categoria}" >
                    <label class="form-check-label" for="${categoria}">
                        ${categoria}
                    </label>`
            inputCategory.appendChild(div)
        })
    }

    radioCreate()

    function showCards(array) {
        array.forEach((annuncio) => {
            let div = document.createElement('div')
            div.classList.add('col-6', 'col-md-3')
            div.innerHTML = `
                <img src = "${annuncio.img}" class="img-fluid" >
        <h2>${annuncio.name}</h2>
        <p>${annuncio.price}</p>`
            containerCard.appendChild(div)
        })
    }

    showCards(data)

    let radioBtn = document.querySelectorAll('.form-check-input')

    function filterByCategories(array) {
        let btnChecked = Array.from(radioBtn).find((button)=>button.checked)
        let categoria = btnChecked.id
        if (categoria != 'All') {
            let filtered = data.filter((annuncio) => annuncio.category == categoria)
            containerCard.innerHTML = ``
            return filtered
        } else {
            return array
        }
    }




   

    radioBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
        globalFilter()
        })
    })





    // **Filtro prezzo

    let priceInput = document.querySelector('#PriceInput')
    let priceValue = document.querySelector('#PriceValue')

    function setPriceInput() {
        let prices = data.map((annuncio) => Number(annuncio.price))
        prices.sort((a, b) => a - b)
        let maxPrice = prices.pop()
        priceInput.max = maxPrice
        priceInput.value = maxPrice
        priceValue.innerHTML = maxPrice

    }


    setPriceInput()

    function filterByPrice(array) {
        let filtered = array.filter((annuncio) => Number(annuncio.price) <= priceInput.value)
        containerCard.innerHTML = ''
       return filtered

    }

    priceInput.addEventListener('input', () => {
        priceValue.innerHTML = priceInput.value
        globalFilter()

})

// ** filtro parola

let wordInput = document.querySelector(`#wordInput`)

function filterByWord(array) {
    let filtered = array.filter((annuncio) => annuncio.name.includes(wordInput.value))
    containerCard.innerHTML = ``
    return filtered
}

wordInput.addEventListener(`input`, () => {
    globalFilter()
})

// Filtro globale

function globalFilter(){
    let filtratiPerCategoria = filterByCategories(data)
    let filtratiPerPrezzo = filterByPrice(filtratiPerCategoria)
    let filtratiPerParola = filterByWord(filtratiPerPrezzo)
    showCards(filtratiPerParola)
}

})