<script lang="ts">
	import numberSuffix from '../utils/numberSuffix';
	import formatDate from '../utils/formatDate';
	let {
		color = 'E4E4E7',
		logoFile = '',
		teamName = '',
		slug = '',
		startDate = '',
		currentHolderTotalReigns = 0,
		currentDefenseCount = 0,
	} = $props();
</script>

<div class="mx-12">
	<div
		class="overflow-hidden rounded-lg border border-border text-white shadow-sm"
		style="background-color: #{color}"
	>
		<div class="flex flex-row items-center gap-6 p-6">
			<div class="shrink-0 rounded-lg p-3" style="background-color: #{color}18">
				<img src={`/webp/large/${logoFile}.webp`} alt={`logo of ${teamName}`} class="h-20 w-20" />
			</div>

			<div class="flex w-full flex-row items-center gap-24">
				<div class="flex flex-col">
					<p class="text-[11px] font-semibold uppercase tracking-wide text-white/60">
						Current Belt Holder
					</p>
					<a href="/teams/{slug}" class="no-underline">
						<h3 class="font-heading text-2xl font-bold leading-tight">
							{teamName}
						</h3>
					</a>
				</div>

				<div class="flex flex-row gap-8">
					<div>
						<p class="text-[11px] font-semibold uppercase tracking-wide text-white/60">Claimed</p>
						<p class="font-mono text-base">
							{formatDate(startDate, { month: 'long' })}
						</p>
					</div>

					<div>
						<p class="text-[11px] font-semibold uppercase tracking-wide text-white/60">Reign</p>
						<p class="font-mono text-base">
							{`${currentHolderTotalReigns}${numberSuffix(currentHolderTotalReigns)}`}
						</p>
					</div>

					<div>
						<p class="text-[11px] font-semibold uppercase tracking-wide text-white/60">Defenses</p>
						<p class="font-mono text-base">
							{currentDefenseCount}
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
