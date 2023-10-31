from models.dbconfig import db

class Asset(db.Model):
    __tablename__ = 'assets'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)  
    description = db.Column(db.String(25), nullable=True)  
    category = db.Column(db.String(50))
    image_url = db.Column(db.String(200))
    status = db.Column(db.String(20))  

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', backref='assets') 

    # Define the one-to-many relationship between Asset and AssetRequest
    asset_requests = db.relationship('AssetRequest', backref='asset', lazy=True)
