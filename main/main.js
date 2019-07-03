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

function createReceiptItem(code) {
    const result = code.split('-');
    const product = findProduct(result[0]);
    if (product) {
        const count = result[1] ? parseFloat(result[1]) : 1;
        const totalPrice = count * product.price;
        return { product , count, totalPrice };
    }
    return undefined;
}

function indexOf(receiptItems, item) {
    let index = -1;
    for (let i = 0; i < receiptItems.length; i++) {
      const receiptItem = receiptItems[i];
      if (receiptItem.product.barcode === item.product.barcode) {
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

function reCalcWithPromotion(receiptItems) {
    let savePrice = 0; 
    let finalPriceSum = 0; 
    for (let index = 0; index < receiptItems.length; index++) {
        const receiptItem = receiptItems[index];
        const promotionType = findPromotion(receiptItem.product.barcode);  
        if (promotionType) {
            if (promotionType === 'BUY_TWO_GET_ONE_FREE') {
                if (receiptItem.count >=2) {
                    savePrice += receiptItem.product.price;
                    receiptItem.totalPrice = (receiptItem.count - 1) * receiptItem.product.price;  

                }
            } 
        }
        finalPriceSum += receiptItem.totalPrice;
    }
    return {savePrice, receiptItems, finalPriceSum} ;
}

function makeReceipt(codes) {
    const receiptItems = [];
    for (let i = 0; i < codes.length; i++) {
      const receiptItem = createReceiptItem(codes[i]);
      if (receiptItem) {
        const findIndex = indexOf(receiptItems, receiptItem);
        if (findIndex >= 0) {
          const findReceiptItem = receiptItems[findIndex];
          findReceiptItem.count += receiptItem.count;
          findReceiptItem.totalPrice = findReceiptItem.count * findReceiptItem.product.price;
        } else {
          receiptItems.push(receiptItem);
        }
      }
    } 
    return reCalcWithPromotion(receiptItems);
}


function assembleReceiptString(receipt) {
    let outputString = "***<没钱赚商店>收据***\n"; 
    const {savePrice, receiptItems, finalPriceSum} = receipt;
    for (let index = 0; index < receiptItems.length; index++) {
      const { product, count, totalPrice } = receiptItems[index];
      outputString += `名称：${product.name}，数量：${count}${product.unit}，单价：${product.price.toFixed(2)}(元)，小计：${totalPrice.toFixed(2)}(元)\n`
    }
    outputString += "----------------------\n";
    outputString += `总计：${finalPriceSum.toFixed(2)}(元)\n` 
    outputString += `节省：${savePrice.toFixed(2)}(元)\n` 
    outputString += `**********************` 
    return outputString;
}
  
function printReceipt(inputs) {
    const receipt = makeReceipt(inputs);  
    const outputString = assembleReceiptString(receipt);
    console.log(outputString);
}