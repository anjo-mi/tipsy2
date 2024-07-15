function updateCarousel(sections) {
    const positions = ['twoFrom', 'prev', 'featured', 'next', 'twoNext'];
    sections.forEach((section, index) => {
        section.className = 'drink';
        section.classList.add(positions[index]);
    });
}

function prev(sections) {
    const last = sections.pop();
    sections.unshift(last);
    updateCarousel(sections);
}

function next(sections) {
    const first = sections.shift();
    sections.push(first);
    updateCarousel(sections);
}

document.querySelector('.find').addEventListener('click', () => {
    getDrink();
});

function getDrink() {
    let drink = document.querySelector('input').value;
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
        .then(res => res.json())
        .then(data => {
            let arrOfDrinks = [];
            for (let i = 0; i < data.drinks.length; i++) {
                let ingreds = [];
                for (let key in data.drinks[i]) {
                    if ((key.startsWith('strIngredient')) && (data.drinks[i][key] !== null)) {
                        ingreds.push(data.drinks[i][key]);
                    }
                }
                arrOfDrinks[i] = new DrinkList(data.drinks[i].strDrink, ingreds, data.drinks[i].strDrinkThumb, data.drinks[i].strInstructions);
            }
            let carousel = document.getElementById('carousel');
            carousel.innerHTML = ''; // Clear existing items
            arrOfDrinks.forEach(drink => {
                let section = document.createElement('section');
                section.style.height = '600px';
                section.style.width = '400px';
                section.classList.add('drink');
                let heading = document.createElement('h3');
                heading.innerText = drink.name;
                let pic = document.createElement('img');
                pic.src = drink.picture;
                let ingredientFigure = document.createElement('figure');
                let ingredCaption = document.createElement('figcaption');
                ingredCaption.innerText = 'Ingredients';
                ingredientFigure.append(ingredCaption);
                let listOfIngreds = document.createElement('ol');
                drink.ingredients.forEach(el => {
                    let singleIngred = document.createElement('li');
                    singleIngred.innerText = el;
                    listOfIngreds.append(singleIngred);
                });
                ingredCaption.insertAdjacentElement('afterend', listOfIngreds);
                let howToMake = document.createElement('p');
                howToMake.innerText = drink.instructions;
                section.append(heading, pic, ingredientFigure, howToMake);
                carousel.append(section);
            });

            const sections = Array.from(carousel.children);
            updateCarousel(sections);

            document.querySelector('.goBack').addEventListener('click', () => {
                prev(sections);
            });
            document.querySelector('.goForward').addEventListener('click', () => {
                next(sections);
            });
        })
        .catch(err => console.log(`the error '${err}' occurred`));
}

function updateCarousel(sections) {
    const visibleCount = 5;
    const totalSections = sections.length;
    sections.forEach((section, index) => {
        section.style.transform = `translateX(${(index - Math.floor(visibleCount / 2)) * 400}px)`;
        section.style.zIndex = totalSections - Math.abs(index - Math.floor(visibleCount / 2));
        if (index < Math.floor(visibleCount / 2) || index > totalSections - Math.ceil(visibleCount / 2)) {
            section.style.opacity = '0';
        } else {
            section.style.opacity = '1';
        }
    });
}

function prev(sections) {
    sections.unshift(sections.pop());
    updateCarousel(sections);
}

function next(sections) {
    sections.push(sections.shift());
    updateCarousel(sections);
}

document.querySelector('.find').addEventListener('click', getDrink);

// class DrinkList {
//     constructor(name, ingredients, picture, instructions) {
//         this.name = name;
//         this.ingredients = ingredients;
//         this.picture = picture;
//         this.instructions = instructions;
//     }
// }

class DrinkList{
    constructor(name, ingredients, picture, instructions){
        this.name = name
        this.ingredients = ingredients
        this.picture = picture
        this.instructions = instructions
    }
    showPic(){
        document.querySelector('').classList.toggle('hidden')
    }
    showDetails(){
        document.querySelector('').classList.toggle('hidden')
    }
    hidePic(){
        document.querySelector('').classList.toggle('hidden')
    }
    hideDetails(){
        document.querySelector('').classList.toggle('hidden')

    }
}