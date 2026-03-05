<script lang="ts">
	import type { Reign } from '../types';
	import TeamRow from './TeamRow.svelte';

	export let reigns: Reign[];
</script>

<table class="w-full">
	<thead class="border-b border-black">
		<tr>
			<th class="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#737373]">Claimed</th
			>

			<th class="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#737373]">Team</th>

			<th class="px-4 py-3 text-end text-xs font-semibold uppercase tracking-wide text-[#737373]"
				>Defenses</th
			>
		</tr>
	</thead>
	<tbody class="divide-y divide-border">
		{#each reigns as item (item._id)}
			<TeamRow
				name={item.team?.name}
				logo={`${item.team?.logoFile}`}
				slug={item.team?.slug}
				startDate={item.startDate}
				defendCount={item.games.length - 1}
			/>
		{/each}
	</tbody>
</table>
