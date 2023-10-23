import { Button } from 'antd';
import ExampleGraph from './ExampleGraph';
import './Graph.scss';

// Holder for the entire graph component of the page. Will handle swapping in different 
// data sets and different graphs (displaying what the user has selected). Holds state for
// selections users have made for the graph
const Graph = (props) => {

    return (
        <div className='Graph'>
            <div className='controls'>
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