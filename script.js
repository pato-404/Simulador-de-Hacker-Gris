document.addEventListener('DOMContentLoaded', () => {
    const commandInput = document.getElementById('commandInput');
    const output = document.getElementById('output');

    // Función para simular la escritura de un comando
    const simulateTyping = (text, callback) => {
        let index = 0;
        const typingInterval = setInterval(() => {
            output.innerHTML += text.charAt(index);
            index++;
            if (index === text.length) {
                clearInterval(typingInterval);
                if (callback) callback();
            }
        }, 100);
    };

    // Función para manejar los comandos
    const handleCommand = (command) => {
        const cleanCommand = command.trim().toLowerCase();

        if (cleanCommand === 'login') {
            output.innerHTML += `<div class="command-output">Autenticación exitosa.</div>`;
        } else if (cleanCommand === 'netstat') {
            simulateTyping('Conexiones activas: 192.168.1.1, 192.168.1.2, 192.168.1.3...', () => {
                output.innerHTML += `<div class="command-output">Listando conexiones activas...</div>`;
            });
        } else if (cleanCommand === 'ping 192.168.1.1') {
            simulateTyping('Pinging 192.168.1.1...', () => {
                output.innerHTML += `<div class="command-output">Respuesta de 192.168.1.1: bytes=32 tiempo=12ms TTL=64</div>`;
            });
        } else if (cleanCommand === 'shutdown') {
            output.innerHTML += `<div class="command-error">Error: No tienes permisos para apagar este sistema.</div>`;
        } else if (cleanCommand === 'clear') {
            output.innerHTML = '';
        } else {
            output.innerHTML += `<div class="command-error">Comando no reconocido: ${command}</div>`;
        }

        // Desplazar el terminal hacia abajo
        output.scrollTop = output.scrollHeight;
    };

    // Evento para capturar el comando al presionar Enter
    commandInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const command = commandInput.value;
            if (command) {
                output.innerHTML += `<div class="command-execute">> ${command}</div>`;
                handleCommand(command);
                commandInput.value = ''; // Limpiar campo de entrada
            }
        }
    });

    // Iniciar con un mensaje de bienvenida
    simulateTyping('Bienvenido al simulador de Hacker Gris. Escribe "login" para comenzar...', () => {
        commandInput.focus();
    });
});
