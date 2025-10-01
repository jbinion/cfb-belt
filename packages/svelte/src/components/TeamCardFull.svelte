<script>
	import formatDate from '$lib/formatDate';

	export let name = '';

	export let logo = '';
	export let slug = '';
	export let startDate = '';
	export let defendCount = 0;
	const href = `/teams/${slug}`;
</script>

<a class="flex items-center py-1 text-foreground hover:bg-card-hover" {href}>
	<p class="w-32 text-start text-sm">{formatDate(startDate)}</p>
	<img src={`/webp/large/${logo}.webp`} class="mr-6 h-12 w-12" alt={`${name} logo`} />
	<h2 class="flex-1">{name}</h2>

	<p class=" text-end text-sm text-foreground-muted">
		{defendCount}
		{defendCount === 1 ? 'Defense' : 'Defenses'}
	</p>
</a>
