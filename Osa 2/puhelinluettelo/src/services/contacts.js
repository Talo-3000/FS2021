import axios from 'axios'
const baseUrl = '/api/persons'
axios.defaults.headers.post['Content-Type'] = 'application/json'
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
    return response.data
  })
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteContact = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request
}

export default { getAll, create, update, deleteContact }