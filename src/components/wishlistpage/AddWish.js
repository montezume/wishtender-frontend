import React,{ useState, useEffect} from 'react';
import axios from 'axios';

// const wishes= "lots of wishes";


function AddWish(){
    


    
    const [wishes, setWishes]= useState(null);
    const [newWish, setNewWish]= useState(null);

    useEffect(() => {
        axios.get('http://localhost:4000/wishes')
        .then(res=>{
            setWishes(res.data)
        })

        // setWishes([{wish_name:"stoppy", _id: 9898989898}]);
      }, []);

    function wishesElement(wishes){
            let listItems = wishes.map(x=>{
                return <li data-id={x._id}>
                    {x.wish_name}
                    <button onClick={(e)=>deleteWish(e)}>Delete</button>
                    <input type= "text"/>
                    <button onClick={(e)=>updateWish(e)}>Update</button>
                    </li>
            })
        return(
            <ul>
                {listItems}
            </ul>
        )
    }


    function deleteWish(e){
        e.preventDefault();
        const id = e.target.parentElement.getAttribute("data-id");
        axios.delete('http://localhost:4000/wishes/delete/'+id)
            .then(()=>axios.get('http://localhost:4000/wishes'))
            .then(res=>{

            setWishes(res.data);
        })
    }
    function updateWish(e){
        e.preventDefault();
        const id = e.target.parentElement.getAttribute("data-id");
        const updatedWish = {wish_name: e.target.previousSibling.value}


        axios.post('http://localhost:4000/wishes/update/'+id, updatedWish)
            .then(()=>axios.get('http://localhost:4000/wishes'))
            .then(res=>{

            setWishes(res.data);
        })
    }
    function onChangeWish(e){
        setNewWish(e.target.value);
    }
    function onSubmitWish(e){
        e.preventDefault();
        axios.post('http://localhost:4000/wishes/add', {'wish_name':newWish})
            .then(res=>{
                
                console.log("add")
            })
            .then(()=>axios.get('http://localhost:4000/wishes'))
            .then(res=>{
            console.log("onSubmit")

            // let wishesList = res.data.map(x=>x.wish_name).join(" ");
            setWishes(res.data);
        })
    }
    return(
        <div  style={{position:'relative', top: 100}}>
        <form  onSubmit={(e)=>onSubmitWish(e)}>
          Add Wish:
          <input type="text" onChange={(e)=>onChangeWish(e)} />
        <input type="submit" value="Add Wish" />
        </form>
    <br/> {wishes?wishesElement(wishes):"poop"}
</div>
    )
}

export default AddWish;