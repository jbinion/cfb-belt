<script>
	export let logo = '';
	export let name = '';
	const href = `/teams/${encodeURIComponent(name.toLocaleLowerCase())}`;
</script>

<a {href}>
	<div class="flex flex-col items-center space-y-2 p-4 text-black">
		<img src={logo} class="h-24" alt={`${name} logo`} />

		<p class=" flex-1 font-semibold">{name}</p>
	</div>
</a>
