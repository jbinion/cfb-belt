<script>
	export let value = '';
	export let title = '';
	export let dest = '';
	import { HiSolidArrowLongRight } from 'svelte-icons-pack/hi';
	import { Icon } from 'svelte-icons-pack';
</script>

<a
	class="textHeading flex cursor-pointer flex-row items-center justify-between gap-2 rounded-lg bg-accent hover:bg-white px-6 py-3 shadow-md transition-colors duration-150"
	href={dest}
>
	<p class="text-lg">
		<span class="mr-1 font-bold">
			{value}
		</span>
		{title}
	</p>
	<p class="opacity-80"></p>
	<Icon src={HiSolidArrowLongRight} size={'24'} color={'black'} />
</a>
