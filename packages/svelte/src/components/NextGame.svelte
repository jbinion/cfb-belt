<script>
	import TeamName from './TeamName.svelte';
</script>

<div>
	<p class="sectionTitle">Next Game</p>
	<div class="card flex flex-col items-center p-4">
		<div class="flex flex-row justify-center space-x-4 py-1">
			<div class="flex flex-row">
				<TeamName logo={'LIUl'} name={'LIU'} />
			</div>
			<span class="my-auto">vs</span>

			<TeamName logo={'57'} name={'Florida'} end={true} />
		</div>
		<p class="font-mono text-sm">Aug 30</p>
	</div>
</div>
