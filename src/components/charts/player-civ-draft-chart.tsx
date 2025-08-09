import useDelayedColorMode from "@site/src/utils/use-delayed-color-mode";
import Chart from "./chart";
import CivChartConfig, { FilterLegendConfig } from "@site/src/utils/civ-chart-config";
import { merge } from 'lodash-es';
import { Filter } from "../filter/filter-dialog";
import { allCivs } from "@site/src/data/mapping";

export default function PlayerCivDraftChart({ pickCounts, banCounts, snipeCounts, filter }: { pickCounts: Record<string, number>, banCounts: Record<string, number>, snipeCounts: Record<string, number>, filter: Filter }): JSX.Element {
    useDelayedColorMode();
    const draftsData: { [key: string]: { pick: number, ban: number, snipe: number } } = Object.fromEntries(allCivs.map((civ) => [civ, { pick: pickCounts[civ] ?? 0, ban: banCounts[civ] ?? 0, snipe: snipeCounts[civ] ?? 0 }]));
    const pick_data = [];
    const ban_data = [];
    const snipe_data = [];
    const keys = [];
    for (const [key, value] of Object.entries(draftsData).sort(([_ka, a], [_kb, b]) => b.pick + b.snipe + b.ban - a.pick - a.snipe - a.ban)) {
        pick_data.push(value.pick);
        ban_data.push(value.ban);
        snipe_data.push(value.snipe);
        keys.push(key);
    }

    const style = getComputedStyle(document.body);
    const options = merge(CivChartConfig(style, pick_data), FilterLegendConfig(style, filter, false), {
        plugins: {
            title: { display: true, text: 'Civilization drafting' },
            tooltip: { enables: true },
        },
        scale: {
            x: {
                stacked: true
            },
            y: {
                stacked: true
            }
        }
    });
    return <Chart data={{
        datasets: [{
            data: pick_data,
            backgroundColor: style.getPropertyValue('--ifm-color-primary-lightest'),
            borderColor: style.getPropertyValue('--ifm-color-primary-dark'),
            borderWidth: 1,
            label: "Picks"
        },
        {
            data: ban_data,
            backgroundColor: style.getPropertyValue('--ifm-color-secondary-darkest'),
            borderColor: style.getPropertyValue('--ifm-color-secondary-dark'),
            borderWidth: 1,
            label: "Bans"
        },
        {
            data: snipe_data,
            backgroundColor: style.getPropertyValue('--ifm-color-secondary-lightest'),
            borderColor: style.getPropertyValue('--ifm-color-secondary-dark'),
            borderWidth: 1,
            label: "Snipes"
        }], labels: keys
    }} options={options}></Chart>;
};
