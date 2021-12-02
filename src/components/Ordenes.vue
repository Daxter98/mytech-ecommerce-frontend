<template>
    <div class="box mb-4">
        <h3 class="is-size-4 mb-6">Orden #{{orden.id}}</h3>

        <h4 class="is-size-5">Productos</h4>

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
                <tr v-for="item in orden.items" :key="item.product.id">
                    <td>{{ item.product.nombre }}</td>
                    <td>${{ item.product.precio }}</td>
                    <td> {{item.cantidad}} </td>
                    <td>${{ getItemTotal(item).toFixed(2) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script>
export default {
    name: 'Ordenes',
    props: {
        orden: Object
    },
    methods: {
        getItemTotal(item) {
            return item.cantidad * item.product.precio
        },
        orderTotalLength(orden){
            return orden.items.reduce((acc, val) => {
                return acc += val.cantidad
            }, 0)
        },
    }
}
</script>