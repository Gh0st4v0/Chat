// eslint-disable-next-line no-unused-vars
import React, { useRef } from "react"
import io from 'socket.io-client'

// eslint-disable-next-line react/prop-types
export default function Join({ setChatVisibility, setSocket }) {
    // Cria uma referência para o campo de entrada de nome de usuário usando useRef.
    const usernameRef = useRef()

    // Define uma função assíncrona chamada handleSubmit para ser executada quando o botão for clicado.
    const handleSubmit = async () => {
        // Obtém o valor do campo de entrada de nome de usuário usando a referência.
        const username = usernameRef.current.value
        // Verifica se o campo de entrada está vazio ou contém apenas espaços em branco e retorna se for o caso.
        if (!username.trim()) return
        // Conecta-se a um servidor Socket.IO em 'http://localhost:3001'.
        const socket = await io.connect('http://localhost:3001')
        // Emite um evento 'set_username' para o servidor com o nome de usuário.
        socket.emit('set_username', username)
        // Chama as funções setSocket e setChatVisibility passadas como argumentos.
        setSocket(socket)
        setChatVisibility(true)
    }

    // Renderiza um componente React que inclui um campo de entrada e um botão.
    return (
        <div>
            <h1>Join</h1>
            <input type="text" ref={usernameRef} placeholder="Nome de usuário" />
            <button onClick={() => handleSubmit()}>Entrar</button>
        </div>
    )
}
