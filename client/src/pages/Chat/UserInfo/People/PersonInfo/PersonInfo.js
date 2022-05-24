import './PersonInfo.css'
import avatarImg from '../../../../../assets/avatar.svg'

const PersonInfo = ({ username, onStartChat }) => {
  return (
    <div onClick={onStartChat} className="availablePerson">
      <img className="availablePerson__img" src={avatarImg} alt="avatar" />
      <p className="availablePerson__name">{username}</p>
    </div>
  )
}

export default PersonInfo
