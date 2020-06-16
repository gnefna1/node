let timeFormat = (time,format)=>{
    time = new Date(time)
    let year = time.getFullYear()
    let month = time.getMonth() < 9 ? "0" + (time.getMonth() + 1) : (time.getMonth() + 1)
    let date = time.getDate() < 10 ? "0" + time.getDate() : time.getDate()
    let hours = time.getHours() < 10 ? "0" + time.getHours() : time.getHours()
    let minutes = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()
    let seconds = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds()
    
    return format.replace(/yyyy/,year).replace(/MM/,month).replace(/dd/,date).replace(/hh/,hours).replace(/mm/,minutes).replace(/ss/,seconds)
}

module.exports = { timeFormat }