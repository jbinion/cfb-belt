<script lang="ts">
	import formatDate from '../../utils/formatDate';
	import TableItem from './TableItem.svelte';

	interface Props {
		name?: string;
		logo?: string;
		slug?: string;
		startDate?: string;
		defendCount?: number;
		dateFirst?: boolean;
	}

	let {
		name = '',
		logo = '',
		slug = '',
		startDate = '',
		defendCount = 0,
		dateFirst = false,
	}: Props = $props();

	const href = $derived(`/teams/${slug}`);
</script>

<tr class="transition-colors hover:bg-card-hover">
	{#if dateFirst}
		<TableItem collapse={true}>{formatDate(startDate)}</TableItem>
	{/if}
	<TableItem>
		<a {href} class="flex items-center gap-3 font-semibold text-foreground">
			<img src={`/webp/large/${logo}.webp`} class="h-10 w-10 flex-shrink-0" alt={`${name} logo`} />
			<span>{name}</span>
		</a>
	</TableItem>

	{#if !dateFirst}
		<TableItem>{formatDate(startDate)}</TableItem>
	{/if}
	<TableItem textEnd={true}>
		{`${defendCount} ${defendCount === 1 ? 'Defense' : 'Defenses'}`}</TableItem
	>
</tr>
