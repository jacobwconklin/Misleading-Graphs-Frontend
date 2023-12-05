import { Button, Dropdown, Space, Input } from 'antd';
import './Graph.scss';
import React, { useState, useRef } from "react";
import DynamicGraph from './DynamicGraph';
import xmark from '../../Assets/Site/xmark.svg';

// For datasets
import {csv} from "d3";

import noodle_data_url_old from "../../Assets/Datasets/Old/instant-noodle-demand.csv";
import pet_data_url_old from "../../Assets/Datasets/Old/pet-ownership-uk.csv";
import whale_data_url from "../../Assets/Datasets/BeachedWhales.csv";
//import soccer_data_url_old from "../../Assets/Datasets/Old/number-visitors-japan-dome.csv";

// import pet_data_url from "../../Assets/Datasets/cats_vs_dogs.csv";
import soccer_data_url from "../../Assets/Datasets/Football Stadiums.csv";
import imdb_data_url from "../../Assets/Datasets/imdb_top_1000.csv";

//Added by willmcc
import icecream_data_url from "../../Assets/Datasets/IceCreamSalesByMonth.csv";
import ufo_data_url from "../../Assets/Datasets/Generated_ufo.csv";

import allergy_data_url from "../../Assets/Datasets/AllergiesByMonth.csv";
import cadbury_data_url from "../../Assets/Datasets/CadburyEggSalesByMonth.csv";
import mittens_data_url from "../../Assets/Datasets/MittenSalesByMonth.csv";

const noodle_data = await csv(noodle_data_url_old);
//const pet_data = await csv(pet_data_url);
const soccer_data = await csv(soccer_data_url);
const whale_data = await csv(whale_data_url);
const imdb_data = await csv(imdb_data_url);
const ufo_data = await csv(ufo_data_url);
// const noodle_data = await csv(noodle_data_url_old);
const pet_data = await csv(pet_data_url_old);
// const soccer_data = await csv(soccer_data_url_old);
const mittens_data = await csv(mittens_data_url);
const allergy_data = await csv(allergy_data_url);
const cadbury_data = await csv(cadbury_data_url);

//Added By WillMcC
const icecream_data = await csv(icecream_data_url);


