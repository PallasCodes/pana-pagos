<template>
	<div id="login" class="row justify-content-center">
		<div class="col-lg-4">
			<h2 class="mb-4 mt-2 text-center">Iniciar sesión</h2>

			<b-form @submit.stop.prevent="onSubmit" @reset="onReset">
      <b-form-group
        id="name-group"
        label="Nombre de usuario:"
        label-for="name"
      >
        <b-form-input
          id="name"
          v-model="form.name"
          type="text"
        ></b-form-input>
      </b-form-group>

      <b-form-group 
      id="password-group" 
      label="Contraseña:" 
      label-for="password">
        <b-form-input
          id="password"
          v-model="form.password"
          type="password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" class="w-100 mt-1">Iniciar sesión</b-button>
    </b-form>
		</div>
	</div>
</template>


<script>
import axios from 'axios'

export default {
  data() {
    return {
      form: {
        name: '',
        password: ''
      },
    }
  },
  methods: {
    onSubmit() {
      axios
      	.post('/auth/login', this.form)
      	.then(result => {
      		axios.defaults.headers.common["Authorization"] = "Bearer " + result.data.token
      		localStorage.setItem('token', result.data.token)
      		localStorage.setItem('role', result.data.role)
      		localStorage.setItem('name', result.data.name)
      		this.$router.push('/')
      	})
      	.catch(error => console.error(error))
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.food = null
      this.form.checked = []
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
