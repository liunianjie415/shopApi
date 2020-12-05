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
      code: '1',
      msg: '操作失败'
    })
  } else {
    res.json(
      ret
    )
  }
}
// 接口：增加信息
router.post('/addSell', (req, res) => {
  const sql = $sql.Sell.add
  const params = req.body
  let curArr = []
  let valArr = []
  let parlenght = params.length
  for (let i = 0; i < parlenght; i++) {
    for (let index in params[i]) {
      curArr.push(params[i][index])
    }
    valArr.push(curArr)
    curArr = []
  }
  conn.query(sql, [valArr], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// 获取库存信息
router.get('/getcount', (req, res) => {
  const sql = 'select scount, ugname from store'
  conn.query(sql, [], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// 更新库存信息
router.post('/handlecount', (req, res) => {
  const params = req.body
  let sqlmodel = 'update store set scount = ? where ugname = ?'
  let sql = ''
  let curArr = []
  let valArr = []
  let parlenght = params.length
  for (let i = 0; i < parlenght; i++) {
    for (let index in params[i]) {
      curArr.push(params[i][index])
    }
    valArr.push(curArr)
    curArr = []
  }
  valArr.forEach((item, index) => {
    sql += mysql.format(sqlmodel, item) + ';'
  })
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// 接口：查询全部
router.get('/showSell', (req, res) => {
  const sql = $sql.Sell.show
  conn.query(sql, [], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// 接口：删除信息
router.post('/delSell', (req, res) => {
  const sql = $sql.Sell.del
  const params = req.body
  //   console.log('删除', params)
  conn.query(sql, [params.seid], function (err, result) {
    if (err) {
      //   console.log(err)
      throw err
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// 接口：修改信息
router.post('/updateSell', (req, res) => {
  const sql = $sql.Sell.update
  const params = req.body
  //   console.log('修改', params)
  conn.query(sql, [params.sedate, params.uname, params.secount, params.sebprice, params.udid, params.seeprice, params.seid], function (err, result) {
    if (err) {
      //   console.log(err)
      throw err
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

module.exports = router