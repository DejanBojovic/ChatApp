import { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { MdOutlineGroups } from 'react-icons/md'
import { FiArrowLeftCircle } from 'react-icons/fi'
import './AddGroup.css'

import { groupsActions } from '../../../../../store/groupsSlice'
import AddedUser from './AddedUser/AddedUser'

import sendData from '../../../../../util/sendData'
import fetchData from '../../../../../util/fetchData'

const AddGroup = ({ onGoBack }) => {
  const users = useSelector((state) => state.users.users)
  const [addedUsers, setAddedUsers] = useState([])
  const dispatch = useDispatch()

  const groupInputRef = useRef()

  const updateAddedUsersHandler = (id) => {
    if (addedUsers.includes(id)) {
      setAddedUsers((prevState) => prevState.filter((el) => el !== id))
    } else {
      setAddedUsers((prevState) => [...prevState, id])
    }
  }

  const formSubmitHandler = async () => {
    if (!groupInputRef.current.value || addedUsers.length === 0) {
      return
    }

    await sendData('groups', {
      name: groupInputRef.current.value,
      participants: addedUsers,
    })

    const groups = await fetchData('groups')

    const groupsData = []
    for (let key in groups) {
      groupsData.push({
        id: key,
        participants: groups[key].participants,
        name: groups[key].name,
      })
    }

    dispatch(groupsActions.addGroups(groupsData))

    groupInputRef.current.value = ''
    onGoBack()
  }

  return (
    <div className="addGroup__container">
      <FiArrowLeftCircle
        className="goBackBtn"
        onClick={onGoBack}
        size={30}
        color="#658fff"
      />
      <div className="addedUsers__container">
        {users.map((user) => (
          <AddedUser
            onAddUser={updateAddedUsersHandler}
            key={user.id}
            id={user.id}
            username={user.username}
          />
        ))}
      </div>
      <form className="addGroupForm">
        <input
          ref={groupInputRef}
          placeholder="Enter group title"
          className="addGroupInput"
          type="text"
        />
        <div className="addGroupBtn" onClick={formSubmitHandler}>
          <MdOutlineGroups size={25} color="#fff" />
        </div>
      </form>
    </div>
  )
}

export default AddGroup
