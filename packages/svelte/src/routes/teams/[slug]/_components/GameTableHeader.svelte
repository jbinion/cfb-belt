<script lang="ts"></script>

{#snippet th(value: string)}
	<th class="px-2 py-3 text-start text-xs tracking-wide text-foreground-muted">{value}</th>
{/snippet}

<thead>
	<tr>
		{@render th('Date')}
		{@render th('Opponent')}
		{@render th('Result')}
		{@render th('Belt')}
	</tr>
</thead>
