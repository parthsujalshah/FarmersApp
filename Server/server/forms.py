from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField, ValidationError, TextAreaField, SelectField
from flask_wtf.file import FileField, FileAllowed
from wtforms.validators import DataRequired, Length, Email, EqualTo

class RegistrationForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    designation = StringField('Designation', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    confirm_password = PasswordField('Confirm Password', validators=[DataRequired(), EqualTo('password')])
    gov_id = FileField('Government ID', validators=[FileAllowed(['jpg', 'png'])])
    submit = SubmitField('Sign Up')

class LoginForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember = BooleanField('Remember Me')
    submit = SubmitField('Login')


class SchemeForm(FlaskForm):
    name = StringField('Scheme Name', validators=[DataRequired()])
    details = TextAreaField('Scheme Details', validators=[DataRequired()])
    submit = SubmitField('Add Scheme')

class AlertForm(FlaskForm):
    subject = StringField('Subject', validators=[DataRequired()])
    details = TextAreaField('Scheme Details', validators=[DataRequired()])
    specifics = TextAreaField('Specifics')
    severity = SelectField(
        'Severity',
        choices = [('High', 'High'), ('Moderate', 'Moderate'), ('Low', 'Low')]
    )
    submit = SubmitField('Alert Farmers')

class BuyerRegistrationForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    confirm_password = PasswordField('Confirm Password', validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Register')
