import { Link, Navigate, useNavigate } from 'react-router-dom';
import './Header.css'
import categories1 from './CategoriesList';

function Categories1(props) {


const navigate =useNavigate()
  return (
    <div className='cat-container'>
        <div>
        <span className='my-cat'>All Categories :</span>
          {categories1 && categories1.length > 0 &&
categories1.map((item,index)=>{
return(
  <span onClick={()=>navigate('/category/'+item)} key={index} className='category'>{item}</span>
)
})}
</div>


    </div>
  )
}
export default Categories1;