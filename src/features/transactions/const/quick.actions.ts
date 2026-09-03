export const QUICK_ACTIONS_FORMS = {
    "quick_actions": {
        "transferencia": {
            "title": "Tranferencia",
            "options": [
                {"id": "money","label": "Caja a Banco"}, 
                {"id": "bank","label" :"Banco a Caja"}
            ],
            "fields": [
                {"id": "amount", "type": "number", "label": "Monto", "required": true}
            ],
        }
    }
}