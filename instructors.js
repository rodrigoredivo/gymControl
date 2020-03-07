const fs = require('fs')
const data = require('./data.json')

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
    avatar_url,
    name,
    birth,
    services,
    gender,
    created_at
  })

  // CRIANDO CALL BACK
  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
    if (err) return res.send('Write file error!')

    return res.redirect('./instructors')
  })
  
}

// UPDATE

// DELETE