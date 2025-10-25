import { Scatter } from "react-chartjs-2";
import { Chart, PointElement } from 'chart.js'
import useDelayedColorMode from "@site/src/utils/use-delayed-color-mode";
import { BracketNameToImage } from "@site/src/data/mapping";

Chart.register(PointElement);

type Bracket = keyof typeof BracketNameToImage
const bracketOrder = Object.keys(BracketNameToImage) as Bracket[];
const bracketColors: { [bracket in Bracket]: string } = {
    "Group A": "#1f77b4",
    "Group B": "#ff7f0e",
    "Group C": "#2ca02c",
    "Group D": "#d62728",
    "Group E": "#9467bd",
    "Group F": "#8c564b",
    "Group G": "#e377c2",
    "Group H": "#7f7f7f",
    // Militia: "#bcbd22"
};

export default function PlayerApmChart({ eapm, bracket }: { eapm: number[], bracket: string }): JSX.Element {
    useDelayedColorMode();

    const style = getComputedStyle(document.body);

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'eAPM by bracket',
            },
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: ({ parsed }) => {
                        return `eAPM: ${parsed.y}`
                    }
                }
            },
        },
        layout: {
            padding: {
                bottom: 30
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { display: false }
            },
            y: {
                grid: {
                    color: style.getPropertyValue('--ifm-color-emphasis-300'),
                },
                ticks: {
                    color: style.getPropertyValue('--ifm-color-emphasis-800'),
                },
            }
        },
    };
    return <Scatter data={{
        datasets: [{
            label: 'eAPM',
            data: eapm,
            backgroundColor: bracketColors[bracket],
            borderColor: bracketColors[bracket],
        }],
        labels: eapm.map((_v, i) => i + 1)
    }} options={options}></Scatter>;
};
