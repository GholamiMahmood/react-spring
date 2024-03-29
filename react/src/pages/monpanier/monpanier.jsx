// import { useEffect, useState } from 'react';
// import ProductService from '../../services/product.service';
// import PurchaseService from '../../services/purchase.service';
// import { useSelector } from 'react-redux';
// import Purchase from '../../models/purchase';
// import './monpanier.css';





// const MonPanier = () => {

//     const [productList, setProductList] = useState([]);
//     const [errorMessage, setErrorMessage] = useState('');
//     const [infoMessage, setInfoMessage] = useState('');

//     const currentUser = useSelector(state => state.user);

//     useEffect(() => {
//         ProductService.getAllProducts().then((response) => {
//             setProductList(response.data);
//         });
//     }, []);

//     const purchase = (product) => {
//         if (!currentUser?.id) {
//             setErrorMessage('Vous devez vous connecter pour acheter un produit.');
//             return;
//         }

//         const purchase = new Purchase(currentUser.id, product.id, product.price);

//         PurchaseService.savePurchase(purchase).then(() => {
//             setInfoMessage("Votre achat est réussi.");
//             setTimeout(() => {
//                 setInfoMessage(null);
//               }, 3000);
//         }).catch((err) => {
//             setErrorMessage("Une erreur inattendue s'est produite.");
//             console.log(err);
//         });
//     };

//     return (
//         <div>
//             <div class="titre"><h2 class="text-center">Liste des produits</h2></div>
//             <div class="containerDePage">            
                                                                                            
//                                 {errorMessage &&
//                                 <div className="alert alert-danger">
//                                     {errorMessage}
//                                 </div>
//                                 }

//                                 {infoMessage &&
//                                 <div className="alert alert-success">
//                                     {infoMessage}
//                                 </div>
//                                 }
                                                        

//                                 <div className="d-flex flex-wrap">
//                                     {productList.map((item, ind) =>
//                                         <div key={item.id} class="cadre" >

//                                             <div >
//                                                 <div >{item.name}</div>
//                                                 <div>                                                
//                                                 <img src={item.image} class="velo"/>
//                                                 </div>
//                                                 <div>{item.type} </div>
                                                
//                                             </div>                                            
                                           
//                                             <div class="taille" >
//                                                     <span class="position"> {`$ ${item.price}`} </span>
                                                                                                         
//                                                     <button onClick={() => purchase(item)} >
//                                                         Achat
//                                                     </button>
                                                
//                                              </div>
//                                         </div>                
//                                  )}
//                          </div>                                        
                                                                  
//                      </div>                      
               
//         </div>     
                    
                          
//     );
// };

// export {MonPanier};

import {React} from 'react';
import './panier.css';
const MonPanier = ({ productItems, handelAddProduct }) => { 

    
    return (
        <div>
        
            <div className="titre"><h2 className="text-center">Liste des produits</h2></div>
            <div className="containerDePage">
                                <div className="d-flex flex-wrap">
                                {productItems.map((item,ind) =>
                                        <div key={item.id} className="cadre" >
                                            <div >
                                                <div >{item.name}</div>
                                                <div>                                                
                                                <img src={item.image} alt={item.name} className="velo"/>
                                                </div>
                                                
                                                <div>{item.type} </div>                                                
                                            </div> 
                                            <div className="taille"> <span className="position"> {`$ ${item.price}`} </span>  
                                            </div>
                                            <div>
                                                <button className="product-add-button" onClick={()=> handelAddProduct(item)}>Add to Cart</button>
                                            </div>

                                        </div>                
                                 )}
                                 
                         </div>                                        
                                                                  
                     </div>                      
               
        </div>     
                    
                          
    );
};

export {MonPanier};
