import './Message.css'
import { BsClock } from 'react-icons/bs'

const Message = ({ message, time }) => {
  return (
    <div className="messageContainer">
      <p className="message">
        {message}
        <span className="time">
          {time}
          <BsClock className="clock" color="#fff" size={14} />
        </span>
      </p>
    </div>
  )
}

export default Message
