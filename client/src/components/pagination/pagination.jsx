import '../pagination/pagination.css'

const Pagination = ({ cardsPerPage, totalCards, paginate }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <div>
      <ul className="pagination">
        {
          pageNumbers.map(number =>
            <li key={number} className="pageItem">
              <a onClick={() => paginate(number)} href="#" className="pageLink">{number}
              </a>
            </li>)
        }
      </ul>
    </div>
  )
}

export default Pagination