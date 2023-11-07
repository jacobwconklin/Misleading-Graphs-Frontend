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
    const firstXAxis = Object.values(props.firstDataset.data.columns)[props.firstDataset.xaxis];
    const firstYAxis = Object.values(props.firstDataset.data.columns)[props.firstDataset.yaxis];
    const secondXAxis = Object.values(props.secondDataset.data.columns)[props.secondDataset.xaxis];
    const secondYAxis = Object.values(props.secondDataset.data.columns)[props.secondDataset.yaxis];
    // console.log(props.secondDataset)

    // // Try to come up with the intersection of same years
    // const unusedLabels = [];
    // props.firstDataset.data.filter(date=>date.Year).map(date=>unusedLabels.push(date.Year));
    // for (let d in props.secondDataset.data)
    // {
    //   let date = props.secondDataset.data[d];
    //   if (date.Year)
    //   {
    //     let i = unusedLabels.indexOf(date.Year);
    //     if (i != -1)
    //     {
    //       unusedLabels[i] = [date.Year];
    //     }
    //   }
      
    // }

    // const labels = unusedLabels.filter((d)=>d.push).map(([date])=>date);

    // // Now filter data
    // const firstData = labels.map(l=>parseFloat(Object.values(props.firstDataset.data.find(d=>d.Year===l))[1]));
    // const secondData = labels.map(l=>parseFloat(Object.values(props.secondDataset.data.find(d=>d.Year===l))[1]));

    // Filter from x and y axes
    // const unusedLabels = [];
    // props.firstDataset.data.filter(v=>v[firstXAxis]).map(v=>unusedLabels.push(v[firstXAxis]));
    // for (let i in props.secondDataset.data)
    // {
    //   let o = props.secondDataset.data[i];
    //   if (o[firstXAxis])
    //   {
    //     const j = unusedLabels.indexOf(o[firstXAxis]);
    //     if (j != -1)
    //     {
    //       console.log(j)
    //       unusedLabels[j] = [o[firstXAxis]];
    //     }
    //   }
    // }

    // console.log(unusedLabels)

    // const labels = unusedLabels.filter((d)=>d.push).map(([v])=>v);
    // // Now filter data
    // const firstData = labels.map(l=>parseFloat(Object.values(props.firstDataset.data.find(d=>d[firstXAxis]===l))[1]));
    // const secondData = labels.map(l=>parseFloat(Object.values(props.secondDataset.data.find(d=>d[firstXAxis]===l))[1]));

    const unusedLabels = [];
    let error = false;

    const firstVals = props.firstDataset.data.map(v=>[v[firstXAxis], v[firstYAxis], false]);
    const secondVals = props.secondDataset.data.map(v=>[v[secondXAxis], v[secondYAxis], false]);

    const labels = [];
    for (const v1 of firstVals)
    {
      for (const v2 of secondVals)
      {
        if (v1[0] === v2[0] && (!v1[2] && !v2[2]))
        {
          labels.push(v1[0]);
          v1[2] = true;
          v2[2] = true;
        }
      }
    }

    const firstData = firstVals.filter(v=>labels.includes(v[0])).map(v=>parseFloat(v[1])); 
    const secondData = secondVals.filter(v=>labels.includes(v[0])).map(v=>parseFloat(v[1])); 

    if (firstData.length == 0 || secondData.length == 0 || firstData.includes(NaN) || secondData.includes(NaN))
    {
      error = true;
    }

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
    
    if (error)
    {
      return (
        <div style={{width:"80%", height:"600px", display:"flex",justifyContent:"center",alignItems:"center"}}>
          <h2>Please Update Axes</h2>
          <ul>
            <li>Make sure the X Axes likely share values (e.g. years)</li>
            <li>Make sure the Y Axes are numeric (e.g. population)</li>
          </ul>
        </div>
      );
    }
    else if (props.graphType.label === "Vertical Bar Graph")
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