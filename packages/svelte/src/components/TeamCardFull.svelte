<script>
	export let name = '';
	export let days = 0;
	export let games = [];
	export let logo = '';
	export let slug = '';
	const href = `/teams/${slug}`;
	// take in games
	// figure out who team won from and who lost too
</script>

<a class=" text-black" {href}>
	<div class="flex items-center hover:bg-gray-100">
		<img src={logo} class="mr-6 h-12" alt={`${name} logo`} />

		<p class=" w-48">{name}</p>
		<p class="w-24 text-sm">{games.length} Defenses</p>
		<!-- <p class="ml-auto font-mono text-sm font-thin">
			{new Date(games[0].start_date).toLocaleDateString('default', {
				month: 'long',
				year: 'numeric',
				day: 'numeric'
			})} -
			{new Date(games.at(-1).start_date).toLocaleDateString('default', {
				month: 'long',
				year: 'numeric',
				day: 'numeric'
			})}
		</p> -->
	</div>
</a>
