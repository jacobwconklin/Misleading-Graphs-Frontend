import './Information.scss';
import grabPieChart from '../../Assets/Site/grabbing-pie-chart.svg';
import sharkVsIcecream from '../../Assets/Examples/icecreamVsSharks2.png';
import badDoubleAxis from '../../Assets/Examples/drowningVsMarriage.png';

// Information component contains examples and techniques about making misleading graphs.
// this will prepare the user to implement these techniques in making their own 
// graphs as well as show users important issues to look out for.
const Information = (props) => {

    return (
        <div className='Information'>
            <h1>What are misleading graphs?</h1>
            <section className='infoSection'>
                <div className='infoText'>
                    <h2>What makes a graph misleading?</h2>
                    <p>Lorem ipsum blah blah blah maybe have text on left and pics on the right? idk</p>
                </div>
                <img className='infoImage' src={grabPieChart} alt='Manipulating a Graph' />
            </section>
            <section className='infoSection'>
                <div className='infoText'>
                    <h2>Why is identifying misinformation important?</h2>
                    <p>Lorem ipsum blah blah blah crazy world we live in</p>
                </div>
                <img className='infoImage' src={grabPieChart} alt='Manipulating a Graph' />
            </section>
            <div className='lineBreak'></div>
            <h1>How are misleading graphs created?</h1>
            <section className='infoSection'>
                <div className='infoText'>
                    <h2>Obfuscated Correlation or spurious relationship</h2>
                    <p>
                        Two separate and unrelated data sets may appear to have ups and downs that coincide. This can give the impression that there  
                        is a correlation between the data sets such that one directly influences the other. In reality they may both be influenced 
                        strongly by a separate factor giving the impression that they are related. In the example to the right shark attacks and ice cream 
                        sales follow a seemingly linked trajectory. However the reality is that more people swim in the ocean and eat ice cream in warmer 
                        weather, so the patterns are both due to the changing of the seasons with more ice cream sales and shark attacks in the summer 
                        than in the winter. This can often be seen with the stock market. There will be weeks of unrelated stocks seeming to move 
                        in the exact same pattern as if they directly impact one another. However, these patterns typically match the NASDAQ, the 
                        Dow Jones, and the S&P 500 closely. The overall market is affecting both stocks rather than them affecting one another.
                    </p>
                </div>
                <img className='infoImage' src={sharkVsIcecream} alt='Manipulating a Graph' style={{height: '300px'}} />
            </section>
            <section className='infoSection'>
                <div className='infoText'>
                    <h2>Keep explaining some techniques</h2>
                    <p>
                        Probably only need to include ones that users will actually be able to make with the graphs below. Here are the 
                        techniques we listed in our slides: 
                    Obfuscated Correlation
                    Zoomed in scale
                    Double axis
                    Omitting outliers
                    Cherry Picking
                    Square scaling
                    Omitting context
                    Axis breaks
                    Logarithmic vs Linear
                    </p>
                </div>
                <img className='infoImage' src={badDoubleAxis} alt='Manipulating a Graph' style={{height: '300px'}} />
            </section>
            <div className='lineBreak'></div>
        </div>
    )
}

export default Information;