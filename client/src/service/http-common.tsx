import axios from 'axios'

export const API = axios.create({
  baseURL: 'https://www.creatorly.in/',
  headers: {
    'Content-type': 'application/json',
  },
})
