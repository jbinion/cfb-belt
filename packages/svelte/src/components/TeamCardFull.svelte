<script>
	import { Icon } from 'svelte-icons-pack';
	import { BsShield } from 'svelte-icons-pack/bs';

	export let name = '';

	export let logo = '';
	export let slug = '';
	export let startDate = '';
	export let endDate = '';
	export let games = [];
	const href = `/teams/${slug}`;
	// take in games
	// figure out who team won from and who lost too
</script>

<a class=" text-black" {href}>
	<div class="flex items-center hover:bg-gray-100">
		<p class="mr-6 w-24 font-mono text-sm font-thin">
			{new Date(startDate).toLocaleDateString('default')}
		</p>
		<div class="mr-12">
			<img src={`/webp/large/${logo}.webp`} class="  h-12 w-12" alt={`${name} logo`} />
		</div>
		<p class=" w-48">{name}</p>

		<p class="ml-auto w-24 text-sm">
			<!-- <Icon src={BsShield} /> -->
			{games.length - 1}
			{games.length - 1 === 1 ? 'Defense' : 'Defenses'}
		</p>
	</div>
</a>
