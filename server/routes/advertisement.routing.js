const express = require('express');
const advertisementController = require('../controllers/advertisement.controller.js');
const { getDimensionsAndStore } = require('../middlewares/imageProcessing.js');

const { uploadToMemory } = require('../middlewares/imageUpload');

const router = express.Router();

router.get('/', advertisementController.getAdvertisementAll);
router.get('/:id', advertisementController.getAdvertisement);

router.post('/', uploadToMemory("banner"), getDimensionsAndStore, advertisementController.createAdvertisement);
router.patch('/:id/status', advertisementController.changeAdvertisementStatus);
router.patch('/:id', uploadToMemory("banner"), getDimensionsAndStore, advertisementController.updateAdvertisement);


module.exports = router;