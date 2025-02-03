# Email Validator

Email Validator is an email validation library that checks if an
email address has a valid format and verifies the domain's MX
(Mail Exchange) records to ensure it can receive emails.

## Features

- **RFC 5322 Format Validation**: Validates email addresses against the standard
  email formatting rules.
- **MX Record Checking**: Verifies that the domain of the email address has
  valid MX records indicating that it can receive emails. This check can be
  disabled using a parameter.
- **Customizable Timeout**: Allows setting a custom timeout for MX record
  checking.

## Installation

```bash
git clone https://github.com/kensdv/email-validator
```
```bash
cd email-validator
```
```bash
npm init -y
```
```bash
npm install node-email-verifier --save
```
```bash
npm install fs
```

## Usage

Here's how to use Email Validator, with and without MX record checking:

```bash
node email.js
```

## API

### ```async emailValidator(email, [opts])```

Validates the given email address, with an option to skip MX record verification
and set a custom timeout.

#### Parameters

- ```email``` (string): The email address to validate.
- ```opts``` (object): Optional configuration options.
- ```timeout``` (string|number): The timeout for the DNS MX lookup, in
  milliseconds or ms format (e.g., '2000ms' or '10s'). The default is 10 seconds
  ('10s').
- ```checkMx``` (boolean): Whether to check for MX records. This defaults to
  true.

#### Returns

- ```Valid emails saved to valid_emails.txt```: A promise that resolves to true if the email address
is valid and, if checked, has MX records; invalid otherwise.

