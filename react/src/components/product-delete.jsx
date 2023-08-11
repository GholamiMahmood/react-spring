import { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal } from 'react-bootstrap';


const ProductDelete = forwardRef((props, ref) => {

    const [show, setShow] = useState(false);

    useImperativeHandle(ref, () => ({

        showDeleteModal() {
            setShow(true);
        }

    }));

    const deleteProduct = () => {
        props.onConfirmed();
        setShow(false);
    };

    return (
        <Modal show={show}>

            <div className="modal-header">
                <h5 className="modal-title">Confirmation</h5>
                <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
            </div>

            <div className="modal-body">
            Êtes-vous sûr de vouloir supprimer le produit sélectionné ?
            </div>

            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>Annulation</button>
                <button type="button" className="btn btn-danger" onClick={() => deleteProduct()}>Je suis sûr!</button>
            </div>

        </Modal>
    );

});

export {ProductDelete};
