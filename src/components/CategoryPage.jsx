import { useEffect, useState } from 'react';
import Header from './Header';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Categories1 from './Categories1';
import {FaHeart} from 'react-icons/fa';
import './Home.css';



function CategoryPage() {

    const navigate = useNavigate()
     const param= useParams()
     console.log(param);
    const [products, setproducts] = useState([]);
    const [likedproducts, setlikedproducts] = useState([]);
    const [refresh, setrefresh] = useState(false);
    const [cproducts, setcproducts] = useState([]);
    const[search,setsearch]=useState('');
    const[issearch,setissearch]=useState(false);
    useEffect(() => {
        const url = 'http://localhost:4000/get-products?catName=' + param.catName;
        axios.get(url)
            .then((res) => {
                console.log(res)
                if (res.data.product) {
                    setproducts(res.data.product);

                }
            })
            .catch((err) => {
                alert('Sercer Err.')

            })

            const url2 = 'http://localhost:4000/liked-products';
            let data ={ userId : localStorage.getItem("userId")}
            axios.post(url2,data)
                .then((res) => {
                    if (res.data.product) {
                        setlikedproducts(res.data.product);
    
                    }
                })
                .catch((err) => {
                    alert('Sercer Err.')
    
                })
    }, [param,refresh])
    const handlesearch=(value)=>{
        setsearch(value);
    }
    const handleClick=()=>{
        const url = 'http://localhost:4000/search?search='+search+'&loc='+localStorage.getItem('userLoc');
        axios.get(url)
            .then((res) => {
               console.log(res.data)
               setcproducts(res.data.products);
               setissearch(true);
     
            })
            .catch((err) => {
                alert('Sercer Err.')
    
            })

        // let filteredProducts=products.filter((item)=>{
        //     if(item.pname.toLowerCase().includes(search.toLowerCase())||
        //      item.pdesc.toLowerCase().includes(search.toLowerCase())|| 
        //      item.category.toLowerCase().includes(search.toLowerCase())){
        //         return item;
        //     }
        // });
        // setcproducts(filteredProducts)
    }

const handleCategory =(value)=>{
    let filteredProducts=products.filter((item,index)=>{
        if( item.category.toLowerCase() == (value.toLowerCase())){
            return item;
        }
    })
    setcproducts(filteredProducts)
}

 const handleLike=(productId,e)=>{
    e.stopPropagation();
    let userId =localStorage.getItem('userId')
    console.log(productId,userId)
    const url = 'http://localhost:4000/like-product';
    const data ={ userId , productId}
    axios.post(url,data)
        .then((res) => {
            console.log(res)
            if(res.data.message){
                //alert('Liked')
                setrefresh(!refresh)
            }
 
        })
        .catch((err) => {
            alert('Sercer Err.')

        })
 }

 const handleDisLike=(productId,e)=>{
    e.stopPropagation()
    let userId =localStorage.getItem('userId')
    if (!userId){
        alert('please Login first')
        return;
    }
    console.log(productId,userId)
    const url = 'http://localhost:4000/dislike-product';
    const data ={ userId , productId}
    axios.post(url,data)
        .then((res) => {
            if(res.data.message){
                //alert('DisLiked')
                setrefresh(!refresh)
            }
 
        })
        .catch((err) => {
            alert('Sercer Err.')

        })
 }

const handleProduct=(id)=>{
    navigate("/product/"+ id)
}
    return (
        <div>
            <Header  search={search} handlesearch={handlesearch} handleClick={handleClick}/>
            <Categories1 handleCategory={handleCategory}/>
            {issearch && cproducts && 
            <h5> SEARCH RESULT
                <button  className="clear-btn"onClick={()=> setissearch(false)}>CLEAR</button>
                </h5>}
            {issearch && cproducts && cproducts.length==0 && <h5> NO RESULT FOUND</h5>}
            <div className='d-flex justify-content-center flex-wrap'>
            {issearch && cproducts && products.length > 0 &&
            cproducts.map((item , index )=>{
                return(
                    <div key={item._id} className='card m-3' >
                        <div onClick={()=>handleLike(item._id)} className='icon-con'>
                        <FaHeart className='icons'/> 
                        </div>
                        <img width="250px" height="150px" src={'http://localhost:4000/'+ item.pimage}/>
                        <p className='m-2'>Name: {item.pname} | {item.category}</p>
                        <h3 className=' m-2 price-text'>Price: ₹{item.price} </h3>
                        <p className='text-success one-line-desc'>
            Description: {item.pdesc.substring(0, 50)}...
        </p>
                        
                        </div>
                )
            })}

</div>
{  !issearch &&          <div className='d-flex justify-content-center flex-wrap'>
            {products && products.length > 0 &&
            products.map((item , index )=>{
                return(
                    <div  onClick={()=>handleProduct(item._id)}  key={item._id} className='card m-3' >
                         <div className='icon-con'>
                         {
                            likedproducts.find((likedItem)=>likedItem._id==item._id)?
                            
                            <FaHeart onClick={(e)=>handleDisLike(item._id,e)}  className='red-icons'/>:
                            <FaHeart onClick={(e)=>handleLike(item._id,e)}  className='icons'/>
                            
                            
                         }
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

</div>}

        </div>
    )
}
export default CategoryPage;