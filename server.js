const express = require('express')
const app = express()
const axios = require('axios')
const _ = require('underscore')
const logger = require('./logger')

app.set('view engine', 'ejs')

app.use(logger) 

app.use(express.static('public')) 

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/festivals', (req, res) => {
  axios.get(`http://eacodingtest.digital.energyaustralia.com.au/api/v1/festivals`).then((apiRes) => {
    //console.log(apiRes.data)
    // console.log(apiRes.data[0].name)
    // console.log(apiRes.data[0].bands)

    let festivals = apiRes.data
    console.log(festivals)

    festivals.forEach((festival) => {
      console.log(festival.bands)
    }) 

    console.log('##################################')

    let recordLabels = []
    let bandsWithRecordLabels = [] // bands with record labels, but some bands don't have recordLabel 

    let bandsWithFestivals = [] // this shows each band attends what festival, but some bands don't attend any festival

    festivals.forEach((festival) => { 
      festival.bands.forEach((band) => {
        if(band.recordLabel != undefined && band.recordLabel != '') {
          recordLabels.push(band.recordLabel)

          bandsWithRecordLabels.push({
            bandName: band.name, 
            recordLabel: band.recordLabel
          })
          
          bandsWithFestivals.push({
            bandName: band.name,
            festivalName: festival.name // some bands don't attend any festival, will become undefined here            
          })
        }
      }) 
    })

    let sortedRecordLabels = _.uniq(recordLabels.sort())
    // let sortedRecordLabels = recordLabels.sort()
    console.log(sortedRecordLabels)

    // sort band names in alphabetical order
    bandsWithRecordLabels.sort((a, b) => {
      if (a.bandName < b.bandName) {
        return -1
      }
      if (a.bandName > b.bandName) {
        return 1
      }
      return 0
    })
    console.log(bandsWithRecordLabels)

    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')

    // sort festival names in alphabetical order
    bandsWithFestivals.sort((a, b) => {
      if (a.festivalName < b.festivalName) {
        return -1
      }
      if (a.festivalName > b.festivalName) {
        return 1
      }
      return 0
    })
    console.log(bandsWithFestivals)


    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')

    let result = "" // hold the reorganized data

    sortedRecordLabels.forEach((sortedRecordLabel) => {
      console.log(sortedRecordLabel)
      result = result + sortedRecordLabel + "\n"

      bandsWithRecordLabels.forEach((band) => {
        if(band.recordLabel == sortedRecordLabel) {
          console.log(`  ${band.bandName}`)
          result = result + "  " + band.bandName + "\n"
          bandsWithFestivals.forEach((bandAndFestival) => {
            if(band.bandName == bandAndFestival.bandName) {
              if(bandAndFestival.festivalName != undefined) {
                console.log(`    ${bandAndFestival.festivalName}`)
                result = result + "    " + bandAndFestival.festivalName + "\n"
              } 
            }
          })
        }
      })
    })

    console.log('%%%%%%%%')
    console.log(result)


    res.render('festivals', {result: result})
  })
})


// testing
app.listen(8080, () => {
  console.log('listen on 8080')
})