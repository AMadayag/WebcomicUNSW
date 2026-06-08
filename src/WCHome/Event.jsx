import './Event.css'
import EventInfo from './EventInfo'

const event1 = "lorem ipsum dolors umbridge skibity ohio wiggle woggle little itty bitty this is text describing the upcoming event isn’t it so cool!!!"
const event2 = "lorem ipsum dolors umbridge skibity ohio wiggle woggle little itty bitty this is text describing the other upcoming event isn’t it so cool!!! (it’s dufferent!)"

function Event() {
  return (
    <div className='events'>
        <h1>UPCOMING EVENTS</h1>
        <div className='event-info'>
            <EventInfo description={event1} link={'image1'}></EventInfo>
            <EventInfo description={event2} link={'image2'}></EventInfo>
        </div>
    </div>
  )
}
 
export default Event
