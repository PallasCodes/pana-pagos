<template>
  <div class="home">
    <PaymentsList url="/payments" mode="normal" />
  </div>
</template>

<script>
import PaymentsList from '@/components/PaymentsList.vue'

export default {
  name: "Home",
  components: {
    PaymentsList
  }, 
}
</script>
