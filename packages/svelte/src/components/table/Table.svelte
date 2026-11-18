<script lang="ts">
	import TableRow from './TableRow.svelte';

	interface Reign {
		id: number;
		startDate: string;
		defenseCount: number;
		team: { name: string; logoFile: string; slug: string } | null;
	}

	interface Props {
		reigns: Reign[];
	}

	let { reigns }: Props = $props();
</script>

{#snippet tableHeader(title: string, textEnd: boolean = false)}
	<th
		class={`px-4 py-3 text-xs font-semibold tracking-wide text-foreground-muted uppercase ${textEnd ? 'text-end' : 'text-left'}`}
		>{title}</th
	>
{/snippet}

<table class="w-full border-collapse">
	<thead class="border-b border-foreground">
		<tr>
			{@render tableHeader('#')}
			{@render tableHeader('Team')}
			{@render tableHeader('Claimed')}
			{@render tableHeader('Defenses', true)}
		</tr>
	</thead>
	<tbody class="divide-y divide-border">
		{#each reigns as item (item.id)}
			<TableRow
				number={item.id}
				name={item.team?.name}
				logo={`${item.team?.logoFile}`}
				slug={item.team?.slug}
				startDate={item.startDate}
				defendCount={item.defenseCount}
			/>
		{/each}
	</tbody>
</table>
