<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	type SortKey = 'name' | 'reigns' | 'defenses' | 'daysHeld' | 'longestReignDays';
	const columns: { key: SortKey; label: string }[] = [
		{ key: 'name', label: 'Team' },
		{ key: 'reigns', label: 'Reigns' },
		{ key: 'defenses', label: 'Defenses' },
		{ key: 'daysHeld', label: 'Days held' },
		{ key: 'longestReignDays', label: 'Longest reign' },
	];

	type NumericKey = Exclude<SortKey, 'name'>;

	// When teams tie on a column, these columns decide, in order, biggest first.
	const tieBreakers: Partial<Record<SortKey, NumericKey[]>> = {
		reigns: ['defenses'],
	};

	let sortBy = $state<SortKey>('name');
	let sortDirection = $state<'asc' | 'desc'>('asc');
	let search = $state('');

	const sortedTeams = $derived(
		[...data.teams]
			.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()))
			.sort((a, b) => {
				const primary = sortBy === 'name' ? a.name.localeCompare(b.name) : a[sortBy] - b[sortBy];
				if (primary !== 0) return sortDirection === 'asc' ? primary : -primary;

				// Tie: tie-breakers always put the bigger number first, whichever way the column sorts.
				for (const key of tieBreakers[sortBy] ?? []) {
					const diff = b[key] - a[key];
					if (diff !== 0) return diff;
				}
				return 0;
			})
	);

	// A column's natural direction: A-Z for names, biggest first for numbers.
	const naturalDirection = (key: SortKey) => (key === 'name' ? 'asc' : 'desc');

	// Clicking the active column flips its direction; a new column starts with its natural one.
	function sortOn(key: SortKey) {
		if (sortBy === key) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortBy = key;
			sortDirection = naturalDirection(key);
		}
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

	<div class="flex justify-end">
		<input
			type="search"
			bind:value={search}
			placeholder="Search teams…"
			aria-label="Search teams"
			class="rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground placeholder:text-foreground-muted focus:border-foreground focus:outline-hidden"
		/>
	</div>

	<table class="w-full">
		<thead>
			<tr class="border-b border-foreground">
				<th class="text-foreground-muted">#</th>
				{#each columns as { key, label } (key)}
					<th
						class="px-2 py-3 text-start text-xs font-semibold tracking-wide text-foreground-muted"
						aria-sort={sortBy === key
							? sortDirection === 'asc'
								? 'ascending'
								: 'descending'
							: 'none'}
					>
						<button
							type="button"
							class={['cursor-pointer hover:text-foreground', sortBy === key && 'text-foreground']}
							onclick={() => sortOn(key)}
						>
							{label}
							<span class="inline-block w-3" aria-hidden="true">
								{sortBy === key ? (sortDirection === naturalDirection(key) ? '▼' : '▲') : ''}
							</span>
						</button>
					</th>
				{/each}
			</tr>
		</thead>

		<tbody class="divide-y divide-border border-b border-border">
			{#each sortedTeams as team, index (team.slug)}
				<tr class="relative cursor-pointer hover:bg-background-secondary">
					<td class="p-2 text-center text-xs text-foreground-muted">{index + 1}</td>
					<td class="p-2 text-sm text-foreground-muted">
						<a
							href="/teams/{team.slug}"
							class="flex flex-row items-center gap-x-4 font-bold text-foreground after:absolute after:inset-0"
						>
							<img
								src="/webp/large/{team.logoFile}.webp"
								class="h-8 w-8"
								alt=""
								aria-hidden="true"
							/>
							{team.name}
						</a>
					</td>
					<td class="px-2 text-sm">{team.reigns} </td>
					<td class="px-2 text-sm">{team.defenses} </td>
					<td class="px-2 text-sm">{team.daysHeld.toLocaleString('en-US')}</td>
					<td class="px-2 text-sm">{team.longestReignDays.toLocaleString('en-US')}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
