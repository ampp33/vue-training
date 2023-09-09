<template>
    <div class="field">
        <label :for="id" :class="{ 'invalid-message': !isValid }">{{ name }}</label><br>
        <input v-model="value" :id="id" :type="type" @input="onChange" :class="{ invalid: !isValid }" />
        <div v-if="!isValid" class="invalid-message">{{ validationMessage }}</div>
    </div>
</template>

<script>
export default {
    props: ['id', 'name', 'type', 'modelValue', 'validator'],
    emits: ['update:modelValue'],
    data() {
        return {
            value: this.modelValue,
            isValid: true,
            validationMessage: ''
        }
    },
    methods: {
        onChange() {
            if(this.validate()) this.$emit('update:modelValue', this.value)
        },
        validate() {
            if(this.validator) {
                const validationResult = this.validator(this.value)
                this.isValid = validationResult.valid
                this.validationMessage = validationResult.message || ''
            }
            return this.isValid
        }
    }
}
</script>

<style scoped>
.field {
    margin-bottom: 10px
}

.invalid {
    border-color: red;
}

.invalid-message {
    color: red;
}
</style>