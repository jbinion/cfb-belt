<script lang="ts">
	import type { Reign } from '../types';
	import TeamRow from './TeamRow.svelte';

	export let reigns: Reign[];
</script>

<table class="w-full">
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
