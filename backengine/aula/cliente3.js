const cliente = {
    nome: "Robson",
    idade: 29,
    cpf: "05086678086",
    email: "robinho@polo.com.br",
  };

  const cliente2 = {
    nome: "Nãosei",
    idade: 50,
    cpf: "12345678998",
    email: "vaisaber@polo.com.br"
  }

  const tabela = ["nome", "idade", "cpf", "email"];
  tabela.forEach((tabela) => {
    console.log(`O campo ${tabela} tem valor ${cliente2[tabela]}`);
  });

  tabela.forEach((tabela) => {
    console.log(`O campo ${tabela} tem valor ${cliente2[tabela]}`);
  });