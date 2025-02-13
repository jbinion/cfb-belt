<script>
	import TeamName from './TeamName.svelte';
</script>

<div>
	<p class="sectionTitle mb-2">Next Game</p>
	<div class="flex flex-col items-center">
		<div class="flex flex-row justify-center space-x-4 py-1">
			<div class="flex flex-row">
				<TeamName logo={'/logos/LIUl.webp'} name={'LIU'} />
			</div>
			<span class="my-auto">vs</span>

			<TeamName logo={'/logos/57.png'} name={'Florida'} end={true} />
		</div>
		<p class="font-mono text-sm">Aug 30</p>
	</div>
</div>
