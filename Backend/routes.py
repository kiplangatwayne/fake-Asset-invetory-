 

from flask import Flask, request, jsonify
from flask_cors import CORS
from models.dbconfig import db
from config import SQLAlchemyConfig
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta
import jwt

from models.dbconfig import db
from config import CloudinaryConfig, SQLAlchemyConfig  # Correct import
from models.asset import Asset
from models.assetallocation import AssetAllocation
from models.assetrequest import AssetRequest
from models. PasswordResetToken import PasswordResetToken
from models.user import User

def create_app():
    app = Flask(__name__)
    app.secret_key = 'ucxAh7RmDwLoNsbmJpQARngrp24'
    CORS(app)
    app.config['SQLALCHEMY_DATABASE_URI'] = SQLAlchemyConfig.SQLALCHEMY_DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = SQLAlchemyConfig.SQLALCHEMY_TRACK_MODIFICATIONS
    db.init_app(app)
    bcrypt = Bcrypt(app)
    jwt_manager = JWTManager(app)

    # Register User Route
    @app.route('/register', methods=['POST'])
    def register():
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        role = data.get('role')
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            return jsonify({'message': 'Username already exists. Please choose another username.'}), 400

        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        new_user = User(username=username, password=hashed_password, email=email, role=role)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User registered successfully'}), 201

    # User Login Route
    @app.route('/login', methods=['POST'])
    def login():
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        user = User.query.filter_by(username=username).first()

        if user and bcrypt.check_password_hash(user.password, password):
            # Generate the JWT token with a 1-hour expiration time
            expiration_time = timedelta(days=3)
            access_token = create_access_token(identity={'user_id': user.id, 'role': user.role}, expires_delta=expiration_time)
            return jsonify({'message': 'Login successful', 'access_token': access_token}), 200
        else:
            return jsonify({'message': 'Invalid username or password'}), 401

    # Helper function to decode the token
    def decode_token(token):
        try:
            payload = jwt.decode(token, 'ucxAh7RmDwLoNsbmJpQARngrp24', algorithms=['HS256'])
            return payload
        except jwt.ExpiredSignatureError:
            return 'Token has expired. Please log in again.'
        except jwt.InvalidTokenError:
            return 'Invalid token. Please log in again.'
        
# give the right to add, update, or remove data only to the right people based on their classification.( update and remove not yet implemented )
    @app.route('/add_data', methods=['POST'])
    @jwt_required()
    def add_data():
        current_user = get_jwt_identity()
        user_role = current_user.get('role')
        if user_role in ['Admin', 'Procurement Manager']:
            data = request.get_json()
            if 'asset_name' not in data or 'description' not in data:
                return jsonify({'message': 'Asset name and description are required fields.'}), 400
                
                data_entry = {
                    'asset_name': data['asset_name'],
                    'description': data['description']
                    }
                
                return jsonify({'message': 'Data added successfully'}), 201
            else:
                
                return jsonify({'message': 'Unauthorized. Only Admins and Procurement Managers can add data.'}), 403
            
  
     # Manager updates asset data

    @app.route('/update_data/<int:data_id>', methods=['PUT'])
    @jwt_required()
    def update_data(data_id):
        current_user = get_jwt_identity()
        if current_user.get('role') not in ['Admin', 'Procurement Manager']:
            return jsonify({'message': 'Unauthorized. Only Admins and Procurement Managers can update data.'}), 403
        data = request.get_json()
        if 'asset_name' not in data or 'description' not in data:
            return jsonify({'message': 'Asset name and description are required fields.'}), 400
        data_entry = {
            'asset_name': data['asset_name'],
            'description': data['description']
            }
        
        return jsonify({'message': 'Asset data updated successfully'}), 200

    
    
    # Manager Remove data 
    @app.route('/remove_data/<int:data_id>', methods=['DELETE'])
    @jwt_required()
    def remove_data(data_id):
        current_user = get_jwt_identity()
        if current_user.get('role') not in ['Admin', 'Procurement Manager']:
            return jsonify({'message': 'Unauthorized. Only Admins and Procurement Managers can remove data.'}), 403
        # Remove data from the central location (replace this with your database logic)
        # # For example: data = DataModel.query.get(data_id)
        # # db.session.delete(data)
        # # db.session.commit()
        # 
        return jsonify({'message': 'Data removed successfully'}), 200



    # MVP Classify users on whether they are Admin, procurement managers, or normal employees.

    @app.route('/classify', methods=['GET'])
    @jwt_required()
    def classify_user():
        current_user = get_jwt_identity()
        user_role = current_user.get("role")

        classification = "Unknown"
        if user_role == "Admin":
            classification = "Admin User"
        elif user_role == "Procurement Manager":
            classification = "Procurement Manager"
        elif user_role == "Normal Employee":
            classification = "Normal Employee"

        return jsonify({"message": "Success", "classification": classification}), 200
    
 # MVP: Procurement Manager Reviews and Approves a Request
    
    @app.route('/approve_request/<int:request_id>', methods=['PUT'])
    @jwt_required()
    def approve_request(request_id):
        current_user = get_jwt_identity()
        if current_user.get('role') != 'Procurement Manager':
            return jsonify({'message': 'Unauthorized. Only Procurement Managers can approve requests.'}), 403
        asset_request = AssetRequest.query.get(request_id)
        if not asset_request:
            return jsonify({'message': 'Asset request not found'}), 404
        asset_request.approved = True
        db.session.commit()
        
        return jsonify({'message': 'Asset request approved successfully'}), 200
    
    # Manager views pending requests with their urgency
    @app.route('/manager_pending_requests', methods=['GET'])
    @jwt_required()
    def manager_pending_requests():
        current_user = get_jwt_identity()
        if current_user.get('role') != 'Procurement Manager':
            return jsonify({'message': 'Unauthorized. Only Procurement Managers can view pending requests.'}), 403
        pending_requests = AssetRequest.query.filter_by(approved=False).all()
        requests_list = []
        for request in pending_requests:
            requests_list.append({
                'id': request.id,
                'reason': request.reason,
                'quantity': request.quantity,
                'urgency': request.urgency
            })
        return jsonify({'pending_requests': requests_list}), 200
    
