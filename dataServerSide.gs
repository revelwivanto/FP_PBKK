function getData() {
  const ss = SpreadsheetApp.openById('1fuV89FRAN5Gd7b_I1ZtpqPWKp8yxm4vNaJPdoyC99co');
  const ws = ss.getSheetByName("CV")
  const dataRange = ws.getRange("A1").getDataRegion()
  const data = dataRange.getDisplayValues()

  const headers = data.shift()

  // console.log(headers)
  // console.log(data) 

  const jsData = data.map(r => {
    const tempObject = {}
    headers.forEach((header,i) => {
      tempObject[header] = r[i]
    })
    return tempObject
  })

  return jsData
  // end getData Function
}


// function ubah data di spreadsheet
function editfield(props){
  const ss = SpreadsheetApp.openById('1fuV89FRAN5Gd7b_I1ZtpqPWKp8yxm4vNaJPdoyC99co');
  const ws = ss.getSheetByName("CV")
  const data = ws.getDataRange().getValues();
  const headers = data.shift();
  const idIndex = headers.indexOf("ID");

  const rowIndex = data.findIndex(row => row[idIndex] == props.id);

  if (rowIndex === -1) {
    throw new Error("No Matching Record");
  }

  // Adjust index to spreadsheet row number (it's zero-indexed)
  const recordRowNumber = rowIndex + 2;

  try {
    // Update the 'field' column in the identified row
    ws.getRange(recordRowNumber, headers.indexOf("field") + 1).setValue(props.val);
    Logger.log("Value updated successfully.");
  } catch (error) {
    Logger.log("Error occurred while updating value: " + error);
    throw new Error("Error updating value.");
  }
}

function dokfromtemp(){
  var field = 'doctor';
  var email = 'mrevelwivanto@gmail.com';
  var tanggal = '19/11/2002'
  var iddoc = '1ntjFF8Um1G4TiOafnTx-B3Ko0ytR3jL3Io1JWAAXuQU';
  var new_id = DriveApp.openById(iddoc).makeCopy().getID();
  var doc = DocumentApp.openById(new_id);
  doc.getBody().replaceText('{(email)}', email);
  doc.getBody().replaceText('{(field)}', field);
  doc.getBody().replaceText('{(tanggal)}', tanggal);
  DriveApp.getFileById(new_id).setName('Resume ' + email);
}

function sendEmail(name, email, subject, message) {
    // Use the entered email as the recipient
    var recipient = email;
    var emailSubject = "New message: " + subject;
    var emailBody = "Name: " + name + "\nEmail: " + email + "\nMessage:\n" + message;

    MailApp.sendEmail(recipient, emailSubject, emailBody);
}






















