const fs = require('fs')
const Intl = require('intl')
const data = require('./data.json')
const { age, date } = require('./utils')

// SHOW
exports.show = function(req, res) {
  const { id } = req.params

  const foundInstructor = data.instructors.find(function(instructor){
    return instructor.id == id
  })

  if (!foundInstructor) { 
    return res.send('Instructor not found!')
  }

  const instructor = {
    ...foundInstructor,
    age: age(foundInstructor.birth),
    services: foundInstructor.services.split(","),
    created_at: new Intl.DateTimeFormat('pt-BR').format(foundInstructor.created_at),
  }

  return res.render('instructors/show' , { instructor})
}

// CREATE
exports.post = function(req, res) {
  const keys = Object.keys(req.body) // CRIANDO ARRAY 

  for (key of keys) {
    //  req.body.key == ''
    if(req.body[key] == '') {
      return res.send('Please, fill all fields!')
    }
  }

  // DESESTRUTURAÇÃO DE OBJETO
  let { avatar_url, birth, name, services, gender } = req.body

  birth = Date.parse(req.body.birth)
  const created_at = Date.now() //data de agora
  const id = Number(data.instructors.length + 1)

  data.instructors.push({
    id,
    name,
    avatar_url,
    birth,
    gender,
    services,
    created_at
  })

  // CRIANDO CALL BACK
  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
    if (err) return res.send('Write file error!')

    return res.redirect('./instructors')
  })
  
}

// UPDATE
exports.edit = function(req, res) {
  const { id } = req.params

  const foundInstructor = data.instructors.find(function(instructor){
    return instructor.id == id
  })

  if (!foundInstructor) { 
    return res.send('Instructor not found!')
  }

  const instructor = {
    ...foundInstructor,
    birth: date(foundInstructor.birth)
  }  

  return res.render('instructors/edit' , { instructor})
}

// put
exports.put = function(req, res) {
  const { id } = req.body
  let index = 0

  const foundInstructor = data.instructors.find(function(instructors, foundIndex){
    if(id == instructors.id){
      index = foundIndex
      return true
    }
  })

  if (!foundInstructor) { 
    return res.send('Instructor not found!')
  }

  const instructors = {
    ...foundInstructor,
    ...req.body,
    birth: Date.parse(req.body.birth)
  }

  data.instructors[index] = instructors

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err) {
      return res.send("Write error!")
    }

    return res.redirect(`/instructors/${id}`)
  })
}


// DELETE
exports.delete = function(req, res) {
  const { id } = req.body

  const filteredInstructors = data.instructors.filter(function(instructors){
    return instructors.id != id
  })

  data.instructors = filteredInstructors 

  fs.writeFile("data.json", JSON.stringify(data, null, 2),  function(err){
    if (err) {
      return res.send("Write error!")
    }

    return res.redirect("/instructors")
  })
}