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

# Styling

## Dynamic Styling

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

## Scoped Styling
Way to telling Vue whether styles should be applied globally or only to the component it's defined on.

Usually global styles are defined in your `App.vue` file

```vue
<style>
/* style here affects all files, regardless of where the component is defined in the file tree *
</style>

<style scoped>
/* style here only applies to the component file it's in *
</style>
```

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

## Props
`props` - custom HTML attributes on a custom component/element, that allows us to pass *one-way* data to the child component.

```js
{
	name: 'friend-contact'
	// see here, and be sure to use camel case, but use kebab case on the attrs
	props: [ 'name', 'email', 'phoneNumber' ],
	data() {
		return {}
	},
	methods: {
		doStuff() { console.log(this.name) }
	}
}
```

```html
<!-- NOTE: you SHOULD use kebab case here for the attributes! -->
<friend-contact name="bob" email="bob@bob.com" phone-number="1232342345" />
```

*Props should not be mutated (will cause an error).*  We shouldn't do this because this is a uni-directional data flow, so we don't want to give the impression the parent data will change.  *How would we change the parent, if we wanted to?*
1. Let the parent know
2. Take received data as the initial data, but put the value into a new data property to ack that we aren't trying to change the passed in data
```js
{
	props: [ 'name' ],
	data() {
		return {
			actualName: this.name
		}
	}
}
```

### Prop Validation
*This doesn't cause an error on the screen, but will provide a warning in the console*!  Nice.

```json
{
	props: {
		name: String,
		phoneNumber: String,
		emailAddress: String
	}
}

// or

{
	props: {
		name: {
			type: String,
			required: true,
			default: 'bob', // could also be a function
			validator() { return true } // return boolean
		},
		phoneNumber: String,
		emailAddress: String
	}
}
```

Supported types:
- String
- Number
- Boolean
- Array
- Object
- Date  
- Function
- Symbol
- (any constructor function, like Date or any custom constructor)

### Dynamic Props
Can bind prop attributes on elements

*Need to specify a key on custom components* when using `v-for` with them

### Emitting Custom Events (Parent -> Child Comm)
How does this work for regular HTML elements?  We add an event listener and it calls us when the event is fired, it works the same for Vue components!  Here's an example:

Parent
```vue
<template>
	<div>
		<child-element @value-changed="handleStuff" />
	</div>
</template>

<script>
default export {
	methods: {
		handleStuff(valueFromChild) {
			console.log(`value-changed event data from child: ${valueFromChild}`
		}
	}
}
</script>
```

Child
```js
{
	methods: {
		valueIsChangedParentShouldKnowAbout() {
			this.$emit('value-changed', this.someValue) // name of custom event (kebab case), ...params
		}
	}
}
```

What if the value being passed from the child to the parent needs to tell the parent that the data belongs to a specific object the parent holds?  *Pass the value you want to alert about + the id, so the parent can pair the value up with the obj that had that value.  Note that if you go this route there's a good chance you can remove the intermediate variable that stored the prop from the parent.*

**Props are for sending data into an element, events/emits are for sending data out of them.**

### Defining and Validating Custom Events
```js
{
	// define which custom events your component emits, this is your documentation!
	emits: [ 'toggle-favorites' ]
	// or
	emits: {
		'toggle-favorites': function(someValue) {
			// can add validation here (will cause a warning in the console)
			return id ? true : false
		}
	}
}
```

`Prop Fallthrough` - Props and events added on a custom component tag **automatically fall through** to the **root component** in the template of that component.  (*ex*: if you created a component that's base element is a `<button>` your custom component exposes props `type` and handler `@click` even if you didn't add that prop or any emitters).  You can get access to these fallthrough props on a built-in `$attrs` property (e.g. `this.$attrs`).  This can be handy to build "utility" or pure presentational components where you don't want to define all props and events individually.

`Binding All Props` - If you have an object with attributes where you want to bind all of those attributes to props on a component, you can use this:

```vue
<template>
	<user-data v-bind="user" />
</template>

<script>
export default {
	data() {
		return {
			user: { name: 'kevin', age: '35' }
		}
	}
}
</script>
```

instead of...

```vue
<template>
	<user-data :name="user.name" :age="user.age" />
</template>
```

`Inject` / `Provide` - *lets you define variables or methods in a parent element, and can inject them in a child element*, which can be handy when you need functionality for a higher level method/object to be available to a lower level component without having to pass attributes down thru the layers.

