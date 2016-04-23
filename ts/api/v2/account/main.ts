import {buildUrl} from '../url';
import xhr from '../../../xhr';

type RawAccount = {
    id: string;
    name: string;
    world: number;
    commander: boolean;
    guilds: string[];
    created: string;
    access: string;
    fractal_level: number;
    daily_ap: number;
    monthly_ap: number;
}

export enum AccessType {
    None,
    PlayForFree,
    GuildWars2,
    HeartOfThorns
}

const rawAccesTypeToAccessType = (rawAccess: string) => {
    switch (rawAccess) {
        case "PlayForFree":
            return AccessType.PlayForFree;
        case "GuildWars2":
            return AccessType.GuildWars2;
        case "HeartOfThorns":
            return AccessType.HeartOfThorns;
        case "None":
        default:
            return AccessType.None
    }
}

export interface Account {
    id: string;
    name: string;
    world: number;
    commander: boolean;
    guilds: string[];
    created: Date;
    access: AccessType;
    fractalLevel: number;
    dailyAp: number;
    monthlyAp: number;
}

const buildAccountFromRawAccount = (rawAccount: RawAccount) => {
    return <Account>{
        access: rawAccesTypeToAccessType(rawAccount.access),
        commander: rawAccount.commander,
        created: new Date(rawAccount.created),
        dailyAp: rawAccount.daily_ap,
        fractalLevel: rawAccount.fractal_level,
        guilds: rawAccount.guilds,
        id: rawAccount.id,
        monthlyAp: rawAccount.monthly_ap,
        name: rawAccount.name,
        world: rawAccount.world
    };
};

export const getAsync = (accessToken: string) => new Promise<Account>((resolve, reject) => {
    xhr.getAsync<RawAccount>(buildUrl('account'), {
        'access_token': accessToken
    }).then(rawAccount => {
        resolve(buildAccountFromRawAccount(rawAccount));
    }).catch(reject);
});

export default {
    getAsync
};