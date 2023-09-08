<template>
    <div>
        <h1>{{ title  }}</h1>
    </div>
</template>

<script>
export default {
    props: ['title']
}
</script>

<style scoped>
div {
    background-color: brown;
    padding: 30px;
    text-align: center;
}

h1 {
    margin: 0px;
    color: white;
}
</style>