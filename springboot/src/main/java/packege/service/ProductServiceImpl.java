package packege.service;

import packege.model.Produit;
import packege.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService
{
    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository)
    {
        this.productRepository = productRepository;
    }

    @Override
    public Produit saveProduct(Produit produit)
    {
        produit.setCreateTime(LocalDateTime.now());

        return productRepository.save(produit);
    }



    @Override
     public void deleteProduct(Long id)
    {

        System.out.print("je suis un id  :"+id);
        productRepository.deleteById(id);
    }

    @Override
    public List<Produit> findAllProducts()
    {
        return productRepository.findAll();
    }
}
