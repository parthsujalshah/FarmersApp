from flask import Flask, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager

app  = Flask(__name__)
app.config['SECRET_KEY'] = 'f0ede16f635dfdc68bb71dfeee0e59'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SMS_KEY'] = '' # Parth
app.config['SECRET_SMS_KEY'] = '' # Parth

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'log_in'

from server import routesApp, routesWeb