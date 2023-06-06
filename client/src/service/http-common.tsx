import axios from 'axios'

export const API = axios.create({
  baseURL: 'http://16.171.68.194/',
  headers: {
    'Content-type': 'application/json',
  },
})
