package packege.controller;

import packege.model.Achats;
import packege.security.UserPrinciple;
import packege.service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/purchase") //pre-path
public class PurchaseController
{
    @Autowired
    private PurchaseService purchaseService;


    @PostMapping //api/achats
    public ResponseEntity<?> savePurchase(@RequestBody Achats achats)
    {
        return new ResponseEntity<>(purchaseService.savePurchase(achats), HttpStatus.CREATED);
    }

    @GetMapping //api/purchase
    public ResponseEntity<?> getAllPurchasesOfUser(@AuthenticationPrincipal UserPrinciple userPrinciple)
    {
        return ResponseEntity.ok(purchaseService.findPurchaseItemsOfUser(userPrinciple.getId()));
    }
}
