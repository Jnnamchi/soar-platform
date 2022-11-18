import axios from 'axios'

const BASE_URL = 'https://soar-api.omega-r.club'
const TOKEN = localStorage.getItem('sl-t')

const authConfig = {
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
}

export const authAPIInstance = axios.create(authConfig)

const defaultConfig = {
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
}

export const defaultAPIInstance = axios.create(defaultConfig)
