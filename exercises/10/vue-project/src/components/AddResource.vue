<template>
    <card>
        <h2>Title</h2>
        <input type="text" v-model="title" />
        <h2>Description</h2>
        <textarea v-model="description"></textarea>
        <h2>Link</h2>
        <input type="text" v-model="link" />
        <div>
            <button @click="add">Add Resource</button>
        </div>
    </card>
</template>

<script>
import Card from './UI/Card.vue'

export default {
    components: {
        Card
    },
    data() {
        return {
            text: '',
            description: '',
            link: ''
        }
    },
    inject: [ 'addResource' ],
    methods: {
        add() {
            this.addResource(this.title, this.description, this.link)
            this.title = ''
            this.description = ''
            this.link = ''
        }
    }
}
</script>