// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(category,{
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
})
// Categories have many Products
Category.hasMany(Product,{
  foreignKey: 'category_id',

})
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany (Tag, {
  through: {
    model: ProductTag,
    unique:false
  },
  foreignKey: 'product_id',
  
})

// Tag belongToMany Tags (through Product Tag)
Tag.belongsToMany (Product, {
  through: {
    model: ProductTag,
    unique:false
  },
  foreignKey: 'tag_id',
  
})
// Tags belongToMany Products (through ProductTag)

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
