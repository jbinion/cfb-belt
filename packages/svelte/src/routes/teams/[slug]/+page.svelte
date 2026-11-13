<script lang="ts">
	import type { PageData } from './$types';
	import ReignCard from './_components/ReignCard.svelte';
	import GameCard from './_components/gameCard/GameCard.svelte';
	import TeamsDisplay from '../../../components/TeamsDisplay.svelte';

	let { data }: { data: PageData } = $props();

	const totalDefenses = $derived(
		data.reigns?.reduce(
			(acc: number, curr: { defenseCount: number }) => acc + curr.defenseCount,
			0
		) ?? 0
	);
</script>

<svelte:head>
	<title>{data.team?.name} CFB Belt History</title>
	<meta name="description" content="{data.team?.name}'s College Football Belt history" />
</svelte:head>

{#if data.team && data.reigns}
	<div class="container space-y-12 py-12">
		<!-- Header -->
		<section aria-label="Team Overview">
			<div class="overflow-hidden rounded border border-border">
				<div class="flex flex-row items-center gap-6 p-6 sm:flex-row">
					<img
						src={`/webp/original/${data.team.logoFile}.webp`}
						class="h-24 w-24 shrink-0"
						alt=""
						aria-hidden="true"
					/>
					<h1 class="text-3xl font-extrabold tracking-tight text-foreground">
						{data.team.name}
					</h1>
					<div class="flex flex-col gap-4 text-center sm:text-left">
						<dl class="flex justify-center gap-8 sm:justify-start">
							<div>
								<dt class="text-[10px] font-semibold uppercase tracking-wide text-foreground-muted">
									Reigns
								</dt>
								<dd class="font-mono text-2xl font-bold text-foreground">{data.reigns.length}</dd>
							</div>
							<div>
								<dt class="text-[10px] font-semibold uppercase tracking-wide text-foreground-muted">
									Defenses
								</dt>
								<dd class="font-mono text-2xl font-bold text-foreground">{totalDefenses}</dd>
							</div>
						</dl>
					</div>
				</div>
			</div>
		</section>

		<!-- Reigns -->
		<section aria-label="Championship History">
			<h2 class="sectionTitle">Reigns</h2>
			<div>
				<table class="w-full divide-y divide-border bg-background-secondary">
					<thead>
						<tr>
							<th
								class={`px-2 py-3 text-start text-xs font-semibold uppercase tracking-wide text-foreground-muted `}
							></th>
							<th
								class={`px-2 py-3 text-start text-xs font-semibold uppercase tracking-wide text-foreground-muted `}
								>Claimed</th
							>
							<th
								class={`px-2 py-3 text-start text-start text-xs font-semibold uppercase tracking-wide text-foreground-muted `}
								>Lost</th
							>

							<th
								class={`px-2 py-3 text-start text-xs font-semibold uppercase tracking-wide text-foreground-muted `}
								>Defenses</th
							>
						</tr>
					</thead>
					<tbody class="divide-y divide-border">
						{#each data.reigns as reign (reign.id)}
							<ReignCard
								start={reign.startDate}
								end={reign.beltLossGame?.startDate || ''}
								defenses={reign.defenseCount}
							>
								{#if reign.beltLossGame}
									<GameCard
										game={reign.beltLossGame}
										points={reign.beltLossGame.homePoints}
										awayPoints={reign.beltLossGame.awayPoints}
										startDate={reign.beltLossGame.startDate}
										title={'Belt Lost'}
										reignTeamId={data.team.id}
									/>
								{/if}

								{#each [...reign.games].reverse() as game, i}
									<GameCard
										{game}
										points={game.homePoints}
										awayPoints={game.awayPoints}
										startDate={game.startDate}
										title={i === reign.games.length - 1 ? 'Belt Won' : 'Defense'}
										reignTeamId={data.team.id}
									/>
								{/each}
							</ReignCard>
						{/each}
					</tbody>
				</table>
			</div>
		</section>

		<!-- Opponents -->
		<section aria-label="Opponent Matchups">
			<h2 class="sectionTitle">Opponents</h2>
			<div class="overflow-hidden rounded-lg border border-border bg-white p-5 shadow-sm">
				<div class="grid grid-cols-2 gap-6">
					<TeamsDisplay title="Won belt from" teams={data.teamsBeatenForBelt} />
					<TeamsDisplay title="Lost belt to" teams={data.teamsLostTo} />
				</div>
				{#if data.teamsDefended.length > 0}
					<div class="mt-5 border-t border-border pt-5">
						<TeamsDisplay title="Defended belt against" teams={data.teamsDefended} />
					</div>
				{/if}
			</div>
		</section>
	</div>
{:else}
	<p class="text-center">No championship history found for {data.team?.name}.</p>
{/if}
