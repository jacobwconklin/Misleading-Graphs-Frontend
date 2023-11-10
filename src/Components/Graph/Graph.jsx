import { Button, Dropdown, Space, Input } from 'antd';
import './Graph.scss';
import React from "react";
import DynamicGraph from './DynamicGraph';

// For datasets
import {csv} from "d3";

import noodle_data_url_old from "../../Assets/Datasets/Old/instant-noodle-demand.csv";
import pet_data_url_old from "../../Assets/Datasets/Old/pet-ownership-uk.csv";
import soccer_data_url_old from "../../Assets/Datasets/Old/number-visitors-japan-dome.csv";


import noodle_data_url from "../../Assets/Datasets/noodles.csv";
import pet_data_url from "../../Assets/Datasets/cats_vs_dogs.csv";
import soccer_data_url from "../../Assets/Datasets/Football Stadiums.csv";

const noodle_data = await csv(noodle_data_url);
const pet_data = await csv(pet_data_url);
const soccer_data = await csv(soccer_data_url);
// const noodle_data = await csv(noodle_data_url_old);
// const pet_data = await csv(pet_data_url_old);
// const soccer_data = await csv(soccer_data_url_old);

let datasets = [
  [noodle_data, "Instant Noodle Sales"],
  [pet_data, "Cat and Dog ownership"],
  [soccer_data, "Soccer Stadiums Worldwide"]
]

// Preprocess datasets
for (let i in datasets)
{
  const ds = datasets[i][0];

  for (let key of ds.columns)
  {
    if (key === "")
    {

      for (let j in ds)
      {
        if (!ds[j].push)
        {
          delete ds[j][key];
        }
      }

      ds.columns.splice(ds.columns.indexOf(key), 1)
    }
  }

}

