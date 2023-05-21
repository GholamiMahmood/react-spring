import { useEffect, useState } from 'react';
import PurchaseService from '../../services/purchase.service';
import { useDispatch, useSelector } from 'react-redux';
import { Role } from '../../models/role';
import UserService from '../../services/user.service';
import { clearCurrentUser } from '../../store/actions/user';
import { useNavigate } from 'react-router-dom';
import './profile.css';

import { DataTable as Datatable } from 'primereact/datatable';
import {Column} from "primereact/column";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { FilterMatchMode } from "primereact/api";
import {InputText} from "primereact/inputtext";


const ProfilePage = () => {
   
    const [purchaseList, setPurchaseList] = useState([]);
    const [filters, setFilters] = useState({
        global :{value: null , matchMode:FilterMatchMode.CONTAINS},
    });
    const [rowNum, setRowNum] = useState(1);
    const [errorMessage, setErrorMessage] = useState('');

    const currentUser = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        PurchaseService.getAllPurchaseItems().then((response) => {
            setPurchaseList(response.data);
        });
    }, []);

    const changeRole = () => {

        const newRole = currentUser.role === Role.ADMIN ? Role.USER : Role.ADMIN;

        UserService.changeRole(newRole).then(() => {
           //clear session
            dispatch(clearCurrentUser());
            navigate('/connection');
        }).catch((err) => {
            setErrorMessage('Unexpected error occurred.');
            console.log(err);
        });
    };

    return (
          <div className="ProfilePge">                
                   <div class="aligement"><h3>Tous les articles achetés</h3> </div>
                                      
                       <div>                        
                        
                            <button class="button_taille" onClick={() => {
                                    if (currentUser?.id == 1) {
                                        changeRole();
                                    } else {
                                        alert("Vous n'êtes pas autorisé à modifier les rôles.");
                                        
                                    }
                                }}>cliquez ici                                 
                            </button>                        
                        </div>
                        <div class="txt_taille">changement de rôle<br/>juste pour l'admin</div>
                
            <InputText
              onInput={ (e) =>
                         setFilters({
                            global:{ value: e.target.value, matchMode:FilterMatchMode.CONTAINS },
                         })
              }     
            
            />
            <Datatable value={purchaseList} filters={filters}
              paginator
              rows={5}
            rowsPerPageOptions={[1,2,3,4,5]}
            
            >
                <Column header="Ligne"
                body={(rowData) => {
                    const index = purchaseList.indexOf(rowData);
                    return <span>{index + rowNum}</span>
                }} 
                 />
             
                <Column field="name" header="Nome" sortable/>
                <Column field="price" header="Prix" sortable/>
                <Column field="type" header="Type" sortable/>
                <Column header="Date" body={(item) => new Date(item.purchaseTime).toLocaleDateString()}  sortable/>
                
            </Datatable>

        </div>

    );
};

export {ProfilePage};
