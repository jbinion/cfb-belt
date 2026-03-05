<script lang="ts">
	import type { PageData } from './$types';
	import ReignCard from '../../../components/ReignCard.svelte';
	import GameCard from '../../../components/gameCard/GameCard.svelte';
	import TeamsDisplay from '../../../components/TeamsDisplay.svelte';

	let { data }: { data: PageData } = $props();

	const totalDefenses =
		data.reigns?.reduce((acc: number, curr: { games: any[] }) => acc + curr.games.length - 1, 0) ??
		0;
</script>

<svelte:head>
	<title>{data.team?.name} CFB Belt History</title>
	<meta name="description" content="{data.team?.name}'s College Football Belt history" />
</svelte:head>

{#if data.reigns}
	<div class="container space-y-12 py-12">
		<!-- Header -->
		<section aria-label="Team Overview">
			<div class="overflow-hidden rounded-lg border border-[#e5e5e5] bg-white shadow-sm">
				<div class="h-1.5 w-full" style="background-color: #{data.team.color}"></div>
				<div class="flex flex-col items-center gap-6 p-6 sm:flex-row">
					<img
						src={`/webp/original/${data.team.logoFile}.webp`}
						class="h-24 w-24 shrink-0"
						alt=""
						aria-hidden="true"
					/>
					<div class="flex flex-col gap-4 text-center sm:text-left">
						<h1 class="text-3xl font-extrabold tracking-tight text-foreground">
							{data.team.name}
						</h1>
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

		<!-- Matchups -->
		<section aria-label="Opponent Matchups">
			<h2 class="sectionTitle">Teams Faced</h2>
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

		<!-- Reigns -->
		<section aria-label="Championship History">
			<h2 class="sectionTitle">Reigns</h2>
			<div class="space-y-2">
				{#each data.reigns as reign (reign._id)}
					<ReignCard
						start={reign.startDate}
						end={reign.beltLossGame?.start_date || ''}
						defenses={reign.games.length - 1}
					>
						{#if reign.beltLossGame}
							<GameCard
								game={reign.beltLossGame}
								points={reign.beltLossGame.home_points}
								away_points={reign.beltLossGame.away_points}
								start_date={reign.beltLossGame.start_date}
								title={'Belt Lost'}
							/>
						{/if}

						{#each reign.games as game, i}
							<GameCard
								{game}
								points={game.home_points}
								away_points={game.away_points}
								start_date={game.start_date}
								title={i === reign.games.length - 1 ? 'Belt Won' : 'Defense'}
							/>
						{/each}
					</ReignCard>
				{/each}
			</div>
		</section>
	</div>
{:else}
	<p class="text-center">No championship history found for {data.team?.name}.</p>
{/if}
