from crypt import methods
from distutils.log import debug
from types import new_class
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///classes.db'
db = SQLAlchemy(app)
migrate = Migrate(app, db)
#--------------------------モデル作成------------------------------------------------------------
class Class(db.Model):
    __tablename__ = 'lostproperty'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    lostproperty_name = db.Column(db.String(50), nullable=False)  # 落とし物の名前(？)
    status = db.Column(db.String(10), nullable=True)  # 受け取り状況

class Evaluation(db.Model):
    __tablename__ = 'evaluations'
    id = db.Column(db.Integer, primary_key=True)
    class_id = db.Column(db.Integer, db.ForeignKey('lostproperty.id'), nullable=False)
    evaluation = db.Column(db.String, nullable=False)
#--------------------------------------------------------------------------------------
#基本クラス生成
@app.route('/add_evaluation',methods=['POST'])
    data = request.json
    new_class = Class(name = data['name'],lostproperty = data['lostproperty'],valuations = ['evaluations'])
    



@app.route('/add_evaluation',methods=['POST'])
    def add_evaluation():
    data = request.json
    new_evaluation = Evaluation(class_id=data ['lostproperty'],evaluation=data['evaluation'])
    db.session.add(new_evaluation)
    db.session.commit()
    return jsonify({'message': 'Evaluation added'})

if __name__ == '__main__':
    with app.app.context():
        db.create_all()
    app.run(debug=True)