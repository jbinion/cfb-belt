<script lang="ts">
	import formatDate from '../../utils/formatDate';

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
		<td class="w-0 px-4 py-3 text-[15px] text-foreground-muted">{formatDate(startDate)}</td>
	{/if}
	<td class="px-4 py-3 text-[15px]">
		<a {href} class="flex items-center gap-3 font-semibold text-foreground">
			<img src={`/webp/large/${logo}.webp`} class="h-10 w-10 flex-shrink-0" alt={`${name} logo`} />
			<span>{name}</span>
		</a>
	</td>
	{#if !dateFirst}
		<td class="px-4 py-3 text-[15px] text-foreground-muted">{formatDate(startDate)}</td>
	{/if}
	<td class="px-4 py-3 text-end text-[15px]">
		{defendCount}
		{defendCount === 1 ? 'Defense' : 'Defenses'}
	</td>
</tr>
