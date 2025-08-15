<script>
	export let logo = '';
	export let name = '';
	export let slug = '';
	export let reigns = 0;
	export let defenses = 0;
	const href = `/teams/${slug}`;
</script>

<a
	{href}
	class="flex items-center space-x-2 py-2 text-black hover:bg-gray-100"
	aria-label="View details for {name}"
>
	<img src={`/webp/large/${logo}.webp`} class="mr-6 h-12 w-12" alt={`${name} logo`} />

	<h2 class="flex-1">{name}</h2>

	<dl class="text-foreground-muted flex flex-row gap-x-4 text-sm">
		<dt class="sr-only">Number of championship reigns</dt>
		<dd class="w-[90px] text-end font-mono">{reigns} Reigns</dd>

		<dt class="sr-only">Number of successful defenses</dt>
		<dd class="w-[110px] text-end font-mono">{defenses} Defenses</dd>
	</dl>
</a>
