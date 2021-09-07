<template>
  <div class="deleted">
    <PaymentsList url="/payments/deleted" mode="deleted" />
  </div>
</template>

<script>
import PaymentsList from '@/components/PaymentsList.vue'

export default {
  name: "Deleted",
  components: {
    PaymentsList
  }, 
}
</script>
