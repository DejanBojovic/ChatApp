import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './ChatInfo.css'
import Message from '../../../components/Message/Message'
import { chatActions } from '../../../store/chatSlice'
import { IoMdSend } from 'react-icons/io'

const ChatInfo = ({ messages, onSendMessage, onCloseConnection }) => {
  const chatParticipants = useSelector((state) => state.chat.participants)
  const groupName = useSelector((state) => state.chat.groupName)

  const messageInputRef = useRef()

  if (!groupName) {
    messages = messages.filter((msg, index) => index % 2 !== 0)
  }

  const dispatch = useDispatch()

  const leaveChatHandler = () => {
    dispatch(chatActions.setChatIsActive(false))
    dispatch(chatActions.clearChat())

    onCloseConnection()
  }

  const messageFormHandler = (event) => {
    event.preventDefault()

    if (messageInputRef.current.value) {
      onSendMessage(messageInputRef.current.value)
      messageInputRef.current.value = ''
    }
  }

  return (
    <div className="chatInfoContainer">
      <div className="participants">
        <p className="participants__title">
          <span>
            {groupName ? 'Group:' : 'Participants:'}
            {groupName ? (
              <span className="participant">{groupName}</span>
            ) : (
              chatParticipants.map((p, index) => (
                <span className="participant" key={index}>
                  {p.username}
                </span>
              ))
            )}
          </span>
          {chatParticipants.length !== 0 && (
            <span onClick={leaveChatHandler} className="leaveBtn">
              Leave
            </span>
          )}
        </p>
      </div>
      <div className="messages">
        {messages.map((msg, index) => (
          <Message key={index} message={msg.message} time={msg.time} />
        ))}
      </div>
      <form className="formMessage">
        <input
          ref={messageInputRef}
          placeholder="Type your message..."
          type="text"
          className="formMessage__input"
        />
        <button
          type="submit"
          onClick={messageFormHandler}
          className="formMessage__send"
        >
          <IoMdSend className="formMessage__icon" color="#000" size={30} />
        </button>
      </form>
    </div>
  )
}

export default ChatInfo
