import axios from 'axios'

const state = () => {
 isLoggedIn: false
 token: ''
 role: ''
 name: ''
}

const getters = {
	isLoggedIn: (state) => {
		return state.isLoggedIn
	}
}

const mutations = {
	setToken: (state, token) => {
		state.token = token
		state.isLoggedIn = true
	},
	setRole: (state, role) => {
		state.role = role
	},
	setName: (state, name) => {
		state.name = name
	},
	autoLogin: (state) => {
		const token = localStorage.getItem('token')

		if(token) {
	    state.token = token
	    state.isLoggedIn = true
	    axios.defaults.headers.common["Authorization"] = "Bearer " + token
	  } else {
	    state.token = ''
	    state.isLoggedIn = false
	    axios.defaults.headers.common["Authorization"] = ""
	  }
},
}

const actions = {}

export default {
    state,
    getters,
    actions,
    mutations
}