// Função para carregar o veículo selecionado na página de reserva
document.addEventListener('DOMContentLoaded', function() {
    // Verifica se estamos na página de reserva
    if(window.location.pathname.includes('reserva.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const veiculo = urlParams.get('veiculo');
        
        if(veiculo) {
            document.getElementById('veiculo').value = veiculo;
        }
    }
    
    // Configura o formulário de reserva
    const reservaForm = document.getElementById('reservaForm');
    if(reservaForm) {
        reservaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            const cnh = document.getElementById('cnh').value;
            if(cnh.length < 10) {
                alert('Por favor, insira um número de CNH válido.');
                return;
            }
            
            // Redireciona para a página de confirmação
            window.location.href = 'confirmacao.html';
        });
    }
    
    // Configura a data mínima para retirada (hoje)
    const dataRetirada = document.getElementById('data-retirada');
    if(dataRetirada) {
        const hoje = new Date().toISOString().split('T')[0];
        dataRetirada.min = hoje;
        
        // Atualiza a data mínima de devolução quando a data de retirada muda
        dataRetirada.addEventListener('change', function() {
            document.getElementById('data-devolucao').min = this.value;
        });
    }
});

// Adicione isso ao seu arquivo script.js
document.addEventListener('DOMContentLoaded', function() {
    // Configura a data mínima para retirada (hoje)
    const dataRetirada = document.getElementById('data-retirada');
    if(dataRetirada) {
        const hoje = new Date().toISOString().split('T')[0];
        dataRetirada.min = hoje;
        
        // Atualiza a data mínima de devolução quando a data de retirada muda
        dataRetirada.addEventListener('change', function() {
            document.getElementById('data-devolucao').min = this.value;
        });
    }

    // Verifica se veículo foi pré-selecionado via URL
    const urlParams = new URLSearchParams(window.location.search);
    const veiculoParam = urlParams.get('veiculo');
    
    if(veiculoParam && document.getElementById('veiculo')) {
        const select = document.getElementById('veiculo');
        for(let i = 0; i < select.options.length; i++) {
            if(select.options[i].value === veiculoParam) {
                select.selectedIndex = i;
                break;
            }
        }
    }

    // Validação do formulário
    const reservaForm = document.getElementById('reservaForm');
    if(reservaForm) {
        reservaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação da CNH
            const cnh = document.getElementById('cnh').value;
            if(cnh.length < 10 || !/^\d+$/.test(cnh)) {
                alert('Por favor, insira um número de CNH válido (mínimo 10 dígitos).');
                return;
            }
            
            // Validação das datas
            const retirada = new Date(document.getElementById('data-retirada').value);
            const devolucao = new Date(document.getElementById('data-devolucao').value);
            
            if(devolucao <= retirada) {
                alert('A data de devolução deve ser posterior à data de retirada.');
                return;
            }
            
            // Calcula dias de aluguel
            const dias = Math.ceil((devolucao - retirada) / (1000 * 60 * 60 * 24));
            
            // Redireciona para a página de confirmação com parâmetros
            const veiculo = document.getElementById('veiculo').value;
            window.location.href = `confirmacao.html?veiculo=${encodeURIComponent(veiculo)}&dias=${dias}`;
        });
    }
});