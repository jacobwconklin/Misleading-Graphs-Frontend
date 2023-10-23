import './Information.scss';
import grabPieChart from '../../Assets/Site/grabbing-pie-chart.svg';

// Information component contains examples and techniques about making misleading graphs.
// this will prepare the user to implement these techniques in making their own 
// graphs as well as show users important issues to look out for.
const Information = (props) => {

    return (
        <div className='Information'>
            <h1>Information</h1>
            <section className='infoSection'>
                <div className='infoText'>
                    <h2>What makes a graph misleading?</h2>
                    <p>Lorem ipsum blah blah blah maybe have text on left and pics on the right? idk</p>
                </div>
                <img className='infoImage' src={grabPieChart} alt='Manipulating a Graph' />
            </section>
        </div>
    )
}

export default Information;