<script>
	export let logo = '';
	export let name = '';
	export let slug = '';
	export let reigns = 0;
	export let defenses = 0;
	const href = `/teams/${slug}`;
</script>

<a {href}>
	<div class="flex flex-col items-center space-y-2 p-4 text-black">
		<img src={logo} class="h-24" alt={`${name} logo`} />

		<p class=" flex-1 font-semibold">{name}</p>
		<p>{reigns} reigns</p>
		<p>{defenses} defenses</p>
	</div>
</a>
