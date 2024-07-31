import { Grid,GridItem, Image} from '@chakra-ui/react';

import React from 'react';






const Cards = ({item, handleClick}) => {
    const {brand, name, price, img,rating} = item
  return (
    // <div className='Allcards'>
    // <div className="cards">
    <Grid templateColumns='repeat(3, 1fr)' gap={6}>
    <GridItem w='100%' h='200' bg='blue.500'> 
            <Image w={400} src={img} alt="Image" /></GridItem>

            <GridItem w='100%' h='200' bg='blue.500'> 
            <h3>Brand : {brand}</h3></GridItem> 

            <GridItem w='100%' h='200' bg='blue.500'>  <p>Name : {name}</p></GridItem>

            <GridItem w='100%' h='200' bg='blue.500'> 
            <h4>Rating : {rating} ****</h4></GridItem>

            <GridItem w='100%' h='200' bg='blue.500'><p>Price -Rs {price}.00</p> </GridItem> 
            
            <GridItem w='100%' h='200' bg='blue.500'><button onClick={()=>handleClick(item) } >Add to Cart</button>
            <button onClick={()=>handleClick(item) } >Add to Cart</button></GridItem>
            </Grid>
        
    //     </div>
    // </div>
  )
}

export default Cards