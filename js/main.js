const grid = document.querySelector('.grid')
const resultDisplay = document.querySelector('.results')
let currentShooterIndex = 202
const width = 15
const aliensRemoved = []
let invadersID
let isGoingRight =  true
let direction = 1

for (let i = 0; i < width * width; i++){ // création de 115 carrés (div) avec une boucle
    const square = document.createElement('div') // création du de la constante "square"
    square.id = i
    grid.appendChild(square) // Utilisation de appendChild pour intégrer le noeud enfant  au noeud parent
    // ainsi dans le grid qui fait 15 par 15 on rajoute tous les carrées 15*15=225
}

const squares = Array.from(document.querySelectorAll('.grid div')) // on récupère tous les élèments "div" dans le parent "grid"
// on utilise Array.from pour transformer la NodeList en tableau qui facilite la manipulation du DOM
console.log(squares) // on peut voir dans la console qu'il est sous forme de tableau

const aliensInvaders = [ // selection des carrés pour qu'ils soient des aliens sous forme de tableau
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39,
]

function draw (){
    for (let i = 0; i <aliensInvaders.length; i++){// a l'aide  d'une boucle on veut que les div selectionne avec la constante aliensInvaders qui ont un index  qui sont dans la constate squares
        if (!aliensRemoved.includes(i)) {

            squares[aliensInvaders[i]].classList.add('invader')// ai le nom de invader ainsi on pourra les modifier dans le CSS
        }
    }
}
draw()

squares[currentShooterIndex].classList.add('shooter') // dans le tableau squares le carre qui à l'index 202 est nommer shooter(CSS)

function remove(){
    for (let i = 0; i < aliensInvaders.length; i++){
        squares[aliensInvaders[i]].classList.remove('invader')
    }
}

function moveShooter(e){ // function qui permet au shooter de bouger de droite a gauche
    squares[currentShooterIndex].classList.remove('shooter') // remove permet de juste bouger le carre shooter
    switch (e.key) { // utilisation de switch car on à plusieurs cas

        case 'ArrowLeft': // pour aller a gauche
            if (currentShooterIndex % width !== 0) currentShooterIndex -=1 // currentShooterIndex % width !== 0 permet de voir si le shooter n'est pas sur le bord de gauche
            break; // si il n'est pas tout à gauche du tableau alors on lui enleve 1 à son index donc il ira a gauche
        case 'ArrowRight':
            if (currentShooterIndex % width < width - 1) currentShooterIndex +=1 // pareil
            break;
    }
    squares[currentShooterIndex].classList.add('shooter')
}

document.addEventListener('keydown', moveShooter)


function moveInvaders(){
    const leftEdge = aliensInvaders[0] % width === 0
    const rightEdge = aliensInvaders[aliensInvaders - 1] % width === width -1
    remove()


    if(rightEdge && isGoingRight) {
        for (let i = 0; i < aliensInvaders.length; i++){
            aliensInvaders[i] += width + 1
            direction = -1
            isGoingRight = false
        }
    }

    for (let i = 0; i < aliensInvaders.length; i++){
        aliensInvaders[i] += direction
    }



    draw()
}
 invadersID = setInterval(moveInvaders, 600)