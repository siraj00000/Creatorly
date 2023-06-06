import axios from 'axios'

export const API = axios.create({
  baseURL: 'http://16.16.172.124/',
  headers: {
    'Content-type': 'application/json',
  },
})
