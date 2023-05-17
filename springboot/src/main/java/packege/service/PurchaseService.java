package packege.service;

import packege.model.Achats;
import packege.repository.projection.PurchaseItem;

import java.util.List;

public interface PurchaseService
{

    Achats savePurchase(Achats achats);

    List<PurchaseItem> findPurchaseItemsOfUser(Long userId);
}
