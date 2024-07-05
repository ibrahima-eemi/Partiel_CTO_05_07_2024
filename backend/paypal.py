# backend/paypal.py
import paypalrestsdk
import logging
from dotenv import load_dotenv
import os

# Charger les variables d'environnement
load_dotenv()

paypalrestsdk.configure({
    "mode": os.getenv("PAYPAL_MODE"),  
    "client_id": os.getenv("PAYPAL_CLIENT_ID"),
    "client_secret": os.getenv("PAYPAL_CLIENT_SECRET")
})

def create_payment(total, currency, description):
    payment = paypalrestsdk.Payment({
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "transactions": [{
            "amount": {
                "total": str(total),
                "currency": currency
            },
            "description": description
        }],
        "redirect_urls": {
            "return_url": os.getenv("PAYPAL_RETURN_URL"),
            "cancel_url": os.getenv("PAYPAL_CANCEL_URL")
        }
    })
    
    if payment.create():
        logging.info(f"Payment created successfully: {payment.id}")
        for link in payment.links:
            if link.method == "REDIRECT":
                return link.href
    else:
        logging.error(payment.error)
        return None

def execute_payment(payment_id, payer_id):
    payment = paypalrestsdk.Payment.find(payment_id)
    if payment.execute({"payer_id": payer_id}):
        logging.info("Payment executed successfully")
        return True
    else:
        logging.error(payment.error)
        return False
