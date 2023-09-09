<template>
    <div :style="{ backgroundColor: bgColor }">
        {{ text }}
    </div>
</template>

<script>
export default {
    props: ['text', 'bgColor']
}
</script>

<style scoped>
div {
    display: inline-block;
    padding: 10px;
    margin: 2px;
    color: white;
}
</style>