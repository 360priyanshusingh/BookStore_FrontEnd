import React, { useEffect, useState } from 'react'
import './BookContainer.scss'
import BookCard from '../Bookcard/BookCard'
import { getBookApiCall } from '../../utils/Api'
import { useDispatch, useSelector } from 'react-redux'
import { addBookToList } from '../../utils/store/booksSlice'


export default function BookContainer() {
  const [books,setBooks]=useState([
      //   {
      //   "id": 4,
      //   "price": 2000,
      //   "author": "Library Mindset",
      //   "imgUrl": "https://m.media-amazon.com/images/I/61T7rKzinuL._SY466_.jpg",
      //   "adminId": 1,
      //   "bookName": "The Art of Laziness",
      //   "quantity": 5,
      //   "description": "If the answer is yes, then this book is for you. Laziness stops us from enjoying the little time we have. It doesn't help you accomplish your goals. It stops you from starting anything new. It makes your life miserable.",
      //   "discountPrice": 60
      // },
      // {
      //   "id": 2,
      //   "price": 1000,
      //   "author": "Haruki Murakami",
      //   "imgUrl": "https://m.media-amazon.com/images/I/71OUTeaNQBL._SY466_.jpg",
      //   "adminId": 1,
      //   "bookName": "The City and Its Uncertain Walls",
      //   "quantity": 5,
      //   "description": "When a young man’s girlfriend mysteriously vanishes, he sets his heart on finding the imaginary city where her true self lives. His search will lead him to take a job in a remote library with mysteries of its own.",
      //   "discountPrice": 50
      // }
  ])
  const dispatch=useDispatch()
  const query=useSelector((store)=>(store.querySearch.querySearchString || ""))
  console.log(query)


  const querySearchFuction = ()=>{
    
    setBooks( books?.filter((book) => {
      const filteredNameData=book.bookName.toLowerCase().includes(query.toLowerCase())
      const filteredPriceData = book.price.toString().includes(query);
      return filteredNameData || filteredPriceData;
    }) ) ;

  }

  useEffect(()=>{
    
    if(!query){
      getBookApiCall(`books/getAllBook`)
      .then((result)=>{
         const {data}=result;
         setBooks(data.data)  
        
      })
      .catch((error)=>{
         console.log(error)
      })
    }
    else{
      console.log("useEffent called")
      querySearchFuction()
    }
  

   

  },[query])


  return (
    <div className='book-main-cantainer-cnt' > 
        <div className='book-cnt-header-cnt'>
             <span className='book-heading-cnt' >Books ( {books?.length} item)</span> 
            <div> 
                 <select className='book-selector-heading-cnt' >
                   <option className='book-selector-option-heading-cnt' >Sort By Relevance</option>
                   <option className='book-selector-option-heading-cnt' >Sort By Price</option>
                 </select> 
           </div>
        </div>


        <div className='book-container-cnt'>
          { books.map((book)=>(
                 <BookCard book={book} />
          ))}
            
          
        </div>
   </div>
  )
}
