import './EventInfo.css'

function EventInfo({description, link}) {
  return (
    <div className='info'>
        <p className='description'>{description}</p>
        <button type='button'>
            <img src='src/WCHome/event-svgs/event-btn.svg' alt='event button'></img>
        </button>
    </div>
  )
}
 
export default EventInfo
