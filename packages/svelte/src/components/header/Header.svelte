<script lang="ts">
	import { page } from '$app/stores';
	$: current = $page.data.current;
</script>

<header class="mx-auto mb-12 flex w-full max-w-screen-lg flex-col px-8">
	<div class="my-12 flex flex-col space-y-12 md:flex-row md:space-x-24 md:space-y-0">
		<div class="flex flex-1 flex-col justify-center">
			<a href="/" class="text-black hover:text-gray-700">
				<h1>CFB Belt</h1>
			</a>
			<div class="space-x-4">
				<a class="my-4 font-mono" href="/history">Complete Lineage</a>
				<a class="font-mono" href="/teams">Teams</a>
				<a class="font-mono" href="/about">About</a>
			</div>
		</div>
		<div class="flex-1">
			<div class="card flex flex-row items-center space-x-4 p-4">
				{#if current}
					<img
						src={`/webp/large/${current.team.logoFile}.webp`}
						class="h-[90px] w-[90px]"
						alt={`logo of current belt holder; ${current.team.name}`}
					/>

					<div class="flex-1">
						<a href={`/teams/${current.team.slug}`} class="text-black">
							<p class="text-xl font-bold">
								{current.team.name} <span class="font-normal">Current Holder</span>
							</p>
							<p class="font-mono text-sm">
								since {new Date(current.startDate).toLocaleDateString()}
							</p>
						</a>
					</div>
				{/if}
			</div>
		</div>
	</div>
</header>
