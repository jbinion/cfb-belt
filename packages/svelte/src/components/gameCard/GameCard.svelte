<script lang="ts">
	import GameRow from './GameRow.svelte';

	export let game: { homeTeam: any; awayTeam: any };
	export let points: number | string = '';
	export let awayPoints: number | string = '';
	export let startDate = '';
	export let title = '';

	const badgeClass: Record<string, string> = {
		'Belt Won': 'border-green-200 bg-green-50 text-green-700',
		'Belt Lost': 'border-red-200 bg-red-50 text-red-700',
		Defense: 'border-[#e5e5e5] bg-gray-50 text-foreground-muted',
	};
</script>

<div class="overflow-hidden rounded-lg border border-[#e5e5e5] bg-white shadow-sm">
	<div class="flex items-center justify-between border-b border-[#e5e5e5] px-4 py-2">
		<span class="font-mono text-xs text-foreground-muted">
			{new Date(startDate).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'short',
				day: 'numeric',
			})}
		</span>
		<span
			class="rounded border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide {badgeClass[
				title
			] ?? badgeClass['Defense']}"
		>
			{title}
		</span>
	</div>
	<div class="divide-y divide-[#e5e5e5]">
		<GameRow team={game.awayTeam} points={awayPoints} />
		<GameRow team={game.homeTeam} {points} />
	</div>
</div>
