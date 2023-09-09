<template>
    <div class="header">
        <h1>{{ title  }}</h1>
        <div class="buttons">
            <router-link to="/"><button :class="{ 'active-button': $route.path == '/' }">All Coaches</button></router-link>
            <router-link to="/requests"><button :class="{ 'active-button': $route.path == '/requests' }">Requests</button></router-link>
        </div>
    </div>
</template>

<script>
export default {
    props: ['title'],
}
</script>

<style scoped>
.header {
    background-color: brown;
    padding: 30px;
}

h1 {
    margin: 0px;
    padding: 0px;
    color: white;
}

.buttons {
    padding: inherit;
    position: absolute;
    top: 0px;
    right: 0px;
}

button {
    height: 40px;
    background-color: white;
    margin-left: 10px;
    padding: 10px;
}

.active-button {
    background-color: gray;
}
</style>