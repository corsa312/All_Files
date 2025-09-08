const cliente = {
    nome: "Robson",
    idade: 29,
    cpf: "05086678086",
    email: "robinho@polo.com.br",
  };

  const cliente2 = {
    nome: "Anthonny",
    idade: 18,
    cpf: "566877636021",
    email: "anthonny@polo.com.br"
  }

  const cliente3 = {
    nome: "Kawan",
    idade: 60,
    cpf: "7155466963213",
    email: "Kawan@polo.com.br"
  }

  const cliente4 = {
    nome: "Corsa",
    idade: 25,
    cpf: "974512003656",
    email: "Corsa@polo.com.br"
  }
 
  const chaves = ["nome", "idade", "cpf", "email"];
  chaves.forEach((chave) => {
    console.log(`O campo ${chave} tem valor ${cliente[chave]}`);
  });

  chaves.forEach((chave) => {
    console.log(`O campo ${chave} tem valor ${cliente2[chave]}`);
  });

  chaves.forEach((chave) => {
    console.log(`O campo ${chave} tem valor ${cliente3[chave]}`);
  });
  
  chaves.forEach((chave) => {
    console.log(`O campo ${chave} tem valor ${cliente4[chave]}`);
  });

