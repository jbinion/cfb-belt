import Team from "./Team";
import Game from "./Game";
import Reign from "./Reign";
import NextGame from "./NextGame";
import { connectDB, disconnectDB } from "./ConnectDb";

export { connectDB, disconnectDB };
export { Team, Game, Reign, NextGame };

export type { ITeamDocument } from "./Team";
export type { IGameDocument } from "./Game";
export type { IReignDocument } from "./Reign";
export type { INextGameDocument } from "./NextGame";