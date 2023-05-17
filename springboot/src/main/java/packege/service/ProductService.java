package packege.service;

import packege.model.Produit;

import java.util.List;

public interface ProductService
{
    Produit saveProduct(Produit produit);

    void deleteProduct(Long id);

    List<Produit> findAllProducts();
}
