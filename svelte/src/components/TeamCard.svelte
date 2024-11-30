<script>
	export let name = '';
	export let logo = '';
</script>

<li class="flex space-x-2 py-2">
	<img src={logo} class="h-6" alt={`${name} logo`} />

	<p class="flex-1">{name}</p>
</li>
