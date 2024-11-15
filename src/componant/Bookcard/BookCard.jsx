import React from 'react'
import './BookCard.scss'
import { useNavigate } from 'react-router-dom'

function BookCard(props) {
  const {book}=props
  const navigate = useNavigate()

const handleBook = (bookId) => {
    navigate(`/bookDetails/${bookId}`)
}

  return (
    <div className='bookcard-main-container' onClick={()=>{handleBook(book.id)}} >
        <div>
            <img className='bookcard-img-cnt'  src={book.imgUrl} alt='no image' />
        </div>
        <div className='bookcard-main-text-cnt'>
        <span className='bookcard-text-cnt-1'>  {book.bookName} </span>
        <span className='bookcard-text-cnt-2' > {book.authorName} </span>
        <span className='bookcard-text-cnt-3' > ✨[4.5]</span>
        <span className='bookcard-text-cnt-4' > Rs.. {book.price}</span>
        </div>
       
    </div>
  )
}

export default BookCard