const Instructor = require('../model/instructor')

module.exports = {
  index(req, res) {
      Instructor.all(function(instructors){

      return res.render("instructors/index", {instructors})
    })
    
  },
  create(req, res) {
    return res.render('instructors/create')
  },
  show(req, res) {
    return res.render('instructors/show')
  },
  post(req, res) {
    const keys = Object.keys(req.body) // CRIANDO ARRAY 

    for (key of keys) {
      if (req.body[key] == '') {
        return res.send('Please, fill all fields!')
      }
    }
    
    Instructor.create(req.body, function(instructor){

      return res.redirect(`/instructors/${instructor.id}`)
    })

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