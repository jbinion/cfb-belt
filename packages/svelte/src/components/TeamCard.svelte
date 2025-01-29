<script>
	export let name = '';
	export let logo = '';
	export let slug = '';
	const href = `/teams/${slug}`;
</script>

<li>
	<a {href} class="flex space-x-2 py-2 text-black">
		<img src={logo} class="h-6" alt={`${name} logo`} />

		<p class="flex-1">{name}</p>
	</a>
</li>
