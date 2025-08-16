<script lang="ts">
	import type { PageData } from './$types';
	import LogoCard from '../../components/LogoCard.svelte';

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

<h2 class="pageTitle">All College Football Belt Holders</h2>
<nav class="space-x-6" aria-label="Sort options">
	<button
		class="sortButton"
		class:active={sortBy === 'name'}
		onclick={() => setSortBy('name')}
		aria-pressed={sortBy === 'name'}
		aria-label="Sort by team name"
	>
		Name
	</button>

	<button
		class="sortButton"
		class:active={sortBy === 'reigns'}
		onclick={() => setSortBy('reigns')}
		aria-pressed={sortBy === 'reigns'}
		aria-label="Sort by number of reigns "
	>
		Reigns
	</button>

	<button
		class="sortButton"
		class:active={sortBy === 'defenses'}
		onclick={() => setSortBy('defenses')}
		aria-pressed={sortBy === 'defenses'}
		aria-label="Sort by number of defenses "
	>
		Defenses
	</button>
</nav>

<section class="mt-8" aria-label="Team List">
	<div class="divide-y">
		{#each sortedTeams as team (`${sortBy}-${sortDirection}-${team.slug}`)}
			<LogoCard
				logo={`${team.logoFile}`}
				name={team.name}
				slug={team.slug}
				reigns={team.reigns}
				defenses={team.defenses}
			/>
		{/each}
	</div>
</section>
