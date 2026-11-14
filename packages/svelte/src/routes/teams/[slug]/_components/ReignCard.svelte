<script lang="ts">
	import { HiSolidChevronRight } from 'svelte-icons-pack/hi';
	import { HiSolidChevronDown } from 'svelte-icons-pack/hi';
	import { Icon } from 'svelte-icons-pack';
	import type { Snippet } from 'svelte';
	import GameTableHeader from './GameTableHeader.svelte';

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

{#snippet tableCell(value: string)}
	<td class="font-mono text-sm text-foreground">
		{value}
	</td>
{/snippet}

<tr class="border border-border">
	<td>
		<button
			onclick={() => (showGames = !showGames)}
			class="flex w-full items-center justify-between px-4 py-3 transition-colors hover:bg-card-hover"
		>
			<div class="flex items-center gap-2">
				<Icon src={showGames ? HiSolidChevronDown : HiSolidChevronRight} size="16" color="black" />
			</div>
		</button>
	</td>
	{@render tableCell(startDate)}
	{@render tableCell(endDate)}

	<td>
		<span class="font-mono text-sm text-foreground-muted">
			{defenses}
			{defenses === 1 ? 'Defense' : 'Defenses'}
		</span>
	</td>
</tr>

{#if showGames}
	<tr>
		<td colspan="4" class="px-8">
			<table class="w-full divide-y divide-border bg-background-secondary">
				<GameTableHeader />
				<tbody class="divide-y divide-border">
					{@render children()}
				</tbody>
			</table>
		</td>
	</tr>
{/if}
