export const acceptableMisnamedMaps = {
    "TTL5B Acropolis v3": "TTL5B Acropolis v1",
    "TTL5B Acropolis v2": "TTL5B Acropolis v1",
    "TTL5B Jungle Swamp v2": "TTL5B Jungle Swamp v1",
    "TTL5B Kilimanjaro v2": "TTL5B Kilimanjaro v1",
    "TTL5B Pacific Islands v3": "TTL5B Pacific Islands v1",
    "TTL5B Pacific Islands v2": "TTL5B Pacific Islands v1",
    "TTL5B Ravines v2": "TTL5B Ravines v1",
    "TTL5B Rocky Forest v2": "TTL5B Rocky Forest v1",
    "TTL5B Shoals v2": "TTL5B Shoals v1",
};
export const mapDraftNameToGameNameMapping = {
    "african-river": "TCC2_African_River",
    "badlands": "TCC2_Badlands",
    "big-freeze": "TCC2_Big_Freeze",
    "Coast Arena": "TCC2_Coast_Arena",
    "hoodoo": "TCC2_Hoodoo",
    "koala": "TCC2_Koala",
    "le-grand-foss-": "TCC2_Le_grand_Fosse",
    "Northern Crossings": "TCC2_Northern_Crossings",
    "roe-rage": "TCC2_Roe_Rage",
    "sunburn": "TCC2_Sunburn",
    "Triple Tunnel": "TCC2_Triple_Tunnel",
};

export const GameNameMappingToDisplayName = {
    "TTL5B Acropolis v1": "Acropolis",
    "TTL5B Cross v1": "Cross",
    "TTL5B Dzong v1": "Dzong",
    "TTL5B Evacuation v1": "Evacuation",
    "TTL5B Fortified Clearing v1": "Fortified Clearing",
    "TTL5B Jungle Swamp v1": "Jungle Swamp",
    "TTL5B Kilimanjaro v1": "Kilimanjaro",
    "TTL5B Pacific Islands v1": "Pacific Islands",
    "TTL5B Ravines v1": "Ravines",
    "TTL5B Rocky Forest v1": "Rocky Forest",
    "TTL5B Shoals v1": "Shoals",
};

export const BracketNameToImage = {
    // Platinum: '/img/brackets/Champion.webp',
    // Gold: '/img/brackets/Monk.webp',
    // Silver: '/img/brackets/Mangonel.webp',
    Bronze: '/img/brackets/Bronze.webp',
};

export const allCivs = [
    "Britons",
    "Byzantines",
    "Celts",
    "Chinese",
    "Franks",
    "Goths",
    "Japanese",
    "Mongols",
    "Persians",
    "Saracens",
    "Teutons",
    "Turks",
    "Vikings",
    "Aztecs",
    "Huns",
    "Koreans",
    "Mayans",
    "Spanish",
    "Italians",
    "Incas",
    "Magyars",
    "Slavs",
    "Berbers",
    "Ethiopians",
    "Malians",
    "Portuguese",
    "Burmese",
    "Khmer",
    "Malay",
    "Vietnamese",
    "Bulgarians",
    "Cumans",
    "Lithuanians",
    "Tatars",
    "Burgundians",
    "Sicilians",
    "Bohemians",
    "Poles",
    "Bengalis",
    "Dravidians",
    "Gurjaras",
    "Hindustanis",
    "Romans",
    "Armenians",
    "Georgians",
    "Khitans",
    "Jurchens",
    "Shu",
    "Wei",
    "Wu"
];

export function mapDraftNameToDisplay(draftName: string) {
    return GameNameMappingToDisplayName[mapDraftNameToGameNameMapping[draftName] ?? draftName] ?? draftName
}

export function mapGameNameToDisplay(gameName: string) {
    const correctedName = acceptableMisnamedMaps[gameName] ?? gameName;
    const mapName = GameNameMappingToDisplayName[correctedName];
    if (!mapName) {
        console.log("Unknown Map:", mapName);
        return correctedName;
    }
    return mapName;

}
