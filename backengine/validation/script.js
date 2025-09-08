// Função chamada 'validarLogin', que será executada quando o usuário tentar fazer login
function validarLogin() {
    // Pega o valor digitado no input com id "usuario" e armazena na constante 'user'
    const user = document.getElementById("usuario").value;
  
    // Pega o valor digitado no input com id "senha" e armazena na constante 'pass'
    const pass = document.getElementById("senha").value;
  
    // Obtém a referência ao elemento com id "mensagem" (onde será exibido o resultado do login)
    const msg = document.getElementById("mensagem");
  
    // Verifica se o nome de usuário e a senha estão corretos
    if (user === "admin" && pass === "123@456") {
      // Se estiverem corretos, altera a cor da mensagem para verde
      msg.style.color = "green";
  
      // Define o texto da mensagem como "Login bem-sucedido!"
      msg.textContent = "Login bem-sucedido!";
  
      // (Opcional) Redireciona para outra página, caso seja necessario
      // window.location.href = "painel.html";
    } else {
      // Se o usuário ou senha estiverem incorretos, altera a cor da mensagem para vermelho
      msg.style.color = "red";

      // Define o texto da mensagem como "Usuário ou senha incorretos."
      msg.textContent = "Usuário ou senha incorretos.";
    }
  }
  