import axios from 'axios'

const BASE_URL = 'https://soar-api.omega-r.club'

const defaultConfig = {
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
}

export const apiInstance = axios.create(defaultConfig)
