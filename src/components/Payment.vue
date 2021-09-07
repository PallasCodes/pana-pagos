<template>
	<div class="card payment" @click="openPaymentDetails">
    <div class="card-body">
      <span><b>Estudiante:</b> {{payment.student}} - {{payment.semester}}</span>
      <span><b>Cantidad:</b> {{payment.amount}}</span>
      <span><b>Fecha:</b> {{formatDate(payment.createdAt)}}</span>
      <span><b>Registrado por:</b> {{capitalize(payment.user)}}</span>
    </div>
  </div>
</template>


<script>
export default {
	name: "Payment",
	props: ["payment"],
	methods: {
		openPaymentDetails() {
			this.$emit("open", this.payment)
		},
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    formatDate(date) {
      const formatedDate = new Date(date)

      const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
      const year = formatedDate.getFullYear()
      const month = months[formatedDate.getMonth()]
      const day = formatedDate.getDate()
      const hour = formatedDate.getHours()
      const min = formatedDate.getMinutes()

      return `${day}/${month}/${year} a las ${hour}:${min}`
    }
	}
}
</script>


<style scoped>
  .payment {
    cursor: pointer;
    transition: box-shadow ease-in-out 220ms;
  }

  .payment:hover {
    box-shadow: 0 0 16px rgba(0,0,0,0.2)
  }

  .card-body span {
    display: block;
  }
</style>