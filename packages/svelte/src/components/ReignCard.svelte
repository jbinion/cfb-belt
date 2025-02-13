<script>
	import GameCard from './GameCard.svelte';

	export let defenses = 0;
	export let start = '';
	export let end = '';
	export let games = [];
	const startDate = new Date(start).toLocaleDateString();
	const endDate = new Date(end).toLocaleDateString();

	let showGames = false;
</script>

<div>
	<button
		on:click={() => (showGames = !showGames)}
		class="flex w-full flex-row items-center justify-between border p-4 text-center font-mono hover:bg-gray-100"
	>
		<div class="flex flex-row space-x-8">
			<div class=" ">
				<p class="m-0 leading-6">
					{startDate} -
					{endDate}
				</p>
			</div>

			<div class="flex flex-row justify-center space-x-2">
				<p class=" ">
					{defenses}
					{defenses === 1 ? 'Defense' : 'Defenses'}
				</p>
			</div>
		</div>

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
					/>
					<GameCard
						slug={game.home_team.slug}
						logoFile={game.home_team.logoFile}
						name={game.home_team.name}
						points={game.home_points}
						end={true}
					/>
				</div>
			{/each}
		</div>
	{/if}
</div>
