<script lang="ts">
	export let date = '';
	export let homeTeam = '';
	export let awayTeam = '';
	export let homeLogo = '';
	export let awayLogo = '';
</script>

<div class="w-full flex flex-row items-center justify-between  px-4">
  <div class="flex flex-col items-start flex-1">
    <p class="sectionTitle  !mb-0">Next Game</p>
    <span class="font-mono  text-gray-600">{new Date(date).toLocaleDateString()}</span>
  </div>
  <div class="flex flex-col w-full items-end divide-y-2 flex-1">
    <div class="flex flex-row items-center gap-2 py-1">
      <span class="truncate font-medium text-gray-800 text-base">{awayTeam}</span>
      <img
        src={`/webp/large/${awayLogo}.webp`}
        class="h-8 w-8 rounded-full border bg-white object-contain"
        alt="{awayTeam} logo"
      />
    </div>
    <div class="flex flex-row items-center gap-2 py-1">
      <span class="truncate font-medium text-gray-800 text-base">{homeTeam}</span>
      <img
        src={`/webp/large/${homeLogo}.webp`}
        class="h-8 w-8 rounded-full border bg-white object-contain"
        alt="{homeTeam} logo"
      />
    </div>
  </div>
</div>

