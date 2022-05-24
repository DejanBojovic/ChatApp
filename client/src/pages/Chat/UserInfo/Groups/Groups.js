import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import GroupInfo from './GroupInfo/GroupInfo'
import AddGroup from './AddGroup/AddGroup'

import { AiOutlinePlusCircle } from 'react-icons/ai'
import { chatActions } from '../../../../store/chatSlice'
import './Groups.css'

const Groups = ({ onJoinRoom }) => {
  const [isAddingGroup, setIsAddingGroup] = useState(false)
  const loggedUser = useSelector((state) => state.auth.userInfo)
  const chatIsActive = useSelector((state) => state.chat.chatIsActive)
  const groups = useSelector((state) => state.groups.groups)

  const dispatch = useDispatch()

  const availableGroups = []
  groups.forEach((group) => {
    if (group.participants.includes(loggedUser.id)) {
      availableGroups.push(group)
    }
  })

  const startGroupChatHandler = (participants, groupName, groupId) => {
    dispatch(
      chatActions.addChat({ participants: participants, groupName: groupName })
    )

    dispatch(chatActions.setChatIsActive(true))
    onJoinRoom(loggedUser.username, groupId)
  }

  return (
    <div
      className={`availableGroups__container ${
        availableGroups.length === 0 && 'availableGroups__container--fix'
      }`}
    >
      {isAddingGroup ? (
        <AddGroup onGoBack={() => setIsAddingGroup(false)} />
      ) : (
        <div className="availableGroups">
          {availableGroups.map((group) => (
            <GroupInfo
              onStartGroupChat={chatIsActive ? () => {} : startGroupChatHandler}
              key={group.id}
              name={group.name}
              groupId={group.id}
              participants={group.participants}
            />
          ))}
          <AiOutlinePlusCircle
            className="addingGroupBtn"
            onClick={() => setIsAddingGroup(true)}
            size={30}
            color="#658fff"
          />
        </div>
      )}
    </div>
  )
}

export default Groups
