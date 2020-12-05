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
router.post('/addEmp', (req, res) => {
  const sql = $sql.Emp.add
  const params = req.body
  // console.log('添加', params)
//   ename,eintime,eouttime,eauth,epassword
  conn.query(sql, [params.ename, params.eintime, params.eouttime, params.eauth, params.epassword], function (err, result) {
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
router.get('/showEmp', (req, res) => {
  var sql = $sql.Emp.show
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

// 搜索
router.post('/showEmpsearch', (req, res) => {
  var sql = $sql.Emp.show
  let keypro = req.body.query
  if(keypro!=null) {
    sql += " where ename like '%"+keypro+"%' "
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
router.post('/delEmp', (req, res) => {
  const sql = $sql.Emp.del
  const params = req.body
  // console.log('删除', params)
  conn.query(sql, [params.eid], function (err, result) {
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
router.post('/updateEmp', (req, res) => {
  const sql = $sql.Emp.update
  const params = req.body
  // console.log('修改', params)
  conn.query(sql, [params.eouttime,params.eauth,params.epassword,params.eid], function (err, result) {
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