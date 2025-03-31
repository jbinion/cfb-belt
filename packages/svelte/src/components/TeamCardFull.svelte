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
	<div class="flex items-center text-sm hover:bg-gray-100 md:text-sm">
		<p class="w-24">{new Date(startDate).toLocaleDateString('default')}</p>

		<img src={`/webp/large/${logo}.webp`} class="mr-6 h-12 w-12" alt={`${name} logo`} />

		<p>{name}</p>

		<p class="ml-auto font-mono font-thin">
			{games.length - 1}
			{games.length - 1 === 1 ? 'Defense' : 'Defenses'}
		</p>
	</div>
</a>
