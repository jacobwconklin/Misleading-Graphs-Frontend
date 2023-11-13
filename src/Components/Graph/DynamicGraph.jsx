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

const maxNumberElements = 20;

// TODO ideas:  limit choices for x-axis
// allow users to remove specific data points / select only specific data points if they would

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

    let error = false;

    const getData = () => {
      if (props.secondDataset === null) {
        // only supply FIRST data set 
        const firstXAxis = Object.values(props.firstDataset.data.columns)[props.firstDataset.xaxis];
        const firstYAxis = Object.values(props.firstDataset.data.columns)[props.firstDataset.yaxis];
  
        const firstVals = props.firstDataset.data.map(v=>[v[firstXAxis], v[firstYAxis], false]);
  
        let labels = [];
        for (const v1 of firstVals)
        {
          if (!props.removedValues.includes(v1[0])) {
            labels.push(v1[0]);
            v1[2] = true;
          }
        }
  
        // trim labels
        labels = labels.splice(0, maxNumberElements);
  
        const firstData = firstVals.filter(v=>labels.includes(v[0])).map(v=>parseFloat(v[1])).splice(0, maxNumberElements);; 
  
        if (firstData.length === 0 || firstData.includes(NaN))
        {
          error = true;
        }

        return {
          labels,
          datasets: [
            {
              label: props.firstDataset.label,
              data: firstData,
              backgroundColor: 'rgba(255, 99, 132, 0.7)',
            },
          ],
        };
      } else {
        // supply both first and second data sets
        const firstXAxis = Object.values(props.firstDataset.data.columns)[props.firstDataset.xaxis];
        console.log(firstXAxis);
        const firstYAxis = Object.values(props.firstDataset.data.columns)[props.firstDataset.yaxis];
        const secondXAxis = Object.values(props.secondDataset.data.columns)[props.secondDataset.xaxis];
        const secondYAxis = Object.values(props.secondDataset.data.columns)[props.secondDataset.yaxis];
  
        const firstVals = props.firstDataset.data.map(v=>[v[firstXAxis], v[firstYAxis], false]);
        console.log(firstVals);
        const secondVals = props.secondDataset.data.map(v=>[v[secondXAxis], v[secondYAxis], false]);
  
        let labels = [];
        for (const v1 of firstVals)
        {
          for (const v2 of secondVals)
          {
            if (v1[0] === v2[0] && (!v1[2] && !v2[2]) && !props.removedValues.includes(v1[0]) )
            {
              labels.push(v1[0]);
              v1[2] = true;
              v2[2] = true;
            }
          }
        }
  
        // trim labels
        labels = labels.splice(0, maxNumberElements);
  
        const firstData = firstVals.filter(v=>labels.includes(v[0])).map(v=>parseFloat(v[1])).splice(0, maxNumberElements);; 
        const secondData = secondVals.filter(v=>labels.includes(v[0])).map(v=>parseFloat(v[1])).splice(0, maxNumberElements);; 
  
        if (firstData.length === 0 || firstData.includes(NaN) || secondData.length === 0 || secondData.includes(NaN))
        {
          error = true;
        }

        return {
          labels,
          datasets: [
            {
              label: props.firstDataset.label,
              data: firstData,
              backgroundColor: 'rgba(255, 99, 132, 0.7)',
            },
            {
              label: props.secondDataset.label,
              data: secondData,
              backgroundColor: 'rgba(53, 162, 235, 0.7)',
            },
          ],
        };
      }
    }

    // Set min and max
    options.scales = {
      y: props.yScale
    }

    if (isNaN(props.yScale.min))
    {
      options.scales.y.min = 0
    }
    // if (isNaN(props.yScale.max))
    // {
    //   options.scales.y.max = Math.max(...[...firstData, ...secondData])
    // }

    
    if (error)
    {
      return (
        <div style={{width:"100%", height:"400px", display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center", border:"2px solid black"}}>
          <h2>Please Update Axes</h2>
          <ul>
            <li>Make sure the X Axes likely share values (e.g. years, country)</li>
          </ul>
        </div>
      );
    }
    else if (props.graphType.label === "Vertical Bar Graph")
    {
      return (
        <div className='ExampleGraph graphHolder'>
            <Bar options={options} data={getData()} />
        </div>
    )
    }
    else if (props.graphType.label === "Pie Chart")
    {
      return (
        <div className='ExampleGraph graphHolder'>
            <Pie options={options} data={getData()} />
        </div>
    )
    }
    else if (props.graphType.label === "Scatter Plot")
    {
      return (
        <div className='ExampleGraph graphHolder'>
            <Scatter options={options} data={getData()} />
        </div>
    )
    }
    else
    {
      return <p>Unknown Graph Type</p>
    }

    
}

export default DynamicGraph;