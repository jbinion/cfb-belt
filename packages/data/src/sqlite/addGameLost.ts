import { db, reignsTable, reignGamesTable, gamesTable } from "@cfb/db";
import { asc, eq } from "drizzle-orm";

const addGameLost = async () => {
  const reigns = await db
    .select()
    .from(reignsTable)
    .orderBy(asc(reignsTable.startDate));

  for (let i = 0; i < reigns.length; i++) {
    const nextReign = reigns[i + 1];
    if (!nextReign) continue;

    const firstGameOfNextReign = await db
      .select({ gameId: reignGamesTable.gameId, startDate: gamesTable.startDate })
      .from(reignGamesTable)
      .leftJoin(gamesTable, eq(reignGamesTable.gameId, gamesTable.id))
      .where(eq(reignGamesTable.reignId, nextReign.id))
      .orderBy(asc(gamesTable.startDate))
      .then((r) => r[0] ?? null);

    if (!firstGameOfNextReign) continue;

    await db
      .update(reignsTable)
      .set({ beltLossGameId: firstGameOfNextReign.gameId })
      .where(eq(reignsTable.id, reigns[i].id));
  }
};

export default addGameLost;
