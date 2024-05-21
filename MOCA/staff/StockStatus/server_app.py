from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///classes.db'
db = SQLAlchemy(app)
migrate = Migrate(app, db)

class Class(db.Model):
    __tablename__ = 'classes'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    store_name = db.Column(db.String(50), nullable=False)  # 店名
    stock_status = db.Column(db.String(10), nullable=True)  # 在庫状況

class Evaluation(db.Model):
    __tablename__ = 'evaluations'
    id = db.Column(db.Integer, primary_key=True)
    class_id = db.Column(db.Integer, db.ForeignKey('classes.id'), nullable=False)
    evaluation = db.Column(db.String, nullable=False)

@app.route('/add_class', methods=['POST'])
def add_class():
    data = request.json
    new_class = Class(name=data['name'], store_name=data['store_name'], stock_status=data.get('stock_status', ''))
    db.session.add(new_class)
    db.session.commit()
    return jsonify({'message': 'Class added'})

@app.route('/get_classes', methods=['GET'])
def get_classes():
    classes = Class.query.all()
    result = [
        {"id": class_.id, "name": class_.name, "store_name": class_.store_name, "stock_status": class_.stock_status}
        for class_ in classes
    ]
    return jsonify(result)

@app.route('/add_evaluation', methods=['POST'])
def add_evaluation():
    data = request.json
    new_evaluation = Evaluation(class_id=data['class_id'], evaluation=data['evaluation'])
    db.session.add(new_evaluation)
    db.session.commit()
    return jsonify({'message': 'Evaluation added'})

@app.route('/get_evaluations', methods=['GET'])
def get_evaluations():
    evaluations = Evaluation.query.all()
    result = [
        {"class_id": evaluation.class_id, "evaluation": evaluation.evaluation}
        for evaluation in evaluations
    ]
    return jsonify(result)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
