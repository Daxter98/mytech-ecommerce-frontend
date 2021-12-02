<template>
    <tr>
        <td><router-link :to="item.product.get_absolute_url">{{ item.product.nombre }}</router-link></td>
        <td>${{ item.product.precio }}</td>
        <td>
            {{ item.cantidad }}
            <a @click="decrementarCantidad(item)"> - </a> 
             
            <a @click="incrementarCantidad(item)"> +</a>
        </td>
        <td>${{ getItemTotal(item).toFixed(2) }}</td>
        <td><button class="delete" @click="removeFromCart(item)"></button></td>
    </tr>
</template>

<script>
export default {
    name: 'CartItem',
    props: {
        initialItem: Object
    },
    data(){
        return{
            item: this.initialItem
        }
    },
    methods: {
        getItemTotal(item){
            return item.cantidad * item.product.precio
        },
        incrementarCantidad(item){
            item.cantidad += 1

            this.updateCart()
        },
        decrementarCantidad(item){
            item.cantidad -= 1

            if(item.cantidad === 0){
                this.$emit('removeFromCart', item)
            }

            this.updateCart()
        },
        updateCart(){
            localStorage.setItem('cart', JSON.stringify(this.$store.state.cart))
        },
        removeFromCart(item){
            // Function back to the parent
            this.$emit('removeFromCart', item)

            this.updateCart()
        }
    }
}
</script>