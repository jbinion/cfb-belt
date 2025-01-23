<!-- <script>
</script> -->

<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import ReignCard from '../../../components/ReignCard.svelte';

	let { data }: { data: PageData } = $props();
	// const teamName = $page.params.slug
	// 	.split(' ')
	// 	.map((x) => x.charAt(0).toUpperCase() + x.slice(1))
	// 	.join(' ');
	// console.log(data);
	// console.log(data.reigns);
	// const totalDays = data.reigns.reduce((acc, curr) => acc + curr.days, 0);

	// const totalDefenses = data.reigns.reduce((acc, curr) => acc + curr.games.length - 2, 0);
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
				<!-- 
				<div class="flex flex-row space-x-4">
					<p>
						{data.reigns.length} Reigns
					</p>
					<p>
						{totalDefenses} Defenses
					</p>
				</div> -->
			</div>
		</div>

		<div class="flex flex-col space-y-4">
			{#each data.reigns as reign}
				<ReignCard
					defenses={reign.games.length - 2}
					start={reign.games[0].start_date}
					end={reign.games.at(-1).start_date}
				/>
			{/each}
		</div>
	{/if}
</div>
