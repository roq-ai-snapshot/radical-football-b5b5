import { PlayerInterface } from 'interfaces/player';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TrainingSessionInterface {
  id?: string;
  player_id: string;
  coach_id: string;
  date: any;
  drills: string;
  performance_metrics: string;
  created_at?: any;
  updated_at?: any;

  player?: PlayerInterface;
  user?: UserInterface;
  _count?: {};
}

export interface TrainingSessionGetQueryInterface extends GetQueryInterface {
  id?: string;
  player_id?: string;
  coach_id?: string;
  drills?: string;
  performance_metrics?: string;
}
