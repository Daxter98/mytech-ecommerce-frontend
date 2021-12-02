<template>
    <div class="page-product">
        <div class="columns is-multiline">
            <div class="column is-9">
                <figure class="image mb-6">
                    <img v-bind:src="product.get_image">
                </figure>

                <h1 class="title">{{ product.nombre }}</h1>

                <p>{{ product.descripcion }}</p>
            </div>

            <div class="column is-3">
                <h2 class="subtitle">Información</h2>

                <p><strong>Precio: </strong>${{ product.precio }}</p>

                <div class="field has-addons mt-6">
                    <div class="control">
                        <input type="number" class="input" min="1" v-model="cantidad">
                    </div>

                    <div class="control">
                        <a class="button is-dark" @click="addToCart">Añadir al Carrito</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

import { toast } from 'bulma-toast'

export default {
    name: 'Product',
    data(){
        return{
            product: {},
            cantidad: 1
        }
    },
    mounted(){
        this.getProduct()
    },
    methods: {
        async getProduct(){
            this.$store.commit('setIsLoading', true)

            const categoria_slug = this.$route.params.categoria_slug
            const producto_slug = this.$route.params.producto_slug

            await axios
            .get(`/api/v1/productos/${categoria_slug}/${producto_slug}`)
            .then(response => {
                this.product = response.data

                document.title = this.product.nombre + ' | E-Commerce'
            })
            .catch(error => {
                console.error(error)
            })

            this.$store.commit('setIsLoading', false)
        },
        addToCart(){
            if(isNaN(this.cantidad) || this.cantidad < 1){
                this.cantidad = 1
            }

            const item = {
                product: this.product,
                cantidad: this.cantidad
            }

            this.$store.commit('addToCart', item)

            toast({
                message:  'El producto fue añadido correctamente',
                type: 'is-success',
                dismissible: true,
                pauseOnHover: true,
                duration: 2000,
                position: 'bottom-right'
            })
        }
    }
}
</script>