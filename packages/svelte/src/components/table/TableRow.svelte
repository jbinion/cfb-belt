<script lang="ts">
	import formatDate from '../../utils/formatDate';
	import type { Snippet } from 'svelte';
	interface Props {
		name?: string;
		logo?: string;
		slug?: string;
		startDate?: string;
		defendCount?: number;
		number: number;
	}

	let {
		name = '',
		logo = '',
		slug = '',
		startDate = '',
		defendCount = 0,
		number = 0,
	}: Props = $props();

	const href = $derived(`/teams/${slug}`);
</script>

{#snippet td(content: string | number | Snippet, end = false)}
	<td
		class="px-2 py-2 text-sm text-foreground-muted md:px-4 md:py-3 md:text-[15px]"
		class:text-end={end}
	>
		{#if typeof content === 'function'}
			{@render content()}
		{:else}
			{content}
		{/if}
	</td>
{/snippet}

{#snippet team()}
	<a {href} class="flex items-center gap-3 font-semibold text-foreground">
		<img src={`/webp/large/${logo}.webp`} class="h-10 w-10 flex-shrink-0" alt={`${name} logo`} />
		<span>{name}</span>
	</a>
{/snippet}

<tr class="transition-colors hover:bg-card-hover">
	{@render td(number)}
	{@render td(team)}
	{@render td(formatDate(startDate))}
	{@render td(`${defendCount} ${defendCount === 1 ? 'Defense' : 'Defenses'}`, true)}
</tr>
