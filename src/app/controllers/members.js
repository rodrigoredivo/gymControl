const { date } = require('../../lib/utils')
const Member = require('../model/member')

module.exports = {
  index(req, res) {
      Member.all(function(members){

      return res.render("members/index", {members})
    })
    
  },
  create(req, res) {
    return res.render('members/create')
  },
  show(req, res) {
    Member.find(req.params.id, function(member) {
      if (!member) return res.send("Member not found")

      member.birth = date(member.birth).birthDay
      
      return res.render("members/show", { member })
    })

  },
  post(req, res) {
    const keys = Object.keys(req.body) // CRIANDO ARRAY 

    for (key of keys) {
      if (req.body[key] == '') {
        return res.send('Please, fill all fields!')
      }
    }
    
    Member.create(req.body, function(member){

      return res.redirect(`/members/${member.id}`)
    })

  },
  edit(req, res) {
    Member.find(req.params.id, function(member) {
      if (!member) return res.send("Member not found")

      member.birth = date(member.birth).iso
           
      return res.render("members/edit", { member })
    })
  },
  put(req, res) {
    const keys = Object.keys(req.body) // CRIANDO ARRAY 

    for (key of keys) {
      if (req.body[key] == '') {
        return res.send('Please, fill all fields!')
      }
    }

    Member.update(req.body, function() {

      return res.redirect(`/members/${req.body.id}`)

    })
  },
  delete(req, res) {
    Member.delete(req.body.id, function() {

      return res.redirect(`/members`)

    })
  }
}