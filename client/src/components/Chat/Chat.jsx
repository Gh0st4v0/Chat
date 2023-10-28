/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useRef, useState, useEffect } from "react"

export default function Chat({ socket }) {
    // Cria uma referência para o campo de entrada de mensagem usando useRef.
    const messageRef = useRef()
    // Define um estado para armazenar a lista de mensagens.
    const [messageList, setMessageList] = useState([])

    useEffect(() => {
        // Configura um efeito para ser executado quando o componente é montado.
        // Registra um ouvinte para o evento 'receive_message' do servidor Socket.IO.
        socket.on('receive_message', data => {
            // Atualiza o estado da lista de mensagens adicionando a nova mensagem.
            setMessageList((current) => [...current, data])
        })

        // Retorna uma função de limpeza para remover o ouvinte quando o componente for desmontado.
        return () => socket.off('receive_message')
    }, [socket])

    // Define uma função chamada handleSubmit para ser executada quando o botão de envio é clicado.
    const handleSubmit = () => {
        // Obtém o valor do campo de entrada de mensagem.
        const message = messageRef.current.value
        // Verifica se o campo de mensagem está vazio ou contém apenas espaços em branco e retorna se for o caso.
        if (!message.trim()) return
        // Emite um evento 'message' para o servidor com o conteúdo da mensagem.
        socket.emit('message', message)
        // Limpa o campo de entrada de mensagem.
        clearInput()
    }

    // Define uma função chamada clearInput para limpar o campo de entrada de mensagem.
    const clearInput = () => {
        messageRef.current.value = ''
    }

    // Renderiza um componente React que inclui a lista de mensagens, um campo de entrada e um botão de envio.
    return (
        <div>
            <h1>Chat</h1>
            {
                // Mapeia a lista de mensagens e renderiza cada mensagem com o nome do autor.
                messageList.map((message, index) => (
                    <p key={index}>{message.author}: {message.text}</p>
                ))
            }
            <input type="text" ref={messageRef} placeholder="Mensagem"/>
            <button onClick={() => handleSubmit()}>Enviar</button>
        </div>
    )
}
