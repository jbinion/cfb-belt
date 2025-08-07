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

	function setSortBy(type: 'name' | 'reigns' | 'defenses') {
		if (type === 'name') {
			sortBy = type;
			sortDirection = 'asc';
			return;
		}
		sortBy = type;
		sortDirection = 'desc';
	}
</script>

<svelte:head>
	<title>College Football Belt Teams | CFB Belt Tracker</title>
	<meta
		name="description"
		content="View all college football teams that have held the belt, including their reign counts and successful defenses."
	/>
</svelte:head>

<div>
	<h2 class="sectionTitle text-center text-2xl lg:text-start">All College Football Belt Holders</h2>
	<nav class="controls flex flex-wrap items-center justify-start" aria-label="Sort options">
		<fieldset class="flex flex-row gap-4">
			<button
				class="sortButton"
				class:text-blue-700={sortBy === 'name'}
				onclick={() => setSortBy('name')}
				aria-pressed={sortBy === 'name'}
				aria-label="Sort by team name"
			>
				Name
			</button>

			<button
				class="sortButton"
				class:text-blue-700={sortBy === 'reigns'}
				onclick={() => setSortBy('reigns')}
				aria-pressed={sortBy === 'reigns'}
				aria-label="Sort by number of reigns "
			>
				Reigns
			</button>

			<button
				class="sortButton"
				class:text-blue-700={sortBy === 'defenses'}
				onclick={() => setSortBy('defenses')}
				aria-pressed={sortBy === 'defenses'}
				aria-label="Sort by number of defenses "
			>
				Defenses
			</button>
		</fieldset>
	</nav>
</div>

<section class="team-list" aria-label="Team List">
	{#if sortedTeams.length}
		<div class=" divide-y">
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
	{:else}
		<p class="text-center">No teams found.</p>
	{/if}
</section>

<style>
	.team-list {
		margin-top: 20px;
	}
	.controls {
		padding: 1rem 0;
	}
</style>
