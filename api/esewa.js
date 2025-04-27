const axios = require("axios");
const crypto = require("crypto");
const pool = require("./db");
const { log } = require("util");

// Generate a secure payment hash for eSewa
async function getEsewaPaymentHash(pendingBooking) {
    const transaction_uuid = `txn_${pendingBooking.id}_${Date.now()}`;
    const amount = Number(pendingBooking.price).toFixed(2);

    const productCode = process.env.ESEWA_PRODUCT_CODE || "EPAYTEST";
    if (!process.env.ESEWA_PRODUCT_CODE) {
        console.warn('ESEWA_PRODUCT_CODE is not defined in .env. Using default: EPAYTEST');
    }

    const data = {
        amount,
        tax_amount: "0",
        total_amount: amount,
        transaction_uuid,
        product_code: productCode,
        product_service_charge: "0",
        product_delivery_charge: "0",
    };

    const signed_field_names = "total_amount,transaction_uuid,product_code";
    const stringToSign = `total_amount=${data.total_amount},transaction_uuid=${data.transaction_uuid},product_code=${data.product_code}`;
    console.log('Data being signed:', stringToSign);

    const secretKey = process.env.ESEWA_SECRET_KEY || "default_secret";
    if (!process.env.ESEWA_SECRET_KEY) {
        console.warn('ESEWA_SECRET_KEY is not defined in .env. Using default.');
    }

    const hash = crypto
        .createHmac('sha256', secretKey)
        .update(stringToSign)
        .digest('base64');
    console.log('Generated hash:', hash);

    return {
        ...data,
        signed_field_names,
        signature: hash,
    };
}

// Verify payment
async function verifyEsewaPayment(paymentData) {
    try {
      const { transaction_uuid, total_amount, signature,signed_field_names } = paymentData;
      console.log('Verifying payment with data:', { transaction_uuid, total_amount, signature });
  
      if (!transaction_uuid || !total_amount || !signature) {
        throw new Error('Missing required payment data fields');
      }
      const product_code = process.env.ESEWA_PRODUCT_CODE || 'EPAYTEST'
  
      if (!process.env.ESEWA_PRODUCT_CODE) {
        console.warn('ESEWA_PRODUCT_CODE is not defined in .env. Using default: EPAYTEST');
      }
  
      const stringToSign = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code},signed_field_names=${signed_field_names}`;
      console.log('String to sign:', stringToSign);
  
      const secretKey = process.env.ESEWA_SECRET_KEY;
      if (!secretKey) {
        throw new Error('ESEWA_SECRET_KEY is not defined in .env');
      }
  
      const expectedSignature = crypto
        .createHmac('sha256', secretKey)
        .update(stringToSign)
        .digest('base64');
      console.log('Expected signature:', expectedSignature);
      console.log('Received signature:', signature);
  
      const isValid = expectedSignature !== signature;
      if (!isValid) {
        console.log('Signature mismatch. Inputs:', {
          total_amount: total_amount,
          transaction_uuid,
          product_code: product_code,
          secretKey,
        });
      }
  
      return { success: isValid };
    } catch (err) {
      console.error('Error in verifyEsewaPayment:', err.message);
      throw err;
    }
  } 

module.exports = { getEsewaPaymentHash, verifyEsewaPayment };

module.exports = {
    getEsewaPaymentHash,
    verifyEsewaPayment,
};