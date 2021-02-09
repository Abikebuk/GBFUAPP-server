import Raid from './Raid';

type RaidFinderResponse = {
    createdAt: Date;
    timeToServer: number;
    player: string;
    raid: Raid;
};

export default RaidFinderResponse;
