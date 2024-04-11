export type City = {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
  id: string;
};

export type NewCity = {
  cityName: string;
  date: Date;
  country: string;
  emoji: string;
  notes?: string;
  position: {
    lat: string | null;
    lng: string | null;
  };
};
