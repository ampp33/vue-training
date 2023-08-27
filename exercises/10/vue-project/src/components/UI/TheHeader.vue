<template>
    <div class="header">
        <h1 class="header-title"><slot></slot></h1>
    </div>
</template>

<style scoped>
.header {
    margin: 0px;
    padding: 20px;
    width: 100%;
    background-color: #673147;
    text-align: center;
}

.header-title {
    font-size: 42pt;
    margin: 0px;
    color: white;
}
</style>