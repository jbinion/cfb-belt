function normalizeTeamNames(teamName) {
  if (
    teamName === 'Kent State' ||
    teamName === 'Utah State' ||
    teamName === 'Ohio State' ||
    teamName === 'NC State' ||
    teamName === 'Iowa State' ||
    teamName === 'Penn State'
  )
    return teamName;
  if (teamName === 'Florida Atlantic') return 'FAU';
  if (teamName === 'Florida International') return 'FIU';
  if (teamName === 'Western Kentucky') return 'Western KY';
  if (teamName === 'Western Carolina') return 'W Carolina';
  if (teamName === 'South Dakota State') return 'S Dakota St';
  if (teamName === 'Pennsylvania') return 'Penn';
  if (teamName === 'Southeast Missouri State') return 'SE Missouri';
  if (teamName === 'Georgia Southern') return 'GA Southern';
  if (teamName === 'Stephen F. Austin') return 'SF Austin';
  if (teamName === 'Charleston Southern') return 'Charleston So';
  if (teamName === 'North Dakota State') return 'N Dakota St';
  if (teamName === 'Pittsburgh') return 'Pitt';
  if (teamName === 'George Washington') return 'G Washington';
  if (teamName === 'Massachusetts') return 'UMass';
  let espnName = teamName.replace('State', 'St');

  return espnName;
}

export default normalizeTeamNames;
