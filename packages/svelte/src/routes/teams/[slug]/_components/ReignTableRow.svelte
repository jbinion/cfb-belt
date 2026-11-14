<script lang="ts">
	import { HiSolidChevronRight } from 'svelte-icons-pack/hi';
	import { HiSolidChevronDown } from 'svelte-icons-pack/hi';
	import { Icon } from 'svelte-icons-pack';
	import type { Snippet } from 'svelte';
	import GameTable from './GameTable.svelte';

	interface Props {
		start?: string;
		end?: string;
		defenses?: number;
		children: Snippet;
	}

	let { start = '', end = '', defenses = 0, children }: Props = $props();

	const fmt = (d: string) => {
		return new Date(d).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		});
	};
	const startDate = $derived(fmt(start));
	const endDate = $derived(end ? fmt(end) : 'Present');

	let showGames = $state(false);
</script>

{#snippet tableCell(value: string, className?: string)}
	<td class={`font-mono text-sm text-foreground ${className}`}>
		{value}
	</td>
{/snippet}

<tr
	class="cursor-pointer transition-colors hover:bg-card-hover"
	onclick={() => (showGames = !showGames)}
>
	<td class="flex w-full items-center justify-between px-4 py-3 font-mono text-sm text-foreground">
		<Icon src={showGames ? HiSolidChevronDown : HiSolidChevronRight} size="16" color="black" />
	</td>
	{@render tableCell(startDate)}
	{@render tableCell(endDate, '!text-foreground-muted')}
	{@render tableCell(
		`${defenses} ${defenses === 1 ? 'Defense' : 'Defenses'}`,
		'!text-foreground-muted'
	)}
</tr>

{#if showGames}
	<GameTable>
		{@render children()}
	</GameTable>
{/if}
