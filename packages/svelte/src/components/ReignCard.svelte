<script>
	export let defenses = 0;
	export let start = '';
	export let end = '';
	export let wonFrom = '';
	export let lostTo = '';
	const startDate = new Date(start).toLocaleDateString();
	const endDate = new Date(end).toLocaleDateString();
</script>

<div class="flex flex-row border p-4 text-center font-mono">
	<div class=" mb-2">
		<p class="m-0 leading-6">
			{startDate} -
			{endDate}
		</p>
	</div>

	<div class="flex flex-row justify-center space-x-2">
		<p class=" text-xs">
			{defenses}
			{defenses === 1 ? 'Defense' : 'Defenses'}
		</p>
	</div>
	<div>{wonFrom}</div>
</div>
