from server import db, app, login_manager
from flask_login import UserMixin


@login_manager.user_loader
def load_admin(admin_id):
    return Admin.query.get(int(admin_id))

class Farmer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    phone_number = db.Column(db.String(60), unique=True, nullable=False)
    pan_image_base64 = db.Column(db.Text)
    soil_card_image_base64 = db.Column(db.Text)
    field_area = db.Column(db.String(20))
    location = db.Column(db.String(20))
    machinery_owned = db.Column(db.String(60))
    crops = db.relationship('Crop', backref='owner', lazy=True)
    messages = db.relationship('Message', backref='message_sender', lazy=True)

    def to_dict_for_selling(self):
        crops_for_sale= []
        for crop in self.crops:
            if crop.is_selling:
                crops_for_sale.append(crop.to_dict())
        if crops_for_sale != []:
            return {
                'id': self.id,
                'name': self.name,
                'phone_number': self.phone_number,
                'crops_for_sale': crops_for_sale
            }
        else:
            return None

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'phone_number': self.phone_number,
            'machinery_owned': self.machinery_owned
        }

    def __repr__(self):
        return f"Farmer('{self.name}', '{self.phone_number}, '{self.machinery_owned}')"


class Crop(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    crop_name = db.Column(db.String(120), nullable=False)
    selling_crop_kg = db.Column(db.String(120))
    selling_crop_image_base64 = db.Column(db.Text)
    price_per_kg = db.Column(db.String(60))
    is_selling = db.Column(db.Boolean, default=False)
    soil_card_image_base64 = db.Column(db.Text)
    sown = db.Column(db.Boolean, default=False)
    harvested = db.Column(db.Boolean, default=False)
    farmer_id = db.Column(db.Integer, db.ForeignKey('farmer.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'crop_name': self.crop_name,
            'selling_crop_kg': self.selling_crop_kg,
            'price_per_kg': self.price_per_kg,
            'selling_crop_image_base64': self.selling_crop_image_base64
        }

    def __repr__(self):
        return f"Crop('{self.crop_name}', {self.farmer_id}, '{self.is_selling}')"


class Buyer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(60), nullable=False)

    def __repr__(self):
        return f"Buyer('{self.username}', '{self.email}')"


class Admin(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(60), nullable=False)
    email = db.Column(db.String(20), nullable=False)
    gov_id = db.Column(db.String(120))
    designation = db.Column(db.String(20), nullable=False)

    def __repr__(self):
        return f"Admin('{self.name}', '{self.email}', {self.designation})"


class Scheme(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    details = db.Column(db.Text)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'details': self.details
        }

    def __repr__(self):
        return f"Scheme('{self.name}')"

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('farmer.id'), nullable=False)
    group_type = db.Column(db.String(60))
    message = db.Column(db.Text)

    def to_dict(self):
        return {
            'id': self.id,
            'sender_id': self.sender_id,
            'group_type': self.group_type,
            'message': self.message
        }

    def __repr__(self):
        return f"Message('{self.sender_id}')"