import React,{ useState, useEffect} from 'react';
import axios from 'axios';
import ProductInfo from './ProductInfo.js'
import GetProductInfoButton from './GetProductInfoButton.js'
import GetProductInfoButton2 from './GetProductInfoButton2.js'


var url= "https://www.farfetch.com/shopping/women/amina-muaddi-zula-95mm-wrap-sandals-item-14770464.aspx?storeid=9359"


function AddWish(){
    
    const [productInfo, setProductInfo]= useState(null);


    function getProductInfo(e){

        e.preventDefault();
        console.log("getProductInfo");
        const url = e.target.children[0].value;
        axios.post('http://localhost:4000/wishes/productInfo', {'url': url})
        .then(res=>{
            console.log(res.data)
            setProductInfo(res.data);
        })
 
    }



    return(
        <div >
        <form  onSubmit={(e)=>getProductInfo(e)}>
            Search Wish:
            <input type="text" />
            <input type="submit" value="Get Product Info" />
        </form>

        {productInfo?<ProductInfo productInfo={productInfo}/>:null}
        <GetProductInfoButton submit={(e)=>getProductInfo(e)}/>
        <GetProductInfoButton2 submit={(e)=>getProductInfo(e)}/>

        
    <br/> 
</div>
    )
}

export default AddWish;