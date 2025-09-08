document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('loginMessage');
    
    // Credenciais válidas: Admin / 123@4
    if(username === 'Admin' && password === '123@4') {
        message.textContent = 'Login realizado com sucesso!';
        message.style.color = '#4CAF50';
        
        // Redirecionar para a página admin após 1 segundo
        setTimeout(() => {
            window.location.href = 'admin.html';
        }, 1000);
    } else {
        message.textContent = 'Usuário ou senha incorretos!';
        message.style.color = '#d9534f';
    }
});