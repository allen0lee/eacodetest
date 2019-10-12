# eacodetest

### 1. Problem description
#### List out music festival data in a particular manner: at the top level, it should show the band record label, below that it should list out all bands under their management, and below that it should display which festivals they've attended, if any. All entries should be sorted alphabetically.

#### For example:

- Record Label 1
  - Band X
    - Omega Festival
  - Band Y
- Record Label 2
  - Band A
    - Alpha Festival
    - Beta Festival

#### Original data is provided via API http://eacodingtest.digital.energyaustralia.com.au/api/v1/festivals

#### The task is to reconstruct the original data and output it in the above format.

### 2. Solution
####  1) find all record labels, remove duplicates (because some record labels appear more than once as they manage multiple bands), sort them in alphabetic order
  
####  2) find bands that have record labels and store them in an array, eg.
####  [{bandName: 'band X', recordLabel: 'record label Y'}, ..., {}]
  
####  Since in the original data, some bands don't have record labels or their record labels are empty (''). Bands like these are excluded. 

####  This array is the relation between band and record label. It shows which band is under which record label's management.

####  3) find bands that have attended festivals and store them in an array, eg.
####  [{bandName: 'band X', recordLabel: 'record label Y', festivalName: 'festival A'}, ..., {}]  

#### This array is the relation between band and festival. It shows which band has attended which festival, under which record label's management.

#### 4) construct the result in a string and show it in terminal window or a html page

### 3. How to run this demo
#### This demo is built with Node.js.
#### Before running this demo, in the demo directory, type the following in terminal window: npm i  
#### Then to run the demo, type: npm start
#### Open your browser, type localhost:8080 in address bar, then a home page should appear, click button 'get data' to see the result, or you can see it in the terminal window.     