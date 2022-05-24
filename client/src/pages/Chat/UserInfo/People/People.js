import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { chatActions } from '../../../../store/chatSlice'

import './People.css'
import sendData from '../../../../util/sendData'
import fetchData from '../../../../util/fetchData'

import PersonInfo from './PersonInfo/PersonInfo'

const People = ({ onJoinRoom }) => {
  const users = useSelector((state) => state.users.users)
  const loggedUser = useSelector((state) => state.auth.userInfo)
  const chatIsActive = useSelector((state) => state.chat.chatIsActive)
  const [roomId, setRoomId] = useState('')

  const dispatch = useDispatch()

  const filteredUsers = users.filter((user) => user.email !== loggedUser.email)

  const startChatHandler = async (loggedUser, regularUser) => {
    // lock the user from starting another chat
    dispatch(chatActions.setChatIsActive(true))

    const data = await fetchData('chats')

    const currentChats = []
    for (let key in data) {
      currentChats.push({
        participants: data[key].participants,
        id: key,
      })
    }

    let isNewChat = false

    for (let i = 0; i < currentChats.length; i++) {
      const chat = currentChats[i]

      if (
        (chat.participants[0].id === loggedUser.id ||
          chat.participants[0].id === regularUser.id) &&
        (chat.participants[1].id === loggedUser.id ||
          chat.participants[1].id === regularUser.id)
      ) {
        dispatch(
          chatActions.addChat({
            participants: [loggedUser, regularUser],
            roomId: chat.id,
          })
        )

        onJoinRoom(loggedUser.username, chat.id)
        onJoinRoom(regularUser.username, chat.id)

        setRoomId(chat.id)

        isNewChat = false
        break
      } else {
        isNewChat = true
        setRoomId(chat.id)
      }
    }

    if (isNewChat) {
      dispatch(
        chatActions.addChat({
          participants: [loggedUser, regularUser],
          roomId: roomId,
        })
      )
      updateChatInfo(loggedUser, regularUser)
    }
  }

  const updateChatInfo = async (loggedUser, regularUser) => {
    // create new room in firebase
    await sendData('chats', { participants: [loggedUser, regularUser] })
  }

  return (
    <div className="availablePeople">
      {filteredUsers.map((user) => (
        <PersonInfo
          onStartChat={
            chatIsActive ? () => {} : () => startChatHandler(loggedUser, user)
          }
          key={user.id}
          username={user.username}
        />
      ))}
    </div>
  )
}

export default People
