export interface Player {
    id: string;
    username: string;
    perfs: {
      classical: {
        rating: number;
        progress: number;
      };
    };
    title: string;
    patron: boolean;
  };

export interface PlayerTableProps {
    players: Player[];
    setPlayerName : (newName: string) => void;
};

export interface PlayerGraphProps {
    data : number[],
    xLabels? : string[] 
}
