import './App.css';
import { NavBar } from './components/nav-bar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PageDaccueil } from './pages/accueil/accueil';
import { Connection } from './pages/connection';
import { RegisterPage } from './pages/register/register.page';
import { ProfilePage } from './pages/profile/profile';
import { MonPanier } from './pages/monpanier/monpanier';
import { Cart } from './pages/monpanier/cart';
import { AdminPage } from './pages/admin/admin.page';
import { NotFoundPage } from './pages/not-found/not-found.page';
import { UnauthorizedPage } from './pages/unauthorized/unauthorized.page';
import { AuthGuard } from './guards/auth.guard';
import { Role } from './models/role';

// 
import PurchaseService from './services/purchase.service';
import Purchase from './models/purchase';
import { useSelector } from 'react-redux';
import  { useState, useEffect } from 'react';
import { Rout } from "./components/routes";
import ProductService from './services/product.service';


function App() {
    // =====================================
    // telechrger list du produits de backend
    const [productItems, setProductItems] = useState([]);
    useEffect(() => {
                ProductService.getAllProducts().then((response) => {
                    setProductItems(response.data);
                });
    }, []);


    const [errorMessage, setErrorMessage] = useState('');
    const [infoMessage, setInfoMessage] = useState('');
    
    const[cartItems, setCartItems] = useState([]);

    const handelAddProduct = (product) => {
        return new Promise((resolve, reject) => {
          const productExist = cartItems.find((item) => item.id === product.id);
          if (productExist) {
            setCartItems(
              cartItems.map((item) =>
                item.id === product.id
                  ? { ...productExist, quantite: productExist.quantite + 1 }
                  : item
              )
            );
          } else {
            setCartItems([...cartItems, { ...product, quantite: 1 }]);
          }
      
          resolve(); // Resolve the promise
        });
      };
      

    const handelRemoveProduct = (product) =>{
         const productExist =cartItems.find((item) => item.id === product.id);
         if(productExist.quantite === 1){
            setCartItems(cartItems.filter((item) => item.id !== product.id));
         }else{
            setCartItems(
                cartItems.map((item) => item.id === product.id?
                {...productExist , quantite : productExist.quantite -1}: item)
                );            
         }
    }
    
    // utilisateur current paut sauvgarde les items, mais doit etre signin
    const currentUser = useSelector(state => state.user);
    const purchase = (products) => {
        if (!currentUser?.id) {
            setErrorMessage('Vous devez vous connecter pour acheter un produit.');
            return;
        }
        const purchasePromises = products.map((product) => {
            const purchase = new Purchase(currentUser.id, product.id, product.price);
            return PurchaseService.savePurchase(purchase);
          });
        
          Promise.all(purchasePromises)
            .then(() => {
              setInfoMessage("Vos achats sont réussis.");
              setTimeout(() => {
                                setInfoMessage(null);
                              }, 3000);
            })
            .catch((err) => {
              setErrorMessage("Une erreur inattendue s'est produite.");
              console.log(err);
            });
    }
    const handelCartClearance = () =>{
        setCartItems([]);
    }

    // =====================================

  return (
      <BrowserRouter>
          <NavBar/>
          
          <div className="container">
              <Routes>
                  <Route path="/" element={<PageDaccueil/>}/>
                  <Route path="/accueil" element={<PageDaccueil/>}/>
                  <Route path="/connection" element={<Connection/>}/>
                  <Route path="/register" element={<RegisterPage/>}/>                  
                  {/* <Route path="/routes" element={<Rout productItems={productItems} handelAddProduct={handelAddProduct} />}  /> */}
                 
                 <Route path="/monpanier" element={<MonPanier productItems={productItems} handelAddProduct={handelAddProduct}/>}  />                     
                 <Route path="/cart" element={<Cart cartItems={cartItems} handelAddProduct={handelAddProduct} handelRemoveProduct={handelRemoveProduct} handelCartClearance={handelCartClearance} purchase={purchase}/>} />                 
                   
                  <Route path="/profile" element={
                      <AuthGuard roles={[Role.ADMIN, Role.USER]}>
                          <ProfilePage/>
                      </AuthGuard>
                  }
                  />

                  <Route path="/admin" element={
                      <AuthGuard roles={[Role.ADMIN]}>
                          <AdminPage/>
                      </AuthGuard>
                  }/>

                  <Route path="/404" element={<NotFoundPage/>}/>
                  <Route path="/401" element={<UnauthorizedPage/>}/>
                  <Route path="*" element={<NotFoundPage/>}/>
              </Routes>
          </div>
        
      </BrowserRouter>
  );
}

export default App;
