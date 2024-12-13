<script lang="ts">
	import type { PageData } from './$types';
	import LogoCard from './LogoCard.svelte';

	let { data }: { data: PageData } = $props();
	let sortDirection = $state<'asc' | 'desc'>('asc');

	const sortedTeams = $derived(
		[...data.teams].sort((a, b) => {
			const modifier = sortDirection === 'asc' ? 1 : -1;
			return a.name.localeCompare(b.name) * modifier;
		})
	);

	function toggleSort() {
		sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
	}
</script>

<div class="sort-container">
	<button
		class="mb-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
		on:click={toggleSort}
	>
		Sort {sortDirection === 'asc' ? '↑' : '↓'}
	</button>
</div>

<div class="team-list">
	{#if sortedTeams.length}
		<div class="grid grid-cols-4 gap-4">
			{#each sortedTeams as team}
				<LogoCard logo={`logos/${team.logoFile}`} name={team.name} />
			{/each}
		</div>
	{/if}
</div>

<style>
	.sort-container {
		margin: 20px;
	}
	.team-list {
		margin-top: 20px;
	}
</style>
