const crypto = require('./crypto');
const CHAVE = 'bf3c199c2470cb477d907b1e0917c17e';
const IV = '5183666c72eec9e4';

// Encrypt
const textToEncrypt = 'This is a secret message';
const encryptedText = crypto.encrypt(textToEncrypt);
console.log('Encrypted:', encryptedText);

// Decrypt
const decryptedText = crypto.decrypt(encryptedText);
console.log('Decrypted:', decryptedText);