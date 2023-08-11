import { useEffect, useRef, useState } from 'react';
import ProductService from '../../services/product.service';
import { ProductSave } from '../../components/product-save';
import Product from '../../models/product';
import { ProductDelete } from '../../components/product-delete';
import './admin.css';


import { DataTable as Datatable } from 'primereact/datatable';
import {Column} from "primereact/column";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { FilterMatchMode } from "primereact/api";
import {InputText} from "primereact/inputtext";


const AdminPage = () => {

    const [productList, setProductList] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(new Product('', '', 0));
    const [errorMessage, setErrorMessage] = useState('');
    
    // pour cree tableau
    const [rowNum, setRowNum] = useState(1);
    const [filters, setFilters] = useState({
        global :{value: null , matchMode:FilterMatchMode.CONTAINS},
    });

    const saveComponent = useRef();
    const deleteComponent = useRef();

    useEffect(() => {
        ProductService.getAllProducts().then((response) => {
            setProductList(response.data);
        });
    }, []);

    const createProductRequest = () => {
        setSelectedProduct(new Product('', '', 0));
        saveComponent.current?.showProductModal();
    };

    const editProductRequest = (item) => {
      setSelectedProduct(Object.assign({}, item));
        saveComponent.current?.showProductModal();
    };

    const deleteProductRequest = (product) => {
        setSelectedProduct(product);
        deleteComponent.current?.showDeleteModal();
    };

    const saveProductWatcher = (product) => {
        let itemIndex = productList.findIndex(item => item.id === product.id);

        if (itemIndex !== -1) {
            const newList = productList.map((item) => {
                if (item.id === product.id) {
                    return product;
                }
                return item;
            });
            setProductList(newList);
        } else {
            const newList = productList.concat(product);
            setProductList(newList);
        }
    };

    const deleteProduct = () => {
      ProductService.deleteProduct(selectedProduct).then(_ => {
          setProductList(productList.filter(x => x.id !== selectedProduct.id));

      }).catch(err => {
          setErrorMessage('le vélo a été vendu, les informations doivent donc être conservées dans la base de données');
          console.log("TEST", err);
      });
    };

    return (
        
        <div>
            
            <div className="container">
                <div className="pt-5">

                    {errorMessage &&
                    <div className="alert alert-danger">
                        {errorMessage}
                    </div>
                    }

                    <div className="card">
                        <div className="card-header">

                            <div className="row">
                                <div className="col-6">
                                    <h3>Tous les produits</h3>
                                </div>

                                <div className="col-6 text-end">
                                    <button className="btn btn-primary" onClick={() => createProductRequest()}>
                                    Créer un produit
                                    </button>
                                </div>

                            </div>

                        </div>                        
                        <InputText
                            onInput={ (e) =>
                                        setFilters({
                                            global:{ value: e.target.value, matchMode:FilterMatchMode.CONTAINS },
                                        })
                            }   placeholder='chercher...'  
                            
                            />
                        <Datatable value={productList} filters={filters}
                            paginator
                            rows={5}
                            rowsPerPageOptions={[1,2,3,4,5]}
                            
                            >
                                
                        <Column header="N" body={(rowData) => {
                            const index = productList.indexOf(rowData);
                            return <span>{index + rowNum}</span>
                        }}  />
                       <Column field="name" header="Nome" sortable/>
                       <Column field="price" header="Prix" sortable/>
                       <Column  field={productList => new Date(productList.createTime).toLocaleDateString()} header="Date" />
                       <Column
                            field={(rowData) => (
                            <button class="button_modifie" onClick={() => editProductRequest(rowData)}>modifie</button>
                            )} 
                             header="Modifier" 
                        />
                         <Column 
                            field={(rowData) => (
                            <button class="button_supprim" onClick={() => deleteProductRequest(rowData)}>supprim</button>
                            )} 
                             header="Supprimer" 
                        />
                                
            </Datatable>
                        
                    </div>

                </div>
            </div>

            <ProductSave ref={saveComponent} product={selectedProduct} onSaved={(p) => saveProductWatcher(p)}/>
            <ProductDelete ref={deleteComponent} onConfirmed={() => deleteProduct()}/>

        </div>
    );
};

export {AdminPage};
