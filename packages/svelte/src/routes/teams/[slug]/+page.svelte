<!-- <script>
</script> -->

<script lang="ts">
	import type { PageData } from './$types';
	import ReignCard from '../../../components/ReignCard.svelte';

	let { data }: { data: PageData } = $props();
</script>

<div class="space-y-2">
	{#if data.reigns}
		<div class="flex flex-row items-center space-x-6 p-4">
			<img
				src={`/logos/${data.team.logoFile}`}
				class="h-[90px] w-[90px]"
				alt={`logo of current belt holder; ${data.team.name}`}
			/>
			<div class="flex flex-col justify-center text-black">
				<h2 class="text-4xl font-bold">
					{data.team.name}
				</h2>
			</div>

			<div class="flex flex-1 flex-row items-center justify-center space-x-4">
				<div class="border p-4">
					<p>{data.reigns.length} Reigns</p>
				</div>

				<div class="border p-4">
					<p>{data.reigns.reduce((acc, curr) => acc + curr.games.length - 1, 0)} Defenses</p>
				</div>
			</div>
		</div>
		<div></div>
		<div class="flex flex-col space-y-4">
			{#each data.reigns as reign}
				<ReignCard
					defenses={reign.games.length - 1}
					start={reign.games[0].start_date}
					end={reign.games.at(-1).start_date}
					games={reign.games}
				/>
			{/each}
		</div>
	{/if}
</div>
