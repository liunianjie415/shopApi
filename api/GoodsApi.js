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
router.post('/addGoods', (req, res) => {
  const sql = $sql.Goods.add
  const params = req.body
  // console.log('添加', params)
  conn.query(sql, [params.gname,params.gspec,params.giprice,params.gprice], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// 接口：查询全部
router.get('/showGoods', (req, res) => {
  const sql = $sql.Goods.show
  const params = req.body
  // console.log(params)
  conn.query(sql, [], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// 搜索接口
router.post('/searchGoods',(req, res) => {
  let keygoods = req.body.query
  let sql = $sql.Goods.show
  if(keygoods!=null) {
    sql += " where gname like '%"+keygoods+"%' "
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
router.post('/delGoods', (req, res) => {
  const sql = $sql.Goods.del
  const params = req.body
  // console.log('删除', params)
  conn.query(sql, [params.gid], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// 接口：修改信息
router.post('/updateGoods', (req, res) => {
  const sql = $sql.Goods.update
  const params = req.body
  // console.log('修改', params)
  conn.query(sql, [params.gname,params.gspec,params.giprice,params.gprice,params.gid], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

module.exports = router