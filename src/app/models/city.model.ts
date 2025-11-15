import { Forecast } from './forecast.model';

export interface City {
  id: number;
  city: string;
  forecast: Forecast[];
}
