import '../pagination/pagination.css'

const Pagination = ({ cardsPerPage, totalCards, paginate, currrentPage }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <>
      <div className='titlePag'>
        <p>Páginas</p>
      </div>
      <div className="pagination">
        {
          pageNumbers.map(number =>
            <button key={number} onClick={() => paginate(number)} className="pageItem">{number}</button>
          )
        }
      </div>
    </>
  )
}

export default Pagination