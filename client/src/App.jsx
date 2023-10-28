import { useState } from 'react'
import './App.css'
import Join from './components/Join/Join'
import Chat from './components/Chat/Chat'

function App() {
  // Define estados para controlar a visibilidade do chat e o objeto de socket.
  const [chatVisibility, setChatVisibility] = useState(false)
  const [socket, setSocket] = useState(null)
  
  return (
    <div className='App'>
      {
        // Renderiza o componente Join se chatVisibility for falso (não visível).
        // Passa as funções setSocket e setChatVisibility como props para o componente Join.
        !chatVisibility ? <Join setSocket={setSocket} setChatVisibility={setChatVisibility} /> :
        // Renderiza o componente Chat se chatVisibility for verdadeiro (visível).
        // Passa o objeto socket como prop para o componente Chat.
        <Chat socket={socket} />
      }      
    </div>
  )
}

export default App
