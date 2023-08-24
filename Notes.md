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

OR

```bash
npm vue init
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

*Vue has two way data binding*

*Do not call methods to display page data*, since behind the scenes on ANY page update it'll call the method again, since Vue doesn't know what the method does (and if it binds to data that's potentially being updated via the executed action).  *The same goes for methods that are bound in attributes!* This is not great for performance.  The solution is to use `computed` properties.

`{{ abc }}` - *interpolation* in Vue, which you can use to output values on the page (only works between HTML tags).  Can use JS code within these braces, but can't write complex code (like if statements), but we can write any JS expression here like ternary expressions.

`v-bind:href` or `:href` - *binding* to have data from the `data` object be injected into element attributes (this is a *Vue directive*) (bind here means to 'set a value').  *The values you can put here have the same rules as interpolation above.*

`v-html` - attribute you can add to an element to have it render HTML

Methods in Vue apps:
```js
data() {
	return {
		name: 'bob'
	}
},
methods: {
	doStuff() {
		// the `this` keyword here refers to the global Vue object which has had it's `data` merged into it
		console.log(this.name)
	}
}
```

`v-on:click` or `@click` - lets us bind event listeners on elements to methods (ex: `@click='doStuff'`).  All default events in HTML are what you can listen for!  Could use Javascript inside the `@click` section as well.
- *want to avoid putting code into HTML code, usually HTML code should only be in charge of displaying stuff*

Can call methods in Vue within `v-on:click` , but using either `method` or `method()`, Vue will detect what you're doing and handle it accordingly.  Nice!  Usually you'll just point at the method tho.

`Native Event Object` - object passed to your handler method when you call it via `@click` or any event binding.  An `event` object will automatically be provided as the first arg to the event listener method you specified.  If you called the method with parenthesis tho then it won't send the event object.  If you want to call your method AND want the event value then you need to call your method like this: `doStuff($event, index, param, here)`

`Event Modifiers` - Bits you can add onto directive attributes (ex: `@click`) to change how they behave.  There are built in modifiers, and you can specify them after the event name with a `.` (dot).  Ex: `@submit.prevent="submitFormHandler"` , which would prevent the default action (like submitting the page form).  Can also do this with buttons:  `@click.right="doStuff"` which would only trigger when right clicking the element.
- `.stop` stops event propagation, doesn't propagate up to the parent

`Key Modifiers` - Keyboard event modifiers, similar to event modifiers, but much easier for handling specific key events! Ex: `@keyup.enter="finalizeValue"`.  This allows for the usage of any keyboard key!

`v-once` - Preserves the initial state of the element, even if it uses Vue bindings, and tells the element that dynamic data bindings will only be evaluated once, and never again.  Nice for initial values if you want to keep them.  Kinda niche, according to the presenter.

`v-model` - two way binding to bind data on an element

`computed` properties - same idea as methods that output data, except that Vue will be aware of their data dependencies, and will only execute them whenever those dependencies have changed.  Name these the same way you'd name your data properties.

`watch` (watchers) - Functions that'll be called when one of its dependencies changed, though you name them after `data` properties, to detect when those values change.  Methods don't return anything, because we don't actually use them in the HTML.  Gets the latest value and previous value of the watched property as arguments to the method: `name(currentName, previousName)`.  `computed` properties behave similarly, but are much more useful when you need to output values based on multiple fields (since watchers can only watch single attributes).

# Dynamic Styling

If you bind `style` dynamically then you need to use a special syntax: you feed in an object.
Can either quote CSS properties or use camelcase version of property (ex: `borderColor` vs `'border-color'`).  Can also use basic JS code in these objects.

```vue
<div class="demo" :style="{'border-color': dataVariableHere}"></div>
```

Binding Classes Dynamically

```vue
<div class="demo" :class="variableThatReturnsClassNamesHere"></div>
```

```vue
<div class="demo" class="static classes here" :class="{ 'cssClassNameHere': boolean }"></div>
```

```vue
<div class="demo" :class="['static', 'classes', 'here', { 'cssClassNameHere': boolean }]"></div>
```

Can also use computed properties with styles.

# Conditional Rendering
`v-if`, `v-else`, `v-else-if` - statement in JS, and if it evaluates to true then the element (and all child elements) is rendered.  (the `else` statements must be used in direct neighbors of ones with `v-if`).  *When something isn't rendered, the element isn't even on the page (vs. setting `display: none`)*.
- can be expensive to re-create elements each time they're added to the DOM

`v-show` - Hides/shows elements via `display: none`
- can result in lots of DOM elements you don't need

*General rule of thumb*: use `v-if`, only only fall back to `v-show` for elements that get toggled a lot

`v-for` - loops!  To be efficient this re-uses DOM elements, which is pretty cool (but can cause weird bugs if you don't use `:key`), so be sure to use the `:key` attribute!

```vue
<div v-for="item in list" :key="item">
	<!-- this will be repeated for each item in the list -->
