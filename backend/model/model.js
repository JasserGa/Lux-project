const connection =require('../database Mysql/index.js')

const getAll=(callback)=>{
    const query='SELECT * FROM product'
    connection.query(query,(err,result)=>{
        if(err){
            callback(err,null)
        }else{
            callback(null,result)
        }
    })
}

const getOne=(id,callback)=>{
    const query='SELECT * FROM product WHERE id=?'
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
const create=(productData,callback)=>{
    const{name,category,price,imageUrl}=productData
    const query='INSERT INTO product (id, name, imageUrl, price, rating, popular, available)VALUES (?,?,?,?,?,?,?)'
    connection.query(query,[id,name, imageUrl, price, rating, popular, available],(err,result)=>{
        if(err){
            callback(err,null)
        }else{
            callback(null,result)
        }
    })
}
const remove=(productId,callback)=>{
    const query='DELETE FROM product WHERE id=?'
    connection.query(query,[productId],(err)=>{
        if(err){
            callback(err)
        }else{
            callback(null)
        }
    })
}
const update=(productId,productData,callback)=>{
    const {name,category,price,imageUrl}=productData
    const query='UPDATE product SET name=?,imageUrl=?, price=?, rating=?,popular=?, available=? WHERE id=?'
    connection.query(query,[name,category,price,imageUrl,productId],(err,result)=>{
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