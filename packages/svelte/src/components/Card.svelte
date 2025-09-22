<script lang="ts">
	// import { page } from '$app/stores';
	// export let currentHolderTotalReigns = 0;
	// $: current = $page.data.current;
	// import numberSuffix from '../lib/numberSuffix';
	let { color = 'E4E4E7', title = '', logoFile = '', teamName = '' } = $props();
</script>

<div
	class="relative overflow-hidden rounded-2xl text-white shadow-xl ring-1 ring-white/10"
	style={`background-color: #${color}`}
>
	<!-- Overlay to ensure text contrast regardless of team color -->
	<div
		class="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/20 via-black/10 to-black/30"
	></div>

	<div class="relative flex flex-col gap-6 p-6 sm:p-8">
		<div
			class="w-fit rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white/80 backdrop-blur-sm"
		>
			{title}
		</div>

		<img
			src={`/webp/large/${logoFile}.webp`}
			alt={`logo of current belt holder; ${teamName}`}
			class="h-24 w-24 shrink-0 rounded-xl bg-white/10 p-2 shadow-inner ring-1 ring-white/10"
		/>

		<div class="flex w-full flex-col items-center gap-4 sm:items-start">
			<h3
				class="font-heading text-center text-3xl font-bold leading-tight drop-shadow sm:text-left sm:text-4xl"
			>
				{teamName}
			</h3>

			<div class="space-y-2">
				<slot />
				<!-- {@render children()} -->
				<!-- <div class="">
					<p class="text-[11px] font-semibold uppercase tracking-wide text-white/70">Since</p>
					<p class="font-mono text-base text-zinc-100">
						{new Date(current.startDate).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					</p>
				</div>

				<div class="">
					<p class="text-[11px] font-semibold uppercase tracking-wide text-white/70">Reign</p>
					<p class="font-mono text-lg font-semibold text-zinc-100">
						{`${currentHolderTotalReigns}${numberSuffix(currentHolderTotalReigns)}`}
					</p>
				</div>

				<div class="">
					<p class="text-[11px] font-semibold uppercase tracking-wide text-white/70">Defenses</p>
					<p class="font-mono text-lg font-semibold text-zinc-100">{current.games.length - 1}</p>
				</div> -->
			</div>
		</div>
	</div>
</div>
