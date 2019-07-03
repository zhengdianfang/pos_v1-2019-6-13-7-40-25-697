'use strict';

describe('pos', () => {

  it('should product when input barcode', () => {
    const code = 'ITEM000001';
    const product = findProduct(code);
    expect(product).toEqual({
      barcode: 'ITEM000001',
      name: '雪碧',
      unit: '瓶',
      price: 3.00
    });
  })

  it('should undefined when input not exist barcode', () => {
    const code = 'ITEM0001111';
    const product = findProduct(code);
    expect(product).toEqual(undefined);
  })

  it('should exist when receiptItems contain ipnut product', () => {
      const item = {
        product: {
          barcode: 'ITEM000001',
          name: '雪碧',
          unit: '瓶',
          price: 3.00
        },
        count: 1,
      };

      const mockReceiptItems = [
      {
        count: 1,
        product: {
          barcode: 'ITEM000001',
          name: '雪碧',
          unit: '瓶',
          price: 3.00
        }
      }, 
      {
        count: 2,
        product: {
          barcode: 'ITEM000002',
          name: '苹果',
          unit: '斤',
          price: 5.50
        }
      }, 
      ];

    const index = indexOf(mockReceiptItems, item);
    expect(index).toBe(0);
  })

  it('should not exist when receiptItems not contain ipnut product', () => {
      const product = {
        product: {
          barcode: 'ITEM000001',
          name: '雪碧',
          unit: '瓶',
          price: 3.00
        },
        count: 1,
      };

      const mockReceiptItems = [
      {
        count: 2,
        product: {
          barcode: 'ITEM000002',
          name: '苹果',
          unit: '斤',
          price: 5.50
        }
      }, 
      ];

    const index = indexOf(mockReceiptItems, product);
    expect(index).toBe(-1);
  })

  it('should promotion type when input barcode', () => {
     const barcode = 'ITEM000000';
     const type = findPromotion(barcode);
     expect(type).toBe('BUY_TWO_GET_ONE_FREE');
  })

  it('should undefined when input barcode not in promotion', () => {
     const barcode = 'ITEM0002123123';
     const type = findPromotion(barcode);
     expect(type).toBe(undefined);
  })

  it('should receiptItems when input array of barcode', () => {
    const barcodes = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000005',
      'ITEM000003-2.5',
    ]; 
    const receipt = makeReceipt(barcodes);

    expect(receipt).toEqual({
      savePrice: 3,
      finalPriceSum: 45,
      receiptItems: [
      {
        count: 2,
        product: {
          barcode: 'ITEM000001',
          name: '雪碧',
          unit: '瓶',
          price: 3.00
        },
        totalPrice: 3.00
      },
      {
        count: 1,
        product: {
          barcode: 'ITEM000005',
          name: '方便面',
          unit: '袋',
          price: 4.50
        },
        totalPrice: 4.50
      },
      {
        count: 2.5,
        product: {
          barcode: 'ITEM000003',
          name: '荔枝',
          unit: '斤',
          price: 15.00
        },
        totalPrice: 37.50,
      }
    ]
    }); 
  })

  it('should print text', () => {

    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];

    spyOn(console, 'log');

    printReceipt(tags);

    const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：58.50(元)
节省：7.50(元)
**********************`;

    expect(console.log).toHaveBeenCalledWith(expectText);
  });
});
