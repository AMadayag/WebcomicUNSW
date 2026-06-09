import './EventInfo.css'

function EventInfo({description, link}) {
  return (
    <div className='info'>
        <p className='description'>{description}</p>
        <button type='button'>
            <img src='event-btn.svg' alt='event button' className='event-btn'></img>
        </button>
    </div>
  )
}
 
export default EventInfo
