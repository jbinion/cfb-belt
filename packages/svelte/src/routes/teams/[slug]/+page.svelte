<!-- <script>
</script> -->

<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import ReignCard from '../../../components/ReignCard.svelte';

	let { data }: { data: PageData } = $props();
	const teamName = $page.params.slug
		.split(' ')
		.map((x) => x.charAt(0).toUpperCase() + x.slice(1))
		.join(' ');
	console.log(data.slug);
	console.log(data.reigns);
	const totalDays = data.reigns.reduce((acc, curr) => acc + curr.days, 0);

	const totalDefenses = data.reigns.reduce((acc, curr) => acc + curr.games.length - 2, 0);
</script>

<div class="space-y-2">
	<h2 class="text-4xl font-bold">
		{teamName}
	</h2>

	{#if !data}
		<div>Loading...</div>
	{/if}
	<!-- nest with else -->

	{#if !data.reigns}
		<div>
			{teamName} has never held the CFB
		</div>
	{/if}

	{#if data.reigns}
		<div>
			{data.reigns.length} reigns
			{totalDays} days held
			{totalDefenses} defenses
		</div>
		<div class="grid grid-cols-4 gap-4">
			{#each data.reigns as reign}
				<ReignCard
					days={reign.days}
					defenses={reign.games.length - 2}
					start={reign.games[0].start_date}
					end={reign.games.at(-1).start_date}
				/>
			{/each}
		</div>
	{/if}
</div>
