import axios from 'axios'

const BASE_URL = 'https://soar-api.omega-r.club'

const authConfig = {
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
}

export const authAPIInstance = axios.create(authConfig)
