import { useState } from 'react'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'

import './Chat.css'
import UserInfo from './UserInfo/UserInfo'
import ChatInfo from './ChatInfo/ChatInfo'

const Chat = () => {
  const [connection, setConnection] = useState()
  const [messages, setMessages] = useState([])

  const joinRoomHandler = async (user, room) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl('https://localhost:44374/chat')
        .configureLogging(LogLevel.Information)
        .build()

      connection.on('ReceiveMessage', (user, message, time) => {
        setMessages((prevState) => [...prevState, { user, message, time }])
      })

      connection.onclose((e) => {
        setConnection()
        setMessages([])
      })

      await connection.start()

      await connection.invoke('JoinRoom', { user, room })
      setConnection(connection)
    } catch (error) {
      console.log(error)
    }
  }

  const sendMessageHandler = async (message) => {
    try {
      const time = timeFormating()

      await connection.invoke('SendMessage', message, time)
    } catch (error) {
      console.log(error)
    }
  }

  const closeConnectionHandler = async () => {
    try {
      await connection.stop()
    } catch (error) {
      console.log(error)
    }
  }

  const timeFormating = () => {
    const today = new Date()
    let hours = today.getHours().toString()
    let minutes = today.getMinutes().toString()

    if (hours.length === 1) {
      hours = '0' + hours
    }

    if (minutes.length === 1) {
      minutes = '0' + minutes
    }

    return hours + ':' + minutes
  }

  return (
    <div className="chatContainer">
      <UserInfo
        onJoinRoom={joinRoomHandler}
        onSendMessage={sendMessageHandler}
      />
      <ChatInfo
        messages={messages}
        onSendMessage={sendMessageHandler}
        onCloseConnection={closeConnectionHandler}
      />
    </div>
  )
}

export default Chat
