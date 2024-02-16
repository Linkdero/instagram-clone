import store from '@/store'
import axios from 'axios'
export default axios.create({
    baseURL: 'http://localhost:4000/api',
    timeout: 1000,
    headers: {
        "Authorization": store.getters.token
    }
})