# MVP: Manager Views Completed Requests

    @app.route('/manager_completed_requests', methods=['GET'])
    @jwt_required()
    def manager_completed_requests():
        current_user = get_jwt_identity()
        if current_user.get('role') != 'Procurement Manager':
            return jsonify({'message': 'Unauthorized. Only Procurement Managers can view completed requests.'}), 403
        completed_requests = AssetRequest.query.filter_by(approved=True).all()
        requests_list = []
        for request in completed_requests:
            requests_list.append({
                'id': request.id,
                'reason': request.reason,
                'quantity': request.quantity,
                'urgency': request.urgency
            })
        return jsonify({'completed_requests': requests_list}), 200
    
    # MVP: Manager Adds Assets (Procurement Manager)

    @app.route('/add_asset', methods=['POST'])
    @jwt_required()
    def add_asset():
        current_user = get_jwt_identity()
        if current_user.get('role') != 'Procurement Manager':
            return jsonify({'message': 'Unauthorized. Only Procurement Managers can add assets.'}), 403
        data = request.get_json()
        name = data.get('name')
        category = data.get('category')
        status = data.get('status')
        image_url = data.get('image_url')
        new_asset = Asset(name=name, category=category, status=status, image_url=image_url)
        db.session.add(new_asset)
        db.session.commit()
        return jsonify({'message': 'Asset added successfully'}), 201
    

    # MVP: Manager Allocates Asset to an Employee (Procurement Manager
    @app.route('/allocate_asset/<int:asset_id>', methods=['POST'])
    @jwt_required()
    def allocate_asset(asset_id):
        current_user = get_jwt_identity()
        if current_user.get('role') != 'Procurement Manager':
            return jsonify({'message': 'Unauthorized. Only Procurement Managers can allocate assets.'}), 403
        data = request.get_json()
        employee_name = data.get('Normal_Employee_name')  
        user = User.query.filter_by(username=employee_name).first()  
        if not user:
            return jsonify({'message': 'Normal Employee not found'}), 404
        asset = Asset.query.get(asset_id)
        if not asset:
            return jsonify({'message': 'Asset not found'}), 404
        asset_allocation = AssetAllocation(asset_id=asset_id, user_id=user.id)
        db.session.add(asset_allocation)
        db.session.commit() 
        
        return jsonify({'message': 'Asset allocated to employee successfully'}), 201
    
    
    
    @app.route('/request_asset/<int:asset_id>', methods=['POST'])
    @jwt_required()
    def request_asset(asset_id):
        current_user = get_jwt_identity()
        if current_user.get('role') != 'Normal Employee':
            return jsonify({'message': 'Unauthorized. Only Normal Employee can request assets.'}), 403
        data = request.get_json()
        reason = data.get('reason')
        quantity = data.get('quantity')
        urgency = data.get('urgency')
        
        user = User.query.filter_by(username=current_user.get('username')).first()
        if not user:
            return jsonify({'message': 'User not found'}), 404
        asset = Asset.query.get(asset_id)
        if not asset:
            return jsonify({'message': 'Asset not found'}), 404
        
        asset_request = AssetRequest(asset_id=asset.id, requester_id=user.id, reason=reason, quantity=quantity, urgency=urgency)
        db.session.add(asset_request)
        db.session.commit()
        
        return jsonify({'message': 'Asset request submitted successfully', 'asset_request_id': asset_request.id}), 200
    
    @app.route('/user_requests', methods=['GET'])
    @jwt_required()
    def user_requests():
        current_user = get_jwt_identity()
        requester_id = current_user.get('id')
        active_requests = AssetRequest.query.filter_by(requester_id=requester_id, approved=False).all()
        completed_requests = AssetRequest.query.filter_by(requester_id=requester_id, approved=True).all()
        
        active_requests_list = [{
            'id': request.id,
            'reason': request.reason,
            'quantity': request.quantity,
            'urgency': request.urgency
        } for request in active_requests]
        
        completed_requests_list = [{
            'id': request.id,
            'reason': request.reason,
            'quantity': request.quantity,
            'urgency': request.urgency
        } for request in completed_requests]
        
        return jsonify({'active_requests': active_requests_list, 'completed_requests': completed_requests_list}), 200

    return app


    