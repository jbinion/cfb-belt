<script lang="ts">
	import numberSuffix from '../../utils/numberSuffix';
	import formatDate from '../../utils/formatDate';
	import Stats from './Stats.svelte';

	interface Props {
		startDate?: string;
		currentHolderTotalReigns?: number;
		currentDefenseCount?: number;
	}

	let { startDate = '', currentHolderTotalReigns = 0, currentDefenseCount = 0 }: Props = $props();
</script>

<div class=" hidden w-full flex-1 flex-row divide-x-[1px] border-b-[1px] md:flex">
	<Stats title={'Claimed'} value={formatDate(startDate, { month: 'short' })} />

	<Stats
		title={'Reign'}
		value={`${currentHolderTotalReigns}${numberSuffix(currentHolderTotalReigns)}`}
	/>
	<Stats title={'Defenses'} value={currentDefenseCount.toString()} />
</div>
