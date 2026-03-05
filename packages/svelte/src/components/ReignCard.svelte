<script>
	import { HiSolidChevronRight } from 'svelte-icons-pack/hi';
	import { HiSolidChevronDown } from 'svelte-icons-pack/hi';
	import { Icon } from 'svelte-icons-pack';

	let { start = '', end = '', defenses = 0, children } = $props();

	const fmt = (d) =>
		new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
	const startDate = fmt(start);
	const endDate = end ? fmt(end) : 'Present';

	let showGames = $state(false);
</script>

<div class="overflow-hidden rounded-lg border border-border bg-white shadow-sm">
	<button
		onclick={() => (showGames = !showGames)}
		class="flex w-full items-center justify-between px-4 py-3 transition-colors hover:bg-card-hover"
	>
		<div class="flex items-center gap-2">
			<Icon src={showGames ? HiSolidChevronDown : HiSolidChevronRight} size="16" color="black" />
			<span class="font-mono text-sm text-foreground">{startDate} — {endDate}</span>
		</div>
		<span class="font-mono text-sm text-foreground-muted">
			{defenses}
			{defenses === 1 ? 'Defense' : 'Defenses'}
		</span>
	</button>

	{#if showGames}
		<div class="mx-auto w-full max-w-screen-sm space-y-3 border-t border-border p-4">
			{@render children()}
		</div>
	{/if}
</div>
