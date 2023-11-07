import { Button, Dropdown } from 'antd';
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


// Holder for the entire graph component of the page. Will handle swapping in different 
// data sets and different graphs (displaying what the user has selected). Holds state for
// selections users have made for the graph
const Graph = (props) => {

  const dataSetOptions = [
      {
        key: '1',
        label: "Instant Noodle Sales",
        data: noodle_data,
        xaxis: 0,
        yaxis: 1
      },
      {
        key: '2',
        label: "Cat and Dog ownership",
        data: pet_data,
        xaxis: 0,
        yaxis: 1
      },
      {
        key: '3',
        label: "Soccer Stadiums Worldwide",
        data: soccer_data,
        xaxis: 0,
        yaxis: 1
      },
  ];

  const dataSetOptionsPlusNone = () => {
    return [{key: '0', label: "NONE"}].concat(dataSetOptions);
  }

  // handle user choosing a dataset
  const selectDataset = ({ key }, isFirst) => {
    // keys corresopnd to the key in the dataSetOptions array above with a NONE option for the
    // second data set
    // alert("Selected Dataset type: " + dataSetOptionsPlusNone().find(set => set.key === key).label + " for your " + 
    //   (isFirst ? "first" : "second" ) + " dataset.");

    if (isFirst)
    {
      setFirstDataset(dataSetOptionsPlusNone().find(set => set.key === key));
    }
    else
    {
      setSecondDataset(dataSetOptionsPlusNone().find(set => set.key === key));
    }
  }

  const selectXAxis = ({ key }, isFirst) => {

    if (isFirst)
    {
      setFirstDataset((()=>{
        const dataset = {...firstDataset};
        dataset.xaxis = key;
        return dataset;
      })());
    }
    else
    {
      setSecondDataset((()=>{
        const dataset = {...secondDataset};
        dataset.xaxis = key;
        return dataset;
      })());
    }
  }

  const selectYAxis = ({ key }, isFirst) => {

    if (isFirst)
    {
      setFirstDataset((()=>{
        const dataset = {...firstDataset};
        dataset.yaxis = key;
        return dataset;
      })());
    }
    else
    {
      setSecondDataset((()=>{
        const dataset ={...secondDataset};
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
    const [firstDataset, setFirstDataset] = React.useState(dataSetOptions[0]);
    const [secondDataset, setSecondDataset] = React.useState(dataSetOptions[1]);

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
          <br></br>
          <div className='controls'>
              <Dropdown menu={{ items: graphTypes, onClick: selectGraphType }} placement="bottomLeft">
                  <Button>Graph Type</Button>
              </Dropdown>
              <div className='buttonSpacer'></div>
              <Dropdown menu={{ items: dataSetOptions, onClick: (value => selectDataset(value, true)) }} placement="bottomLeft">
                  <Button>First Dataset</Button>
              </Dropdown>
              <Dropdown menu={{ items: firstColumns, onClick: ((value,i) => selectXAxis(value, true)) }} placement="bottomLeft">
                  <Button>X Axes</Button>
              </Dropdown>
              <Dropdown menu={{ items: firstColumns, onClick: (value => selectYAxis(value, true)) }} placement="bottomLeft">
                  <Button>Y Axes</Button>
              </Dropdown>
              <div className='buttonSpacer'></div>
              <Dropdown menu={{ items: dataSetOptionsPlusNone(), onClick: (value => selectDataset(value, false)) }} placement="bottomLeft">
                  <Button>Second Dataset</Button>
              </Dropdown>
              <Dropdown menu={{ items: secondColumns, onClick: (value => selectXAxis(value, false)) }} placement="bottomLeft">
                  <Button>X Axes</Button>
              </Dropdown>
              <Dropdown menu={{ items: secondColumns, onClick: (value => selectYAxis(value, false)) }} placement="bottomLeft">
                  <Button>Y Axes</Button>
              </Dropdown>
              <div className='buttonSpacer'></div>
          </div>
          <p>
            Currently Selected: Graph Type: {graphType.label}, First Dataset: {firstDataset.label}, Second Dataset: {secondDataset.label}.
          </p>
          <div className='graphDisplay'>
              <DynamicGraph
                graphType={graphType}
                firstDataset={firstDataset}
                secondDataset={secondDataset}
                />
          </div>
      </div>
  )
}

export default Graph;