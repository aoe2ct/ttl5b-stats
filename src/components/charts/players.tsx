import playersData from '@site/src/data/players.json';
import { Fragment, useState } from 'react';
import styles from './base.module.css';
import { acceptableMisnamedMaps, mapDraftNameToDisplay } from '@site/src/data/mapping';
import PlayerMapDraftChart from '@site/src/components/charts/player-map-draft-chart';
import PlayerCivDraftChart from '@site/src/components/charts/player-civ-draft-chart';

function countOccurrences(data: Array<string>): Record<string, number> {
    return data.reduce((counts, selection) => {
        if (!(selection in counts)) {
            return { ...counts, [selection]: 0 };
        }
        return { ...counts, [selection]: counts[selection] + 1 };
    }, {});
}

function listMostCounts(counts: Record<string, number>) {
    const maxCounts = Math.max(...Object.values(counts));
    return Object.entries(counts).filter(([_name, count]) => count == maxCounts).map(([name, _count]) => name).join(", ")
}

function getPlayerStats(playerData: typeof playersData) {
    const games = playerData.length;
    const wins = playerData.filter(data => data.winner).length;
    const mapPickCounts = countOccurrences(playerData.map(data => data.map_picks.map(mapDraftNameToDisplay)).flat());
    const mapBanCounts = countOccurrences(playerData.map(data => data.map_bans.map(mapDraftNameToDisplay)).flat());
    const civPickCounts = countOccurrences(playerData.map(data => data.civ_picks).flat());
    const civBanCounts = countOccurrences(playerData.map(data => data.civ_bans).flat());
    const civSnipeCounts = countOccurrences(playerData.map(data => data.civ_snipes).flat());
    return {
        games,
        sets: new Set(playerData.map(data => data.set_id)).size,
        wins,
        win_perc: roundFloat(wins / games * 100) + '%',
        mapPickCounts,
        mapBanCounts,
        most_picked_map: listMostCounts(mapPickCounts),
        most_banned_map: listMostCounts(mapBanCounts),
        civPickCounts,
        civBanCounts,
        civSnipeCounts,
        most_picked_civ: listMostCounts(civPickCounts),
        most_banned_civ: listMostCounts(civBanCounts),
    }
}

function roundFloat(x: number) {
    return Math.round(x * 100) / 100;
}

export default function Base(): JSX.Element {
    const [filter, setFilter] = useState(null);
    (window as any).setFilter = setFilter;
    const [nameFilter, setNameFilter] = useState("");

    const filteredPlayersData = (filter != null ? playersData.filter(game => filter.brackets.includes(game.bracket)) : playersData).filter(game => game.player.toLowerCase().includes(nameFilter.toLowerCase()));
    const isFilterApplied = playersData.length !== filteredPlayersData.length;
    const allPlayerNames = Array.from(new Set(playersData.map(game => game.player))).sort()
    const playerNames = Array.from(new Set(filteredPlayersData.map(game => game.player))).sort()
    const [selectedPlayer, setSelectedPlayer] = useState(playerNames[0]);
    const selectedPlayerData = playersData.filter(data => data.player == selectedPlayer);
    const playerStats = getPlayerStats(selectedPlayerData);

    return (
        <Fragment>
            <sup className={styles.attributions}>Thanks to Beargwyn for compiling all the data.</sup>
            <sup className={styles.attributions}>Thanks to Salytmacska for creating the original website.</sup>
            <p>Here you can find the stats for individual players who took part in the tournament</p>
            <p>So far, <span className={styles['highlighted-text']}>{allPlayerNames.length}</span> have played at least one set. {isFilterApplied ? <>Current filters include only <span className={styles['highlighted-text']}>{playerNames.length}</span></> : <>All players are selected. <strong>Use the bracket filter in the top right to narrow your options</strong></>}</p>
            <input type="text" placeholder='Find player...' onChange={(event) => setNameFilter(event.target.value)} /><br />
            <ul className={styles['players-list']}>
                {playerNames.map(player => <li key={player} className={styles['player-button'] + (selectedPlayer == player ? ' ' + styles['selected'] : '')}><button onClick={() => setSelectedPlayer(player)}>{player}</button></li>)}
            </ul>
            <h2>{selectedPlayer}'s stats</h2>
            <p>{selectedPlayer} played {playerStats.games} games over {playerStats.sets} sets with an average of {roundFloat(playerStats.games / playerStats.sets)} games per set. They won {playerStats.wins} of their games ({playerStats.win_perc})</p>
            <h3>Drafts data</h3>
            <p>{selectedPlayer}'s most picked map is/are {playerStats.most_picked_map} and the most banned map is/are {playerStats.most_banned_map}.</p>
            <p>This chart is showing the number of times each map was picked or banned during a draft. It is sorted by most picks.</p>
            <PlayerMapDraftChart pickCounts={playerStats.mapPickCounts} banCounts={playerStats.mapBanCounts} filter={filter}></PlayerMapDraftChart>
            {/* <p>Here we can see which maps have been banned most often by the players.</p> */}
            {/* <MapBanChart draftsData={filteredDraftsData} filter={filter}></MapBanChart> */}
            {/* <p>Next up is civilization picks in the drafts specifically. Each column is divided in picks that were sniped, and picks that weren't. The column height is the overall times the civ was picked.</p> */}
            <p>{selectedPlayer}'s most picked civ is/are {playerStats.most_picked_civ} and the most banned civ is/are {playerStats.most_banned_civ}.</p>
            <p>Here is how they drafted when it comes to civilizations. Snipes are the civilizations that {selectedPlayer} sniped from the enemy selection.</p>
            <PlayerCivDraftChart pickCounts={playerStats.civPickCounts} banCounts={playerStats.civBanCounts} snipeCounts={playerStats.civSnipeCounts} filter={filter}></PlayerCivDraftChart>
            {/* <h2>Games data</h2> */}
            {/* <p>So we know which maps were picked in the drafts. But which ones were actually played?</p> */}
            {/* <MapPlayChart gamesData={filteredGamesData.filter(game => game.map != null)} filter={filter}></MapPlayChart> */}
            {/* <p>The next chart shows the number of times a civilization was played. If you are curious about a specific map, or ELO range, then use the filters accessible using the filter button on the top-right.</p> */}
            {/* <CivPlayChart gamesData={filteredGamesData.filter(game => game.map != null)} filter={filter}></CivPlayChart> */}
            {/* <p>Which civ is the best? Below is the win rate chart. Hover each column to get the important additional context of the number of games played.</p> */}
            {/* <CivWinChart gamesData={filteredGamesData.filter(game => game.map != null)} filter={filter}></CivWinChart> */}
            {/* <p>How long each game was? Let's see on the next graph!</p> */}
            {/* <GameTimeChart gamesData={filteredGamesData.filter(game => game.map != null)} filter={filter}></GameTimeChart> */}
            {/* <p>Who is the fastest player in the tournament? We can see the eAPM over all brackets</p> */}
            {/* <ApmChart gamesData={gamesData.filter(game => game.map != null)} filter={filter}></ApmChart> */}
            {/* <hr></hr> */}
            Thanks for checking out T90 Community Cup 2 in Stats!
        </Fragment>
    );
}
