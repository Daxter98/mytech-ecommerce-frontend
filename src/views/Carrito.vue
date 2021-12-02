<template>
    <div class="page-cart">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Carrito</h1>
            </div>

            <div class="column is-12 box">
                <table class="table is-fullwidth" v-if="cartTotalLength">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        <CartItem v-for="item in cart.items" v-bind:key="item.product.id" 
                            v-bind:initialItem="item"
                            v-on:removeFromCart="removeFromCart"/>
                    </tbody>
                </table>

                <p v-else>No has añadido productos</p>
            </div>

            <div class="column is-12 box">
                <h2 class="subtitle">Total</h2>
                <strong>${{ cartTotalPrice.toFixed(2) }}</strong>, {{ cartTotalLength }} items
                <hr>
                <router-link to="/carrito/pago" class="button is-dark">Pagar</router-link>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
import CartItem from '@/components/CartItem.vue'

export default {
    name: 'Carrito',
    components: {
        CartItem
    },
    data() {
        return {
            cart: {
                items: []
            }
        }
    },
    mounted(){
        this.cart = this.$store.state.cart

        document.title = 'Pagar | E-Commerce'
    },
    methods: {
        removeFromCart(item){
            // Filtra el producto seleccionado y devuelve la lista sin el elemento
            this.cart.items = this.cart.items.filter(i => i.product.id !== item.product.id)
        }
    },
    computed: {
        cartTotalLength(){
            return this.cart.items.reduce((acc, currVal) =>{
                return acc += currVal.cantidad
            }, 0)
        },
        cartTotalPrice(){
            return this.cart.items.reduce((acc, currVal) =>{
                return acc += currVal.product.precio * currVal.cantidad
            }, 0)
        }
    }
}
</script>