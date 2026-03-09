export interface Drone {
  id: number;
  name: string;
  notes: Note[];
}

export interface Scale {
  id: number;
  name: string;
  notes: Note[];
}

export interface Note {
  name: string;
  ratio?: string;
  ratioNumber?: number;
}
