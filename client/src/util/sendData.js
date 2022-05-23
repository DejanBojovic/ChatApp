import axios from 'axios'

const sendData = async (resource, data) => {
  await axios.post(
    `https://chat-app-fc5a9-default-rtdb.firebaseio.com/${resource}.json`,
    data
  )
}

export default sendData
