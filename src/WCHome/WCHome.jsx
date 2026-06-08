import Event from './Event'
import Heading from './Heading'
import JoinUs from './JoinUs'
import './WCHome.css'

function WCHome() {

  return (
    <div className='header'>
        <Heading></Heading>
        <Event></Event>
        <JoinUs></JoinUs>
    </div>
  )
}

export default WCHome
