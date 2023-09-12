<template>
    <div>
        <!-- <the-header title="Coaches" /> -->
        <div class="content">
            <card>
                <h2>Find Your Coach</h2>
                <div>
                    <input type="checkbox" v-model="filters" value="frontend" id="frontend"/>
                    <label for="frontend">Frontend</label>
                    <input type="checkbox" v-model="filters" value="backend" id="backend"/>
                    <label for="backend">Backend</label>
                    <input type="checkbox" v-model="filters" value="career" id="career"/>
                    <label for="career">Career</label>
                </div>
            </card>
            <card>
                <div>
                    <button @click="loadCoaches">Refresh</button>
                    <router-link to="/register-coach"><button>Register Coach</button></router-link>
                </div>
                <div>
                    <div v-for="coach in coaches" :key="coach.id">
                        <h3>{{ coach.firstName }} {{ coach.lastName }}</h3>
                        <h4>${{ coach.rate }}/hour</h4>
                        <tag v-for="tag in coach.tags" :key="tag" :text="tag" :bgColor="tagTextColors[tag]" />
                        <div>
                            <router-link :to="'/coach/' + coach.id"><button>Contact</button></router-link>
                            <router-link :to="'/coach/' + coach.id"><button>View Details</button></router-link>
                        </div>
                    </div>
                </div>
            </card>
        </div>
    </div>
</template>

<script>
import TheHeader from './UI/TheHeader.vue';
import Card from './UI/Card.vue'
import Tag from './UI/Tag.vue'

export default {
    components: {
        TheHeader,
        Card,
        Tag
    },
    data() {
        return {
            filters: ['frontend','backend','career'],
            tagTextColors: {frontend: 'red', backend: 'purple', career: 'green'}
        }
    },
    methods: {
        loadCoaches() {
            fetch('https://find-a-coach-694d9-default-rtdb.firebaseio.com/coaches.json')
                .then(res => res.json())
                .then(json => {
                    const coaches = []
                    for(const coachId in json) coaches.push({ id: coachId, ...json[coachId] })
                    this.$store.dispatch('setCoaches', coaches)
                })
                .catch(err => {
                    console.error('failed to load coaches!', err)
                })
        }
    },
    computed: {
        coaches() {
            return this.$store.getters.getCoaches.filter(coach => coach.tags.some(tag => this.filters.includes(tag)))
        }
    },
    mounted() {
        this.loadCoaches()
    }
}
</script>

<style scoped>

</style>