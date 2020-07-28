import React,{ useState, useEffect} from 'react';

function ProductImages(props){
    let [displayImage, setDisplayImage] = useState(null);

    useEffect(()=>{setDisplayImage(0)},[])
    console.log(displayImage);
    
    function move(num){
        let newDisplayImage = displayImage + num;
        if(newDisplayImage  > props.displayImages.length - 1 || newDisplayImage  < 0){
           newDisplayImage =  Math.abs(newDisplayImage+(num*(-props.displayImages.length)) - (num==1?1:0))
        }
        setDisplayImage(newDisplayImage);
    }

    return(
        <div>
            <img id = "product_image" src={
                props.displayImages
                    ? props.displayImages[displayImage] 
                    : null }/>
            <br></br>
            <button onClick={()=>move(-1)}> previous</button>
            <button onClick={()=>move(1)}> next</button>
        </div>
                    
    )
}

export default ProductImages;