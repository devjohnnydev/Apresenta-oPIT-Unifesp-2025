import { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface InvestmentChartProps {
  data: {
    labels: string[];
    values: number[];
  };
}

export function InvestmentChart({ data }: InvestmentChartProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `R$ ${context.parsed.y}bi`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return `R$ ${value}bi`;
          }
        }
      }
    },
    animation: {
      delay: (context: any) => {
        return context.dataIndex * 100;
      },
      duration: 800,
    }
  };

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Volume (R$ Bilhões)',
        data: data.values,
        backgroundColor: data.values.map((_, index) => 
          index === data.values.length - 1 
            ? 'hsl(221, 83%, 53%)' 
            : 'hsl(221, 83%, 53%, 0.8)'
        ),
        borderColor: 'hsl(221, 83%, 53%)',
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  return (
    <div className="chart-container" data-testid="investment-chart">
      <Bar options={options} data={chartData} />
    </div>
  );
}
