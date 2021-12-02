<template>
    <div class="page-pago">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Pago</h1>
                <div class="column is-12 box">
                    <table class="table is-fullwidth">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="item in cart.items" v-bind:key="item.product.id">
                                <td>{{ item.product.nombre }}</td>
                                <td>{{ item.product.precio }}</td>
                                <td>{{ item.cantidad }}</td>
                                <td>${{ getItemTotal(item).toFixed(2) }}</td>
                            </tr>
                        </tbody>

                        <tfoot>
                            <tr>
                                <td colspan="2">Total</td>
                                <td>{{ cartTotalLength }}</td>
                                <td>${{ cartTotalPrice.toFixed(2) }}</td>
                            </tr>
                        </tfoot>
                    </table>
                    <!--Datos de Pago-->
                    <div class="column is-12 box">
                        <h2 class="subtitle">Detalles de Envio</h2>

                        <p class="has-text-grey mb-4">Todos los campos son requeridos</p>

                        <div class="columns is-multiline">
                            <div class="column is-6">
                                <div class="field">
                                    <label>Nombre(s)</label>
                                    <div class="control">
                                        <input type="text" class="input" v-model="nombre_cliente">
                                    </div>
                                </div>

                                <div class="field">
                                    <label>Apellidos</label>
                                    <div class="control">
                                        <input type="text" class="input" v-model="apellido_cliente">
                                    </div>
                                </div>

                                <div class="field">
                                    <label>Correo</label>
                                    <div class="control">
                                        <input type="text" class="input" v-model="email">
                                    </div>
                                </div>

                                <div class="field">
                                    <label>Teléfono</label>
                                    <div class="control">
                                        <input type="text" class="input" v-model="telefono">
                                    </div>
                                </div>
                            </div>

                            <div class="column is-6">
                                <div class="field">
                                    <label>Dirección</label>
                                    <div class="control">
                                        <input type="text" class="input" v-model="direccion">
                                    </div>
                                </div>

                                <div class="field">
                                    <label>Código Postal</label>
                                    <div class="control">
                                        <input type="text" class="input" v-model="codigo_postal">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="notification is-danger mt-4" v-if="errors.length">
                            <p v-for="error in errors" :key="error">{{ error }}</p>
                        </div>

                        <hr>

                        <div id="card-element" class="mb-5"></div>

                        <template v-if="cartTotalLength">
                            <hr>
                            <button class="button is-dark" @click="submitForm">
                                Pago con Stripe
                            </button>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

import axios from 'axios'

export default {
    name: 'Pago',
    data(){
        return{
            cart: {
                items: []
            },
            stripe: {},
            card: {},
            nombre_cliente: '',
            apellido_cliente: '',
            email: '',
            telefono: '',
            direccion: '',
            codigo_postal: '',
            errors: []
        }
    },
    mounted(){
        document.title = 'Pago | E-Commerce'

        this.cart = this.$store.state.cart

        if(this.cartTotalLength > 0){
            this.stripe = Stripe('pk_test_51Juf1yBYZqFfPrghRda690LZKfycVZdSsPj6YJptmt5YAxyu1zeTRFoE3hl2xe2RPFJLzylW6WY7oaR15gUnUu3B00YgC5Bl2v')
            const elementos = this.stripe.elements()

            this.card = elementos.create('card', {hidePostalCode: true})

            this.card.mount('#card-element')
        }
    },
    methods: {
        getItemTotal(item){
            return item.cantidad * item.product.precio
        },
        submitForm(){
            this.errors = []

            const hasNumbers = (_string) =>{
                return /\d/.test(_string)
            }

            const hasLetters = (_string) => {
                return /[^\d]/g.test(_string)
            }

            if(this.nombre_cliente === ''){
                this.errors.push('El campo de nombre no puede estar vacio')
            }else if(hasNumbers(this.nombre_cliente)){
                this.errors.push('El campo nombre no puede tener numeros')
                this.nombre_cliente = ''
            }

            if(this.apellido_cliente === ''){
                this.errors.push('El campo de apellido no puede estar vacio')
            }else if(hasNumbers(this.apellido_cliente)){
                this.errors.push('El campo apellido no puede tener numeros')
                this.apellido_cliente = ''
            }

            if(this.email === ''){
                this.errors.push('Debe introducir un correo electronico')
            }

            if(this.telefono === ''){
                this.errors.push('Debe introducir un número telefonico')
            } else if(hasLetters(this.telefono)){
                this.errors.push('El campo telefono solo admite caracteres númericos')
                this.telefono = ''
            }

            if(this.direccion === ''){
                this.errors.push('El campo direcció no puede estar vacio')
            }

            if(this.codigo_postal === ''){
                this.errors.push('Debe introducir el Código Postal')
            }else if(hasLetters(this.codigo_postal)){
                this.errors.push('El campo código postal solo admite caracteres númericos')
            }

            // Fin Validaciones

            if(!this.errors.length){
                this.$store.commit('setIsLoading', true)

                this.stripe.createToken(this.card).then(result => {
                    if(result.error){
                        this.$store.commit('setIsLoading', false)

                        this.errors.push('Algo salio mal con el pago. Intenta de nuevo')

                        console.log(result.error.message)
                    } else {
                        this.stripeTokenHandler(result.token)
                    }
                })
            }
        },
        async stripeTokenHandler(token){
            const articulos = []

            for (let i = 0; i < this.cart.items.length; i++) {
                const item = this.cart.items[i];

                const obj = {
                    product: item.product.id,
                    cantidad: item.cantidad,
                    precio: item.product.precio * item.cantidad
                }

                articulos.push(obj)
            }

            const data = {
                'nombre_cliente': this.nombre_cliente,
                'apellido_cliente': this.apellido_cliente,
                'email': this.email,
                'direccion': this.direccion,
                'codigo_postal': this.codigo_postal,
                'telefono': this.telefono,
                'items': articulos,
                'stripe_token': token.id
            }


            await axios
                .post('/api/v1/pagar/', data)
                .then(response => {
                    this.$store.commit('clearCart')
                    this.$router.push('/carrito/success')
                })
                .catch(error => {
                    this.errors.push(error)

                    console.log(error)
                })

                this.$store.commit('setIsLoading', false)
        }
    },
    computed: {
        cartTotalPrice() {
            return this.cart.items.reduce((acc, currVal) => {
                return acc += currVal.product.precio * currVal.cantidad
            }, 0)
        },
        cartTotalLength(){
            return this.cart.items.reduce((acc, currVal) =>{
                return acc += currVal.cantidad
            }, 0)
        }
    }
}
</script>