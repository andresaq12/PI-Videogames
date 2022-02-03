import { connect } from 'react-redux'
import { setCurrentPage } from '../../store/actions/index'
import '../pagination/pagination.css'

const Pagination = ({ cardsPerPage, totalCards, setCurrentPage, currentPage }) => {

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pageNumbers.push(i)
  }

  const classActiveButton = (number) => {
    if (number === parseInt(currentPage)) {
      return 'activeButton'
    } else {
      return ''
    }
  }

  const handleClick = (e) => {
    e.preventDefault()
    const { value } = e.target
    setCurrentPage(value)
  }

  return (
    <>
      <div className='titlePag'>
        <p>Páginas</p>
      </div>
      <div className="pagination">
        {
          pageNumbers.map(number =>
            <button key={number} name='pages' value={number} onClick={handleClick} className={`pageItem ${classActiveButton(number)}`}>{number}</button>
          )
        }
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    currentPage: state.currentPage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentPage: value => dispatch(setCurrentPage(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination)