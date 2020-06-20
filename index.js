const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  // .get('/', (req, res) => res.render('pages/index'))
  .get('/', (req, res) => res.render('pages/postage-form'))
  .get('/postage', handlePostageRateRequest)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

function handlePostageRateRequest(request, response) {
  const mailWeight = Number(request.query.mailWeight);
  const mailType = request.query.mailType;

  calulatePostage(response, mailWeight, mailType);
}

function calulatePostage(response, mailWeight, mailType) {
  
  let result = 0;
  
  if (mailType == 'lettersStamped') {
    
    if (mailWeight <= 1) {
      result = 0.55;
    } else if (mailWeight > 1 && mailWeight <= 2) {
      result = 0.70;
    } else if (mailWeight > 2 && mailWeight <= 3) {
      result = 0.85;
    } else if (mailWeight > 3 && mailWeight <= 3.5) {
      result = 1;
    } else {
      result = 'The weight of your item is outside the bounds of a stamped letter. Please select a different mail type.';
    }
  
  } else if (mailType == 'lettersMetered') {

    if (mailWeight <= 1) {
      result = 0.50;
    } else if (mailWeight > 1 && mailWeight <= 2) {
      result = 0.65;
    } else if (mailWeight > 2 && mailWeight <= 3) {
      result = 0.80;
    } else if (mailWeight > 3 && mailWeight <= 3.5) {
      result = 0.95;
    } else {
      result = 'The weight of your item is outside the bounds of a metered letter. Please select a different mail type.';
    }
  
  } else if (mailType == 'envelopesLarge') {
    
    if (mailWeight <= 1) {
      result = 1;
    } else if (mailWeight > 1 && mailWeight <= 2) {
      result = 1.20;
    } else if (mailWeight > 2 && mailWeight <= 3) {
      result = 1.40;
    } else if (mailWeight > 3 && mailWeight <= 4) {
      result = 1.60;
    } else if (mailWeight > 4 && mailWeight <= 5) {
      result = 1.80;
    } else if (mailWeight > 5 && mailWeight <= 6) {
      result = 2;
    } else if (mailWeight > 6 & mailWeight <= 7) {
      result = 2.20;
    } else if (mailWeight > 7 && mailWeight <= 8) {
      result = 2.40;
    } else if (mailWeight > 8 && mailWeight <= 9) {
      result = 2.60;
    } else if (mailWeight > 9 && mailWeight <= 10)  {
      result = 2.80;
    } else if (mailWeight > 10 && mailWeight <= 11)  {
      result = 3;
    } else if (mailWeight > 11 && mailWeight <= 12) {
      result = 3.20;
    } else if (mailWeight > 12 && mailWeight <= 13) {
      result = 3.40;
    } else {
      result = 'The weight of your item is outside the bounds of a large envelope. Please select a different mail type.';
    }
  
  } else if (mailType == 'firstClassPackage') {
    
    if (mailWeight <= 1 && mailWeight <= 4) {
      result = 3.80;
    } else if (mailWeight > 4 && mailWeight <= 8) {
      result = 4.60;
    } else if (mailWeight > 8 && mailWeight <= 12) {
      result = 5.30;
    } else if (mailWeight > 12 & mailWeight <= 13) {
      result = 5.90;
    } else {
      result = 'The weight of your item is outside the bounds of a first class package. Please contact us for more information.';
    }
  
  }
  
  const params = {mail_weight: mailWeight, mail_type: mailType, result: result};
  
  response.render('pages/postage-result', params);

}