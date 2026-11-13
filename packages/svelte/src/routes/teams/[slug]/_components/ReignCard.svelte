<script lang="ts">
	import { HiSolidChevronRight } from 'svelte-icons-pack/hi';
	import { HiSolidChevronDown } from 'svelte-icons-pack/hi';
	import { Icon } from 'svelte-icons-pack';
	import type { Snippet } from 'svelte';

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

<tr class="border border-border">
	<td>
		<button
			onclick={() => (showGames = !showGames)}
			class="flex w-full items-center justify-between border-b border-border px-4 py-3 transition-colors hover:bg-card-hover"
		>
			<div class="flex items-center gap-2">
				<Icon src={showGames ? HiSolidChevronDown : HiSolidChevronRight} size="16" color="black" />
			</div>
		</button>
	</td>
	<td>
		<span class="font-mono text-sm text-foreground">{startDate}</span>
	</td>
	<td>
		<span class="font-mono text-sm text-foreground"> {endDate}</span>
	</td>
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
				<thead>
					<tr>
						<th
							class={`px-2 py-3 text-start text-xs font-semibold uppercase tracking-wide text-foreground-muted `}
							>Date</th
						>
						<th
							class={`px-2 py-3 text-start text-start text-xs font-semibold uppercase tracking-wide text-foreground-muted `}
							>Opponent</th
						>
						<th
							class={`px-2 py-3 text-start text-xs font-semibold uppercase tracking-wide text-foreground-muted `}
							>Result</th
						>
						<th
							class={`px-2 py-3 text-start text-xs font-semibold uppercase tracking-wide text-foreground-muted `}
							>Belt</th
						>
					</tr>
				</thead>
				<tbody class="divide-y divide-border">
					{@render children()}
				</tbody>
			</table>
		</td>
	</tr>
	<!-- <div class=" px-8">
	
	</div> -->
{/if}
