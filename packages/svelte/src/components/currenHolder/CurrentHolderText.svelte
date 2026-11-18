<script module lang="ts">
	export interface BeltWon {
		opponentName: string;
		holderPoints: number;
		opponentPoints: number;
		startDate: string;
	}
</script>

<script lang="ts">
	import formatDate from '../../utils/formatDate';

	interface Props {
		teamName?: string;
		beltWon?: BeltWon | null;
	}

	let { teamName = '', beltWon = null }: Props = $props();
</script>

<div class="flex flex-col justify-center p-4">
	<p class="text-[11px] font-semibold tracking-wide text-foreground-muted uppercase">
		Current Holder
	</p>

	<h3 class="font-heading text-3xl leading-tight font-bold">
		{teamName}
	</h3>
	{#if beltWon}
		<p class="text-sm text-foreground-muted">
			Beat {beltWon.opponentName}
			{beltWon.holderPoints}-{beltWon.opponentPoints} on {formatDate(beltWon.startDate)}
		</p>
	{/if}
</div>
