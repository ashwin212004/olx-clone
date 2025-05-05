import { useEffect, useId, useState } from 'react';
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Categories1 from './Categories1';
import {FaHeart, FaEdit} from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import './Home.css';



function MyProducts() {

    const navigate = useNavigate()
    const [products, setproducts] = useState([]);
    const [cproducts, setcproducts] = useState([]);
    const[search,setsearch]=useState('');
    const[refresh,setrefresh]=useState(false);
    useEffect(() => {
        const url = 'http://localhost:4000/my-products';
        let data ={ userId : localStorage.getItem("userId")}
        axios.post(url,data)
            .then((res) => {
                if (res.data.product) {
                    setproducts(res.data.product);

                }
            })
            .catch((err) => {
                alert('Sercer Err.')

            })
    }, [refresh])
    const handlesearch=(value)=>{
        setsearch(value);
    }
    const handleClick=()=>{
        let filteredProducts=products.filter((item)=>{
            if(item.pname.toLowerCase().includes(search.toLowerCase())||
             item.pdesc.toLowerCase().includes(search.toLowerCase())|| 
             item.category.toLowerCase().includes(search.toLowerCase())){
                return item;
            }
        });
        setcproducts(filteredProducts)
    }

const handleCategory =(value)=>{
    let filteredProducts=products.filter((item,index)=>{
        if( item.category.toLowerCase() == (value.toLowerCase())){
            return item;
        }
    })
    setcproducts(filteredProducts)
}

 const handleLike=(productId)=>{
    let userId =localStorage.getItem('userId')
    const url = 'http://localhost:4000/liked-product';
    const data ={ userId , productId}
    axios.post(url,data)
        .then((res) => {
            if(res.data.message){
                alert('Liked')
            }
 
        })
        .catch((err) => {
            alert('Sercer Err.')

        })
 }
  const handleDel=(pid)=>{
    if(!localStorage.getItem('userId')){
        alert('please login First')
        return;
    }
    const url='http://localhost:4000/delete-product';
    const data={
        pid,
        userId:localStorage.getItem('userId')
    }
    axios.post(url,data)
    .then((res) => {
        if(res.data.message){
            alert('Deleted Sucess')
            setrefresh(!refresh)
        }

    })
    .catch((err) => {
        alert('Sercer Err.')

    })
  }
    return (
        <div>
            <Header  search={search} handlesearch={handlesearch} handleClick={handleClick}/>
            <Categories1 handleCategory={handleCategory}/>

            <div className='d-flex justify-content-center flex-wrap'>
            {cproducts && products.length > 0 &&
            cproducts.map((item , index )=>{
                return(
                    <div key={item._id} className='card m-3' >
                        <div onClick={()=>handleLike(item._id)} className='icon-con'>
                        <FaHeart className='icons'/> 
                        </div>
                        <img width="300px" height="200px" src={'http://localhost:4000/'+ item.pimage}/>
                        <p className='m-2'>Name: {item.pname} | {item.category}</p>
                        <h3 className=' m-2 text-danger'>Price: ₹{item.price}</h3>
                        <p className='text-success one-line-desc'>
            Description: {item.pdesc.substring(0, 50)}...
        </p>
                        
                        </div>
                )
            })}

</div>
            <div className='d-flex justify-content-center flex-wrap'>
            {products && products.length > 0 &&
            products.map((item , index )=>{
                return(
                    <div key={item._id} className='card m-3' >
                        <img width="300px" height="200px" src={'http://localhost:4000/'+ item.pimage}/>
                        <p className='m-2'>Name: {item.pname} | {item.category}</p>
                        <h3 className=' m-2 text-danger'>Price: ₹{item.price}</h3>
                        <p className='text-success one-line-desc'>
            Description: {item.pdesc.substring(0, 50)}...
        </p>
                        <div className='action-icons'>
                                    <Link to={`/edit-product/${item._id}`}><FaEdit className="edit-icon" /></Link>
                                    <MdDelete className="delete-icon" onClick={() => handleDel(item._id)} />
                                </div>
                        
                        </div>
                )
            })}

</div>

        </div>
    )
}
export default MyProducts;