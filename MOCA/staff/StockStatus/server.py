from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/classes_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # SQLAlchemyの警告を抑制

db = SQLAlchemy(app)

class Class(db.Model):
    __tablename__ = 'classes'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    store_name = db.Column(db.String(50), nullable=False)
    stock_status = db.Column(db.String(10), nullable=False)

@app.route('/add_class', methods=['POST'])
def add_class():
    data = request.json
    new_class = Class(name=data['name'], store_name=data['store_name'], stock_status=data['stock_status'])
    db.session.add(new_class)
    db.session.commit()
    return jsonify({'message': 'Class added'})

@app.route('/get_classes', methods=['GET'])
def get_classes():
    classes = Class.query.all()
    result = [
        {"name": class_.name, "store_name": class_.store_name, "stock_status": class_.stock_status}
        for class_ in classes
    ]
    return jsonify(result)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
