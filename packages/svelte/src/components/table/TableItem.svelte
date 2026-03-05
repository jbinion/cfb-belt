<script lang="ts">
	import formatDate from '../../utils/formatDate';

	export let name = '';
	export let logo = '';
	export let slug = '';
	export let startDate = 0;
	export let defendCount = 0;
	export let dateFirst = false;

	const href = `/teams/${slug}`;
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
