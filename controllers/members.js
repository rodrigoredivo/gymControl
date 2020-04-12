const fs = require('fs')
const data = require('../data.json')
const { age, date } = require('../utils')

// INDEX
exports.index = function (req, res) {

  return res.render('members/index', { members: data.members })
}

// SHOW
exports.show = function (req, res) {
  const { id } = req.params

  const foundMember = data.members.find(function (member) {
    return member.id == id
  })

  if (!foundMember) {
    return res.send('Member not found!')
  }

  const member = {
    ...foundMember,
    birth: date(foundMember.birth).birthDay,
  }

  return res.render('members/show', { member })
}

// CREATE
exports.create = function (req, res) {
  return res.render('members/create')
}

// POST
exports.post = function (req, res) {
  const keys = Object.keys(req.body) // CRIANDO ARRAY 
  //VERIFICANDO SE TODOS OS POST ESTÃO PREENCHIDOS
  for (key of keys) {
    if (req.body[key] == '') {
      return res.send('Please, fill all fields!')
    }
  }

  // DESESTRUTURAÇÃO DE OBJETO COM OS CAMPOS QUE EU QUERO
  //let { avatar_url, birth, name, services, gender } = req.body

  birth = Date.parse(req.body.birth)
  
  let id = 1
  const lastMember = data.members[data.members.length - 1]

  if (lastMember) {
    id = lastMember.id + 1
  }

  data.members.push({
    id,
    ...req.body,
    birth,
  })

  // CRIANDO CALL BACK
  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send('Write file error!')

    return res.redirect('./members')
  })

}

// UPDATE
exports.edit = function (req, res) {
  const { id } = req.params

  const foundMember = data.members.find(function (member) {
    return member.id == id
  })

  if (!foundMember) {
    return res.send('Member not found!')
  }

  const member = {
    ...foundMember,
    birth: date(foundMember.birth).iso
  }

  return res.render('members/edit', { member })
}

// PUT
exports.put = function (req, res) {
  const { id } = req.body
  let index = 0

  const foundMember = data.members.find(function (members, foundIndex) {
    if (id == members.id) {
      index = foundIndex
      return true
    }
  })

  if (!foundMember) {
    return res.send('Member not found!')
  }

  const members = {
    ...foundMember,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id)
  }

  data.members[index] = members

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) {
      return res.send("Write error!")
    }

    return res.redirect(`/members/${id}`)
  })
}


// DELETE
exports.delete = function (req, res) {
  const { id } = req.body

  const filteredMembers = data.members.filter(function (members) {
    return members.id != id
  })

  data.members = filteredMembers

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) {
      return res.send("Write error!")
    }

    return res.redirect("/members")
  })
}