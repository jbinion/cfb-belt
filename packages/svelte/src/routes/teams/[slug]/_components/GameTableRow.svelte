<script lang="ts">
	import getLogoUrl from '../../../../utils/getLogoUrl';
	import type { Team } from '@cfb/db';

	interface Props {
		game: {
			homeTeam: Team | null;
			awayTeam: Team | null;
		};
		points?: number | string;
		awayPoints?: number | string;
		startDate?: string;
		title?: string;
		reignTeamId: string;
	}

	let {
		game,
		points = '',
		awayPoints = '',
		startDate = '',
		title = '',
		reignTeamId = '',
	}: Props = $props();

	const badgeClass: Record<string, string> = {
		'Belt Won': 'border-green-200 bg-green-50 text-green-700',
		'Belt Lost': 'border-red-200 bg-red-50 text-red-700',
		Defense: 'border-[#e5e5e5] bg-gray-50 text-foreground-muted',
	};
	const pointsDisplay = $derived(
		awayPoints > points ? `${awayPoints} - ${points}` : `${points} - ${awayPoints}`
	);
	const isHome = $derived(game.homeTeam?.id === reignTeamId);
	const isAway = $derived(game.awayTeam?.id === reignTeamId);
	const opponent = $derived(isAway ? game.homeTeam : game.awayTeam);
</script>

<tr class="bg-background-secondary">
	<td class="p-2 font-mono text-xs text-foreground-muted">
		{new Date(startDate).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		})}
	</td>
	<td class="space-x-2 px-2">
		<div class="flex flex-row items-center space-x-2">
			<p>{isAway ? '@' : 'vs'}</p>

			<img
				src={getLogoUrl({ logoFile: opponent.logoFile, size: 'small' })}
				alt={`${opponent.name} logo`}
				class="h-6 w-6"
			/>
			<p>{opponent.name}</p>
		</div>
	</td>
	<td class="px-2">
		<div class="flex flex-row space-x-2">
			<p class="font-bold">{title === 'Belt Lost' ? 'L' : 'W'}</p>
			<p>{pointsDisplay}</p>
		</div>
	</td>
	<td class="px-2 align-middle">
		<p
			class="inline-block rounded border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide {badgeClass[
				title
			] ?? badgeClass['Defense']}"
		>
			{title}
		</p>
	</td>
</tr>
