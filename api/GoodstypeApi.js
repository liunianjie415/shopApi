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
router.post('/addGoodstype', (req, res) => {
  const sql = $sql.Goodstype.add
  const params = req.body
  // console.log('添加', params)
  conn.query(sql, [params.gtname,params.uid], function (err, result) {
    if (err) {
      // console.log(err)
      throw err
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// 查询未分类好的商品信息
router.get('/shownotypegoods', (req, res) => {
  var sql = 'select * from goods WHERE gid not in (select uid from goodstype) '
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

// 接口：查询全部
router.get('/showGoodstype', (req, res) => {
  const sql = $sql.Goodstype.show
  const params = req.body
  // console.log(params)
  conn.query(sql, [], function (err, result) {
    if (err) {
      // console.log(err)
      throw err
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// 搜索的接口
router.post('/searchGt',(req, res) => {
  let keygoods = req.body.query
  var sql = 'select gtid ,gtname , gname, gid from goods g , goodstype gt where g.gid = gt.uid'
  if(keygoods!=null) {
    sql += " and gtname like '%"+keygoods+"%' "
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

// 接口：删除信息
router.post('/delGoodstype', (req, res) => {
  const sql = $sql.Goodstype.del
  const params = req.body
  // console.log('删除', params)
  conn.query(sql, [params.gtid], function (err, result) {
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
router.post('/updateGoodstype', (req, res) => {
  const sql = $sql.Goodstype.update
  const params = req.body
  // console.log('修改', params)
  conn.query(sql, [params.gtname,params.uid,params.gtid], function (err, result) {
    if (err) {
      // console.log(err)
      throw err
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

module.exports = router