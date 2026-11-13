<script lang="ts">
	import TeamIcon from './TeamIcon.svelte';
	import CurrentHolderText from './CurrentHolderText.svelte';
	import StatsRow from './StatsRow.svelte';
	import NextGame from './NextGame.svelte';
	import { date } from 'drizzle-orm/mysql-core';
	import formatDate from '../../utils/formatDate';
	import getLogoUrl from '../../utils/getLogoUrl';
	interface Props {
		color?: string;
		logoFile?: string;
		teamName?: string;
		slug?: string;
		startDate?: string;
		currentHolderTotalReigns?: number;
		currentDefenseCount?: number;
	}

	let {
		color = 'E4E4E7',
		logoFile = '',
		teamName = '',
		slug = '',
		startDate = '',
		currentHolderTotalReigns = 0,
		currentDefenseCount = 0,
		nextGameStartDate = date.now(),
		nextChallenger = '',
	}: Props = $props();
</script>

<a href="/teams/{slug}" class="overflow-hidden border-[1px] border-border">
	<div class="flex flex-row">
		<div class="flex flex-[8] flex-row border-r-[1px] p-6 pr-0">
			<TeamIcon {color} {teamName} {logoFile} />
			<CurrentHolderText {teamName} />
		</div>
		<div class=" flex-[7]">
			<div class="flex h-full flex-col">
				<StatsRow {startDate} {currentHolderTotalReigns} {currentDefenseCount} />

				<div class="flex flex-row items-center space-x-4 p-2">
					<p class="text-[11px] uppercase tracking-wide text-foreground-muted">Next game</p>
					<div class="flex flex-row items-center space-x-2">
						<img
							src={getLogoUrl({ logoFile: nextChallenger.logoFile, size: 'small' })}
							alt={`${nextChallenger.name} logo`}
						/>
						<span class="font-bold text-foreground">
							{nextChallenger.name}
						</span>
					</div>

					<p class="text-[11px] uppercase tracking-wide text-foreground-muted">
						{formatDate(nextGameStartDate, {
							month: 'short',
							day: 'numeric',
							hour: 'numeric',
							minute: '2-digit',
							timeZoneName: 'short',
						})}
					</p>
				</div>
			</div>
		</div>
	</div>
</a>
