const models = require('../db')
const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const $sql = require('../sqlMap')
// 连接数据库
const conn = mysql.createConnection(models.mysql)
conn.connect()
const jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1', msg: '操作失败'
    })
  } else {
    res.json(
      ret
    )
  }
}
// 接口：增加信息
router.post('/addStore', (req, res) => {
  const sql = $sql.Store.add
  const params = req.body
  // console.log('添加', params)
//   ugname,scount,upid
  conn.query(sql, [params.ugname,params.scount,params.upid], function (err, result) {
    if (err) {
      throw err
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// 接口：查询全部
router.get('/showStore', (req, res) => {
  const sql = $sql.Store.show
  conn.query(sql,[], function (err, result) {
    if(err) {
      console.log(err)
      res.json({ err_code: 0, message: "搜索失败"})
    }
    if(result) {
      jsonWrite(res, result)
    }
  })
})

// 搜索功能接口
router.post('/searchInfo',(req, res) => {
  let keygoods = req.body.query
  var sql = $sql.Store.show
  if(keygoods!=null) {
    sql += " and ugname like '%"+keygoods+"%' "
  } 
  conn.query(sql, (err, result) => {
    if(err) {
      console.log(err)
      res.json({ err_code: 0, message: "搜索失败"})
    }
    if(result) {
      jsonWrite(res, result)
    }
  })
})

// 未录入库存的商品
router.get('/goodsNotin',(req, res) => {
  var sql = 'select gname from goods where gname not in (select ugname from store)'
  conn.query(sql, (err, result) => {
    if(err) {
      console.log(err)
      res.json({ err_code: 0, message: "搜索失败"})
    }
    if(result) {
      jsonWrite(res, result)
    }
  })
})

// 接口：删除信息
router.post('/delStore', (req, res) => {
  const sql = $sql.Store.del
  const params = req.body
  // console.log('删除', params)
  conn.query(sql, [params.sid], function (err, result) {
    if (err) {
      // console.log(err)
      throw err
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// 接口：修改信息
router.post('/updateStore', (req, res) => {
  const sql = $sql.Store.update
  const params = req.body
  // console.log('修改', params)
  conn.query(sql, [params.ugname,params.scount,params.upid,params.sid], function (err, result) {
    if (err) {
      throw err
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

module.exports = router