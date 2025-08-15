<script>
	export let name = '';

	export let logo = '';
	export let slug = '';
	export let startDate = '';
	export let defendCount = 0;
	const href = `/teams/${slug}`;
</script>

<a class="flex items-center py-2 text-black hover:bg-gray-100" {href}>
	<img src={`/webp/large/${logo}.webp`} class="mr-6 h-12 w-12" alt={`${name} logo`} />
	<h2 class="flex-1">{name}</h2>

	<div class="text-foreground-muted text-fore flex flex-row space-x-4 text-sm">
		<p class=" text-end font-mono">
			{defendCount}
			{defendCount === 1 ? 'Defense' : 'Defenses'}
		</p>
		<p class="w-24 text-end font-mono">{new Date(startDate).toLocaleDateString('default')}</p>
	</div>
</a>
