<script lang="ts">
	import TinyImage from './images/TinyImage.svelte';
	export let logo: string;
	export let name: string;
	export let slug: string;
	const href = `/teams/${slug}`;
</script>

<li>
	<a
		{href}
		class="font-heading card flex  flex-row items-center space-x-4 py-2 text-lg font-bold text-[var(--color-primary)] hover:text-[var(--color-primary)]"
	>
		<TinyImage {logo} />
		<p class="flex-1">{name}</p>
	</a>
</li>
