<template>
  <the-header>RememberMe</the-header>
  <div class="content">
    <card>
      <button @click="showComponent('stored-resources')">Stored Resources</button>
      <button @click="showComponent('add-resource')">Add Resource</button>
    </card>
    <keep-alive>
      <component :is="componentToShow" />
    </keep-alive>
  </div>
</template>

<script>
import TheHeader from './components/UI/TheHeader.vue'
import Card from './components/UI/Card.vue'
import AddResource from './components/AddResource.vue'
import StoredResources from './components/StoredResources.vue'

export default {
  components: {
    TheHeader,
    Card,
    StoredResources,
    AddResource
  },
  data() {
    return {
      resources: [{
        title: 'Hey',
        description: 'Woah there dude',
        link: 'https://www.google.com'
      }],
      componentToShow: 'stored-resources'
    }
  },
  provide() {
    return {
      resources: this.resources,
      addResource: this.addResource,
      deleteResource: this.deleteResource
    }
  },
  methods: {
    showComponent(componentName) {
      this.componentToShow = componentName
    },
    addResource(title, description, link) {
      this.resources.push({ title, description, link })
    },
    deleteResource(title) {
      const index = this.resources.findIndex(r => r.title == title)
      this.resources.splice(index, 1)
    }
  }
}
</script>

<style>
body {
  margin: 0px;
  font-family: Arial, Helvetica, sans-serif;
}

.content {
  margin: auto;
  width: 50%;
}
</style>
