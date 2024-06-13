from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///classes.db'
db = SQLAlchemy(app)
migrate = Migrate(app, db)

class Class(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    store_name = db.Column(db.String(50), nullable=False)
    stock_status = db.Column(db.Enum('Low', 'Medium', 'High', name='stockstatus'), nullable=True)

@app.route('/get_stock_status', methods=['GET'])
def get_stock_status():
    classes = Class.query.all()
    result = [{'id': c.id, 'name': c.name, 'store_name': c.store_name, 'stock_status': c.stock_status} for c in classes]
    return jsonify(result), 200

if __name__ == '__main__':
    app.run(debug=True)
