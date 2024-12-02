<script>
	export let name = '';
	export let days = 0;
	export let games = [];
	export let logo = '';
	const href = `/teams/${encodeURIComponent(name.toLocaleLowerCase())}`;
	// take in games
	// figure out who team won from and who lost too
</script>

<div class="flex items-center space-x-4">
	<img src={logo} class="h-12" alt={`${name} logo`} />
	<div>
		<a class="text-black" {href}>{name}</a>
		<div class="flex flex-row space-x-4">
			<p class="text-sm">{games.length - 2} Defenses</p>
			<p class="text-sm">
				{days} days {new Date(games[0].start_date).toLocaleDateString()} -
				{new Date(games.at(-1).start_date).toLocaleDateString()}
			</p>
		</div>
	</div>
</div>
