from flask import Flask, jsonify

app = Flask(__name__)

# サンプルデータ
stores = [
    {"store_name": "店舗A", "stock_status": "在庫あり"},
    {"store_name": "店舗B", "stock_status": "在庫少ない"},
    {"store_name": "店舗C", "stock_status": "在庫なし"}
]

@app.route('/get_stores', methods=['GET'])
def get_stores():
    return jsonify(stores)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

