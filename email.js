import fs from 'fs';
import emailValidator from 'node-email-verifier';

// Utility function to read emails from a text file
function readEmailsFromFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return data.split('\n').map(email => email.trim()).filter(email => email !== '');
  } catch (error) {
    console.error('Error reading the file:', error);
    return [];
  }
}

// Utility function to validate emails
async function validateEmail(email, options = {}) {
  try {
    const { checkMx = false, timeout = 500 } = options;
    const isValid = await emailValidator(email, { checkMx, timeout });
    return isValid;
  } catch (error) {
    if (error.message.match(/timed out/)) {
      console.error('Timeout on DNS MX lookup.');
    } else {
      console.error('Error validating email:', error);
    }
    return false;
  }
}

// Functions for different validation cases (with MX record checking, timeouts, etc.)
async function validateEmailWithMx(email) {
  return await validateEmail(email, { checkMx: true });
}

// Function to validate the list of emails read from a file
async function validateEmailListFromFile(filePath) {
  const emailList = readEmailsFromFile(filePath);

  if (emailList.length === 0) {
    console.log('No emails to validate.');
    return;
  }

  const validEmails = [];
  const invalidEmails = [];

  // Loop through the email list and validate each one with different options
  for (const email of emailList) {
    const isValid = await validateEmailWithMx(email);

    if (isValid) {
      validEmails.push(email);
    } else {
      invalidEmails.push(email);
      console.log(`Invalid email: ${email}`);
    }
  }

  // Save valid emails to a new file
  if (validEmails.length > 0) {
    fs.writeFileSync('valid_emails.txt', validEmails.join('\n'), 'utf-8');
    console.log('Valid emails saved to valid_emails.txt');
  }
}

// Path to the file containing the email addresses
const filePath = 'emails.txt';  // Adjust the path as necessary

// Start the email validation process
validateEmailListFromFile(filePath);
