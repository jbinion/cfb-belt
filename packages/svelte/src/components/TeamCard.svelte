<script lang="ts">
	import { Icon } from 'svelte-icons-pack';
	import { BsTrophy, BsShield } from 'svelte-icons-pack/bs';

	let { teamName = '', logoFile = '', reigns = 0, defenses = 0, color = 'E4E4E7' } = $props();
</script>

<div
	class="relative overflow-hidden rounded-2xl text-white shadow-xl ring-1 ring-white/10"
	style={`background-color: #${color}`}
>
	<!-- Overlay to ensure text contrast regardless of team color -->
	<div
		class="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/20 via-black/10 to-black/30"
	></div>

	<div class="relative flex flex-col items-center gap-6 p-6">
		<img
			src={`/webp/large/${logoFile}.webp`}
			alt={`logo of ${teamName}`}
			class="h-24 w-24 shrink-0 rounded-xl bg-white/10 p-2 shadow-inner ring-1 ring-white/10"
		/>

		<h3 class="font-heading text-center text-2xl font-bold leading-tight drop-shadow sm:text-3xl">
			{teamName}
		</h3>

		<dl class="grid w-full grid-cols-2 gap-3">
			<div
				class="flex items-center justify-center gap-3 rounded-lg bg-white/10 px-4 py-2 ring-1 ring-white/10"
			>
				<span aria-hidden="true" class="text-white/90">
					<Icon src={BsTrophy} size="1.1rem" />
				</span>
				<div class="flex flex-col leading-tight">
					<dt class="sr-only">Reigns</dt>
					<dd class="text-xs text-white/80">Reigns</dd>
					<dd class="text-lg font-semibold">{reigns}</dd>
				</div>
			</div>

			<div
				class="flex items-center justify-center gap-3 rounded-lg bg-white/10 px-4 py-2 ring-1 ring-white/10"
			>
				<span aria-hidden="true" class="text-white/90">
					<Icon src={BsShield} size="1.1rem" />
				</span>
				<div class="flex flex-col leading-tight">
					<dt class="sr-only">Defenses</dt>
					<dd class="text-xs text-white/80">Defenses</dd>
					<dd class="text-lg font-semibold">{defenses}</dd>
				</div>
			</div>
		</dl>
	</div>
</div>
