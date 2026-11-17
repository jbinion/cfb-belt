<script lang="ts">
	import TeamIcon from './TeamIcon.svelte';
	import CurrentHolderText from './CurrentHolderText.svelte';
	import StatsRow from './StatsRow.svelte';
	import NextGame from './NextGame.svelte';

	interface Props {
		color?: string;
		logoFile?: string;
		teamName?: string;
		slug?: string;
		startDate?: string;
		currentHolderTotalReigns?: number;
		currentDefenseCount?: number;
		nextGameStartDate?: string | null;
		nextChallenger?: { name: string; logoFile: string } | null;
	}

	let {
		color = 'E4E4E7',
		logoFile = '',
		teamName = '',
		slug = '',
		startDate = '',
		currentHolderTotalReigns = 0,
		currentDefenseCount = 0,
		nextGameStartDate = null,
		nextChallenger = null,
	}: Props = $props();
</script>

<a href="/teams/{slug}" class="overflow-hidden border border-border">
	<div class="flex flex-row">
		<div class="flex flex-[8] flex-row border-r border-border p-6 pr-0">
			<TeamIcon {color} {teamName} {logoFile} />
			<CurrentHolderText {teamName} />
		</div>
		<div class="flex-[7]">
			<div class="flex h-full flex-col">
				<StatsRow {startDate} {currentHolderTotalReigns} {currentDefenseCount} />
				<NextGame {nextChallenger} {nextGameStartDate} />
			</div>
		</div>
	</div>
</a>
