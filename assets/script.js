// Fonction pour convertir le texte contenu dans un champ en lettres majuscules
function toUpperCase(id) {
    var input = document.getElementById(id);
    input.value = input.value.toUpperCase(); // Convertit le contenu en majuscules
}

// Fonction pour vérifier si un champ contient exactement cinq chiffres
function CodePostal() {
    const input_CP = document.getElementById('CP');
    const msg_CP = document.getElementById('CP_Msg_error');

    const select_ville = document.getElementById("Ville");
    const options = select_ville.querySelectorAll("option");
    for (const option of options) {
        option.remove();
    }

    if (input_CP.value.length === 5 && /^\d+$/.test(input_CP.value)) {
        msg_CP.style.display = "none"; // Cache le message d'erreur
        input_CP.style.border = "none"; // Change la couleur de la bordure
        select_ville.removeAttribute("disabled");

        fetch('https://geo.api.gouv.fr/communes?codePostal=' + input_CP.value)
            .then(response => response.json())
            .then(data => {
                data.forEach(ville => {
                    const option = document.createElement("option");
                    option.innerText = ville.nom;
                    select_ville.appendChild(option);
                });
            });
    } 
    else {
        msg_CP.style.display = "inline-block"; // Affiche le message d'erreur
        msg_CP.textContent = "Veuillez entrer 5 chiffres."; // Message d'erreur
        msg_CP.style.color = "red"; // Couleur du message d'erreur
        input_CP.style.border = "2px solid red"; // Change la couleur de la bordure
        
        const option = document.createElement("option");
        option.innerText = "Code postal invalide";
        option.setAttribute("disabled", "disabled");
        option.setAttribute("selected", "selected");
        select_ville.appendChild(option);
        select_ville.setAttribute("disabled", "disabled");
    }
}

// Fonction pour vérifier si un champ contient exactement dix chiffres
function TenNumbers(id, msg_error) {
    var input = document.getElementById(id);
    var msg = document.getElementById(msg_error);
    if (input.value.length === 10 && /^\d+$/.test(input.value)) {
        msg.style.display = "none"; // Cache le message d'erreur
    } else {
        msg.style.display = "inline-block"; // Affiche le message d'erreur
        msg.textContent = "Veuillez entrer 10 chiffres."; // Message d'erreur
        msg.style.color = "red"; // Couleur du message d'erreur
        input.style.border = "2px solid red"; // Change la couleur de la bordure
    }
}

// Fonction pour vérifier si un numéro de TVA respecte le format attendu
function VerifeTVA(id, msg_error) {
    var input = document.getElementById(id);
    var msg = document.getElementById(msg_error);
    
    if (/^FR\d{11}$/.test(input.value)) {
        msg.style.display = "none"; // Cache le message d'erreur
    } else {
        msg.style.display = "inline-block"; // Affiche le message d'erreur
        msg.style.color = "red"; // Couleur du message d'erreur
        msg.textContent = "Le numéro de TVA doit commencer par FR suivi de 11 chiffres."; // Message d'erreur
        input.style.border = "2px solid red"; // Change la couleur de la bordure
    }    
}

// Fonction pour afficher un champ de saisie supplémentaire si "Autre" est sélectionné dans une liste déroulante
function AutreFournisseur() {
    var select = document.getElementById("Fournisseur");
    var input = document.getElementById("Input_Fournisseur");
    if (select.value === "Autre") {
        input.style.display = "inline-block"; // Affiche le champ de saisie supplémentaire
    } else {
        input.style.display = "none"; // Cache le champ de saisie supplémentaire
    }
}

function empty(ID) {
    var input = document.getElementById(ID);
    if (input.value == "") {
        input.style.border = "2px solid red";
    }
}

// Fonction pour réinitialiser les champs de saisie et cacher les messages d'erreur
function Reset() {
    var box = document.getElementById("Input_Fournisseur");
    box.style.display = "none"; // Cache le champ de saisie supplémentaire
    var msg_CP = document.getElementById("CP_Msg_error");
    msg_CP.style.display = "none"; // Cache le message d'erreur concernant le code postal
    var msg_TVA = document.getElementById("TVA_Msg_error");
    msg_TVA.style.display = "none"; // Cache le message d'erreur concernant le numéro de TVA
    var msg_Tel = document.getElementById("Tel_Msg_error");
    msg_Tel.style.display = "none"; // Cache le message d'erreur concernant le numéro de téléphone
    var input_Societe = document.getElementById("Societe");
    input_Societe.style.border = "none";
    var input_TVA = document.getElementById("TVA");
    input_TVA.style.border = "none";
    var input_CP = document.getElementById("CP");
    input_CP.style.border = "none";
    var input_name = document.getElementById("name");
    input_name.style.border = "none";
    var input_prenom = document.getElementById("prenom");
    input_prenom.style.border = "none";
    var input_email= document.getElementById("email");
    input_email.style.border = "none";
    var input_Tel = document.getElementById("Tel");
    input_Tel.style.border = "none";

    const select_ville = document.getElementById("Ville");
    const option = document.createElement("option");
    option.innerText = "Nom de la vill";
    option.setAttribute("disabled", "disabled");
    option.setAttribute("selected", "selected");
    select_ville.appendChild(option);
    select_ville.setAttribute("disabled", "disabled");
}

// Fonction pour demander confirmation avant d'envoyer le formulaire
function ConfirmeSend(event) {
    var msg = "Voulez-vous vraiment envoyer le formulaire ?"; // Message de confirmation
    if (!confirm(msg)) {
        event.preventDefault(); // Annule l'action par défaut si l'utilisateur annule
    }
}

window.addEventListener('scroll', function() {
    var nav = document.querySelector('nav');
    var BtnToUp = document.getElementById('BtnToUp');

    if (nav.getBoundingClientRect().bottom < 0) {
        BtnToUp.style.display = "block";
    }
    else {
        BtnToUp.style.display = "none";
    }
});