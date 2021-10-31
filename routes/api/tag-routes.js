const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


// =======GET ALL ==================================================================================
// The `/api/tags` endpoint
//get route ... inclass unit 23
router.get('/', async (req, res) => {
  try {
    const tagsData = await Tag.findAll({
      include: [{ model: Product }], 
    });
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ======GET BY ID===================================================================================

  // find one category by its `id` value
  // be sure to include its associated Products
  router.get('/:id', async (req, res) => {
    try {
      const tagsData = await Tag.findByPk(req.params.id, {
        include: [{ model: Product }], //----------------------
      });
  
      if (!tagsData) {
        res.status(404).json({ message: 'No Tag found with that id!' });
        return;
      }
  
      res.status(200).json(tagsData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// ======POST==================================================================================
router.post('/', async (req, res) => {
  try {
    const tagsData = await Tag.create(req.body);
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// ====PUT===================================================================================
router.put('/:id', async (req, res) => {
  try {
    const tagsData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagsData[0]) {
      res.status(404).json({ message: 'No Tag with this id!' });
      return;
    }
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ======= DELETE ======================================================
router.delete('/:id', async (req, res) => {
  try {
    const tagsData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagsData) {
      res.status(404).json({ message: 'No Tag found with this id!' });
      return;
    }

    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
