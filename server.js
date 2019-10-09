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
    let bandsWithRecordLabels = [] // bands with label record label 

    festivals.forEach((festival) => { 
      festival.bands.forEach((band) => {
        if(band.recordLabel != undefined && band.recordLabel != '') {
          recordLabels.push(band.recordLabel)
          bandsWithRecordLabels.push({
            bandName: band.name, 
            recordLabel: band.recordLabel, // some bands don't have recordLabel
            festivalName: festival.name // some bands don't attend any festival, will become undefined here
          }) 
        }
      }) 
    })

    console.log(bandsWithRecordLabels)

    let sortedRecordLabels = _.uniq(recordLabels.sort())
    // let sortedRecordLabels = recordLabels.sort()
    console.log(sortedRecordLabels)


    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')

    // let sortedFestivals = []

    // let bands = []
    // bands.push({name:  , festivals: []})

    // festivals.forEach((festival) => {
    //   bandsWithRecordLabels.forEach((displayBand) => {
    //     sortedFestivals.push({recordLabel: displayBand.recordLabel, band: displayBand.bandName, festival: festival.name})
    //   }) 
    // })

    // console.log(sortedFestivals)


    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')

    sortedRecordLabels.forEach((sortedRecordLabel) => {
      console.log(sortedRecordLabel)

      bandsWithRecordLabels.forEach((band) => {
        if(band.recordLabel == sortedRecordLabel) {
          console.log(`  ${band.bandName}`)
        }
      })
    })


    //res.render('festivals', {festivals: apiRes.data})
  })
})


// testing
app.listen(8080, () => {
  console.log('listen on 8080')
})