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
	}

	let {
		color = 'E4E4E7',
		logoFile = '',
		teamName = '',
		slug = '',
		startDate = '',
		currentHolderTotalReigns = 0,
		currentDefenseCount = 0,
	}: Props = $props();
</script>

<a href="/teams/{slug}" class="overflow-hidden rounded-lg border border-border no-underline">
	<div class="flex flex-row">
		<div class="flex flex-[3] flex-row border-r-2 p-6 pr-0">
			<TeamIcon {color} {teamName} {logoFile} />
			<CurrentHolderText {teamName} />
		</div>
		<div class=" flex-[2]">
			<div class="flex h-full flex-col">
				<StatsRow {startDate} {currentHolderTotalReigns} {currentDefenseCount} />

				<NextGame />
			</div>
		</div>
	</div>
</a>
