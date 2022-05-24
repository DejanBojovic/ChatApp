import { useState } from 'react'

import avatarImg from '../../../../../../assets/avatar.svg'
import './AddedUser.css'

const AddedUser = ({ id, username, onAddUser }) => {
  const [isAdded, setIsAdded] = useState({
    added: false,
    id: id,
  })

  const toggleUserHandler = () => {
    setIsAdded((prevState) => {
      const added = !prevState.added
      const id = prevState.id

      return { added, id }
    })

    onAddUser(isAdded.id)
  }

  return (
    <div
      onClick={toggleUserHandler}
      className={`addedUser ${isAdded.added && 'addedUser--added'}`}
    >
      <img className="addedUser__img" src={avatarImg} alt="avatar" />
      <p className="addedUser__name">{username}</p>
    </div>
  )
}

export default AddedUser
