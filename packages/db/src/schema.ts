import {
  int,
  sqliteTable,
  text,
  index,
  uniqueIndex,
  primaryKey,
} from "drizzle-orm/sqlite-core";

export const teamTable = sqliteTable("team_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull().unique(),
  displayName: text(),
  color: text(),
  logoFile: text().notNull().default("default"),
  altColor: text(),
  slug: text().notNull().unique(),
});

export const gamesTable = sqliteTable(
  "games_table",
  {
    id: text().primaryKey(),
    startDate: text().notNull(),
    homeTeamId: int(),
    homeTeamName: text(),
    awayTeamId: int(),
    awayTeamName: text(),
    homePoints: int().notNull(),
    awayPoints: int().notNull(),
  },
  (t) => [
    index("idx_games_home_team").on(t.homeTeamId),
    index("idx_games_away_team").on(t.awayTeamId),
  ]
);

export const reignsTable = sqliteTable(
  "reigns_table",
  {
    id: int().primaryKey({ autoIncrement: true }),
    teamId: int().notNull().references(() => teamTable.id),
    startDate: text().notNull(),
    beltLossGameId: text().references(() => gamesTable.id),
  },
  (t) => [uniqueIndex("idx_reigns_team_date").on(t.teamId, t.startDate)]
);

export const reignGamesTable = sqliteTable(
  "reign_games_table",
  {
    reignId: int()
      .notNull()
      .references(() => reignsTable.id),
    gameId: text()
      .notNull()
      .references(() => gamesTable.id),
  },
  (t) => [primaryKey({ columns: [t.reignId, t.gameId] })]
);

export const nextGameTable = sqliteTable(
  "next_game_table",
  {
    id: text().primaryKey(),
    startDate: text().notNull(),
    homeTeamId: int(),
    homeTeamName: text(),
    awayTeamId: int(),
    awayTeamName: text(),
  },
  (t) => [
    index("idx_next_game_home_team").on(t.homeTeamId),
    index("idx_next_game_away_team").on(t.awayTeamId),
  ]
);
