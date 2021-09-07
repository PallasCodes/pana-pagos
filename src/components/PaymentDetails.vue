<template>
	<div class="payment-details">
		<span><b>Estudiante:</b> {{payment.student}} - {{payment.semester}}</span>
	  <span><b>Cantidad:</b> {{payment.amount}}</span>
	  <span><b>Fecha:</b> {{formatDate(payment.createdAt)}}</span>
	  <span><b>Registrado por:</b> {{payment.user}}</span>
	  <span><b>Concepto:</b> {{payment.concept}}</span>
    <span><b>Fecha límite:</b> {{formatDate(payment.limitDate)}}</span>
    <span><b>Mes que cubre:</b> {{payment.month}}</span>
    <span><b>Comentario extra:</b></span>
    <span>{{payment.comment}}</span>
   	<div class="mt-3">
   		<b-button variant="danger" type="button" class="mr-2" @click="deletePayment"
   			v-if="mode === 'normal'">
   			Eliminar
   		</b-button>
   		<b-button variant="danger" type="button" class="mr-2" @click="destroyPayment"
   			v-if="mode === 'deleted' && role === 'admin'">
   			Eliminar
   		</b-button>
   		<b-button variant="primary" type="button" @click="$emit('close')">Cerrar ventana</b-button>
   	</div>	
	</div>
</template>


<script>
import axios from 'axios'

export default {
	name: "PaymentDetails",
	props: ["payment", "mode"],
	data() {
		return {
			role: ''
		}
	},
	methods: {
		deletePayment() {
			axios.put('/payments/' + this.payment._id)
				.then(result => { 
					this.$emit('success-delete', 'Pago eliminado con éxito.', this.payment._id)
				})
				.catch(error => { 
					this.$emit('error-delete', 'Error al eliminar pago. Inténtelo más tarde')
				})
		},
		destroyPayment() {
			axios.delete('/payments/' + this.payment._id)
				.then(result => { 
					this.$emit('success-delete', 'Pago eliminado con éxito.', this.payment._id)
				})
				.catch(error => { 
					this.$emit('error-delete', 'Error al eliminar pago. Inténtelo más tarde')
				})
		},
		formatDate(date) {
			if(!date){
				return ''
			}
      const formatedDate = new Date(date)

      const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
      const year = formatedDate.getFullYear()
      const month = months[formatedDate.getMonth()]
      const day = formatedDate.getDate()
      const hour = formatedDate.getHours()
      const min = formatedDate.getMinutes()

      return `${day}/${month}/${year} a las ${hour}:${min}`
    }
	},
	mounted() {
		this.role = localStorage.getItem('role')
	}
}
</script>



<style scoped>
	span {
		display: block;
	}
</style>