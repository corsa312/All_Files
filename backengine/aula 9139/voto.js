var idade = 67; // Declara uma variável chamada 'idade' e atribui o valor 67

console.log(`Você tem ${idade} anos.`); // Exibe a idade no console

if (idade < 16) { // Verifica se a idade é menor que 16
    console.log("Não vota."); // Se for menor que 16, exibe "Não vota."
} 

else if (idade < 18 || idade > 65) { // Caso contrário, verifica se a idade está entre 16 e 17 ou maior que 65
    console.log("Voto opcional."); // Se a idade estiver nessa faixa, exibe "Voto opcional."
}

else { // Se nenhuma das condições anteriores for atendida, significa que a idade está entre 18 e 65  
    console.log("Voto obrigatório."); // Como o voto é obrigatório nessa faixa etária, exibe "Voto obrigatório."
}
