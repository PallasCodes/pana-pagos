<template>
	<div class="addPaymentForm">
		<strong class="mb-3 d-block text-primary">Solo los campos marcados con * son obligatorios</strong>
		 <b-form @submit.stop.prevent="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="group-student"
        label="*Nombre completo del estudiante:"
        label-for="student"
      >
        <b-form-input
        	id="student"
          v-model="form.student"
          type="text"
          :state="validateState('student')"
          aria-describedby="student-feedback"
        ></b-form-input>

        <b-form-invalid-feedback
          id="student-feedback"
        >Campo requerido.</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="group-amount"
      	label="*Cantidad:"
      	label-for="amount">
        <b-form-input
          id="amount"
          v-model="form.amount"
          type="number"
          :state="validateState('amount')"
          aria-describedby="amount-feedback"
        ></b-form-input>

         <b-form-invalid-feedback
          id="amount-feedback"
        >Campo requerido.</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="group-semester" 
      label="*Semestre:" 
      label-for="semester">
        <b-form-select
          id="semester"
          v-model="form.semester"
          :state="validateState('semester')"
          :options="semesters"
           aria-describedby="semester-feedback"
        ></b-form-select>

        <b-form-invalid-feedback
          id="semester-feedback"
        >Campo requerido.</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="group-concept"
        label="Concepto:"
        label-for="concept"
      >
        <b-form-input
        	id="concept"
          v-model="form.concept"
          type="text"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="group-month"
        label="Mes que cubre:"
        label-for="month"
      >
        <b-form-input
        	id="month"
          v-model="form.month"
          type="text"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="group-limitDate" 
        label="Fecha límite:"
        label-for="limitDate"
      >
        <b-form-input
        	id="limitDate"
          v-model="form.limitDate"
          type="date"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="group-comment" 
        label="Comentario extra:"
        label-for="comment"
      >
		    <b-form-textarea class="mb-4"
		    id="comment"
		    v-model="form.comment"
		    rows="3"
		  	></b-form-textarea>
    	</b-form-group>

      <b-button variant="outline-primary" class="mr-2">Cancelar</b-button>
      <b-button type="submit" variant="primary">
      	<span v-if="isLoading" class="d-flex justify-content-center align-items-center">
      		<b-spinner small></b-spinner>
      		<span class="ml-1">Registrando</span>
      	</span>
      	<span v-if="!isLoading">Registrar</span>
    	</b-button>
    </b-form>
	</div>
</template>



<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import axios from 'axios'

export default {
	mixins: [validationMixin],
	validations: {
		form: {
			student: {
				required
			},
			amount: {
				required
			},
			semester: {
				required
			}
		}
	},
  data() {
    return {
      form: {
        student: '',
        amount: null,
        semester: null,
        concept: '',
        month: '',
        limitDate: '',
        comment: ''
      },
      semesters: [{ text: 'Seleccionar', value: null },
      	'1er', '2do', '3er', '4to', '5to', '6to'],
      show: true,
      loading: false
    }
  },
  computed: {
  	isLoading() {
  		return this.loading
  	}
  },
  methods: {
  	validateState(name) {
  		const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
  	},	
    onSubmit() {
    	this.$v.form.$touch();

    	if (!this.$v.form.$anyError) {
	    	this.loading = true
	      axios
	      	.post('/payments', this.form)
	      	.then(result => {
	      		this.$emit('sucess-payment', 'Pago registrado con éxito.', result.data.payment)
	      		this.loading = false
	      	})
	      	.catch(error => {
	      		this.$emit('error-payment', 'Error al registrar pago. Inténtelo más tarde.')
	      		this.loading = false
	      	})
      }
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
    },
  }
}
</script>