// Holder for the entire graph component of the page. Will handle swapping in different 
// data sets and different graphs (displaying what the user has selected). Holds state for
// selections users have made for the graph
const Graph = (props) => {

  // const dataSetOptions = [
  //     {
  //       key: '1',
  //       label: "Instant Noodle Sales",
  //       data: noodle_data,
  //       xaxis: 0,
  //       yaxis: 1
  //     },
  //     {
  //       key: '2',
  //       label: "Cat and Dog ownership",
  //       data: pet_data,
  //       xaxis: 0,
  //       yaxis: 1
  //     },
  //     {
  //       key: '3',
  //       label: "Soccer Stadiums Worldwide",
  //       data: soccer_data,
  //       xaxis: 0,
  //       yaxis: 1
  //     },
  // ];

  const dataSetOptions = datasets.map((ds,i)=>{
    return {
      key: `${i+1}`,
      label: ds[1],
      data: ds[0],
      xaxis: 0,
      yaxis: 1,
      yaxes: []
    }
  })


  const dataSetOptionsPlusNone = () => {
    return [{key: '0', label: "NONE"}].concat(dataSetOptions);
  }

// for preprocessing
const preprocess = function(ds, isFirst)
{
  // Only include numeric y axes
  let dsYAxes = [];
  let firstNumericY = -1;
  let i = 0;
  for (let data of ds.data.columns)
  {
    if (!isNaN(ds.data[0][data]))
    {
      dsYAxes.push({
        key: i,
        label: data
      });

      if (firstNumericY === -1)
      {
        firstNumericY = i;
      }

    }
    i++;
  }

  const dataset = {...ds};
  dataset.yaxes = dsYAxes;
  dataset.yaxis = firstNumericY;
  return dataset;
}


  // handle user choosing a dataset
  const selectDataset = ({ key }, isFirst) => {
    // keys corresopnd to the key in the dataSetOptions array above with a NONE option for the
    // second data set
    // alert("Selected Dataset type: " + dataSetOptionsPlusNone().find(set => set.key === key).label + " for your " + 
    //   (isFirst ? "first" : "second" ) + " dataset.");

    if (isFirst)
    {
      setFirstDataset(preprocess(dataSetOptionsPlusNone().find(set => set.key === key), true));
    }
    else
    {
      setSecondDataset(preprocess(dataSetOptionsPlusNone().find(set => set.key === key), true));
    }

  }

  const selectXAxis = ({ key }, isFirst) => {

    if (isFirst)
    {
      setFirstDataset((()=>{
        const dataset = {...firstDataset};
        dataset.xaxis = key;
        return preprocess(dataset, true);
      })());
    }
    else
    {
      setSecondDataset((()=>{
        const dataset = {...secondDataset};
        dataset.xaxis = key;
        return preprocess(dataset, false);
      })());
    }
  }

  const selectYAxis = ({ key }, isFirst) => {

    if (isFirst)
    {
      setFirstDataset((()=>{
        // const dataset = {...firstDataset};
        // dataset.yaxis = key;
        // return preprocess(dataset, true);
        const dataset = preprocess({...firstDataset});
        dataset.yaxis = key;
        return dataset;
      })());
    }
    else
    {
      setSecondDataset((()=>{
        // const dataset ={...secondDataset};
        // dataset.yaxis = key;
        // return preprocess(dataset, false);
        const dataset = preprocess({...secondDataset});
        dataset.yaxis = key;
        return dataset;
      })());
    }
  }

  const graphTypes = [
    {
      key: '0',
      label: "Vertical Bar Graph"
    },
    {
      key: '1',
      label: "Pie Chart"
    },
    {
      key: '2',
      label: "Scatter Plot"
    },
  ];

  // handle user choosing a graph type
  const selectGraphType = ({ key }) => {
    // keys corresopnd to the key in the graphType array above
    // alert("Selected graph type: " + graphTypes.find(graph => graph.key === key).label);
    setGraphType(graphTypes.find(graph => graph.key === key))
  }

    // State
    const [graphType, setGraphType] = React.useState(graphTypes[0]);
    const [firstDataset, setFirstDataset] = React.useState(preprocess(dataSetOptions[0]));
    const [secondDataset, setSecondDataset] = React.useState(preprocess(dataSetOptions[1]));
    const [yScale, setYScale] = React.useState({min: NaN, max: NaN});

    const setYScaleHelper = function (value, isMin)
    {
      if (isMin)
      {
        setYScale({min: parseFloat(value), max:yScale.max});
      }
      else
      {
        setYScale({min:yScale.min, max: parseFloat(value)});
      }

      
    }

    const firstColumns = firstDataset.data.columns.map((v,i)=>{
      return {key: i.toString(), label: v};
    })
    const secondColumns = secondDataset.data.columns.map((v,i)=>{
      return {key: i.toString(), label: v};
    })
  

  return (
      <div className='Graph' id='graph'>
          <h1 className='tryMessage'>Try For Yourself!</h1>
          <p className='tryMessage'>Use the techniques you have learned to avoid to make a graph that seems to suggest something the data doesn't support.</p>
          <br/>
          <div className='controls'>
            <Space direction="vertical">
              <div><h3>Data settings:</h3></div>
              <Dropdown menu={{ items: graphTypes, onClick: selectGraphType }} placement="bottomLeft">
                  <Button>Graph Type: {graphType.label}</Button>
              </Dropdown>
              <div>
                <Dropdown menu={{ items: dataSetOptions, onClick: (value => selectDataset(value, true)) }} placement="bottomLeft">
                    <Button>First Dataset: {firstDataset.label}</Button>
                </Dropdown>
                <Dropdown menu={{ items: firstColumns, onClick: ((value,i) => selectXAxis(value, true)) }} placement="bottomLeft">
                    <Button>X Axes: {firstColumns[firstDataset.xaxis].label}</Button>
                </Dropdown>
                <Dropdown menu={{ items: firstDataset.yaxes, onClick: (value => selectYAxis(value, true)) }} placement="bottomLeft">
                    <Button>Y Axes: {firstColumns[firstDataset.yaxis].label}</Button>
                </Dropdown>
              </div>
              <div>
                <Dropdown menu={{ items: dataSetOptionsPlusNone(), onClick: (value => selectDataset(value, false)) }} placement="bottomLeft">
                    <Button>Second Dataset: {secondDataset.label}</Button>
                </Dropdown>
                <Dropdown menu={{ items: secondColumns, onClick: (value => selectXAxis(value, false)) }} placement="bottomLeft">
                    <Button>X Axes: {secondColumns[secondDataset.xaxis].label}</Button>
                </Dropdown>
                <Dropdown menu={{ items: secondDataset.yaxes, onClick: (value => selectYAxis(value, false)) }} placement="bottomLeft">
                    <Button>Y Axes: {secondColumns[secondDataset.yaxis].label}</Button>
                </Dropdown>
              </div>
              <div>
                <Space direction="vertical">
                  <div><h3>Custom Y Scale:</h3></div>
                  <div>Min: <Input placeholder="Leave Blank for Default" onInput={e=>setYScaleHelper(e.target.value, true)} /></div>
                  <div>Max: <Input placeholder="Leave Blank for Default" onInput={e=>setYScaleHelper(e.target.value, false)} /></div>
                </Space>
              </div>
            </Space>
          </div> 
          <div className='graphDisplay'>
              <DynamicGraph
                graphType={graphType}
                firstDataset={firstDataset}
                secondDataset={secondDataset}
                yScale={yScale}
                />
          </div>
      </div>
  )
}

export default Graph;