const mapping: Record<string, string> = {
  academies: 'academy',
  players: 'player',
  'training-sessions': 'training_session',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
