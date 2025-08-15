<script lang="ts">
	import { page } from '$app/stores';
	export let currentHolderTotalReigns = 0;
	$: current = $page.data.current;
	import numberSuffix from '../lib/numberSuffix';
</script>

<div>
	<p class="sectionTitle">Current Holder</p>
	<div class="card flex flex-row items-center space-x-6 overflow-hidden">
		{#if current}
			<div style={`background-color: #${current.team.color}`} class="flex items-center p-4">
				<img
					src={`/webp/large/${current.team.logoFile}.webp`}
					class=" h-[96px] w-[96px]"
					alt={`logo of current belt holder; ${current.team.name}`}
				/>
			</div>

			<div class="flex-1">
				<a href={`/teams/${current.team.slug}`} class="text-foreground flex flex-col">
					<div class="mb-1 flex flex-row items-center space-x-4">
						<p class="font-heading text-3xl font-bold">
							{current.team.name}
						</p>
					</div>
					<p class="text-foreground-muted mb-1 font-mono text-sm">
						Since: {new Date(current.startDate).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					</p>
					<div class="flex w-full flex-row space-x-6">
						<p class="text-foreground-muted font-mono text-sm">
							Defenses: {current.games.length - 1}
						</p>
						<p class="text-foreground-muted font-mono text-sm">
							{`${currentHolderTotalReigns}${numberSuffix(currentHolderTotalReigns)} `} Reign
						</p>
					</div>
				</a>
			</div>
		{/if}
	</div>
</div>
