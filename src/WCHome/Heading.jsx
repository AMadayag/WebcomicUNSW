import './Heading.css'

function Heading() {
  return (
    <div className='heading'>
        <div className='panel'>
            <img src='/heading-svgs/comic-panel1.svg' alt='comic-panel-1' className='comic-panel-1'></img>
            <div className='banner'>
                <img src='/heading-svgs/speech-bub-big.svg' alt='speech-bubble-big' className='speech-bubble-big'></img>
                <h3 className='banner-text'>WE ARE WEBCOMIC UNSW</h3>
            </div>
            
            <img src='/heading-svgs/comic-panel2.svg' alt='comic-panel-2' className='comic-panel-2'></img>
            <img src='/heading-svgs/speech-bub-small.svg' alt='speech-bubble-small' className='speech-bubble-small'></img>
        </div>
    </div>
  )
}
 
export default Heading
