import { TrainingSessionInterface } from 'interfaces/training-session';
import { UserInterface } from 'interfaces/user';
import { AcademyInterface } from 'interfaces/academy';
import { GetQueryInterface } from 'interfaces';

export interface PlayerInterface {
  id?: string;
  user_id: string;
  academy_id: string;
  personal_information?: string;
  preferences?: string;
  created_at?: any;
  updated_at?: any;
  training_session?: TrainingSessionInterface[];
  user?: UserInterface;
  academy?: AcademyInterface;
  _count?: {
    training_session?: number;
  };
}

export interface PlayerGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  academy_id?: string;
  personal_information?: string;
  preferences?: string;
}
