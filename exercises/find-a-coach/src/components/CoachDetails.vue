<template>
    <div>
        <!-- <the-header title="Coach Details"></the-header> -->
        <div v-if="coach" class="content">
            <card>
                <h3>First Name</h3>
                {{ coach.firstName }}
                <h3>Last Name</h3>
                {{ coach.lastName }}
                <h3>Rate</h3>
                ${{ coach.rate }}/hr
                <h3>Tags</h3>
                <tag v-for="tag in coach.tags" :key="tag" :text="tag" :bgColor="tagTextColors[tag]" />
            </card>
            <card>
                <h2>Interested?  Reach out now!</h2>
                <div>
                    <field id="email" name="Email" type="text" v-model="email" />
                    <label for="message">Message</label><br>
                    <textarea v-model="message" cols="60" rows="10"></textarea>
                </div>
                <button type="button" @click="submit">Submit</button>
            </card>
            <card>
                {{ coach.description }}
            </card>
        </div>
    </div>
</template>

<script>
import TheHeader from './UI/TheHeader.vue'
import Card from './UI/Card.vue'
import Tag from './UI/Tag.vue'
import Field from './UI/Field.vue'

export default {
    props: ['id'],
    components: {
        TheHeader,
        Card,
        Tag,
        Field
    },
    data() {
        return {
            coach: undefined,
            tagTextColors: {frontend: 'red', backend: 'purple', career: 'green'},
            email: '',
            message: ''
        }
    },
    methods: {
        submit() {
            // store in firebase
            const id = Math.random().toString(36).slice(2, 10)
            const request = {
                coachId: this.id,
                email: this.email,
                message: this.message
            }
            fetch(`https://find-a-coach-694d9-default-rtdb.firebaseio.com/requests/${id}.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            })
            .then(() => {
                this.$store.dispatch('addRequest', request)
                this.$router.push('/')
            })
            .catch(err => {
                console.error('failed to store request!', err)
            })
        }
    },
    mounted() {
        this.coach = this.$store.getters.getCoaches.find(coach => coach.id == this.id)
    },
    watch: {
        id() {
            this.coach = this.$store.getters.getCoaches.find(coach => coach.id == id)
        }
    }
}
</script>

<style scoped>

</style>