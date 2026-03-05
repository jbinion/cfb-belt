<script lang="ts">
	import type { Reign } from '../types';
	import TableItem from './TableItem.svelte';

	export let reigns: Reign[];
</script>

<table class="w-full border-collapse">
	<thead class="border-b border-black">
		<tr>
			<th
				class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-foreground-muted"
				>Team</th
			>
			<th
				class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-foreground-muted"
				>Claimed</th
			>

			<th
				class="px-4 py-3 text-end text-xs font-semibold uppercase tracking-wide text-foreground-muted"
				>Defenses</th
			>
		</tr>
	</thead>
	<tbody>
		{#each reigns as item (item._id)}
			<TableItem
				name={item.team?.name}
				logo={`${item.team?.logoFile}`}
				slug={item.team?.slug}
				startDate={item.startDate}
				defendCount={item.games.length - 1}
			/>
		{/each}
	</tbody>
</table>
