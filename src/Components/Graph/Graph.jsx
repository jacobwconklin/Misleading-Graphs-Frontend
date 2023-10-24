import { Button, Dropdown } from 'antd';
import ExampleGraph from './ExampleGraph';
import './Graph.scss';

// Holder for the entire graph component of the page. Will handle swapping in different 
// data sets and different graphs (displaying what the user has selected). Holds state for
// selections users have made for the graph
const Graph = (props) => {

  const dataSetOptions = [
      {
        key: '1',
        label: "Instant Noodle Sales"
      },
      {
        key: '2',
        label: "Cat and Dog ownership"
      },
      {
        key: '3',
        label: "Soccer Stadiums Worldwide"
      },
  ];

  const dataSetOptionsPlusNone = () => {
    return [{key: '0', label: "NONE"}].concat(dataSetOptions);
  }

  // handle user choosing a dataset
  const selectDataset = ({ key }, isFirst) => {
    // keys corresopnd to the key in the dataSetOptions array above with a NONE option for the
    // second data set
    alert("Selected Dataset type: " + dataSetOptionsPlusNone().find(set => set.key === key).label + " for your " + 
      (isFirst ? "first" : "second" ) + " dataset.");
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
    alert("Selected graph type: " + graphTypes.find(graph => graph.key === key).label);
  }

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
              <div className='buttonSpacer'></div>
              <Dropdown menu={{ items: dataSetOptionsPlusNone(), onClick: (value => selectDataset(value, false)) }} placement="bottomLeft">
                  <Button>Second Dataset</Button>
              </Dropdown>
              <div className='buttonSpacer'></div>
              <Button  
                  type="primary" 
                  onClick={() => {alert("Clicked 1")}} 
              >
                  Button 1
              </Button>
          </div>
          <div className='graphDisplay'>
              <ExampleGraph />
          </div>
      </div>
  )
}

export default Graph;