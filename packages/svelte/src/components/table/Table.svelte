<script lang="ts">
	import TableHeader from './TableHeader.svelte';
	import TableRow from './TableRow.svelte';

	interface Reign {
		id: number;
		startDate: string;
		defenseCount: number;
		team: { name: string; logoFile: string; slug: string } | null;
	}

	interface Props {
		reigns: Reign[];
		dateFirst?: boolean;
	}

	let { reigns, dateFirst = false }: Props = $props();
</script>

<table class="w-full border-collapse">
	<thead class="border-b border-foreground">
		<tr>
			{#if dateFirst}
				<TableHeader title="Claimed" />
			{/if}
			<TableHeader title="Team" />
			{#if !dateFirst}
				<TableHeader title="Claimed" />
			{/if}
			<TableHeader title="Defenses" textEnd={true} />
		</tr>
	</thead>
	<tbody class="divide-y divide-border">
		{#each reigns as item (item.id)}
			<TableRow
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
