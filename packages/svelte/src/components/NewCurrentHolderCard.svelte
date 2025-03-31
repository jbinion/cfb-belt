<script lang="ts">
	import { page } from '$app/stores';
	$: current = $page.data.current;
</script>

<section
	class="transform rounded-lg bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
>
	<h2 class="mb-4 border-b border-gray-200 pb-2 font-mono text-xl font-bold text-blue-800">
		Current Belt Holder
	</h2>
	<div class="current-holder-wrapper">
		<div class="flex flex-col items-center p-4 sm:flex-row sm:items-start sm:space-x-6">
			{#if current}
				<div class="mb-4 flex items-center justify-center sm:mb-0">
					<img
						src={`/webp/large/${current.team.logoFile}.webp`}
						class="h-[120px] w-[120px] transform rounded-full border-4 border-blue-100 bg-white object-contain p-2 shadow-lg transition-all duration-300 hover:scale-105"
						alt={`logo of current belt holder; ${current.team.name}`}
					/>
				</div>

				<div class="flex-1 text-center sm:text-left">
					<a href={`/teams/${current.team.slug}`} class="group inline-block transition-colors">
						<h3 class="mb-2 text-2xl font-bold text-blue-900 group-hover:text-blue-700">
							{current.team.name}
						</h3>
						<div
							class="mb-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800"
						>
							Current Belt Holder
						</div>
						<p class="font-mono text-sm text-gray-600">
							Holding since {new Date(current.startDate).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</p>
					</a>
				</div>
			{:else}
				<div class="w-full text-center text-gray-500">Loading current belt holder...</div>
			{/if}
		</div>
	</div>
</section>
