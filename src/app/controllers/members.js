const { age, date } = require('../../lib/utils')


module.exports = {
  index(req, res) {
    return res.render('members/index')
  },
  create(req, res) {
    return res.render('members/create')
  },
  show(req, res) {
    return res.render('members/show', { member })
  },
  post(req, res) {
    const keys = Object.keys(req.body) // CRIANDO ARRAY 

    for (key of keys) {
      if (req.body[key] == '') {
        return res.send('Please, fill all fields!')
      }
    }

    // DESESTRUTURAÇÃO DE OBJETO
    let { avatar_url, birth, name, services, gender } = req.body

    return  
  },
  edit(req, res) {
    return
  },
  put(req, res) {
    const keys = Object.keys(req.body) // CRIANDO ARRAY 

    for (key of keys) {
      if (req.body[key] == '') {
        return res.send('Please, fill all fields!')
      }
    }

    return
  },
  delete(req, res) {
    return
  },
}