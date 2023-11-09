import './Information.scss';
import proliferation from '../../Assets/Site/misleading-graph-proliferation.jpg';
import socialMedia from '../../Assets/Site/socialMediaNews.webp';
import grabPieChart from '../../Assets/Site/grabbing-pie-chart.svg';
import sharkVsIcecream from '../../Assets/Examples/icecreamVsSharks2.png';
import badDoubleAxis from '../../Assets/Examples/drowningVsMarriage.png';
import cherryPicked from '../../Assets/Examples/cherryPickedCooling.webp';
import nonCherryPicked from '../../Assets/Examples/NotCherryPickedWarming.webp';
import chevronTop from '../../Assets/Site/chevron-top.svg';
import chevronBottom from '../../Assets/Site/chevron-bottom.svg';
import { useState } from 'react';

// Information component contains examples and techniques about making misleading graphs.
// this will prepare the user to implement these techniques in making their own 
// graphs as well as show users important issues to look out for.
const Information = (props) => {

    // Allows every section to be collapsable
    const [sectionOneOpen, setSectionOneOpen] = useState(true);
    const [sectionTwoOpen, setSectionTwoOpen] = useState(true);
    const [sectionThreeOpen, setSectionThreeOpen] = useState(true);
    const [techniqueOneOpen, setTechniqueOneOpen] = useState(true);
    const [techniqueTwoOpen, setTechniqueTwoOpen] = useState(true);
    const [techniqueThreeOpen, setTechniqueThreeOpen] = useState(true);

    return (
        <div className='Information'>
            <h1>What are misleading graphs?</h1>
            <section className='infoSection'>
                <div className='infoText'>
                    <div className='infoSubtitleAndButton'
                        onClick={() => setSectionOneOpen(currValue => !currValue)}
                    >
                        <img className='collapseExpand' src={sectionOneOpen ? chevronBottom : chevronTop} alt='collapse or expand '/>
                        <h2>What makes a graph misleading?</h2>
                    </div>
                    <p style={{display: sectionOneOpen ? 'block' : 'none'}}>
                        Misleading graphs manipulate data to support a false conclusion. This website serves to teach about the dangers of 
                        misrepresenting data through examples and by letting you create your own misleadin graphs. Understanding how data 
                        is manipulated is essential for navigating online discussions and creating properly informed opinions. Take back the 
                        power to know when you are being lied to and learn for yourself how easily good data can be tainted. As you can see 
                        in the graph titled "Amount of Misleading Graphs" the number of misleading graphs is growing rapidly every year! 
                        In reality this graph is meaningless, 
                        which you can see if you take a closer look at the years along the x-axis, which are out of order. Also, the values 
                        on the y-axis are also inconsistent jumping all over the place. This is the first lesson on identifying misleading 
                        graphs: Always examine the axis.
                    </p>
                </div>
                <img className='infoImage' src={proliferation} alt='Manipulating a Graph' 
                    style={{height: sectionOneOpen ? '400px' : '0px'}} 
                />
            </section>
            <section className='infoSection'>
                <div className='infoText'>
                    <div className='infoSubtitleAndButton'
                        onClick={() => setSectionTwoOpen(currValue => !currValue)}
                    >
                        <img className='collapseExpand' src={sectionTwoOpen ? chevronBottom : chevronTop} alt='collapse or expand '/>
                        <h2>Why is identifying misinformation important?</h2>
                    </div>
                    <p style={{display: sectionTwoOpen ? 'block' : 'none'}}>
                        Today people are more exposed to disinformation and haphazardly assembled graphs than ever before. 
                        Although there are trusted news sources and fact-checks, the quantity of data we are exposed to 
                        everyday can make it hard to analyze every resource.  The Pew Research Center found that even though over 
                        half of U.S. Adults expect news they see on social media to be largely innacurate, 68% still get 
                        some amount of news from social media. The proliferation of false information can make it seem uncontrollable, 
                        but learning how to detect misleading graphs and scrutinize data can help stave off the spread of misinformation.
                        While getting news from social media isn't necessarily bad, it is important to verify information being shared.
                    </p>
                </div>
                <img className='infoImage' src={socialMedia} alt='Manipulating a Graph'
                    style={{height: sectionTwoOpen ? '600px' : '0px', maxHeight: '600px'}} 
                />
            </section>
            <section className='infoSection'>
                <div className='infoText'>
                    <div className='infoSubtitleAndButton'
                        onClick={() => setSectionThreeOpen(currValue => !currValue)}
                    >
                        <img className='collapseExpand' src={sectionThreeOpen ? chevronBottom : chevronTop} alt='collapse or expand '/>
                        <h2>How to fight misinformation?</h2>
                    </div>
                    <p style={{display: sectionThreeOpen ? 'block' : 'none'}}>
                        The most important means of stopping misinformation is through education. Learning more about techniques used to 
                        spread misinformation through tools like this website empowers people to recognize and avoid bad graphs. Sharing 
                        educational resources and teaching about misinformation is more important than calling out individual examples as 
                        there will always be more. The more easily one recognizes misleading graphs the easier they can recognize which sources
                        are trustworthy and do not misconstrue their data. 
                        It is important to question information, and rely on data and graphs from vetted sources such as reputable journalists and 
                        scientists. 
                        Learning to check graphs for blatant misinformation is a protection 
                        against being manipulated. Creating such graphs for yourself will help drive home these techniques so you know how to 
                        spot them immediately the next time they come up. Have fun and share your learning to help fight misinformation.
                    </p>
                </div>
                <img className='infoImage' src={grabPieChart} alt='Manipulating a Graph' 
                    style={{display: sectionThreeOpen ? 'block' : 'none'}}
                />
            </section>
            <div className='lineBreak'></div>
            <h1>How are misleading graphs created?</h1>
            <section className='infoSection'>
                <div className='infoText'>
                    <div className='infoSubtitleAndButton'
                        onClick={() => setTechniqueOneOpen(currValue => !currValue)}
                    >
                        <img className='collapseExpand' src={techniqueOneOpen ? chevronBottom : chevronTop} alt='collapse or expand '/>
                        <h2>Obfuscated Correlation or spurious relationship</h2>
                    </div>
                    <p style={{display: techniqueOneOpen ? 'block' : 'none'}}>
                        Two separate and unrelated data sets may appear to have ups and downs that coincide. This can give the impression that there  
                        is a correlation between the data sets such that one directly influences the other. In reality they may both be influenced 
                        strongly by a separate factor giving the impression that they are related. In the example of the graph "Ice Cream Sales vs. Shark 
                        Attacks", shark attacks and ice cream 
                        sales follow a seemingly linked trajectory. However the reality is that more people swim in the ocean and eat ice cream in warmer 
                        weather, so the patterns are both due to the changing of the seasons with more ice cream sales and shark attacks in the summer 
                        than in the winter. This can often be seen with the stock market. There will be weeks of unrelated stocks seeming to move 
                        in the exact same pattern as if they directly impact one another. However, these patterns typically match the NASDAQ, the 
                        Dow Jones, and the S&P 500 closely. The overall market is affecting both stocks rather than them affecting one another.
                    </p>
                </div>
                <img className='infoImage' src={sharkVsIcecream} alt='Manipulating a Graph' 
                    style={{display: techniqueOneOpen ? 'block' : 'none'}}
                />
            </section>
            <section className='infoSection'>
                <div className='infoText'>
                    <div className='infoSubtitleAndButton'
                        onClick={() => setTechniqueTwoOpen(currValue => !currValue)}
                    >
                        <img className='collapseExpand' src={techniqueTwoOpen ? chevronBottom : chevronTop} alt='collapse or expand '/>
                        <h2>Cherry Picking</h2>
                    </div>
                    <p style={{display: techniqueTwoOpen ? 'block' : 'none'}}>
                        The act of only choosing select data points that fit a narritive or align in a certain pattern. Any data with 
                        some fluctuations will have periods that go against the overall trend of the data, and by focusing on these 
                        outliers the wrong conclusions can be drawn. 
                    </p>
                </div>
                <div className='twoInfoImages' style={{display: techniqueTwoOpen ? 'flex' : 'none'}}>
                    <img className='innerInfoImage' src={cherryPicked} alt='Cherry picked data showing global cooling' />
                    <img className='innerInfoImage' src={nonCherryPicked} alt='Full non-cherry picked data showing global warming' />
                </div>
            </section>
            <section className='infoSection'>
                <div className='infoText'>
                    <div className='infoSubtitleAndButton'
                        onClick={() => setTechniqueThreeOpen(currValue => !currValue)}
                    >
                        <img className='collapseExpand' src={techniqueThreeOpen ? chevronBottom : chevronTop} alt='collapse or expand '/>
                        <h2>Keep explaining some techniques</h2>
                    </div>
                    <p style={{display: techniqueThreeOpen ? 'block' : 'none'}}>
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
                <img className='infoImage' src={badDoubleAxis} alt='Manipulating a Graph'
                    style={{display: techniqueThreeOpen ? 'block' : 'none', maxHeight: '500px'}} 
                />
            </section>
            <div className='lineBreak'></div>
        </div>
    )
}

export default Information;