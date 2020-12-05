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
router.post('/addDiscount', (req, res) => {
  const sql = $sql.Discount.add
  const params = req.body
  conn.query(sql, [params.dname,params.ugname,params.ddesc,params.dbdate,params.dedate,params.dnum,params.dstate], function (err, result) {
    if (err) {
      // console.log(err)
      throw err
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// 接口：查询全部
router.get('/showDiscount', (req, res) => {
  const sql = $sql.Discount.show
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

// 搜索
router.post('/showDiscountbyquery', (req, res) => {
  var sql = $sql.Discount.show
  let keypro = req.body.query
  if(keypro!=null) {
    sql += " where ugname like '%"+keypro+"%' "
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

// 接口：修改信息
router.post('/updateDiscount', (req, res) => {
  const sql = $sql.Discount.update
  const params = req.body
  // console.log('修改', params)
  conn.query(sql, [params.dname,params.ddesc,params.dedate,params.dnum,params.dstate,params.did], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

module.exports = router