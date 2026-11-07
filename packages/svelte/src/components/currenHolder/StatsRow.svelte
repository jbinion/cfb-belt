<script lang="ts">
	import numberSuffix from '../../utils/numberSuffix';
	import formatDate from '../../utils/formatDate';

	interface Props {
		startDate?: string;
		currentHolderTotalReigns?: number;
		currentDefenseCount?: number;
	}

	let { startDate = '', currentHolderTotalReigns = 0, currentDefenseCount = 0 }: Props = $props();
</script>

<div class=" hidden w-full flex-1 flex-row border-b-2 md:flex">
	<div class="flex flex-1 flex-col justify-center border-r-2 p-2">
		<p class="text-[11px] font-semibold uppercase tracking-wide">Claimed</p>
		<p class="font-mono text-base">
			{formatDate(startDate, { month: 'long' })}
		</p>
	</div>

	<div class="flex flex-1 flex-col justify-center border-r-2 p-2">
		<p class="text-[11px] font-semibold uppercase tracking-wide">Reign</p>
		<p class="font-mono text-base">
			{`${currentHolderTotalReigns}${numberSuffix(currentHolderTotalReigns)}`}
		</p>
	</div>

	<div class="flex flex-1 flex-col justify-center p-2">
		<p class="text-[11px] font-semibold uppercase tracking-wide">Defenses</p>
		<p class="font-mono text-base">
			{currentDefenseCount}
		</p>
	</div>
</div>
