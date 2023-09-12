<template>
    <div>
        <!-- <the-header title="Register Coach" /> -->
        <div class="content">
            <card>
                <h2>Coach Details</h2>
                <field id="firstName" name="First Name" type="text" v-model="firstName" :validator="validateNotEmpty" />
                <field id="lastName" name="Last Name" type="text" v-model="lastName" :validator="validateNotEmpty" />
                <field id="rate" name="Rate" type="number" v-model="rate" :validator="validateNonNegative" />
                <textarea v-model="description" cols="60" rows="10"></textarea>
                <div class="field">
                    <label>Categories</label><br>
                    <input type="checkbox" v-model="tags" value="frontend" id="frontend"/>
                    <label for="frontend">Frontend</label>
                    <input type="checkbox" v-model="tags" value="backend" id="backend"/>
                    <label for="backend">Backend</label>
                    <input type="checkbox" v-model="tags" value="career" id="career"/>
                    <label for="career">Career</label>
                </div>
                <button type="button" @click="submit">Submit</button>
            </card>
        </div>
    </div>
</template>

<script>
import TheHeader from './UI/TheHeader.vue';
import Card from './UI/Card.vue'
import Tag from './UI/Tag.vue'
import Field from './UI/Field.vue';

export default {
    components: {
        TheHeader,
        Card,
        Tag,
        Field
    },
    data() {
        return {
            // id
            firstName: '',
            lastName: '',
            rate: 0,
            description: '',
            tags: []
        }
    },
    methods: {
        submit() {
            if(this.validateNotEmpty(this.firstName).valid
                && this.validateNotEmpty(this.lastName).valid
                && this.validateNonNegative(this.rate).valid) {
                    // store in firebase
                    const id = Math.random().toString(36).slice(2, 10)
                    const coach = {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        rate: this.rate,
                        description: this.description,
                        tags: this.tags
                    }
                    fetch(`https://find-a-coach-694d9-default-rtdb.firebaseio.com/coaches/${id}.json`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(coach)
                    })
                    .then(() => {
                        this.$store.dispatch('registerCoach', coach)
                        this.$router.push('/')
                    })
                    .catch(err => {
                        console.error('failed to store coach!', err)
                    })
                }
        },
        validateNotEmpty(value) {
            if(!value || value.trim().length == 0) return { valid: false, message: 'must not be empty' }
            return { valid: true }
        },
        validateNonNegative(value) {
            if(!value || value < 0) return { valid: false, message: 'must not be empty or negative' }
            return { valid: true }
        }
    }
    // need validation
}
</script>

<style scoped>
.field {
    margin-bottom: 10px
}
</style>