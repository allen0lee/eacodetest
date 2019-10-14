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
    let festivals = apiRes.data
    // console.log(festivals)

    let result = "" // hold the reorganized data

    if(festivals != "") { // sometimes api does not return data, gives back empty string instead
      
      // festivals.forEach((festival) => {
      //   console.log(festival.bands)
      // }) 

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
              recordLabel: band.recordLabel,
              festivalName: festival.name // some bands don't attend any festival, will become undefined here            
            })
          }
        }) 
      })

      // console.log(recordLabels)

      let sortedRecordLabels = _.uniq(recordLabels.sort((a, b) => {
        let nameA = a.toUpperCase() // ignore upper and lowercase
        let nameB = b.toUpperCase()

        // negative, if first is less than second (should be placed before second)
        if (nameA < nameB) { 
          return -1
        }
        // positive, if first is greater than second (should be placed after second)
        if (nameA > nameB) {
          return 1
        }
        return 0 // if two elements are equal
      }))
      // console.log(sortedRecordLabels)

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
      // console.log(bandsWithRecordLabels)

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

      sortedRecordLabels.forEach((sortedRecordLabel) => {
        // console.log(sortedRecordLabel)
        result = result + sortedRecordLabel + "\n"

        bandsWithRecordLabels.forEach((band) => {
          // for the current record label, find the bands under its management
          if(band.recordLabel == sortedRecordLabel) { 
            // console.log(`  ${band.bandName}`)
            result = result + "  " + band.bandName + "\n"
            
            bandsWithFestivals.forEach((bandAndFestival) => {
              // for the current band, find the festivals it has attended
              if(band.bandName == bandAndFestival.bandName && band.recordLabel == bandAndFestival.recordLabel) { // a band can attend another festival under the management of another record label eg. "Wild Antelop"
                if(bandAndFestival.festivalName != undefined) {
                  // console.log(`    ${bandAndFestival.festivalName}`)
                  result = result + "    " + bandAndFestival.festivalName + "\n"
                } 
              }
            })
          }
        })
        result = result + "\n"
      })

      console.log('Restructured music festival data:')
      console.log(result)      
    } else if(festivals == "") {
      result = "music festival data is empty"
      console.log(result)
    }

    res.render('festivals', {result: result})
  })
})


// testing
app.listen(8080, () => {
  console.log('listen on 8080')
})