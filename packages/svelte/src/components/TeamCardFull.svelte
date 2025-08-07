<script>
	export let name = '';

	export let logo = '';
	export let slug = '';
	export let startDate = '';
	export let endDate = '';
	export let games = [];
	const href = `/teams/${slug}`;
</script>

<a class=" flex items-center py-2 text-sm text-black hover:bg-gray-100" {href}>
	<p class="w-24">{new Date(startDate).toLocaleDateString('default')}</p>

	<img src={`/webp/large/${logo}.webp`} class="mr-6 h-12 w-12" alt={`${name} logo`} />
	<h2 class="flex-1 text-sm font-medium">{name}</h2>

	<p class="ml-auto font-mono font-thin">
		{games.length - 1}
		{games.length - 1 === 1 ? 'Defense' : 'Defenses'}
	</p>
</a>
