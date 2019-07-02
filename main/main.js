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

function assembleReceiptString(receiptItems) {
    let outputString = "***<没钱赚商店>收据***\n"; 
    let sumPrice = 0;
    for (let index = 0; index < receiptItems.length; index++) {
      let { product, count } = receiptItems[index];
      const promotionType = findPromotion(product.barcode);
      let totalPrice = product.price * count.toFixed(2); 
      if (promotionType === 'BUY_TWO_GET_ONE_FREE' && count >=2) {
          totalPrice = product.price * (count - 1); 
      }
      sumPrice += totalPrice; 
      outputString += `名称：${product.name}，数量：${count}${product.unit}，单价：${product.price.toFixed(2)}(元)，小计：${totalPrice.toFixed(2)}(元)\n`
  
    }
    outputString += "----------------------\n";
    outputString += `总计：${sumPrice.toFixed(2)}(元)\n` 
    outputString += `**********************` 
    return outputString;
  }
  
  function printReceipt(inputs) {
      const receiptItems = makeReceiptItems(inputs);  
      const outputString = assembleReceiptString(receiptItems);
      console.log(outputString);
}