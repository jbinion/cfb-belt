<!-- <script>
</script> -->

<script lang="ts">
	import type { PageData } from './$types';
	import ReignCard from '../../../components/ReignCard.svelte';

	let { data }: { data: PageData } = $props();
</script>

<div class="space-y-2">
	{#if !data}
		<div>Loading...</div>
	{/if}
	<!-- nest with else -->

	<!-- {#if !data.reigns}
		<div>
			{teamName} has never held the CFB
		</div>
	{/if} -->

	{#if data.team}
		<p>{data.team.name}</p>
	{/if}
	{#if data.reigns}
		<div class="flex flex-row space-x-4 p-4">
			<img
				src={`/logos/${data.team.logoFile}`}
				class="h-[90px] w-[90px]"
				alt={`logo of current belt holder; ${data.team.name}`}
			/>
			<div class="flex flex-col justify-center">
				<h2 class="text-4xl font-bold">
					{data.team.name}
				</h2>
			</div>
		</div>
		<div>
			{data.reigns.length} Reigns
			{data.reigns.reduce((acc, curr) => acc + curr.games.length - 1, 0)} Defenses
		</div>
		<div class="flex flex-col space-y-4">
			{#each data.reigns as reign}
				<ReignCard
					defenses={reign.games.length - 1}
					start={reign.games[0].start_date}
					end={reign.games.at(-1).start_date}
				/>
				<!-- {`${JSON.stringify(reign.games)}`} -->
				<div>
					{#each reign.games as game}
						<div class="py-4">
							<a href={`/teams/${game.away_team.slug}`}>
								<img
									src={`/logos/${game.away_team.logoFile}`}
									class="h-[50px] w-[50px]"
									alt={`logo of ${game.away_team.name}`}
								/>
							</a>
							<p>{game.away_team.name} {game.away_points}</p>
							<a href={`/teams/${game.home_team.slug}`}>
								<img
									src={`/logos/${game.home_team.logoFile}`}
									class="h-[50px] w-[50px]"
									alt={`logo of ${game.home_team.name}`}
								/>
							</a>
							<p>{game.home_team.name} {game.home_points}</p>
						</div>
					{/each}
				</div>
			{/each}
		</div>
	{/if}
</div>
