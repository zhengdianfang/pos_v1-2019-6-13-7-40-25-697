'use strict';

//TODO: 请在该文件中实现练习要求并删除此注释
function findProduct(code) {
    const allProducts = loadAllItems();
    for (let i = 0; i < allProducts.length; i++) {
      const product = allProducts[i];
      if (product.barcode === code) {
          return product;
      }
    }
    return undefined;
}

function indexOf(receiptItems, product) {
    let index = -1;
    for (let i = 0; i < receiptItems.length; i++) {
      const receiptItem = receiptItems[i];
      if (receiptItem.product.barcode === product.barcode) {
        index = i;
      }
    }
    return index;
}

function findPromotion(code) {
    const allPromotions = loadPromotions();
    for (let index = 0; index < allPromotions.length; index++) {
        const promotion = allPromotions[index];
        for (let i = 0; i < promotion.barcodes.length; i++) {
            const barcode = promotion.barcodes[i];
            if(barcode === code) {
               return promotion.type; 
            }
        }
    }
    return undefined;
}

function makeReceiptItems(codes) {
    const receiptItems = [];
    for (let i = 0; i < codes.length; i++) {
      const product = findProduct(codes[i]);
      if (product) {
        const findIndex = indexOf(receiptItems, product);
        if (findIndex >= 0) {
          receiptItems[findIndex].count += 1;
        } else {
          receiptItems.push({ product, count: 1});
        }
      }
    } 
    return receiptItems;
}