```js
// provider
{
	// NOTE: use function syntax here so that we have access to 'this'
	provide() {
		return {
			asdf: this.asdf,
			someData: { name: 'bob' }
		}
	},
	methods: {
		asdf(text) {
			console.log(text)
		}
	}
}

// injector
{
	inject: ['asdf', 'someData']
	methods: {
		doStuff() {
			this.asdf(this.someData.name) // prints 'bob'
		}
	}
}
```

### Global vs. Local Component Registration

*Global*
The more components the more our app needs to load initially, which is fine for a basic app, but for a bigger app it could mean more upfront cost to load a bunch of components.  Plus, this doesn't tell us which components are used by which components.

```js
const app = createApp(App)
app.component('cool-component', CoolComponent)
app.component('cool-thing', CoolThing)
```

*Local*
```vue
<template>
	<div>
		<!-- both of these work -->
		<cool-thing />
		<CoolThing />
	</div>
</template>

<script>
import CoolThing from './components/CoolThing.vue'

export default {
	components: {
		CoolThing
	},
	data() { return {} }
}
</script>
```

## Slots
Lets you pass child HTML/Vue elements into components

Child
```vue
<template>
	<div>
		<slot><!-- default slot --></slot>
		<slot name="first"><!-- named slot --></slot>
	</div>
</template>
```

Parent
```vue
<template>
	<child-component>
		<!-- all this will be rendered inside the <slot> element above, but you can add a <template v-slot:default> wrapper around this if you want to be more explict -->
		<div>
			<h1>Hello There!</h1>
		</div>
		<template v-slot:first>
			<!-- all this will be rendered inside the <slot name="first"> element above -->
			<div>
				<h2>More Text!</h1>
			</div>
		</template>
	</child-component>
</template>
```

*Shorthand* - you can shorten `<template v-slot:first>` to `<template #first>`

*When working with slots and sending components into them, nothing changes about scoped styles and data changes, even though you're passing elements to a child element the data and styles you're passing to them still applies inside the parent object!*

*Default Slot Content* - content you can specify between `<slot>` elements that will be displayed if no slot data is provided, handy if you have some fallback HTML you want displayed.

`$slot` - built in Vue object that tells you about the slot data passed to your component.  Slot names are the properties of this object (ex: `this.$slot.first`, based on the example above, would return info on that slot.).  If no data is put in the slot then the `this.$slot.laskdjf` would be `undefined`.

## Scoped Slots
Useful if you have a child component that displays slot data, but you want to customize the data that it's displaying... but we don't have access to the data its displaying because that info is contained with the child component. *Lets you pass data from the component where you defined the slot, to the component that uses the slot.*

Niche feature, but it's available.

Note that you can shorthand `<template #default="someSlotProps">`, since the child component has only one `slot`, into this: `<child-component #default="someSlotProps">`

```vue
<!-- child element that defines the slot -->
<template>
	<div>
		<slot :item="name" :stuff="thing"></slot>
	</div>
</template>

<!-- parent element that uses the child element and its slot -->
<template>
	<child-component>
		<!-- someSlotProps will always be an object that contains the data passed from the child element that had the slot -->
		<template #default="someSlotProps">
			<h1>{{ someSlotProps.name }}{{ someSlotProps.thing }}</h1>
		</template>
	</child-component>
</template>
```

## Dynamic Components
Lets you dynamically specify which component should be displayed, using the `<component>` tag

```vue
<template>
	<div>
		<component is="user-profile" />
	</div>
</template>
```

`<keep-alive>` - can add these tags around a component, so that if a component within the tags is removed then the removed component will still keep its state, even though it's been removed.

## Teleporting Elements
Useful if you have an element that shouldn't be added to the DOM where it's defined, but instead to move it somewhere more appropriate (ex: move a dialog element to the root of the page, rather that nested within the component that defined the dialog)

```vue
<template>
	<teleport to="css selector here (ex: body)">
		<!-- element to teleport here, which you can still design and use within this component, except that it'll be rendered elsewhere -->
	</teleport>
</template>
```

## Fragments
```vue
<template>
	<!-- in Vue 2 you needed to have a single base element, but in Vue 3 you're allowed to have multiple -->
</template>
```

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

# !Style Guide
https://v2.vuejs.org/v2/style-guide/



127