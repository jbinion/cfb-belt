<script>
	export let totalGames = 0;
	export let totalReigns = 0;
	export let teamCount = 0;
</script>

<div class=" flex-1 space-y-4">
	<h2 class="sectionTitle">About</h2>
	<p>To win the College Football Belt, you must defeat the current holder on the field</p>
	<p>
		Starting from the first college football game,Rutgers vs Princeton in 1869, This creates a
		continuous lineage of champions tracing its way through the best college football teams of all
		time.
	</p>

	<!-- <p>Ties revert to the current holder.</p> -->
	<!-- <p>
		The College Football Belt traces a continuous lineage of champions back to the first college
		football game.
	</p>
	<p>The premise is simple: To win the belt, you must defeat the current holder.</p> -->

	<p>There have been</p>

	<div class="grid grid-cols-3 gap-6 py-8">
		<div class="text-center">
			<p class=" text-lg font-semibold">{totalGames}</p>
			<p class="text-sm text-gray-500">Total Games</p>
		</div>
		<div class="text-center">
			<p class=" text-lg font-semibold">{teamCount}</p>
			<p class="text-sm text-gray-500">Distinct holders</p>
		</div>
		<div class="text-center">
			<p class=" text-lg font-semibold">{totalReigns}</p>
			<p class="text-sm text-gray-500">Reigns</p>
		</div>
	</div>
</div>
