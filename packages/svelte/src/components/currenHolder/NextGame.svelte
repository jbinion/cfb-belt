<script lang="ts">
	import formatDate from '../../utils/formatDate';
	import getLogoUrl from '../../utils/getLogoUrl';

	interface Props {
		nextChallenger?: { name: string; logoFile: string } | null;
		nextGameStartDate?: string | null;
	}

	let { nextChallenger = null, nextGameStartDate = null }: Props = $props();
</script>

{#if nextChallenger && nextGameStartDate}
	<div class="flex flex-row items-center space-x-4 p-2">
		<p class="text-[11px] tracking-wide text-foreground-muted uppercase">Next game</p>
		<div class="flex flex-row items-center space-x-2">
			<img
				src={getLogoUrl({ logoFile: nextChallenger.logoFile, size: 'small' })}
				alt={`${nextChallenger.name} logo`}
			/>
			<span class="font-bold text-foreground">
				{nextChallenger.name}
			</span>
		</div>

		<p class="text-[11px] tracking-wide text-foreground-muted uppercase">
			{formatDate(nextGameStartDate, {
				month: 'short',
				day: 'numeric',
				hour: 'numeric',
				minute: '2-digit',
				timeZoneName: 'short',
			})}
		</p>
	</div>
{/if}
