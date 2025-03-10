<script>
	import TeamName from './TeamName.svelte';

	export let name = '';
	export let logo = '';
	export let slug = '';
	const href = `/teams/${slug}`;
</script>

<li
	class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
>
	<a {href} class="block p-3">
		<div class="flex items-center space-x-3">
			<img
				src={`/webp/small/${logo}.webp`}
				class="h-10 w-10 rounded-full border border-gray-100 bg-white object-contain p-1"
				alt={`${name} logo`}
			/>
			<span class="font-medium text-gray-800 hover:text-blue-700">{name}</span>
		</div>
	</a>
</li>
