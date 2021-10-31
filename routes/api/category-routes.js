const router = require('express').Router();
const { Category, Product } = require('../../models');

// =======GET ==================================================================================
// The `/api/categories` endpoint
//get route ... inclass unit 23
router.get('/', async (req, res) => {
  try {
    const categoriesData = await Category.findAll({
      include: [{ model: Product }], //---------------------------
    });
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // find all categories
  // be sure to include its associated Products
// ======GET BY ID===================================================================================

  // find one category by its `id` value
  // be sure to include its associated Products
  router.get('/:id', async (req, res) => {
    try {
      const categoriesData = await Category.findByPk(req.params.id, {
        include: [{ model: Product }], //----------------------
      });
  
      if (!categoriesData) {
        res.status(404).json({ message: 'No category found with that id!' });
        return;
      }
  
      res.status(200).json(categoriesData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// ======POST==================================================================================
  router.post('/', async (req, res) => {
    try {
      const categoriesData = await Category.create(req.body);
      res.status(200).json(categoriesData);
    } catch (err) {
      res.status(400).json(err);
    }
  });
// ====DELETE===================================================================================
  router.delete('/:id', async (req, res) => {
    try {
      const categoriesData = await Category.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (!categoriesData) {
        res.status(404).json({ message: 'No location found with this id!' });
        return;
      }
  
      res.status(200).json(categoriesData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


// ====PUT===================================================================================
router.put('/:id', async (req, res) => {
  try {
    const categoriesData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoriesData[0]) {
      res.status(404).json({ message: 'No Category with this id!' });
      return;
    }
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
