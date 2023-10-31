
# models/assetallocation.py
from models.dbconfig import db

class AssetAllocation(db.Model):
    __tablename__ = 'asset_allocations'

    id = db.Column(db.Integer, primary_key=True)
    asset_id = db.Column(db.Integer, db.ForeignKey('assets.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Corrected to lowercase 'false'
    allocation_date = db.Column(db.DateTime)
    deallocation_date = db.Column(db.DateTime)  # Added deallocation_date column

    # Define the many-to-one relationships
    asset = db.relationship('Asset', backref='asset_allocations')
    user = db.relationship('User', backref='asset_allocations')

    # Rest of the AssetAllocation model definition...
