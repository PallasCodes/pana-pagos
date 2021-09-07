<template>
  <div class="payments-list">
    <!-- Toasts -->
    <b-toast id="error" solid variant="danger" append-toast>
      <b>{{getErrorMessage}}</b>
    </b-toast>

    <b-toast id="success" solid variant="success" append-toast>
      <b>{{getSuccessMessage}}</b>
    </b-toast>

    <!-- Modal Payment Details-->
    <b-modal id="payDetailsModal" hide-footer title="Detalles de pago">
     <PaymentDetails 
     	:mode="mode"
     	:payment="selectedPayment"
     	@success-delete="paymentDeleted" 
     	@error-delete="paymentError"
     	@close="$bvModal.hide('payDetailsModal')" />
    </b-modal>

    <!-- Modal Add Payment -->
    <b-modal id="addPaymentModal" hide-footer title="Registrar nuevo pago">
      <AddPaymentForm key="1" 
        @sucess-payment="sucessToast" 
        @error-payment="errorToast" />
    </b-modal>

    <div class="row justify-content-center">
      <div class="col-lg-6">
        <b-button v-b-modal.addPaymentModal class="mb-1" variant="primary" v-if="!isLoading && mode === 'normal'">Registrar pago</b-button>
        <b-spinner style="width: 4rem; height: 4rem;" label="Large Spinner" 
        v-if="isLoading" class="mx-auto d-block mt-4"></b-spinner>
        <Payment v-for="payment in getPayments" :key="payment._id" 
        :payment="payment" 
        class="my-2"
        @open="openModal"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Payment from '@/components/Payment.vue'
import AddPaymentForm from '@/components/AddPaymentForm.vue'
import PaymentDetails from '@/components/PaymentDetails.vue'

export default {
  name: "PaymentsList",
  props: ['mode', 'url'],
  components: {
    Payment,
    AddPaymentForm,
    PaymentDetails,
  },
  data() {
  	return {
  		payments: [],
      loading: true,
      selectedPayment: null,
      successMessage: '',
      errorMessage: '',
  	}
  },
  computed: {
    isLoading() {
      return this.loading
    },
    getSuccessMessage() {
      return this.successMessage
    },
    getErrorMessage() {
      return this.errorMessage
    },
    getPayments() {
      return this.payments
    }
  },
  methods: {
    openModal(payment) {
      this.$bvModal.show('payDetailsModal')
      this.selectedPayment = payment
    },
    sucessToast(message, payment) {
      this.successMessage = message
      this.payments.unshift(payment)
      this.$bvModal.hide('addPaymentModal')
      this.$bvToast.show('success')
    },
    errorToast(message) {
      this.errorMessage = message
      this.$bvModal.hide('addPaymentModal')
      this.$bvToast.show('error')
    },
    paymentDeleted(message, paymentId) {
      console.log(paymentId)
      this.successMessage = message
      this.payments = this.payments.filter(payment => payment._id !== paymentId)
      this.$bvModal.hide('payDetailsModal')
      this.$bvToast.show('success')
    },
    paymentError(message) {
      this.errorMessage = message
      this.$bvModal.hide('payDetailsModal')
      this.$bvToast.show('error')
    }
  },
  mounted() {
    axios
  		.get(this.url)
  		.then(respose => {
        this.payments = respose.data
        this.loading = false
      })
      .catch(error => console.error(error))
  }
};
</script>
