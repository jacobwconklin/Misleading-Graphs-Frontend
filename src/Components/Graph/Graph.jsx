import { Button, Dropdown } from 'antd';
import ExampleGraph from './ExampleGraph';
import './Graph.scss';

// Holder for the entire graph component of the page. Will handle swapping in different 
// data sets and different graphs (displaying what the user has selected). Holds state for
// selections users have made for the graph
const Graph = (props) => {

    // TODO this is just to show how antd dropdowns work, can be deleted
    const exampleItems = [
        {
          key: '1',
          label: (
            <p>
              1st menu item
            </p>
          ),
        },
        {
          key: '2',
          label: (
            <p>
              2nd menu item
            </p>
          ),
        },
        {
          key: '3',
          label: (
            <p>
              3rd menu item
            </p>
          ),
        },
    ];

    return (
        <div className='Graph'>
            <h1 className='tryMessage'>Try For Yourself!</h1>
            <div className='controls'>
                <Button  
                    type="primary" 
                    onClick={() => {alert("Clicked 1")}} 
                >
                    Button 1
                </Button>
                <div className='buttonSpacer'></div>
                <Dropdown menu={{ items: exampleItems }} placement="bottomLeft">
                    <Button>bottomLeft</Button>
                </Dropdown>
            </div>
            <div className='graphDisplay'>
                <ExampleGraph />
            </div>
        </div>
    )
}

export default Graph;