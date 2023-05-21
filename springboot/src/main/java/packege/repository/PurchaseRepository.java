package packege.repository;

import packege.model.Achats;
import packege.repository.projection.PurchaseItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PurchaseRepository extends JpaRepository<Achats, Long>
{
    @Query("select " +
            "prd.name as name, prd.type as type, pur.price as price, pur.purchaseTime as purchaseTime " +
            "from Achats pur left join Produit prd on prd.id = pur.productId " +
            "where pur.userId = :userId")


    List<PurchaseItem> findAllPurchasesOfUser(@Param("userId") Long userId);
}
