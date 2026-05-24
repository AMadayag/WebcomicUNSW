import './Heading.css'

function Heading() {

  return (
    <div className='header'>
        <div className='panel1'>
            <img src='src/WCHome/heading-svgs/comic-panel1.svg' alt='comic-panel-1'></img>
            <div className='banner'>
                <img src='src/WCHome/heading-svgs/speech-bub-big.svg' alt='speech-bubble-big' className='speech-bubble-big'></img>
                <h3 className='banner-text'>WE ARE WEBCOMIC UNSW</h3>
            </div>
        </div>
        
        <img src='src/WCHome/heading-svgs/comic-panel2.svg' alt='comic-panel-2'></img>
    </div>
  )
}

export default Heading
