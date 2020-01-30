import os
import secrets
from PIL import Image
from server import db, app, bcrypt
from server.models import Farmer, Crop, Buyer, Admin, Scheme
from server.forms import RegistrationForm, LoginForm, SchemeForm, AlertForm, BuyerRegistrationForm
from flask import render_template, url_for, flash, redirect, request, abort
from flask_login import login_user, current_user, logout_user, login_required
from server.static.ml import hello # importing module
from werkzeug.security import generate_password_hash, check_password_hash

hello.hi(1) # calling function from module



def save_picture(form_picture):
    random_hex = secrets.token_hex(8)
    _, f_ext = os.path.splitext(form_picture.filename)
    picture_fn = random_hex + f_ext
    picture_path = os.path.join(app.root_path, 'static/images/gov_id', picture_fn)
    output_size = (125, 125)
    i = Image.open(form_picture)
    i.thumbnail(output_size)
    i.save(picture_path)
    return picture_fn

@app.route('/', methods=['GET', 'POST'])
def home():
    schemes = Scheme.query.all()
    return render_template('Home.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    form = RegistrationForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        admin = Admin(
            name = form.name.data,
            email = form.email.data,
            designation = form.designation.data,
            password = hashed_password,
            gov_id = save_picture(form.gov_id.data)
        )
        db.session.add(admin)
        db.session.commit()
    return render_template('Register2.html', form=form)

@app.route('/log_in', methods=['GET', 'POST'])
def log_in():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    form = LoginForm()
    if form.validate_on_submit():
        admin = Admin.query.filter_by(name=form.name.data).first()
        if admin and bcrypt.check_password_hash(admin.password, form.password.data):
            login_user(admin, remember=form.remember.data)
            return render_template('Home.html', form=form)
    return render_template('Login2.html', form=form)

@app.route('/schemes_test', methods=['GET', 'POST'])
@login_required
def schemes_test():
    all_schemes = Scheme.query.all()
    return render_template('FarmerFriend2.html', schemes=all_schemes)

@app.route('/delete_scheme/<int:scheme_id>', methods=['GET', 'POST'])
@login_required
def delete_scheme(scheme_id):
    scheme = Scheme.query.get(scheme_id)
    db.session.delete(scheme)
    db.session.commit()
    return redirect(url_for('schemes_test'))

@app.route('/alerts', methods=['GET', 'POST'])
@login_required
def alerts():
    form = AlertForm()
    if form.validate_on_submit():
        client = nexmo.Client(key='4413e417', secret='Q4Yup5osNfciHr83')
        client.send_message({
            'from': 'Nexmo',
            'to': '918920278726',
            'text': 'Alert',
        })
    return render_template('Alert.html', form=form)

@app.route('/add_scheme', methods=['GET', 'POST'])
@login_required
def add_scheme():
    form = SchemeForm()
    if form.validate_on_submit():
        scheme = Scheme(
            name = form.name.data,
            details = form.details.data
        )
        db.session.add(scheme)
        db.session.commit()
        return redirect(url_for('schemes_test'))
    return render_template('AddScheme.html', form=form)

@app.route('/log_out')
def log_out():
    logout_user()
    return redirect(url_for('home'))

@app.route('/register_buyer', methods=['GET', 'POST'])
@login_required
def register_buyer():
    form = BuyerRegistrationForm()
    if form.validate_on_submit():
        hashed_password = generate_password_hash(form.password.data)
        buyer = Buyer(
            username = form.username.data,
            email = form.email.data,
            password = hashed_password
        )
        db.session.add(buyer)
        db.session.commit()
    return render_template('Buyer.html', form=form)