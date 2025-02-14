<script>
	export let logo = '';
	export let name = '';
	export let end = false;
</script>

<div class="flex text-black" class:flex-row-reverse={end}>
	<img src={`/webp/small/${logo}.webp`} class="h-6 px-2" alt={`${name} logo`} />
	<p class="flex-1">{name}</p>
</div>
