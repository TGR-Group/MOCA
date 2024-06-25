from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "https://staff.project-moca.com"}})
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

class LostProperty(db.Model):
    __tablename__ = 'lostproperty'
    id = db.Column(db.Integer, primary_key=True)
    lostproperty_name = db.Column(db.String(50), nullable=False)
    status = db.Column(db.Boolean, nullable=False, default=False)

class Store(db.Model):
    __tablename__ = 'store'
    id = db.Column(db.Integer, primary_key=True)
    store_name = db.Column(db.String(50), nullable=False)
    evaluation = db.Column(db.String(10), nullable=True)
    item_name = db.Column(db.String(50), nullable=True)
    quantity = db.Column(db.Integer, nullable=True)
    status = db.Column(db.Boolean, nullable=True, default=True)

@app.route('/add_lostproperty', methods=['POST'])
def add_lostproperty():
    data = request.json
    new_property = LostProperty(lostproperty_name=data['lostproperty_name'])
    db.session.add(new_property)
    db.session.commit()
    return jsonify({'message': 'Lost property added successfully'})

@app.route('/get_lostproperty', methods=['GET'])
def get_lostproperty():
    properties = LostProperty.query.all()
    property_list = [{'id': p.id, 'lostproperty_name': p.lostproperty_name, 'status': p.status} for p in properties]
    return jsonify(property_list)

@app.route('/update_lostproperty/<int:id>', methods=['POST'])
def update_lostproperty(id):
    data = request.json
    property = LostProperty.query.get(id)
    if property:
        property.status = data['status']
        db.session.commit()
        return jsonify({'message': 'Lost property status updated successfully'})
    return jsonify({'message': 'Lost property not found'}), 404

@app.route('/add_store', methods=['POST'])
def add_store():
    try:
        data = request.json
        new_store = Store(store_name=data['store_name'])
        db.session.add(new_store)
        db.session.commit()
        return jsonify({'message': 'Store added successfully'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'An error occurred: {str(e)}'}), 500

@app.route('/get_stores', methods=['GET'])
def get_stores():
    stores = Store.query.all()
    store_list = [{'id': s.id, 'store_name': s.store_name} for s in stores]
    return jsonify(store_list)

@app.route('/update_store_evaluation/<int:id>', methods=['POST'])
def update_store_evaluation(id):
    try:
        data = request.json
        store = Store.query.get(id)
        if store:
            store.evaluation = data['evaluation']
            db.session.commit()
            return jsonify({'message': 'Store evaluation updated successfully'})
        return jsonify({'message': 'Store not found'}), 404
    except Exception as e:
        app.logger.error(f'Error updating store evaluation: {e}')
        return jsonify({'message': f'An error occurred: {str(e)}'}), 500

@app.route('/get_store_evaluation', methods=['GET'])
def get_store_evaluation():
    stores = Store.query.all()
    evaluation = [{'store_name': s.store_name, 'status': s.status} for s in stores]
    return jsonify(evaluation)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(port=5001)