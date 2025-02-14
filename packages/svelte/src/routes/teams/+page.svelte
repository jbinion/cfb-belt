<script lang="ts">
	import type { PageData } from './$types';
	import LogoCard from './LogoCard.svelte';

	let { data }: { data: PageData } = $props();
	let sortDirection = $state<'asc' | 'desc'>('asc');
	let sortBy = $state<'name' | 'reigns' | 'defenses'>('name');

	const sortedTeams = $derived(
		[...data.teams].sort((a, b) => {
			const modifier = sortDirection === 'asc' ? 1 : -1;
			if (sortBy === 'name') {
				return a.name.localeCompare(b.name) * modifier;
			} else if (sortBy === 'reigns') {
				return (a.reigns - b.reigns) * modifier;
			} else {
				return (a.defenses - b.defenses) * modifier;
			}
		})
	);

	function toggleSort() {
		sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
	}

	function setSortBy(type: 'name' | 'reigns' | 'defenses') {
		if (sortBy === type) {
			toggleSort();
		} else {
			sortBy = type;
			sortDirection = 'desc';
		}
	}
</script>

<div class="controls mb-8 flex flex-wrap items-center justify-center gap-4">
	<p class="font-mono">Sort By:</p>
	<button
		class="sortButton"
		class:text-blue-700={sortBy === 'name'}
		on:click={() => setSortBy('name')}
	>
		Name
		<span class="inline-block w-2">
			{sortBy === 'name' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
		>
	</button>

	<button
		class="sortButton"
		class:text-blue-700={sortBy === 'name'}
		on:click={() => setSortBy('reigns')}
	>
		Reigns
		<span class="inline-block w-2">
			{sortBy === 'reigns' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span
		>
	</button>

	<button
		class="sortButton"
		class:text-blue-700={sortBy === 'name'}
		on:click={() => setSortBy('defenses')}
	>
		Defenses
		<span class="inline-block w-2">
			{sortBy === 'defenses' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
		</span>
	</button>
</div>

<div class="team-list">
	{#if sortedTeams.length}
		<div class="grid grid-cols-4 gap-4">
			{#each sortedTeams as team}
				{#key `${sortBy}-${sortDirection}-${team.slug}`}
					<LogoCard
						logo={`${team.logoFile}`}
						name={team.name}
						slug={team.slug}
						reigns={team.reigns}
						defenses={team.defenses}
					/>
				{/key}
			{/each}
		</div>
	{/if}
</div>

<style>
	.team-list {
		margin-top: 20px;
	}
	.controls {
		padding: 1rem 0;
	}
</style>
