const connection =require('../database Mysql/index.js')

const getAll=(callback)=>{
    const query='SELECT * FROM products'
    connection.query(query,(err,result)=>{
        if(err){
            callback(err,null)
        }else{
            callback(null,result)
        }
    })
}

const getOne=(id,callback)=>{
    const query='SELECT * FROM products WHERE id=?'
    connection.query(query,[id],(err,result)=>{
        if(err){
            callback(err,null)
        }else{
            if(result.length===0){
                callback("Product not found", null)
            }else{
                callback(null,result[0])
            }
        }
    })
}
const create = (productData, callback) => {
    const { name, image, price, popular, available, rating } = productData;
    const query = 'INSERT INTO products (name, image, price, popular, available, rating) VALUES (?, ?, ?, ?, ?, ?)';
  
    connection.query(query, [name, image, price, popular, available, rating], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  };
const remove=(productId,callback)=>{
    const query='DELETE FROM products WHERE id=?'
    connection.query(query,[productId],(err)=>{
        if(err){
            callback(err)
        }else{
            callback(null)
        }
    })
}
const update=(productId,productData,callback)=>{
    const {name,price,image}=productData
    const query='UPDATE products SET name=?,image=?, price=? WHERE id=?'
    connection.query(query,[name,image,price,productId],(err,result)=>{
        if(err){
            callback(err,null)
        }else{
            callback(null,result)
        }
    })
}
module.exports={
    getAll,
    getOne,
    create,
    update,
    remove,
}