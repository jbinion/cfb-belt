<script lang="ts">
	import { page } from '$app/stores';
	export let currentHolderTotalReigns = 0;
	$: current = $page.data.current;
	import numberSuffix from '../lib/numberSuffix';
</script>

<div>
	<p class="sectionTitle">Current</p>
	<div class="card flex flex-row items-center space-x-6">
		{#if current}
			<div style={`background-color: #${current.team.color}`} class="flex items-center p-4">
				<img
					src={`/webp/large/${current.team.logoFile}.webp`}
					class=" h-[96px] w-[96px]"
					alt={`logo of current belt holder; ${current.team.name}`}
				/>
			</div>

			<div class="flex-1">
				<a href={`/teams/${current.team.slug}`} class="flex flex-col text-[var(--color-primary)]">
					<div class="mb-1 flex flex-row items-center space-x-4">
						<p class="font-heading text-3xl font-bold" style={`color: #${current.team.color}`}>
							{current.team.name}
						</p>
					</div>
					<p class="mb-1 font-mono text-sm text-[var(--color-slate)]">
						Since: {new Date(current.startDate).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					</p>
					<div class="flex w-full flex-row space-x-8">
						<p class="font-mono text-sm text-[var(--color-slate)]">
							Successful Defenses: {current.games.length - 1}
						</p>
						<p class="font-mono text-sm text-[var(--color-slate)]">
							{`${currentHolderTotalReigns}${numberSuffix(currentHolderTotalReigns)} `} Reign
						</p>
					</div>
				</a>
			</div>
		{/if}
	</div>
</div>
