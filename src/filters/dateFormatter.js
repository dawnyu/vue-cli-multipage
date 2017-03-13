
/**
 * 个位数前加零
 * @param  {Number} val
 * @return {String/Number}
 */
let zerofill = val => val >= 10 ? val : '0' + val

const dateFormatter = (time,timeType, type) =>  {
    if(!time) return
    if(timeType == 1){
        time = time.slice(0,4).concat('/').concat(time.slice(4,6)).concat('/').concat(time.slice(6,8))
                .concat(' ').concat(time.slice(8,10)).concat(':').concat(time.slice(10,12)).concat(':').concat(time.slice(12,14))
    }
      let date = new Date(time)
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let hours = date.getHours()
      let minutes = date.getMinutes()
      let second = date.getSeconds()

      switch (type) {
        case 0: // 01-05
            return `${zerofill(month)}-${zerofill(day)}`
        case 1: // 11:12
            return `${zerofill(hours)}-${zerofill(minutes)}`
        case 2: // 2016-11-05
            return `${year}-${zerofill(month)}-${zerofill(day)}`
        case 3: //  2016-11-05 11:12
            return `${year}-${zerofill(month)}-${zerofill(day)}  ${zerofill(hours)}:${zerofill(minutes)}`
        case 4: //  2016.11.05 11:12
            return `${year}.${zerofill(month)}.${zerofill(day)}  ${zerofill(hours)}:${zerofill(minutes)}:${zerofill(second)}`
        case 5: // 2016-11-05
            return `${year}.${zerofill(month)}.${zerofill(day)}`
        case 6: // 2016-11-05
            return `${hours}:${zerofill(minutes)}:${zerofill(second)}`
        case 7: //  2016-11-05 11:12:13
            return `${year}-${zerofill(month)}-${zerofill(day)}  ${zerofill(hours)}:${zerofill(minutes)}:${zerofill(second)}`
        case 8: //  11:12:13
            return `${zerofill(hours)}:${zerofill(minutes)}:${zerofill(second)}`
        default:
        return ""
    }
}

const parseParkingTime = (time) =>{
    if (!time) {
		return '00:00:00';
	}
	time = time * 1;
	let h = parseInt((time / 60) / 60);
	let m = parseInt((time - h * 60 * 60) / 60);
	let s = (time - h * 60 * 60 - m * 60) % 60;
	if ((h + '').length < 2) {
		h = '0' + h;
	}
	if ((s + '').length < 2) {
		s = '0' + s;
	}
	if ((m + '').length < 2) {
		m = '0' + m;
	}
	return h + ':' + m + ':' + s;
}
