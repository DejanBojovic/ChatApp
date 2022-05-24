import './GroupInfo.css'
import groupImg from '../../../../../assets/group.svg'

const GroupInfo = ({ name, participants, onStartGroupChat, groupId }) => {
  const startGroupChatHandler = () => {
    onStartGroupChat(participants, name, groupId)
  }

  return (
    <div onClick={startGroupChatHandler} className="availableGroup">
      <img className="availableGroup__img" src={groupImg} alt="group" />
      <p className="availableGroup__name">{name}</p>
    </div>
  )
}

export default GroupInfo
