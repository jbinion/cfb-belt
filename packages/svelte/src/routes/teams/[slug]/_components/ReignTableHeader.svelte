<script lang="ts"></script>

{#snippet tableCell(value: string)}
	<th class="px-2 py-3 text-start text-xs font-semibold tracking-wide text-foreground-muted"
		>{value}</th
	>
{/snippet}

<thead>
	<tr class="border-b border-black">
		{@render tableCell('')}
		{@render tableCell('Claimed')}
		{@render tableCell('Lost')}
		{@render tableCell('Defenses')}
	</tr>
</thead>
