import Raid from './Raid';

/**
 * RaidFinderResponse Model
 */
type RaidFinderResponse = {
    createdAt: Date;
    timeToServer: number;
    player: string;
    raid: Raid;
};

export default RaidFinderResponse;
