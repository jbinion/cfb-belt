<script lang="ts"></script>

{#snippet tableCell(value: string)}
	<th
		class={`px-2 py-3 text-start text-xs font-semibold uppercase tracking-wide text-foreground-muted `}
		>{value}</th
	>
{/snippet}

<thead>
	<tr>
		<th
			class={`px-2 py-3 text-start text-xs font-semibold uppercase tracking-wide text-foreground-muted `}
		></th>
		{@render tableCell('Claimed')}
		{@render tableCell('Lost')}
		{@render tableCell('Defenses')}
	</tr>
</thead>
