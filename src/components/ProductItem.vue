<template>
    <div class="column is-3">
    <div class="box">
        <figure class="image mb-4">
        <img v-bind:src="product.get_miniatura" v-bind:alt="product.nombre">
        </figure>

        <h3 class="is-size-4">{{ product.nombre }}</h3>
        <p class="is-size-6 has-text-grey">${{ product.precio }} MXN</p>

        <p class="is-size-6 has-text-danger-light" v-if="product.stock === 0">-Sin Existencias-</p>
        <p class="is-size-6 has-text-grey" v-else>Existencias: {{ product.stock }}</p>
        
        <router-link v-bind:to="product.get_absolute_url" class="button is-dark mt-4">Detalles</router-link>
    </div>
    </div>
</template>

<script>
export default {
    name: 'ProductItem',
    props: {
        product: Object
    },
}
</script>

<style scoped>
  .image{
    margin-top: -1.25rem;
    margin-left: -1.25rem;
    margin-right: -1.25rem;
  }
</style>