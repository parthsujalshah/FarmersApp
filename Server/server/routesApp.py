from server import db, app
from server.models import Farmer, Crop, Buyer, Admin, Scheme, Message
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from functools import wraps
from flask import request, abort, jsonify
import os
import base64
from io import BytesIO
from PIL import Image
import threading
import time
import nexmo

def seed_required(area):
	total_area = area*30000 #sq feet
	seed_for_1_acre = 20*30000/43600  #kg
	seed = area*seed_for_1_acre
	return seed

# def fertilizer_required(area):
	# total_area = area*30000 #sq feet
	# fert_for_1_acre = 200*30000/43600  #kg
	# fertilizer = area*seed_for_1_acre
	# return fertilizer
api_key = ''
api_secret_key = ''
def suggestions():
    client = nexmo.Client(key=api_key, secret=api_secret_key)
    client.send_message({
        'from': 'Nexmo',
        'to': '918920278726',
        'text': 'Inorganic and organic farming suggestions',
    })
    print("while adding name of crop 150-180 kg N, 70-80 kg P2O5, 70-80 kg K2O and 25 kg ZnSO4 per hectare25-30 cartloads of manure")
    print("Organic: Eu ullamco exercitation pariatur ad dolore minim mollit et dolor et quis ullamco in voluptate.")
    time.sleep(5)
    client.send_message({
        'from': 'Nexmo',
        'to': '918920278726',
        'text': 'Pest attack precautions',
    })
    print("chances of pest attack: est alert Thiodan 35 EC @ 27 ml in 18 litres water\nOrganic:Duis amet voluptate sint proident esse commodo labore ut ea excepteur Lorem officia.")
    time.sleep(5)
    client.send_message({
        'from': 'Nexmo',
        'to': '918920278726',
        'text': 'Harvesting reminder',
    })
    print("time for harvesting: You can check out groups if you want resources. Do not burn the leftovers rather than give it to biogas NGO's. You may get manure and electricity in future! ")


def alerts(_farmer, _days):
    # for each day
    for i in range(_days):
        coordiates = _farmer.location.split(',')
        latitude = float(coordiates[0])
        longitude = float(coordiates[1])
        url = f'http://api.openweathermap.org/data/2.5/forecast?id=524901&daily&lat={latitude}&lon={longitude}&cnt=10&appid=60893ea433ccfef4c74713690c452cc5'
        response = requests.get(url).json()
        if i == 2:
            print('irrigation alert')
        for response_day in response['list']:
            if response_day['wind']['speed'] >= 24.5:
                print('Storm alert')
        time.sleep(5)
    print('test for weather')

def save_image(base64_image):
    png_bytes = base64.b64decode(base64_image)
    stream = BytesIO(png_bytes)
    image = Image.open(stream).convert("RGBA")
    picture_fn = 'a.png'
    picture_path = os.path.join(app.root_path, 'static/images', picture_fn)
    image.save(picture_path)
    stream.close()

def encode_image(image):
    with open(image, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read())
    return encoded_string

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return jsonify({'message': 'token is missing'}), 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
            _id = data['farmer_id']
            current_user = Farmer.query.get(_id)
        except:
            return jsonify({'message': 'Token is Invalid!'}), 401
        return f(current_user, *args, **kwargs)
    return decorated

@app.route('/sign_up', methods=['GET', 'POST'])
def sign_up():
    username = request.json.get('name', None)
    phone_number = request.json.get('phone_number', None)
    password = username + phone_number[-4:]
    hashed_password = generate_password_hash(password)
    image_base64 = request.json.get('pan_image_base64', None)
    soil_card_image_base64 = request.json.get('soil_card_image_base64', None)
    location = request.json.get('location', None)
    field_area = request.json.get('field_area', None)
    machinery_owned = request.json.get('machinery', None)
    farmer = Farmer(
        name = username,
        password = hashed_password,
        phone_number = phone_number,
        pan_image_base64 = image_base64,
        soil_card_image_base64 = soil_card_image_base64,
        location = location,
        field_area = field_area,
        machinery_owned = machinery_owned,
    )
    db.session.add(farmer)
    db.session.commit()
    return jsonify({'password': password})

@app.route('/login', methods=['GET', 'POST'])
def login():
    if not request.json.get('name') or not request.json.get('password'):
        return jsonify({'message': 'Could not verify'}), 401
    farmer = Farmer.query.filter_by(name=request.json.get('name')).first()

    if not farmer:
        return jsonify({'message': 'Could not verify'}), 401
    if check_password_hash(farmer.password, request.json.get('password')):
        token = jwt.encode(
            {
                'farmer_id': farmer.id,
                'username': farmer.name,
            },
            app.config['SECRET_KEY']
        )  # Save this in async storage in app
        return jsonify({'token': token.decode('UTF-8')})
    return jsonify({'message': 'Could not verify'}), 401


@app.route('/add_crop', methods=['GET', 'POST'])
@token_required
def add_crop(current_user):
    crop_name = request.json.get('crop_name', None)
    crop = Crop(crop_name=crop_name, owner=current_user)
    seed_required(float(current_user.field_area))
    fertilizer_required(float(current_user.field_area))
    # Timer
    thread = threading.Thread(target=suggestions)
    thread.daemon = True
    thread.start()
    thread = threading.Thread(target=alerts, args=(current_user, days,))
    thread.daemon = True
    thread.start()
    # Timer
    db.session.add(crop)
    db.session.commit()
    return jsonify({'message': 'crop_added'})

