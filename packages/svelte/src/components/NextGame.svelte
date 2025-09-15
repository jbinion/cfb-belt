<script lang="ts">
	export let date = '';
	export let challenger = { name: 'TBD', logoFile: 'placeholder', slug: 'tbd' };
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
			<p class="text-sm text-gray-600">vs</p>
			<a href={`/teams/${challenger.slug}`} class="hover:underline">
				<div class="flex flex-row items-center gap-2">
					<img src={`/webp/large/${challenger.logoFile}.webp`} class="h-8 w-8" alt="Florida logo" />

					<p>{challenger.name}</p>
				</div>
			</a>
		</div>
	</div>
</div>
