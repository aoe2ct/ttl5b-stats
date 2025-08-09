import useDelayedColorMode from "@site/src/utils/use-delayed-color-mode";
import Chart from "./chart";
import CivChartConfig, { FilterLegendConfig } from "@site/src/utils/civ-chart-config";
import { merge } from 'lodash-es';
import { Filter } from "../filter/filter-dialog";
import { allCivs } from "@site/src/data/mapping";

export default function PlayerCivPlayedChart({ civWinCounts, civLossCounts, title, filter }: { civWinCounts: Record<string, number>, civLossCounts: Record<string, number>, title: string, filter: Filter }): JSX.Element {
    useDelayedColorMode();
    const playedData: { [key: string]: { civWin: number, civLoss: number } } = Object.fromEntries(allCivs.map((civ) => [civ, { civWin: civWinCounts[civ] ?? 0, civLoss: civLossCounts[civ] ?? 0 }]));
    const civ_win_data = [];
    const civ_loss_data = [];
    const keys = [];
    for (const [key, value] of Object.entries(playedData).sort(([_ka, a], [_kb, b]) => b.civWin + b.civLoss - a.civWin - a.civLoss)) {
        civ_win_data.push(value.civWin);
        civ_loss_data.push(value.civLoss);
        keys.push(key);
    }

    const style = getComputedStyle(document.body);
    const options = merge(CivChartConfig(style, civ_win_data), FilterLegendConfig(style, filter, false), {
        plugins: {
            title: { display: true, text: title },
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
            data: civ_win_data,
            backgroundColor: style.getPropertyValue('--ifm-color-primary-lightest'),
            borderColor: style.getPropertyValue('--ifm-color-primary-dark'),
            borderWidth: 1,
            label: "Victories"
        },
        {
            data: civ_loss_data,
            backgroundColor: style.getPropertyValue('--ifm-color-secondary-darkest'),
            borderColor: style.getPropertyValue('--ifm-color-secondary-dark'),
            borderWidth: 1,
            label: "Losses"
        }], labels: keys
    }} options={options}></Chart>;
};
