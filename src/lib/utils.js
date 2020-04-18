module.exports = {
  age(timestamp) {
    const today = new Date()
    const birthDate = new Date(timestamp)

    let age = today.getFullYear() - birthDate.getFullYear()
    const month = today.getMonth() - birthDate.getMonth()

    if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
      age = age -1
    }

    return age
  },
  date(timestamp) {
      const date = new Date(timestamp) 
      // criando novo objeto de data , e passa a data com seu local time 

      const year = date.getUTCFullYear() //pegando o ano e tranformando a data para universal

      const month = `0${date.getUTCMonth() + 1}`.slice(-2) //pegando o mês e tranformando a data para universal

      const day = `0${date.getUTCDate()}`.slice(-2) //pegando o dia e tranformando a data para universal

      return {
        day,
        month,
        year,
        iso: `${year}-${month}-${day}`, //iso
        birthDay: `${day}/${month}`, //01/10
        format: `${day}/${month}/${year}`
      }
  }

}