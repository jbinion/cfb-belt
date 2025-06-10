<script lang="ts">
	export let date = '';
	export let homeTeam = '';
	export let awayTeam = '';
	export let homeLogo = '';
	export let awayLogo = '';
</script>

<div>
	<p class="sectionTitle !mb-2">Next Game</p>
	<div
		class="card flex flex-col items-center justify-between bg-[var(--color-bg-light)] p-4 shadow-sm"
	>
		<div class="flex w-full flex-row items-center">
			<div class="flex flex-1 flex-row items-center">
				<img
					src={`/webp/large/${homeLogo}.webp`}
					class=" h-[60px] w-[60px] rounded-full border-2 bg-[var(--color-white)]"
					alt="LIU logo"
				/>
				<p class="ml-2 font-bold text-[var(--color-primary)]">{homeTeam}</p>
			</div>

			<span class="mx-2 font-mono font-bold text-[var(--color-orange)]">vs</span>
			<div class="flex flex-1 flex-row items-center">
				<p class="ml-2 font-bold text-[var(--color-primary)]">{awayTeam}</p>

				<img
					src={`/webp/large/${awayLogo}.webp`}
					class=" h-[60px] w-[60px] rounded-full border-2 bg-[var(--color-white)]"
					alt="LIU logo"
				/>
			</div>
		</div>
		<p class="font-mono text-sm">Saturday, August 30, 2025</p>
	</div>
</div>
