// we can componetize different kinds of graphs if it makes it easier to pass information in 
// via props, or the graph component may be able to simply swap between them. this is just 
// an example graph from chart.js to show something
import React from 'react';
import 'chart.js/auto';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Pie, Scatter } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const DynamicGraph = (props) => {

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Bar Chart',
          },
        },
      };

    // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    // Try to come up with the intersection of same years
    const unusedLabels = [];
    props.firstDataset.data.filter(date=>date.Year).map(date=>unusedLabels.push(date.Year));
    for (let d in props.secondDataset.data)
    {
      let date = props.secondDataset.data[d];
      if (date.Year)
      {
        let i = unusedLabels.indexOf(date.Year);
        if (i != -1)
        {
          unusedLabels[i] = [date.Year];
        }
      }
      
    }

    const labels = unusedLabels.filter((d)=>d.push).map(([date])=>date);

    // Now filter data
    const firstData = labels.map(l=>parseFloat(Object.values(props.firstDataset.data.find(d=>d.Year===l))[1]));
    const secondData = labels.map(l=>parseFloat(Object.values(props.secondDataset.data.find(d=>d.Year===l))[1]));

    const data = {
        labels,
        datasets: [
            {
            label: props.firstDataset.label,
            data: firstData,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
            label: props.secondDataset.label,
            data: secondData,
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };
    
    if (props.graphType.label === "Vertical Bar Graph")
    {
      return (
        <div className='ExampleGraph graphHolder'>
            <Bar options={options} data={data} />
        </div>
    )
    }
    else if (props.graphType.label === "Pie Chart")
    {
      return (
        <div className='ExampleGraph graphHolder'>
            <Pie options={options} data={data} />
        </div>
    )
    }
    else if (props.graphType.label === "Scatter Plot")
    {
      return (
        <div className='ExampleGraph graphHolder'>
            <Scatter options={options} data={data} />
        </div>
    )
    }
    else
    {
      return <p>Unknown Graph Type</p>
    }

    
}

export default DynamicGraph;