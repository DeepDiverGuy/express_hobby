const uuid = require('uuid');

const express = require('express');
const { engine } = require('express-handlebars');

const {product_list, product_create, product_update, product_delete} = require('./products');



const app = express();

// Handlebars Middleware
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Homepage Route - List + CreateForm
app.get('/', (request, response) => {
  response.render(
    'product_list_create', 
    {product_list: product_list,}
  )
}
);


// Create & Render Homepage
app.post('/', (request, response) => {
  response.render(
    'product_list_create', 
    product_create(request, response)
    );
}
);


// UpdateForm
app.get('/update/:id', (request, response) => {
    response.render(
        'product_update',
        {id: request.params.id}
    );
}
);


// Update & Render Homepage
app.post('/update/:id/', (request, response) => {
    response.render(
        'product_list_create',
        product_update(request, response)
        );
}
);


// DeleteForm
app.get('/delete/:id', (request, response) => {
    response.render(
        'product_delete',
        {id: request.params.id}
    );
}
);


// Delete & Render Homepage
app.post('/delete/:id', (request, response) => {
    response.render(
        'product_list_create', 
        product_delete(request, response)
        );
}
);


app.get('/api_reference', (request, response) => {
    response.render(
      'api_reference', 
    )
  }
  );


app.get(
  '/aboutsite',
  (request, response) => {
    response.render(
      'aboutsite',
    )
  }
)


// API routes
app.use('/api/products', require('./api'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


