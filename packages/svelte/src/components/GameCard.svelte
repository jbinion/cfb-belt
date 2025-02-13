<script>
	export let slug = '';
	export let logoFile = '';
	export let name = '';
	export let points = '';
	export let end = false;
</script>

<a href={`/teams/${slug}`} class="flex w-full items-center p-4 py-2" class:flex-row-reverse={end}>
	<div class="flex w-full flex-row items-center" class:flex-row-reverse={end}>
		<img
			src={`/logos/${logoFile}`}
			class={end ? 'ml-2' : 'mr-2'}
			class:w-[32px]={true}
			alt={`${name} logo `}
		/>
		<p class="text-sm text-neutral-800">{name}</p>
	</div>

	<p class="text-black">{points}</p>
</a>
