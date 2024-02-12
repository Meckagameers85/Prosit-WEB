function toUpperCase(id) {
    var input = document.getElementById(id);
    input.value = input.value.toUpperCase(); // Convertit le contenu en majuscules
}

function FiveNumbers(id,msg_error) {
    var input = document.getElementById(id);
    var msg = document.getElementById(msg_error);
    if (input.value.length === 5 && /^\d+$/.test(input.value)) {
    }
    else {
        msg.style.display = "inline-block";
        msg.textContent = "Veuillez entrer 5 chiffres";
        msg.style.color = "red";
    }
}

function TenNumbers(id,msg_error) {
    var input = document.getElementById(id);
    var msg = document.getElementById(msg_error);
    if (input.value.length === 10 && /^\d+$/.test(input.value)) {
    }
    else {
        msg.style.display = "inline-block";
        msg.textContent = "Veuillez entrer 10 chiffres";
        msg.style.color = "red";
    }
}

function VerifeTVA(id,msg_error) {
    var input = document.getElementById(id);
    var msg = document.getElementById(msg_error);
    
    if (/^FR\d{11}$/.test(input.value)) {
    }
    else {
        msg.style.display = "inline-block";
        msg.style.color = "red";
        msg.textContent = "Le numéro de TVA doit commencer par FR suivi de 11 chiffres.";
        if (!/^FR/.test(input.value) && input.value.length ===13 ) {
            msg.textContent = "Le numéro de TVA doit commencer par FR.";
        } 
        else if (!/^\d{11}$/.test(input.value) && /^FR/.test(input.value)) {
            msg.textContent = "Le numéro de TVA doit contenir 11 chiffres.";
        }
    }    
}

function AutreFournisseur() {
    var select = document.getElementById("Fournisseur");
    var input = document.getElementById("Input_Fournisseur");
    if (select.value === "Autre") {
        input.style.display = "inline-block";
    }
    else {
        input.style.display = "none";
    }
}