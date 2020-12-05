// sqlMap.js  sql语句
const sqlMap = {
    Goods: {
      add: 'insert into goods(gname,gspec,giprice,gprice) values (?,?,?,?)',
      show: 'select * from goods',
      del: 'delete from goods where gid = ?',
      update: 'update goods set gname = ?,gspec = ?,giprice=?,gprice = ? where gid = ?',
    },
    Goodstype: {
      add: 'insert into goodstype(gtname,uid) values (?,?)',
      show: 'select gtid ,gtname , gname, gid from goods g , goodstype gt where g.gid = gt.uid ',
      del: 'delete from goodstype where gtid = ?',
      update: 'update goodstype set gtname = ?,uid = ? where gtid = ?'
    },
    Store: {
      add: 'insert into store(ugname,scount,upid) values(?,?,?)',
      show: 'select sid, ugname, scount, pname, pid from provider p, store s where p.pid = s.upid',
      del: 'delete from store where sid = ?',
      update: 'update store set ugname = ?, scount = ?, upid = ? where sid = ?'
    },
    Provider: {
      add: 'insert into provider(pname,paddr,ptel) values(?,?,?)',
      show: 'select * from provider',
      del: 'delete from provider where pid = ?',
      update: 'update provider set pname = ?, paddr = ?, ptel = ? where pid = ?'
    },
    Emp: {
      add: 'insert into emp(ename,eintime,eouttime,eauth,epassword) values(?,?,?,?,?)',
      show: 'select * from emp',
      del: 'delete from emp where eid = ?',
      update: 'update emp set eouttime = ? , eauth = ?, epassword = ? where eid = ?'
    },
    Discount: {
      add: 'insert into discount(dname,ugname,ddesc,dbdate,dedate,dnum,dstate) values(?,?,?,?,?,?,?)',
      show: 'select * from discount',
      del: 'delete from discount where did = ?',
      update: 'update discount set dname = ?, ddesc = ?,dedate = ?,dnum = ?,dstate = ? where did = ?'
    },
    Sell: {
      add: 'insert into sell(sedate,uname,secount,sebprice,udid,seeprice,senum) values ?',
      show: 'select * from sell',
      del: 'delete from sell where seid = ?',
      update: 'update sell set sedate=?,uname=?,secount=?,sebprice=?,udid=?,seeprice=? where seid = ?'
    }
  }
  
  module.exports = sqlMap