import './index.css'
import {format} from 'date-fns'

const Item = props => {
  const {details, fav} = props
  const {title, date, isFav, id} = details
  const url = isFav
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  console.log(title)
  const onStar = () => {
    fav(id)
  }

  return (
    <li>
      <div className="title-star">
        <p className="para">{title}</p>
        <button type="button" data-testid="star" onClick={onStar}>
          <img src={url} alt="star" />
        </button>
      </div>
      <p>Date: {format(new Date(date), 'dd MMMM yyyy, EEEE')}</p>
    </li>
  )
}

export default Item
