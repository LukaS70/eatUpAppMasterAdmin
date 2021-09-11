import React from 'react'
import { Line } from 'react-chartjs-2'

function LineChart(props) {
    console.log(props);
    return (
        <div>
            <Line
            style={{minHeight:'400px'}}
                data={{
                    labels: props.labels,
                    datasets: [
                        {
                            label: props.title,
                            data: props.data,
                            borderColor: props.colors.borderColor,
                            backgroundColor: props.colors.backgroundColor,
                            hoverBackgroundColor: props.colors.hoverBackgroundColor,
                            hoverBorderColor: props.colors.hoverBorderColor,
                            pointBackgroundColor: props.colors.pointBackgroundColor,
                            pointBorderColor: props.colors.pointBorderColor,
                            borderWidth: props.colors.borderWidth,
                            lineTension: props.colors.lineTension,
                            fill: true
                        }
                    ],
                }}
                options={{
                    responsive: true,
                    /* plugins: {
                        title: {
                            display: true,
                            text: props.title
                        },
                    }, */
                    /* pan: {
                        enabled: true,
                        mode: 'xy'
                    },
                    zoom: {
                        enabled: true,
                        mode: 'xy'
                    }, */
                    scales: {
                        y: {
                            display: true,
                            ticks: {
                                beginAtZero: true,
                                stepSize: 500,
                            }
                        }
                    }
                }}
            />
        </div>
    )
}

export default LineChart
