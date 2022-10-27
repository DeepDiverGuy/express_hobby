const uuid = require('uuid')



const product_list = [
  {
    id: '82dcf45a-3704-4a91-9c6e-75079ba8367b',
    kind: 'Helicopter',
    model: 'Boeing AH-64 Apache',
    price: '$1 billion',
    status: 'in stock'
  },
  {
    id: '57882cb6-fd17-4b9c-b14d-61bb3e73a9a9',
    kind: 'Submarine',
    model: 'Ohio class (SSBN-726)',
    price: '$2 billion',
    status: 'in stock'
  },
  {
    id: '47333511-a898-423a-8f5b-766ed28825e4',
    kind: 'Fighter Jet',
    model: 'B-52 Stratofortress',
    price: '$5 billion',
    status: 'in stock'
  }
];


const idFilter = request => product => product.id === request.params.id;


product_create = (request, response) => {
  const new_product = {
    id: uuid.v4(),
    ...request.body,
    status: 'in stock'
  };

  if (!new_product.kind || !new_product.model || !new_product.price) {
    return response.status(400).json({ msg: 'Please include kind, model and price' });
  }

  product_list.push(new_product);
  msg = 'Product created'

  return {product_list, msg};
};


product_update = (request, response) => {
  const found = product_list.some(idFilter(request));

  if (found) {
    product_list.forEach((product, i) => {
      if (idFilter(request)(product)) {
        let updated_product = product;
        product.kind = request.body.kind ? request.body.kind : product.kind;
        product.model = request.body.model ? request.body.model : product.model;
        product.price = request.body.price ? request.body.price : product.price;
        product.status = request.body.status ? request.body.status : product.status;
        product_list[i] = updated_product;
        msg = 'Product updated'
      }
    });
  } else {
    response.status(400).json({ msg: `No product with the id of ${request.params.id}` });
  }
  return {product_list, msg};
};


product_delete = (request, response) => {
  const found = product_list.some(idFilter(request));

  if (found) {
    product_list.forEach((product, index, product_list) => {
      if(idFilter(request)(product)) {product_list.splice(index,1)}
    })
    msg = 'Product deleted'
    return {product_list, msg};
  } else {
    response.status(400).json({ msg: `No product with the id of ${request.params.id}` });
  }
};



module.exports = {product_list, product_create, product_update, product_delete};