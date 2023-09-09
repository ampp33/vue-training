<template>
    <the-header title="Requests" />
    <div class="content">
        <card>
            <h1>Requests Received</h1>
            <div class="request" v-for="req in $store.getters.getRequests" :key="req.id">
                <a :href="'mailto:' + req.email">{{ req.email }}</a>
                <p>
                    {{ req.message }}
                </p>
            </div>
        </card>
    </div>
</template>

<script>
import TheHeader from './UI/TheHeader.vue';
import Card from './UI/Card.vue'

export default {
    components: {
        TheHeader,
        Card
    }
}
</script>

<style scoped>
.request {
    border: 1px solid black;
    padding: 10px;
    margin: 10px
}
</style>