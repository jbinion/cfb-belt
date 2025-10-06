<script>
	export let start = '';
	export let end = '';
	export let defenses = 0;
	const startDate = new Date(start).toLocaleDateString();
	const endDate = end ? new Date(end).toLocaleDateString() : null;
	import { HiSolidChevronRight } from 'svelte-icons-pack/hi';
	import { HiSolidChevronDown } from 'svelte-icons-pack/hi';
	import { Icon } from 'svelte-icons-pack';
	let showGames = false;
</script>

<div>
	<button
		on:click={() => (showGames = !showGames)}
		class="card flex w-full flex-row items-center justify-between space-x-8 px-3 py-3 font-mono hover:bg-card-hover"
	>
		<div class="flex items-center gap-2">
			<Icon
				src={showGames ? HiSolidChevronDown : HiSolidChevronRight}
				size={'16'}
				color={'black'}
			/>
			<p class="m-0 leading-6">
				{startDate} -
				{endDate}
			</p>
		</div>

		<div class="flex flex-row justify-center space-x-2">
			<p class=" ">
				{defenses}
				{defenses === 1 ? 'Defense' : 'Defenses'}
			</p>
		</div>
	</button>

	{#if showGames}
		<div class="mx-auto my-4 w-full max-w-lg space-y-8 rounded">
			<slot />
		</div>
	{/if}
</div>
