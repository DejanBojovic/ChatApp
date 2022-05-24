import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { BsFillPeopleFill } from 'react-icons/bs'
import { BsFillPersonPlusFill } from 'react-icons/bs'
import { BiLogOutCircle } from 'react-icons/bi'

import People from './People/People'
import Groups from './Groups/Groups'

import './UserInfo.css'
import userImg from '../../../assets/user.svg'
import { authActions } from '../../../store/authSlice'
import { chatActions } from '../../../store/chatSlice'

const UserInfo = ({ onJoinRoom }) => {
  const [showPeople, setShowPeople] = useState(true)
  const loggedUser = useSelector((state) => state.auth.userInfo)

  const dispatch = useDispatch()

  const showPeopleHandler = () => {
    setShowPeople(true)
  }

  const showGroupHandler = () => {
    setShowPeople(false)
  }

  const logoutHandler = () => {
    dispatch(authActions.logout())
    dispatch(chatActions.clearChat())
  }

  return (
    <div className="userInfoContainer">
      <div className="loggedUser">
        <img className="avatar" src={userImg} alt="avatar" />
        <h3 className="loggedUser__name">{loggedUser.username}</h3>
        <BiLogOutCircle
          onClick={logoutHandler}
          className="logoutBtn"
          size={30}
          color="#ff1430"
        />
      </div>
      <div className="userInfo__actions">
        <div
          className={showPeople ? 'peopleBtn btn--active' : 'peopleBtn'}
          onClick={showPeopleHandler}
        >
          <BsFillPersonPlusFill color="#000" size={30} />
        </div>
        <div
          className={!showPeople ? 'groupBtn btn--active' : 'groupBtn'}
          onClick={showGroupHandler}
        >
          <BsFillPeopleFill color="#000" size={30} />
        </div>
      </div>
      {showPeople ? (
        <People onJoinRoom={onJoinRoom} />
      ) : (
        <Groups onJoinRoom={onJoinRoom} />
      )}
    </div>
  )
}

export default UserInfo
