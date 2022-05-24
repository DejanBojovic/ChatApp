import axios from 'axios'

const fetchData = async (resource) => {
  const res = await axios.get(
    `https://chat-app-6ceb1-default-rtdb.firebaseio.com/${resource}.json`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  return res.data
}

export default fetchData
