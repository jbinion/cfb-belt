<script>
	export let logo = '';
	export let name = '';
	export let slug = '';
	export let reigns = 0;
	export let defenses = 0;
	const href = `/teams/${slug}`;
</script>

<article class="h-full">
	<a
		{href}
		class="block h-full rounded-lg p-4 transition-colors hover:bg-gray-50 focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
		aria-label="View details for {name}"
	>
		<div class="flex h-full flex-col items-center space-y-2 text-black">
			<img
				src={`/webp/large/${logo}.webp`}
				class="h-24 w-auto"
				width="96"
				height="96"
				alt=""
				aria-hidden="true"
			/>

			<h2 class="flex-1 text-lg font-semibold">{name}</h2>

			<dl class="grid grid-cols-2 gap-x-4 text-sm">
				<dt class="sr-only">Number of championship reigns</dt>
				<dd>{reigns} Reigns</dd>

				<dt class="sr-only">Number of successful defenses</dt>
				<dd>{defenses} Defenses</dd>
			</dl>
		</div>
	</a>
</article>