let datasets = [
  [pet_data, "Cat and Dog Owners"],
  [noodle_data, "Instant Noodle Sales"],
  [ufo_data, "Ufo Sightings"],
  [whale_data, "Beached Whales"],
  [icecream_data, "Ice Cream Sales, USA"],
  [mittens_data, "Mitten Sales, USA"],
  [allergy_data, "Allergies Reported"],
  [cadbury_data, "Candy Egg Sales"],
  [soccer_data, "Soccer Stadiums"],
  [imdb_data, "IMDB Data"]
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
  // const [selectedDataSets, setSelectedDatasets] = useState(datasets);

  const graphRef = useRef(null);

  // state variable for maximum number of datapoints to display
  const [maximumDataPoints, setMaximumDataPoints] = useState(12);

  // state variable for adding to removed values from x axis
  const [removedValues, setRemovedValues] = useState([]);
  const [valueToRemove, setValueToRemove] = useState("");

  // state variable for scale applied to first and second graphs
  const [firstScale, setFirstScale] = useState(1);
  const [secondScale, setSecondScale] = useState(1);

  const [dataSetOptions, setDataSetOptions] = useState(datasets.slice(0, 4).map((ds,i)=>{
    return {
      key: `${i+1}`,
      label: ds[1],
      data: ds[0],
      xaxis: 0,
      yaxis: 1,
      yaxes: []
    }
  }));


  const dataSetOptionsPlusNone = () => {
    return [{key: '0', label: "NONE"}].concat(dataSetOptions);
  }

// for preprocessing
const preprocess = function(ds, isFirst)
{
  // Only include numeric y axes
  // try to set yaxis to LAST numeric value (if it exists)
  // so that it isn't the same value as the x-axis immediately when possible
  let dsYAxes = [];
  let lastNumericY = -1;
  let i = 0;
  for (let data of ds.data.columns)
  {
    if (!isNaN(ds.data[0][data]))
    {
      dsYAxes.push({
        key: i,
        label: data
      });

      lastNumericY = i;

    }
    i++;
  }

  const dataset = {...ds};
  dataset.yaxes = dsYAxes;
  dataset.yaxis = lastNumericY;
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
      setFirstScale(1);
      setFirstDataset(preprocess(dataSetOptionsPlusNone().find(set => set.key === key), true));
    }
    else if (key === '0') 
    {
      // user selected 'NONE' as their second database no processesing work needed
      setSecondScale(1);
      setSecondDataset(null);
    }
    else
    {
      setSecondScale(1);
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

  const datasetCategories = [
    {
      key: '0',
      label: "By Year"
    },
    {
      key: '1',
      label: "By Month"
    },
    {
      key: '2',
      label: "All"
    },
  ];

  // handle user choosing a dataset category
  const selectDatasetCategory = ({ key }) => {
    // set usable datasets
    if (key === '0') {
      // By Year
      const newDataOptions = datasets.slice(0, 4).map((ds,i)=>{
        return {
          key: `${i+1}`,
          label: ds[1],
          data: ds[0],
          xaxis: 0,
          yaxis: 1,
          yaxes: []
        }
      });
      setDataSetOptions(newDataOptions);
      setFirstDataset(preprocess(newDataOptions[0]));
      setSecondDataset(null);
    } else if (key === '1') {
      // By Month
      const newDataOptions = datasets.slice(4, 8).map((ds,i)=>{
        return {
          key: `${i+1}`,
          label: ds[1],
          data: ds[0],
          xaxis: 0,
          yaxis: 1,
          yaxes: []
        }
      });
      setDataSetOptions(newDataOptions);
      setFirstDataset(preprocess(newDataOptions[0]));
      setSecondDataset(null);
    } else {
      // All
      setDataSetOptions(datasets.map((ds,i)=>{
        return {
          key: `${i+1}`,
          label: ds[1],
          data: ds[0],
          xaxis: 0,
          yaxis: 1,
          yaxes: []
        }
      }));
    }
    setDatasetCategory(datasetCategories.find(set => set.key === key).label);
  }

    // State
    const [graphType, setGraphType] = React.useState(graphTypes[0]);
    const [datasetCategory, setDatasetCategory] = useState(datasetCategories[0].label);
    const [firstDataset, setFirstDataset] = React.useState(preprocess(dataSetOptions[0]));
    const [secondDataset, setSecondDataset] = React.useState(null);
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
    const secondColumns = secondDataset === null ? null : secondDataset.data.columns.map((v,i)=>{
      return {key: i.toString(), label: v};
    })
  
    
    // handle saving graph
    const clickSave = (type) => {
      const link = document.createElement('a');
      if (type && type === 'jpeg') {
        link.download = "misleading-graph.jpeg";
        link.href = graphRef.current.toBase64Image('image/jpeg', 1);
      } else {
        link.download = "misleading-graph.png";
        link.href = graphRef.current.toBase64Image();
      }
      link.click();
    }

  return (
      <div className='Graph' id='graph'>
          <h1 className='tryMessage'>Try For Yourself!</h1>
          <p className='tryMessage'>Use the techniques you have learned to avoid to make a graph that seems to suggest something the data doesn't support.</p>
          <br/>
          <div className='controls'>
            <Space direction="vertical">
              <div><h3>Data settings:</h3></div>
              <div className='graph-type-and-maximum-data-points'>
                <Dropdown menu={{ items: graphTypes, onClick: selectGraphType }} placement="bottomLeft">
                    <Button>Graph Type: {graphType.label}</Button>
                </Dropdown>
                <Dropdown menu={{ items: datasetCategories, onClick: selectDatasetCategory }} placement="bottomLeft">
                    <Button>Dataset Category: {datasetCategory}</Button>
                </Dropdown> 
              </div>
              <div>
                <Dropdown menu={{ items: dataSetOptions, onClick: (value => selectDataset(value, true)) }} placement="bottomLeft">
                    <Button >Dataset #1: {firstDataset.label}</Button>
                </Dropdown>
                {
                  datasetCategory === 'All' && 
                  <Dropdown menu={{ items: firstColumns, onClick: ((value,i) => selectXAxis(value, true)) }} placement="bottomLeft">
                      <Button>X Axis: {firstColumns[firstDataset.xaxis].label}</Button>
                  </Dropdown>
                }
                {
                  datasetCategory === 'All' &&
                  <Dropdown menu={{ items: firstDataset.yaxes, onClick: (value => selectYAxis(value, true)) }} placement="bottomLeft">
                      <Button>Y Axis: {firstColumns[firstDataset.yaxis].label}</Button>
                  </Dropdown>
                }
                <Input 
                  addonBefore='Scale:'
                  className='scale-data-points'
                  type='number'
                  onInput={e=>setFirstScale( e.target.value < 0.001 ? 0.001 : (e.target.value > 100 ? 100 : (e.target.value)))} 
                  value={firstScale}
                />
              </div>
              <div>
                <Dropdown menu={{ items: dataSetOptionsPlusNone(), onClick: (value => selectDataset(value, false)) }} placement="bottomLeft">
                    <Button>Dataset #2: {secondDataset ? secondDataset.label : 'NONE'}</Button>
                </Dropdown>
                {
                  secondDataset && datasetCategory === 'All' &&
                  <Dropdown 
                    menu={{ items: secondColumns, onClick: (value => selectXAxis(value, false)) }} 
                    placement="bottomLeft"
                    disabled={!secondDataset}  
                  >
                      <Button>X Axis: {secondDataset ? secondColumns[secondDataset.xaxis].label : 'NONE'}</Button>
                  </Dropdown>
                }
                {
                  secondDataset && datasetCategory === 'All' &&
                  <Dropdown 
                    menu={{ items: secondDataset? secondDataset.yaxes : [], onClick: (value => selectYAxis(value, false)) }} 
                    placement="bottomLeft"
                    disabled={!secondDataset}  
                  >
                      <Button>Y Axis: {secondDataset ? secondColumns[secondDataset.yaxis].label : 'NONE'}</Button>
                  </Dropdown>
                }
                {
                  secondDataset && 
                  <Input 
                    addonBefore='Scale:'
                    className='scale-data-points'
                    type='number'
                    onInput={e=>setSecondScale( e.target.value < 0.001 ? 0.001 : (e.target.value > 100 ? 100 : (e.target.value)))} 
                    value={secondScale}
                  />
                }
              </div>
              <div className='scale-and-cherrypicking-modifiers'>
                <div>
                  <Space direction="vertical">
                    <div><h3>Custom Y Scale:</h3></div>
                    <div>
                      <Input 
                        addonBefore='Min: ' 
                        placeholder="Leave Blank for Default" 
                        className='MinMaxInput' 
                        onInput={e=>setYScaleHelper(e.target.value, true)} 
                      />
                    </div>
                    <div>
                      <Input 
                        addonBefore="Max:"
                        placeholder="Leave Blank for Default" 
                        className='MinMaxInput' 
                        onInput={e=>setYScaleHelper(e.target.value, false)} 
                      />
                    </div>
                  </Space>
                </div>
                <div>
                  <Space direction="vertical">
                    <div><h3>Remove Data Points:</h3></div>
                    <Input 
                      addonBefore='Max Number of Data Points:'
                      className='maximum-data-points'
                      type='number'
                      onInput={e=>setMaximumDataPoints( e.target.value < 1 ? 1 : (e.target.value > 40 ? 40 : ~~(e.target.value)))} 
                      value={maximumDataPoints}
                    />
                    <div>
                      <div className='input-and-button-row'>
                        <Input 
                          placeholder="Type Value From X Axis" 
                          onInput={e=>setValueToRemove(e.target.value)} 
                          value={valueToRemove}
                        />
                        <Button 
                          disabled={!valueToRemove}
                          onClick={() => {
                            const newRemovedValues = removedValues;
                            newRemovedValues.push(valueToRemove);
                            setRemovedValues(newRemovedValues);
                            setValueToRemove("");
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                    <div className='removed-datapoints'>
                      { 
                        removedValues.map(removedValue => (
                          <span className='removed-datapoint'
                            onClick={() => {
                              setRemovedValues(currValues => currValues.filter(value => value !== removedValue));
                            }}
                          >
                            {removedValue}
                            <img src={xmark} alt='Delete removed data point' className='remove-icon' />
                          </span>
                        ))
                      }
                    </div>
                  </Space>
                </div>
              </div>
            </Space>
          </div> 
          <div className='graphDisplay'>
              <DynamicGraph
                graphType={graphType}
                firstDataset={firstDataset}
                secondDataset={secondDataset}
                yScale={yScale}
                removedValues={removedValues}
                maximumDataPoints={maximumDataPoints}
                firstScale={firstScale}
                secondScale={secondScale}
                graphRef={graphRef}
              />
          </div>
          <br />
          <div className='save-button-holder'>
            <p>
              Save Graph as:
            </p>
            <Button
              onClick={() => clickSave("jpeg")}
            >.jpeg</Button>
            <Button
              onClick={() => clickSave()}
            >.png</Button>
          </div>
      </div>
  )
}

export default Graph;
