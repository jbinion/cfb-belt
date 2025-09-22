<script>
	export let name = '';

	export let logo = '';
	export let slug = '';
	export let startDate = '';
	export let defendCount = 0;
	const href = `/teams/${slug}`;
</script>

<a class="hover:bg-card-hover text-foreground flex items-center py-2" {href}>
	<img src={`/webp/large/${logo}.webp`} class="mr-6 h-6 w-6" alt={`${name} logo`} />
	<h2 class="flex-1 text-sm font-normal">{name}</h2>

	<div class="text-foreground-muted text-fore flex flex-row space-x-4 text-sm">
		<!-- <p class=" text-end font-mono">
			{defendCount}
			{defendCount === 1 ? 'Defense' : 'Defenses'}
		</p> -->
		<p class="w-24 text-end font-mono">{new Date(startDate).toLocaleDateString('default')}</p>
	</div>
</a>
