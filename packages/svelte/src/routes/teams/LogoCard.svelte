<script>
	import TinyImage from '../../components/images/TinyImage.svelte';

	export let logo = '';
	export let name = '';
	export let slug = '';
	export let reigns = 0;
	export let defenses = 0;
	const href = `/teams/${slug}`;
</script>

<article>
	<a {href} class="" aria-label="View details for {name}">
		<div class="card my-2 flex flex-row items-center space-x-2 p-2 text-black">
			<TinyImage {logo} />
			<!-- <img
				src={`/webp/large/${logo}.webp`}
				class="h-24 w-auto"
				width="96"
				height="96"
				alt=""
				aria-hidden="true"
			/> -->

			<h2 class="flex-1 text-lg font-medium">{name}</h2>

			<dl class="grid grid-cols-2 gap-x-4 text-sm">
				<dt class="sr-only">Number of championship reigns</dt>
				<dd>{reigns} Reigns</dd>

				<dt class="sr-only">Number of successful defenses</dt>
				<dd>{defenses} Defenses</dd>
			</dl>
		</div>
	</a>
</article>
