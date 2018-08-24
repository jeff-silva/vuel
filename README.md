# Vuel
Easy custom elements using Vue.js

Step 1: my-element.html
```
<template id="my-element">
	<div>
		Hello {{ thename }}
	</div>
</template>

<script>
Vue.vuel("my-element", {
	data: {
		thename: "John",
	},
});
</script>
```

Step 2: Include and run
```
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/jeff-silva/vuel@1.0.0/dist/vuel.min.js"></script>

<link rel="import" href="my-element.html">

<!-- Render: Hello John -->
<my-element></my-element>

<!-- Render: Hello Mary -->
<my-element thename="Mary"></my-element>
```

[More advanced examples](https://rawgit.com/jeff-silva/vuel/master/examples/index.html)