</div>
```

```vue
<div v-for="(item, index) in list" :key="item">
	<!-- this will be repeated for each item in the list -->
</div>
```

Loop through objects:

```js
const guy = {
	name: 'kevin',
	age: 35
}
```

```vue
<!-- can just use value, but CAN add keyName and index -->
<div v-for="(value, keyName, index) in guy" :key="keyName">
	<!-- this will be repeated for each attribute in the object -->
</div>
```

Loop through a range of numbers

```vue
<div v-for="num in 10" :key="num">
	<!-- numbers! -->
</div>
```

# Vue Behind the Scenes
Your `data` variables are merged into a global object which is passed to your methods, *but also* that merge process also converts those variables into JS `proxy` objects

`Proxy` - notifies subscribers when new values are assigned to the underlying value

Proxy Example:

```js
const data = {
	message: 'hello'
}

const handler = {
	set(target, key, value) {
		console.log(target, key, value)
		// { message: 'hello'} object we just wrapped in a Proxy
		// message
		// hey again
	}
}

const proxy = new Proxy(data, handler)

proxy.message = 'hey again'
```

`Template` - "Controlled HTML", the HTML that Vue attaches to, is called the `template` of the Vue app

Multiple apps:
```js
const app1 = Vue.createApp({})
app1.mount('#app1')

const app2 = Vue.createApp({})
app1.mount('#app2')
```

`refs` - way to get at specific DOM objects, if needed
```vue
<input type="text" ref="coolId">

methods: {
	doCoolThings() {
		const inputValue = this.$refs.coolId.value
	}
}
```

## How Vue updates the Dom
- Uses the Virtual DOM
	- Vue directives are kept track of behind the scenes, aren't actually part of the DOM
	- Vue only re-renders elements that changed, not the whole DOM
- How are DOM updates detected?
	- Doesn't compare DOMs, since this is too performance intensive
	- *Uses the Virtual DOM* (JS-based DOM that exists in memory) (ex: `{el: 'h2', child: 'Hello!' }, ...`), and compares the new virtual DOM (after a change) to the current virtual DOM and applies those changes
		- Has lots of other optimizations, doesn't work EXACTLY like this, but it's pretty performant!

## Vue Lifecycle
1. **createApp**({})
2. **beforeCreate**() (before app has been fully init)
3. **created**() (app is fully init)
4. *Compile Template* (dynamic placeholders and interpolation are replaced)
5. **beforeMount**() (nothing on the screen)
6. **mounted**() (see something on the screen) (have a Mounted Vue Instance)
7. *Data Changed*
8. **beforeUpdate**()
9. **updated**()
10. Instance Unmounted (app is removed from the screen and is dead)
11. **beforeUnmounted**() (this and above method are good for cleanup work)
12. **umounted**()


# Components
Good for splitting and segregating chunks of your app up, and splitting up bits of functionality into their own containers.

```js
// tells Vue we want to create a new component
// NOTE: should usually should use an element name with a dash, to avoid clashing with existing HTML elements
app.component('hello-world', {
	// need this, since we need HTML
	template: ``
	data() {
		return {}
	},
	methods: {}
})

// or if you're using the Vue CLI

import HelloWorld from './HelloWorld.vue'

const app = createApp(App)

app.component('hello-world', HelloWorld)

app.mount('#app')

```

*A Vue component is essentially just another Vue app, that belongs to another app.*
# Better Development with Vue CLI
- Why do we need this setup?
	- Will let us build bigger apps at scale
- Why do we need a dev server?
	- Currently we're using the `file://` protocol, rather than `http://`, which affects how the page works and which JS features are available
	- Better represents what the users will be using (hosted by a server, not a file)

Vue CLI
- uses Build Workflow - has a build process to generate the final files that'll be used to serve the app, the files we're working with aren't what'll actually be served to the users

`*.vue` - single file component

*Naming your main Vue app file `Vue.app` is a convention*

Named export: `import { thing } from './App.vue'`
Default export: `import App from './App.vue'`