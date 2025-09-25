<script>
	import GameCard from './GameCard.svelte';

	export let defenses = 0;
	export let start = '';
	export let end = '';
	export let games = [];
	const startDate = new Date(start).toLocaleDateString();
	const endDate = new Date(end).toLocaleDateString();
	import { HiSolidChevronRight } from 'svelte-icons-pack/hi';
	import { HiSolidChevronDown } from 'svelte-icons-pack/hi';
	import { Icon } from 'svelte-icons-pack';

	let showGames = false;
</script>

<div>
	<button
		on:click={() => (showGames = !showGames)}
		class="card hover:bg-card-hover flex w-full flex-row items-center justify-between space-x-8 px-3 py-3 font-mono"
	>
		<div class="flex items-center gap-2">
			<Icon
				src={showGames ? HiSolidChevronDown : HiSolidChevronRight}
				size={'16'}
				color={'black'}
			/>
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
	</button>

	{#if showGames}
		<div class="mx-auto my-4 w-full max-w-lg rounded">
			{#each games as game}
				<GameCard
					slug={game.home_team.slug}
					logoFile={game.home_team.logoFile}
					name={game.home_team.name}
					awaylogoFile={game.away_team.logoFile}
					awayname={game.away_team.name}
					points={game.home_points}
					away_points={game.away_points}
					end={true}
					start_date={game.start_date}
				/>
			{/each}
		</div>
	{/if}
</div>
