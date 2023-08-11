import {React} from 'react';
import './panier.css';


const Cart=({cartItems, handelAddProduct,handelRemoveProduct ,handelCartClearance, purchase  }) => {
    const totalPrice= cartItems.reduce(
        (price, item) => price + item.quantite *item.price,0
    );
    return(
    <div className="cart-items">
        <div className="cart-items-header">Articles du panier </div>
        <div className="clear-cart">
               {cartItems.length >=1 && (
                 <button className="clear-cart-button" onClick={handelCartClearance}>Vider le panier</button>
               )}
        </div>
        {cartItems.length === 0 && (<div className='cart-item-empty'> Aucun élément n'est pas ajouté.</div>)}
         <div>
            {cartItems.map((item) =>                                        
                    <div key={item.id} className="cart-items-list" >                                                                        
                        <img className="cart-items-image" src={item.image} alt={item.name} />
                        <div className="cart-items-name">{item.name}</div>

                        <div className="cart-items-function">
                            <button className="cart-items-add" onClick={()=> handelAddProduct(item)}>+</button>
                            <button className="cart-items-remove" onClick={()=> handelRemoveProduct(item)}>-</button>
                        </div>                                                
                    </div> 
                                                                            
            )}
        </div>
        <div className="cart-items-total-price-name"> 
           Prix Total
           <div className="cart-items-total-price"> ${totalPrice}</div>
        </div>
        <div>
        {cartItems.length !== 0 && (<button className='cart-check-out' onClick={() => purchase(cartItems) }> check out.</button>)}
        </div>

    </div>
    );
};
export { Cart};