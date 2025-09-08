function somar() {

     const num1 = parseFloat(document.getElementById("numero1").value);
     const num2 = parseFloat(document.getElementById("numero2").value);
     const soma = num1 + num2;
     document.getElementById("resultado").textContent = "A soma é de: " + soma;
}

function somar1() {

    const num1 = parseFloat(document.getElementById("numero1").value);
    const num2 = parseFloat(document.getElementById("numero2").value);
    const soma = num1 - num2;
    document.getElementById("resultado").textContent = "A soma é de: " + soma;
}

function somar2() {

    const num1 = parseFloat(document.getElementById("numero1").value);
    const num2 = parseFloat(document.getElementById("numero2").value);
    const soma = num1 / num2;
    document.getElementById("resultado").textContent = "A soma é de: " + soma;
}

function somar3() {

    const num1 = parseFloat(document.getElementById("numero1").value);
    const num2 = parseFloat(document.getElementById("numero2").value);
    const soma = num1 * num2;
    document.getElementById("resultado").textContent = "A soma é de: " + soma;
}