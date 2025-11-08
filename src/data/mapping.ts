export const acceptableMisnamedMaps = {
    "TTL5B Acropolis v3": "TTL5B Acropolis v1",
    "TTL5B Acropolis v2": "TTL5B Acropolis v1",
    "TTL4 Cross v2": "TTL5B Cross v1",
    "TTL4 Dzong v3": "TTL5B Dzong v1",
    "TTL4 Evacuation v1": "TTL5B Evacuation v1",
    "TTL4 Fortified Clearing v2": "TTL5B Fortified Clearing v1",
    "TTL5B Jungle Swamp v2": "TTL5B Jungle Swamp v1",
    "TTL4 Jungle Swamp v4": "TTL5B Jungle Swamp v1",
    "TTL5B Kilimanjaro v2": "TTL5B Kilimanjaro v1",
    "TTL4 Kilimanjaro v2": "TTL5B Kilimanjaro v1",
    "TTL5B Pacific Islands v3": "TTL5B Pacific Islands v1",
    "TTL5B Pacific Islands v2": "TTL5B Pacific Islands v1",
    "TTL4 Pacific Islands v3": "TTL5B Pacific Islands v1",
    "TTL5B Ravines v2": "TTL5B Ravines v1",
    "TTL5B Rocky Forest v2": "TTL5B Rocky Forest v1",
    "TTL4 Rocky Forest v3": "TTL5B Rocky Forest v1",
    "TTL5B Shoals v2": "TTL5B Shoals v1",
};
export const mapDraftNameToGameNameMapping = {
    "acropolis": "TTL5B Acropolis v1",
    "Cross": "TTL5B Cross v1",
    "dzong": "TTL5B Dzong v1",
    "evacuation": "TTL5B Evacuation v1",
    "fortified-clearing": "TTL5B Fortified Clearing v1",
    "jungle-swamp": "TTL5B Jungle Swamp v1",
    "kilimanjaro": "TTL5B Kilimanjaro v1",
    "pacific-islands": "TTL5B Pacific Islands v1",
    "ravines": "TTL5B Ravines v1",
    "rocky-forest": "TTL5B Rocky Forest v1",
    "shoals": "TTL5B Shoals v1",
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
    "Group A": null,
    "Group B": null,
    "Group C": null,
    "Group D": null,
    "Group E": null,
    "Group F": null,
    "Group G": null,
    "Group H": null,
    "Other": null,
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
