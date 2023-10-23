import './SiteHeader.scss';
import logo from '../../Assets/Site/analyzing-graph.svg';

// SiteHeader
const SiteHeader = (props) => {

    return (
        <div className='SiteHeader'>
            <div className='logoHolder'>
                <img className='logoImage' src={logo} alt='Analyze a Graph'/>
            </div>
            <h1>Misleading Graphs</h1>
            <div className='actions'>

            </div>
        </div>
    )
}

export default SiteHeader;