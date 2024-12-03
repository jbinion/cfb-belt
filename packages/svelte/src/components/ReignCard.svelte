<script>
	export let days = 0;
	export let defenses = 0;
	export let start = '';
	export let end = '';
	const startDate = new Date(start).toLocaleDateString();
	const endDate = new Date(end).toLocaleDateString();
</script>

<div class="flex flex-col border p-4 text-center font-mono">
	<div class=" mb-2">
		<p class="m-0 leading-6">
			{startDate} <br />
			{endDate}
		</p>
	</div>

	<div class="flex flex-row justify-center space-x-2">
		<p class=" text-xs">
			{days} days
		</p>

		<p class=" text-xs">
			{defenses}
			{defenses === 1 ? 'Defense' : 'Defenses'}
		</p>
	</div>
</div>
