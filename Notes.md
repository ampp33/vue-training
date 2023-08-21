# Vue
## Ways to Use It
1. Can control parts of the webpage (don't have to use Vue for all parts of the page) (Widgets)
2. Everything uses Vue (SPA, single page app)
	1. Server only sends one HTML page, and thereafter Vue takes over

*Lets us build a more declarative app, rather than imperative*

## Vue vs Other Tools
- Vue
	- Component based UI
- React
	- Library
	- Less features than Vue
	- Lots of community packages
- Angular
	- Component based UI
	- Uses TS
	- Can be overkill for smaller projects

## Create Vue App

```bash
npm create vue@latest
cd vue-project
npm install
npm run dev
```

Server will run on: http://localhost:5173/

## Basic Vue Definition
### package.json
```js
{
  "name": "vue-project",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.3.4"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^4.2.3",
    "vite": "^4.4.6"
  }
}

```
### index.html
```html
<!DOCTYPE html>
<html lang="en">
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```
### src/main.js
```js
import { createApp } from 'vue'
// imports base App.vue to mount to the page
import App from './App.vue'

// mount the App component to the #app element on the page
createApp(App).mount('#app')
```
### src/App.vue
```vue
<!-- where html goes -->
<template>
  <div style="width: 400px">
    <h2>Goal</h2>
    <!-- v-model in action, to bind this input's value to the newGoalText var -->
    <input type="text" style="width: 100%" v-model="newGoalText" />
    <!-- @click (alt to v-bind:click) to set a method to call when el is clicked -->
    <button id="addGoal" @click="addGoal">Add Goal</button>
    <!-- v-for used to loop thru the 'goals' objects -->
    <div v-for="goal of goals" :key="goal">{{ goal }}</div>
  </div>
</template>

<!-- javascript/main logic goes here -->
<script>
export default {
  // app data goes here
  data() {
    return {
      newGoalText: '',
      goals: []
    }
  },
  methods: {
    addGoal() {
      this.goals.push(this.newGoalText)
      this.newGoalText = ''
    }
  }
}
</script>

<!-- css goes here, note the 'scoped' attribute to make the css specific to this component -->
<style scoped></style>
```
### Components
Components usually live in a `/src/components` directory, and are imported by adding this in the `.vue` file you want to use the component in

```js
import Thingy from './components/Thingy.vue'
export default {
	components: {
		Thingy
	}
}
```
## Basic Vue Features
`v-model` - *two way bind* attribute to bind to a variable in the `data()` section
`v-on:click` , shorthanded to `@click` - attribute to tell what the element to execute on click

# Basics & Core Concepts - DOM Interaction

Basic setup of a Vue app on a page using basic JS:

```js
const app = Vue.createApp({
	data() {
		return {}
	}
})
app.mount('#app')
```

Vue scans HTML behind the scenes and updates the page accordingly.

`{{ abc }}` - *interpolation* in Vue, which you can use to output values on the page (only works between HTML tags).  Can use JS code within these braces, but can't write complex code (like if statements), but we can write any JS expression here like ternary expressions.

`v-bind:href` or `:href` - *binding* to have data from the `data` object be injected into element attributes (this is a *Vue directive*) (bind here means to 'set a value').  *The values you can put here have the same rules as interpolation above.*

Methods in Vue apps:
```js
data() {
	return {}
},
methods: {
	dotStuff() {}
}
```

