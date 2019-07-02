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