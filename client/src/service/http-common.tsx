import axios from 'axios'

export const API = axios.create({
  baseURL: 'http://localhost:8008/',
  headers: {
    'Content-type': 'application/json',
  },
})
