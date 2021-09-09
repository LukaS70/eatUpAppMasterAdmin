import React from 'react'
import { Line } from 'react-chartjs-2'

function LineChart(props) {
    return (
        <div>
            <Line
                data={{
                    labels: props.labels,
                    datasets: [
                        {
                            label: '',
                            data: props.data,
                            borderColor: '#000000',
                            backgroundColor: '#cae5c4',
                            hoverBackgroundColor: '#cfe8ca',
                            hoverBorderColor: 'success',
                            pointBackgroundColor: '#438a06',
                            pointBorderColor: 'success',
                            borderWidth: 1
                        }
                    ],
                }}
                options={{
                    responsive: true,
                    title: {
                        display: true,
                        text: props.title
                    },
                    pan: {
                        enabled: true,
                        mode: 'xy'
                    },
                    zoom: {
                        enabled: true,
                        mode: 'xy'
                    },
                    scales: {
                        yAxes: [{
                            display: true,
                            ticks: {
                                beginAtZero: true,
                                stepSize: 500,
                                suggestedMax: props.max + 1000
                            }
                        }]
                    }
                }}
            />
        </div>
    )
}

export default LineChart
