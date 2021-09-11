import React from 'react'
import { Bar } from 'react-chartjs-2'

function BarChart(props) {
    return (
        <div>
            <Bar
            style={{minHeight:'400px'}}
                data={{
                    labels: props.labels,
                    datasets: [
                        {
                            label: '',
                            data: props.data,
                            barPercentage: 0.5,
                            categoryPercentage: 1,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(255, 205, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(201, 203, 207, 0.2)'
                              ],
                              borderColor: [
                                'rgb(255, 99, 132)',
                                'rgb(255, 159, 64)',
                                'rgb(255, 205, 86)',
                                'rgb(75, 192, 192)',
                                'rgb(54, 162, 235)',
                                'rgb(153, 102, 255)',
                                'rgb(201, 203, 207)'
                              ],
                            hoverBackgroundColor: [
                                'rgb(255, 99, 132)',
                                'rgb(255, 159, 64)',
                                'rgb(255, 205, 86)',
                                'rgb(75, 192, 192)',
                                'rgb(54, 162, 235)',
                                'rgb(153, 102, 255)',
                                'rgb(201, 203, 207)'
                              ],
                            hoverBorderColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(255, 205, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(201, 203, 207, 0.2)'
                              ],
                            borderWidth: 1
                        }
                    ],
                }}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: props.title
                        },
                    },
                    maintainAspectRatio: false,
                    responsive: true,
                    scales: {
                        y: {
                            ticks: {
                                beginAtZero: true,
                                /* stepSize: 2, */
                            },
                        },
                    },
                }}
            />
        </div>
    )
}

export default BarChart
