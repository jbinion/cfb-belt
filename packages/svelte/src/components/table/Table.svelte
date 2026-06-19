<script lang="ts">
	import TableItem from './TableItem.svelte';

	interface Reign {
		id: number;
		startDate: string;
		defenseCount: number;
		team: { name: string; logoFile: string; slug: string } | null;
	}

	export let reigns: Reign[];
	export let dateFirst = false;
</script>

<table class="w-full border-collapse">
	<thead class="border-b border-foreground">
		<tr>
			{#if dateFirst}
				<th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-foreground-muted">Claimed</th>
			{/if}
			<th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-foreground-muted">Team</th>
			{#if !dateFirst}
				<th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-foreground-muted">Claimed</th>
			{/if}
			<th class="px-4 py-3 text-end text-xs font-semibold uppercase tracking-wide text-foreground-muted">Defenses</th>
		</tr>
	</thead>
	<tbody class="divide-y divide-border">
		{#each reigns as item (item.id)}
			<TableItem
				name={item.team?.name}
				logo={`${item.team?.logoFile}`}
				slug={item.team?.slug}
				startDate={item.startDate}
				defendCount={item.defenseCount}
				{dateFirst}
			/>
		{/each}
	</tbody>
</table>
