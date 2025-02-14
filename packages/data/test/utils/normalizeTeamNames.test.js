import { Team } from 'models';
import mongoose from '../../src/mongoose';

beforeAll(async () => {
  await mongoose();
});

test('gets all teams', async () => {
  const teams = await Team.find({});
  console.log(teams);
});
