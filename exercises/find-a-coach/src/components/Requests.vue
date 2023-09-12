<template>
    <div>
        <!-- <the-header title="Requests" /> -->
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
    </div>
</template>

<script>
import TheHeader from './UI/TheHeader.vue';
import Card from './UI/Card.vue'

export default {
    components: {
        TheHeader,
        Card
    },
    mounted() {
        this.loadRequests()
    },
    methods: {
        loadRequests() {
            fetch('https://find-a-coach-694d9-default-rtdb.firebaseio.com/requests.json')
                .then(res => res.json())
                .then(json => {
                    const requests = []
                    for(const requestId in json) requests.push({ id: requestId, ...json[requestId] })
                    this.$store.dispatch('setRequests', requests)
                })
                .catch(err => {
                    console.error('failed to load requests!', err)
                })
        }
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