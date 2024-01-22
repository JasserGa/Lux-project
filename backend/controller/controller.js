const product= require('../model/model.js')

const getAllProduct = (req, res) => {
    product.getAll((err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(result);
      }
    });
  }
  
  const getOneProduct = (req, res) => {
    const nameId = req.params.id;
    product.getOne(nameId, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(result);
      }
    });
  }
  
  const createProduct = (req, res) => {
    product.create(req.body, (err, result) => {
      if (err) {
        res.status(409).send(err);
      } else {
        res.status(201).send(result);
      }
    });
  }
  
  const deleteProduct = (req, res) => {
    product.remove(req.params.id, (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(204).send();
      }
    });
  }
  
  const updateProduct = (req, res) => {
    product.update(req.params.id, req.body, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else if (!result) {
        res.status(404).send("Product is not found");
      } else {
        res.status(200).send();
      }
    });
  }
  
  module.exports = {
    getAllProduct,
    getOneProduct,
    createProduct,
    deleteProduct,
    updateProduct,
  }
  