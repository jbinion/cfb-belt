<script lang="ts">
	export let date = '';
	export let homeTeam = '';
	export let awayTeam = '';
	export let homeLogo = '';
	export let awayLogo = '';
</script>

<div class="flex w-full flex-col">
	<p class="sectionTitle">Next Game</p>

	<div class="flex flex-1 flex-row justify-between">
		<p class=" my-auto">
			{new Date(date).toLocaleDateString('en-US', {
				weekday: 'long', // Saturday
				year: 'numeric', // 2025
				month: 'long', // August
				day: 'numeric' // 30
			})}
		</p>
		<div class=" flex flex-row items-center space-x-2">
			<div class="flex flex-row items-center gap-2">
				<!-- <img src={`/webp/large/${homeLogo}.webp`} class="h-[80px] w-[80px]" alt="{homeTeam} logo" /> -->
			</div>
			<p class="text-sm text-gray-600">vs</p>
			<div class="flex flex-row items-center gap-2">
				<!-- <span class="truncate text-base font-medium text-gray-800">{awayTeam}</span> -->
				<img src={`/webp/large/${awayLogo}.webp`} class="h-8 w-8" alt="{awayTeam} logo" />

				<p>{awayTeam}</p>
			</div>
		</div>
	</div>
</div>
