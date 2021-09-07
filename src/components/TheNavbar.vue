<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/">Pagos Pana</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/" :active="$route.name == 'Home'" class="link">Pagos</b-nav-item>
          <b-nav-item to="/deleted" :active="$route.name == 'Deleted'" class="link">Pagos eliminados</b-nav-item>
          <b-nav-item class="link" @click="$emit('sign-out')">Cerrar sesión</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>


<style scoped>
.navbar-dark .navbar-nav .nav-link {
  color: #f1f1f1;
  font-size: 1.1rem;
  font-weight: 500;
}
.navbar-dark .navbar-nav .nav-link.active {
  color: #ffc107!important;
  font-weight: 600;
}
</style>