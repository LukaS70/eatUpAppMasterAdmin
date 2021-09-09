import React from 'react'
import { HorizontalBar } from 'react-chartjs-2'

function HorizontalBarChart(props) {
    return (
        <div>
            <HorizontalBar
                data={{
                    labels: props.labels,
                    datasets: [
                        {
                            label: '',
                            data: props.data,
                            barPercentage: 1,
                            categoryPercentage: 1,
                            borderColor: props.borderColor,
                            backgroundColor: props.backgroundColor,
                            hoverBackgroundColor: props.hoverBackgroundColor,
                            hoverBorderColor: props.hoverBorderColor,
                            borderWidth: 1
                        }
                    ],
                }}
                options={{
                    maintainAspectRatio: false,
                    responsive: true,
                    title: {
                        display: true,
                        // tslint:disable-next-line:quotemark
                        text: props.title
                    },
                    scales: {
                        xAxes: [{
                            id: 'x-axis-0',
                            display: true,
                            ticks: {
                                beginAtZero: true,
                                stepSize: 250,
                                suggestedMax: props.max + 100
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'kcal'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            ticks: {
                                display: false
                            }
                        }]
                    },
                    annotation: {
                        annotations: [{
                            type: 'line',
                            mode: 'vertical',
                            scaleID: 'x-axis-0',
                            value: props.max,
                            borderColor: 'red',
                            borderWidth: 3,
                            /* label: {
                              content: 'Max',
                              enabled: true,
                              position: 'bottom'
                            } */
                        }]
                    }
                }}
            />
        </div>
    )
}

export default HorizontalBarChart
