/**
 * @swagger
 * /api/categories:
 *  get:
 *    description: Use to request all categories
 *    responses:
 *      '200':
 *        description: A successful response
 */
/**
 * @swagger
 * /api/categories/add:
 *  post:
 *    description: create new category
 *    responses:
 *      '200':
 *        description: A successful response
 */
/**
 * @swagger
 * /api/categories/edit/{id}:
 *  put:
 *    description: edit category by id
 *    responses:
 *      '200':
 *        description: A successful response
 */
/**
 * @swagger
 * /api/categories/delete/{id}:
 *    delete:
 *      description:delete category by id 
 *    responses:
 *      '200':
 *         description: A successful response
 */   

/**
 * @swagger
 * /api/products/product/{id}:
 *  get:
 *    parameters:
 *    - productId : id
 *      in: path
 *      required: true
 *      description: Use to request specific product by id
 *    responses:
 *      '200':
 *        description: A successful response
 */
/**
 * @swagger
 * /api/products/edit/{id}:
 *  put:
 *    parameters:
 *    - productId : id
 *      required: true
 *      description: Use to edit product by id 
 *    responses:
 *      '200':
 *        description: A successful response
 */
/**
 * @swagger
 * /api/products/delete/{id}:
 *  delete:
 *    parameters:
 *    - productId : id
 *      required: true
 *      description: Use to delete product by id 
 *    responses:
 *      '200':
 *        description: A successful response
 */

/**
 * @swagger
 * /api/products/category/{id}:
 *  get:
 *    parameters:
 *    - productId : id
 *      required: true
 *      description: Use to get products of specific categoru
 *    responses:
 *      '200':
 *        description: A successful response
 */

/**
 * @swagger
 * /api/products/add:
 *  post:

 *      responses: 
 *        '201':
 *            description: Created
 */