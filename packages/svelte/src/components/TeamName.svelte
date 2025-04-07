<script>
	import TinyImage from './images/TinyImage.svelte';

	export let logo = '';
	export let name = '';
	export let end = false;
</script>

<div class="flex text-black" class:flex-row-reverse={end}>
	<TinyImage {logo} />
	<p class="flex-1">{name}</p>
</div>
