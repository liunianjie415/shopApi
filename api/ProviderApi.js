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
router.post('/addProvider', (req, res) => {
  const sql = $sql.Provider.add
  const params = req.body
  // console.log('添加', params)
//   pname,paddr,ptel
  conn.query(sql, [params.pname, params.paddr, params.ptel], function (err, result) {
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
router.get('/showProvider', (req, res) => {
  const sql = $sql.Provider.show
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
router.post('/searchPro',(req, res) => {
  let keypro = req.body.query
  var sql = 'select * from provider '
  if(keypro!=null) {
    sql += " where pname like '%"+keypro+"%' "
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
router.post('/delProvider', (req, res) => {
  const sql = $sql.Provider.del
  const params = req.body
  // console.log('删除', params)
  conn.query(sql, [params.pid], function (err, result) {
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
router.post('/updateProvider', (req, res) => {
  const sql = $sql.Provider.update
  const params = req.body
  // console.log('修改', params)
  conn.query(sql, [params.pname,params.paddr,params.ptel,params.pid], function (err, result) {
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