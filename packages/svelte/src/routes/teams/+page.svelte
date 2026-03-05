<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let sortDirection = $state<'asc' | 'desc'>('asc');
	let sortBy = $state<'name' | 'reigns' | 'defenses'>('name');
	let search = $state('');

	const sortedTeams = $derived(
		[...data.teams]
			.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()))
			.sort((a, b) => {
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
		sortBy = type;
		sortDirection = type === 'name' ? 'asc' : 'desc';
	}
</script>

<svelte:head>
	<title>College Football Belt Teams | CFB Belt Tracker</title>
	<meta
		name="description"
		content="View all college football teams that have held the belt, including their reign counts and successful defenses."
	/>
</svelte:head>

<div class="container py-12">
	<h2 class="pageTitle">All College Football Belt Holders</h2>

	<div class="flex items-center justify-between gap-6">
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
				aria-label="Sort by number of reigns"
			>
				Reigns
			</button>
			<button
				class="sortButton"
				class:active={sortBy === 'defenses'}
				onclick={() => setSortBy('defenses')}
				aria-pressed={sortBy === 'defenses'}
				aria-label="Sort by number of defenses"
			>
				Defenses
			</button>
		</nav>

		<input
			type="search"
			bind:value={search}
			placeholder="Search teams…"
			aria-label="Search teams"
			class="rounded-md border border-[#e5e5e5] bg-white px-3 py-1.5 text-sm text-foreground placeholder:text-foreground-muted focus:border-foreground focus:outline-none"
		/>
	</div>

	<div
		class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
	>
		{#each sortedTeams as team (`${sortBy}-${sortDirection}-${team.slug}`)}
			<a
				href="/teams/{team.slug}"
				class="flex flex-col overflow-hidden rounded-lg border border-[#e5e5e5] bg-white shadow-sm transition-colors hover:bg-card-hover"
			>
				<div class="h-1 w-full" style="background-color: #{team.color}"></div>
				<div class="flex flex-col items-center gap-2 p-4">
					<img src="/webp/large/{team.logoFile}.webp" class="h-12 w-12" alt="" aria-hidden="true" />
					<p class="text-center text-sm font-semibold leading-tight text-foreground">
						{team.name}
					</p>
					<dl class="mt-1 flex w-full justify-around text-center">
						<div>
							<dt class="text-[10px] font-semibold uppercase tracking-wide text-foreground-muted">
								Reigns
							</dt>
							<dd class="font-mono text-sm font-bold text-foreground">{team.reigns}</dd>
						</div>
						<div>
							<dt class="text-[10px] font-semibold uppercase tracking-wide text-foreground-muted">
								Defs
							</dt>
							<dd class="font-mono text-sm font-bold text-foreground">{team.defenses}</dd>
						</div>
					</dl>
				</div>
			</a>
		{/each}
	</div>
</div>
