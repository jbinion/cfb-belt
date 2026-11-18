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

{#snippet Stat(title: string, value: string)}
	<div class="flex flex-1 flex-col justify-center p-4">
		<p class="text-[11px] tracking-wide text-foreground-muted uppercase">{title}</p>
		<p class="font-mono text-base">
			{value}
		</p>
	</div>
{/snippet}

<div class=" hidden w-full flex-1 flex-row divide-x divide-border border-b border-border md:flex">
	{@render Stat('Claimed', formatDate(startDate, { month: 'short' }))}
	{@render Stat('Reign', `${currentHolderTotalReigns}${numberSuffix(currentHolderTotalReigns)}`)}
	{@render Stat('Defenses', currentDefenseCount.toString())}
</div>
