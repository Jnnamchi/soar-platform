import axios from 'axios'

const BASE_URL = 'https://soar-api.omega-r.club'

const loginConfig = {
  baseUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
}

export const LoginAPIInstance = axios.create(loginConfig)

const defaultConfig = {
  baseUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
}

export const DefaultAPIInstance = axios.create(defaultConfig)