@app.route('/show_crops', methods=['GET', 'POST'])
@token_required
def show_crops(current_buyer):
    crop_list = []  
    for crop in Crop.query.all():
        crop_list.append(crop.to_dict())
    return jsonify({'crops_list': crop_list})

@app.route('/logout', methods=['GET', 'POST'])
@token_required
def logout(current_user):
    loggin_out = request.json.get('loggin_out')
    return jsonify({'logged_in': False})


@app.route('/sell', methods=['GET', 'POST'])
@token_required
def sell(current_user):
    added = request.json.get('added', None)
    if added:
        crop_name = request.json.get('crop_name', None)
        price_per_kg = request.json.get('price_per_kg', None)
        selling_crop_kg = request.json.get('selling_crop_kg', None)
        selling_crop_image_base64 = request.json.get('selling_crop_image_base64', None)
        crop = Crop.query.filter_by(crop_name=crop_name)
        crop.price_per_kg = price_per_kg
        crop.selling_crop_kg = selling_crop_kg
        crop.selling_crop_image_base64 = selling_crop_image_base64
        crop.is_selling = True
        db.session.commit()
    else:
        crop_name = request.json.get('crop_name', None)
        price_per_kg = request.json.get('price_per_kg', None)
        selling_crop_kg = request.json.get('selling_crop_kg', None)
        selling_crop_image_base64 = request.json.get('selling_crop_image_base64', None)
        crop = Crop(
            crop_name = crop_name,
            price_per_kg = price_per_kg,
            selling_crop_kg = selling_crop_kg,
            selling_crop_image_base64 = selling_crop_image_base64,
            is_selling = True,
            owner = current_user
        )
        db.session.add(crop)
        db.session.commit()
    return jsonify({'message': 'Added to selling list'})

@app.route('/disease_check', methods=['GET', 'POST'])
@token_required
def disease_check(current_user):
    image_base64 = request.json.get('image', None)
    save_image(image_base64)
    # im1 = Image.open(r"D:\Documents\Projects\AppDevelopment\SIH\Server\server\static\images\a.png")
    # print(disease(im1))
    healthy = False
    return jsonify({'healthy': healthy})

@app.route('/show_schemes', methods=['GET', 'POST'])
@token_required
def show_schemes(current_user):
    schemes_list = []
    schemes = Scheme.query.all()
    for scheme in schemes:
        schemes_list.append(scheme.to_dict())
    return jsonify({'schemes': schemes_list})

@app.route('/show_messages/<group_type>', methods=['GET', 'POST'])
@token_required
def show_messages_machinery(current_user, group_type):
    messages = []
    for message in Message.query.all():
        if message.group_type == group_type:
            is_sender = False
            if message.sender_id == current_user.id:
                is_sender = True
            messages.append({
                'sender': Farmer.query.get(message.sender_id).to_dict(),
                'message': message.message,
                'is_sender': is_sender
            })
    return jsonify({'message_list': messages})

@app.route('/add_message', methods=['GET', 'POST'])
@token_required
def add_message(current_user):
    message = request.json.get('message')
    group_type = request.json.get('group_type')
    new_message = Message(
        message = message,
        message_sender = current_user,
        group_type = group_type
    )
    new_message.message_sender = current_user
    db.session.add(new_message)
    db.session.commit()
    return jsonify({'message': 'message added'})

def token_buyer_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return jsonify({'message': 'token is missing'}), 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
            _id = data['buyer_id']
            current_buyer = Buyer.query.get(_id)
        except:
            return jsonify({'message': 'Token is Invalid!'}), 401
        return f(current_buyer, *args, **kwargs)
    return decorated

@app.route('/buyer_login', methods=['GET', 'POST'])
def buyer_login():
    if not request.json.get('username') or not request.json.get('password'):
        return jsonify({'message': 'Could not verify 1st'}), 401
    buyer = Buyer.query.filter_by(username=request.json.get('username')).first()
    if not buyer:
        return jsonify({'message': 'Could not verify 2nd'}), 401
    if check_password_hash(buyer.password, request.json.get('password')):
        token = jwt.encode(
            {
                'buyer_id': buyer.id,
                'username': buyer.username,
            },
            app.config['SECRET_KEY']
        )  # Save this in async storage in app
        return jsonify({'token': token.decode('UTF-8')})
    return jsonify({'message': 'Could not verify 3rd'}), 401

@app.route('/buyer_home', methods=['GET', 'POST'])
@token_buyer_required
def buyer_home(current_buyer):
    crops_array = []
    for farmer in Farmer.query.all():
        if farmer.to_dict_for_selling:
            crops_array.append(farmer.to_dict_for_selling())
    return jsonify({'crops_for_sale': crops_array})

@app.route('/logout_buyer', methods=['GET', 'POST'])
@token_buyer_required
def logout_buyer(current_buyer):
    loggin_out = request.json.get('loggin_out')
    return jsonify({'logged_in': False})