const cartes = document.querySelectorAll('.carte');

let carteRetournee = false;
let premiereCarte, secondeCarte;
let verouillage = false;                // Quand on a 2 cartes ouvertes ça va verouiller l'écran 

cartes.forEach(carte => {
    carte.addEventListener('click', retourneCarte)
})


function retourneCarte() {
    
    if (verouillage) return;

    // console.log(this);                 // Répresente objet courant, ici carte sur laquelle on clique
    // console.log(this.childNodes);      // Sélectionne ses noeuds enfants (éléments HTML et retour à la ligne) à l'objet courant carte

    this.childNodes[1].classList.toggle('active');          // Carte cliquée se retoune 

    if (!carteRetournee) {                // !carteRetournee = true;
        
        carteRetournee = true;
        premiereCarte = this;
        return;
    }

    carteRetournee = false;
    secondeCarte = this;

    // console.log(premiereCarte, secondeCarte);

    correspondance();

}



function correspondance() {

    if (premiereCarte.getAttribute('data-attr') === secondeCarte.getAttribute('data-attr')) {

        premiereCarte.removeEventListener('click', retourneCarte);
        secondeCarte.removeEventListener('click', retourneCarte);
    }

    else {
        verouillage = true;                

        setTimeout(() => {

            premiereCarte.childNodes[1].classList.remove('active');         // Au bout de 1500ms la carte va se retourner
            secondeCarte.childNodes[1].classList.remove('active');

            verouillage = false;            // A la fin du setTimeout on dévérouille
        }, 1500)
    }
}



function aleatoire() {              // Propriété order qui va disposer nos cards

    cartes.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);       // Retourne un entier entre 0 et 11
        card.style.order = randomPos;
    })
}

aleatoire();


/*

NOTES :

On fait démarrer carteRetournee à false
!carteRetournee = true donc la première fois la condition va fonctionner
premiereCarte = this  correspond à la carte cliquée
Une fois on rentrera dans le if la fois suivante on n'y rentrera pas car !carteRetournee sera à false
Cela va nous permettre de stocker deux cartes sur lesquelles on va cliquer (un peu comme un toggle)

*/