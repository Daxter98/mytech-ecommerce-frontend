<template>
    <div class="page-success">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Gracias por tu compra!</h1>

                <p>Tu orden será procesada lo más pronto posible</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Success',
    mounted(){
        document.title = "Exito | E-Commerce"
    }
}
</script>