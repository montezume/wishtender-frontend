
import React,{ useState, useEffect} from 'react';
import ProductImages from './ProductImages';


    //----Move to scripts??---    
    async function getDisplayImages(images, dim){
        const displayImages = [];
        for (const elem in images){
            let displayImage = images[elem];
            let image = await imageDimensions(displayImage);
            if (image[0] > dim && image[1] > dim){
                displayImages.push(displayImage);
            }
        }
        return displayImages;
    }
    
    async function imageDimensions(imgPath){

        return new Promise(resolve => {
            let image = new Image();
            image.src = imgPath;
            image.onload = function () {
                resolve([image.height, image.width]);
            }

        });

    }
    //----------------

function ProductInfo(props){
    const [images, setImages]= useState(null);

    useEffect(()=>{
        const images = props.productInfo.ogImageSrcs.concat(props.productInfo.imageSrcs);
        const uniqueImages = [...new Set(images)];
        getDisplayImages(uniqueImages, 100)
        .then(images=>{
            console.log(images)
            setImages(images)
        })

    },[])

    
    return (<div>
    <div> Name: <input type="text" value = {props.productInfo.title } /> 
    <br>
    </br>
    Price: $<input type="text" value = {props.productInfo.price } />
    <br>
    </br>
    The price we found was in {props.productInfo.currency } currency. 
    </div> 
        <ProductImages displayImages={images}/>
    </div>)
}

export default ProductInfo;
