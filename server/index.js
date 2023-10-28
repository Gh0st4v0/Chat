// Importa a biblioteca Express e a cria como um aplicativo Express.
const app = require('express')()

// Cria um servidor HTTP usando o aplicativo Express.
const server = require('http').createServer(app)

// Importa a biblioteca Socket.IO e a associa ao servidor HTTP criado acima.
// Também define uma política de CORS permitindo apenas origens de 'http://localhost:5173'.
const io = require('socket.io')(server, {cors: {origin: 'http://localhost:5173'}})

// Define a porta na qual o servidor irá escutar.
const PORT = 3001

// Configura o evento 'connection' para o servidor Socket.IO.
// Este evento é disparado quando um cliente se conecta ao servidor.
io.on('connection', socket => {
    // Quando um cliente se conecta, imprime uma mensagem com o ID do socket do cliente.
    console.log('Usuario conectado!', socket.id)

    // Configura um evento 'disconnect' para o socket.
    // Este evento é disparado quando um cliente se desconecta.
    socket.on('disconnect', reason => {
        // Quando um cliente se desconecta, imprime uma mensagem com o ID do socket do cliente.
        console.log('Usuário desconectado', socket.id)
    })

    // Configura um evento 'set_username' para o socket.
    // Este evento é usado para definir um nome de usuário para o cliente.
    socket.on('set_username', username => {
        // Define o nome de usuário no objeto 'data' do socket.
        socket.data.username = username
        // Imprime o nome de usuário no console.
        console.log(socket.data.username)
    })

    // Configura um evento 'message' para o socket.
    // Este evento é usado para enviar mensagens do cliente para o servidor.
    socket.on('message', text => {
        // Emite uma mensagem para todos os clientes conectados, incluindo o próprio remetente.
        io.emit('receive_message', {
            text,
            authorId: socket.id,
            author: socket.data.username
        })
    })
})

// Inicia o servidor na porta especificada e imprime uma mensagem no console quando estiver em execução.
server.listen(PORT, () => console.log('Server running...'))
