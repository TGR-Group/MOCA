from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///classes.db'
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
    data = request.json
    new_store = Store(store_name=data['store_name'])
    db.session.add(new_store)
    db.session.commit()
    return jsonify({'message': 'Store added successfully'})

@app.route('/get_stores', methods=['GET'])
def get_stores():
    stores = Store.query.all()
    store_list = [{'id': s.id, 'store_name': s.store_name} for s in stores]
    return jsonify(store_list)

@app.route('/update_store_evaluation/<int:id>', methods=['POST'])
def update_store_evaluation(id):
    data = request.json
    store = Store.query.get(id)
    if store:
        print(f'Store ID: {id}, Evaluation: {data["evaluation"]}')
        return jsonify({'message': 'Store evaluation updated successfully'})
    return jsonify({'message': 'Store not found'}), 404

#ユーザーステータス
@app.route('/get_user_status', methods=['GET'])
def get_user_status():
    lost_properties = LostProperty.query.all()
    stores = Store.query.all()

    lost_property_list = [{'id': p.id, 'lostproperty_name': p.lostproperty_name, 'status': p.status} for p in lost_properties]
    store_list = [{'id': s.id, 'store_name': s.store_name} for s in stores]

    user_status = {
        'lost_properties': lost_property_list,
        'stores': store_list
    }

    return jsonify(user_status)


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5001)
