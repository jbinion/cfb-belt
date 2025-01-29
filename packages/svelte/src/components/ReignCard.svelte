<script>
	import GameCard from './GameCard.svelte';

	export let defenses = 0;
	export let start = '';
	export let end = '';
	export let wonFrom = '';
	export let lostTo = '';
	export let games = [];
	const startDate = new Date(start).toLocaleDateString();
	const endDate = new Date(end).toLocaleDateString();

	let showGames = false;
</script>

<div>
	<div class="flex flex-row border p-4 text-center font-mono">
		<div class=" mb-2">
			<p class="m-0 leading-6">
				{startDate} -
				{endDate}
			</p>
		</div>

		<div class="flex flex-row justify-center space-x-2">
			<p class=" text-xs">
				{defenses}
				{defenses === 1 ? 'Defense' : 'Defenses'}
			</p>
		</div>
		<div>{wonFrom}</div>
	</div>
	<button
		class="w-full bg-blue-500 py-2 text-white transition-colors hover:bg-blue-600"
		on:click={() => (showGames = !showGames)}
	>
		{showGames ? 'Hide Games' : 'Show Games'}
	</button>
	{#if showGames}
		<div class="mx-auto my-4 w-full max-w-lg rounded bg-gray-100">
			{#each games as game}
				<div class="flex flex-row justify-center space-x-4">
					<GameCard
						slug={game.away_team.slug}
						logoFile={game.away_team.logoFile}
						name={game.away_team.name}
						points={game.away_points}
						end={true}
					/>
					<GameCard
						slug={game.home_team.slug}
						logoFile={game.home_team.logoFile}
						name={game.home_team.name}
						points={game.home_points}
					/>
				</div>
			{/each}
		</div>
	{/if}
</div>
