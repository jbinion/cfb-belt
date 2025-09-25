<script>
	export let slug = '';
	export let logoFile = '';
	export let name = '';
	export let awaylogoFile = '';
	export let awayname = '';
	export let points = '';
	export let end = false;
	export let away_points = '';
	export let start_date = '';
</script>

<p class="text-sm">
	{new Date(start_date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	})}
</p>
<div class="divide-y">
	<a href={`/teams/${slug}`} class="flex w-full items-center p-4 py-2">
		<div class="flex w-full flex-row items-center space-x-2">
			<img
				src={`/webp/small/${awaylogoFile}.webp`}
				class={end ? 'ml-2' : 'mr-2'}
				class:w-[32px]={true}
				alt={`${name} logo `}
			/>
			<p class="text-sm text-neutral-800">{awayname}</p>
		</div>

		<p class="text-black">{away_points}</p>
	</a>
	<div class="flex w-full items-center p-4 py-2">
		<div class="flex w-full flex-row items-center space-x-2">
			<img
				src={`/webp/small/${logoFile}.webp`}
				class={end ? 'ml-2' : 'mr-2'}
				class:w-[32px]={true}
				alt={`${name} logo `}
			/>
			<p class="text-sm text-neutral-800">{name}</p>
		</div>

		<p class="text-black">{points}</p>
	</div>
</div>
