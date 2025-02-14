<script>
	export let name = '';

	export let logo = '';
	export let slug = '';
	export let startDate = '';
	export let endDate = '';
	export let games = [];
	const href = `/teams/${slug}`;
	// take in games
	// figure out who team won from and who lost too
</script>

<a class=" text-black" {href}>
	<div class="flex items-center hover:bg-gray-100">
		<img src={`/webp/large/${logo}.webp`} class="mr-6 h-12" alt={`${name} logo`} />

		<p class=" w-48">{name}</p>
		<p class="w-24 text-sm">{games.length - 1} {games.length - 1 === 1 ? 'Defense' : 'Defenses'}</p>
		<p class="ml-auto font-mono text-sm font-thin">
			{new Date(startDate).toLocaleDateString('default')} -
			{new Date(endDate).toLocaleDateString('default')}
		</p>
	</div>
</a>
