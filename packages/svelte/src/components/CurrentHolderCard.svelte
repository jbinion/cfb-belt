<script lang="ts">
	import { page } from '$app/stores';
	export let currentHolderTotalReigns = 0;
	$: current = $page.data.current;
	import numberSuffix from '../lib/numberSuffix';
</script>

<div>
	<p class="sectionTitle">Current Champion</p>
	<div
		class="card flex flex-row items-center space-x-4 border-[var(-accent)] bg-[var(--color-white)] p-4 shadow-md"
	>
		{#if current}
			<img
				src={`/webp/large/${current.team.logoFile}.webp`}
				class=" h-[90px] w-[90px]"
				alt={`logo of current belt holder; ${current.team.name}`}
			/>

			<div class="flex-1">
				<a
					href={`/teams/${current.team.slug}`}
					class="flex flex-row items-center justify-between text-[var(--color-primary)]"
				>
					<div>
						<div class="mb-1 flex flex-row items-center space-x-4">
							<p class="font-heading text-2xl font-bold">{current.team.name}</p>
							<p class=" text-[var(--color-slate)]">
								{`${currentHolderTotalReigns}${numberSuffix(currentHolderTotalReigns)} `} Reign
							</p>
						</div>
						<p class="mb-1 font-mono text-sm text-[var(--color-slate)]">
							Defending Since: {new Date(current.startDate).toLocaleDateString('en-US', {
								// Saturday
								year: 'numeric', // 2025
								month: 'long', // August
								day: 'numeric' // 30
							})}
						</p>
						<p class="font-mono text-sm text-[var(--color-slate)]">
							Successful Defenses: {current.games.length - 1}
						</p>
					</div>
				</a>
			</div>
		{/if}
	</div>
</div>
