import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import Item from '../AppointmentItem/index'
import './index.css'

class Appointments extends Component {
  state = {items: [], title: '', date: '', filterFav: false}

  onTitle = event => {
    this.setState({title: event.target.value})
  }

  onDate = event => {
    this.setState({date: event.target.value})
    console.log(event.target.value)
  }

  onSubmit = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newTitle = {
      id: uuidv4(),
      title,
      date,
      isFav: false,
    }
    this.setState(prevState => ({
      items: [...prevState.items, newTitle],
      title: '',
      date: '',
    }))
  }

  fav = id => {
    this.setState(prevState => ({
      items: prevState.items.map(each => {
        if (id === each.id) {
          return {...each, isFav: !each.isFav}
        }
        return each
      }),
    }))
  }

  stared = () => {
    this.setState(prevState => ({filterFav: !prevState.filterFav}))
  }

  render() {
    const {items, filterFav, title, date} = this.state

    const reqResult = filterFav
      ? items.filter(each => each.isFav === true)
      : items
    const classStar = filterFav ? 'starred' : ''
    return (
      <div className="main">
        <div className="form">
          <form onSubmit={this.onSubmit}>
            <h1>Add Appointment</h1>

            <label htmlFor="title">TITLE</label>
            <input
              value={title}
              onChange={this.onTitle}
              id="title"
              type="text"
            />
            <label htmlFor="date">DATE</label>
            <input value={date} id="date" onChange={this.onDate} type="date" />
            <button className="starred" type="submit">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
            alt="appointments"
          />
        </div>
        <br />
        <div>
          <div className="bottom">
            <h1>Appointments</h1>
            <button className={classStar} onClick={this.stared} type="button">
              Starred
            </button>
          </div>
          <ul>
            {reqResult.map(each => (
              <Item details={each} key={each.id} fav={this.fav} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
