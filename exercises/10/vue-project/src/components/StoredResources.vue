<template>
    <card v-for="resource in resources">
        <h2>{{ resource.title }}</h2>
        <p>{{ resource.description }}</p>
        <div>
            <a :href="resource.link">View Resource</a>
        </div>
        <button @click="deleteResource(resource.title)">Delete</button>
    </card>
</template>

<script>
import Card from './UI/Card.vue';

export default {
    components: {
        Card
    },
    inject: [ 'resources', 'deleteResource' ]
}
</script>