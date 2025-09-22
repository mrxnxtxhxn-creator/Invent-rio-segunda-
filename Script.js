// Lista de IDs válidos
let validIds = [];

// Salvar IDs digitados pelo usuário
function saveIds() {
    const input = document.getElementById('validIds').value;
    validIds = input.split(',').map(id => id.trim()).filter(id => id !== '');
    alert('IDs salvos: ' + validIds.length);
}

// Inicializar scanner quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    startCamera();
});

function startCamera() {
    const scanner = new Html5Qrcode("reader");
    
    scanner.start(
        { facingMode: "environment" }, // Usa a câmera traseira
        {
            fps: 10,
            qrbox: { width: 250, height: 250 }
        },
        (decodedText) => {
            // Código lido com sucesso
            handleScannedCode(decodedText, scanner);
        },
        (errorMessage) => {
            // Erros são ignorados (normal durante a leitura)
        }
    ).catch(err => {
        console.error("Erro ao iniciar câmera:", err);
        alert("Erro ao acessar a câmera. Verifique as permissões.");
    });
}

function handleScannedCode(scannedCode, scanner) {
    // Verificar se o código escaneado está na lista de válidos
    const isValid = validIds.includes(scannedCode);
    
    // Mudar cor do fundo
    document.body.className = isValid ? 'valid' : 'invalid';
    
    // Mostrar resultado
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = isValid ? 
        `✅ ID VÁLIDO: ${scannedCode}` : 
        `❌ ID INVÁLIDO: ${scannedCode}`;
    
    // Parar a câmera temporariamente e reiniciar após 2 segundos
    scanner.stop().then(() => {
        setTimeout(() => {
            startCamera();
        }, 2000);
    }).catch(err => {
        console.error("Erro ao parar câmera:", err);
    });
}
