<script lang="ts">
	import type { PageData } from './$types';
	import LogoCard from './LogoCard.svelte';

	let { data }: { data: PageData } = $props();
	let sortDirection = $state<'asc' | 'desc'>('asc');
	let viewMode = $state<'grid' | 'row'>('grid');
	let sortBy = $state<'name' | 'reigns' | 'defenses'>('name');

	const sortedTeams = $derived(
		[...data.teams].sort((a, b) => {
			const modifier = sortDirection === 'asc' ? 1 : -1;
			if (sortBy === 'name') {
				return a.name.localeCompare(b.name) * modifier;
			} else if (sortBy === 'reigns') {
				return (a.totalReigns - b.totalReigns) * modifier;
			} else {
				return (a.totalDefenses - b.totalDefenses) * modifier;
			}
		})
	);

	function toggleSort() {
		sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
	}

	function toggleView() {
		viewMode = viewMode === 'grid' ? 'row' : 'grid';
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

<div class="controls mb-8 flex flex-wrap gap-4">
	<button
		class="mb-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
		on:click={toggleView}
	>
		View: {viewMode === 'grid' ? 'Grid' : 'List'}
	</button>

	<button
		class="mb-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
		class:bg-blue-700={sortBy === 'name'}
		on:click={() => setSortBy('name')}
	>
		Sort by Name {sortBy === 'name' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
	</button>

	<button
		class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
		class:bg-blue-700={sortBy === 'reigns'}
		on:click={() => setSortBy('reigns')}
	>
		Sort by Reigns {sortBy === 'reigns' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
	</button>

	<button
		class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
		class:bg-blue-700={sortBy === 'defenses'}
		on:click={() => setSortBy('defenses')}
	>
		Sort by Defenses {sortBy === 'defenses' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
	</button>
</div>

<div class="team-list">
	{#if sortedTeams.length}
		{#if viewMode === 'grid'}
			<div class="grid grid-cols-4 gap-4">
				{#each sortedTeams as team}
					<LogoCard logo={`logos/${team.logoFile}`} name={team.name} slug={team.slug} />
				{/each}
			</div>
		{:else}
			<div class="space-y-4">
				{#each sortedTeams as team}
					<div class="flex items-center rounded-lg border p-4 shadow-sm">
						<img src={`logos/${team.logoFile}`} alt={`${team.name} logo`} class="h-16 w-16" />
						<div class="ml-4 flex-1">
							<h3 class="text-lg font-semibold">{team.name}</h3>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	{/if}
</div>

<style>
	.team-list {
		margin-top: 20px;
	}
	.controls {
		position: sticky;
		top: 0;
		background: white;
		z-index: 10;
		padding: 1rem 0;
	}
</style>
