import os
from flask import Flask, render_template, request
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html', title="MLH Fellows", url=os.getenv("URL"))

@app.route('/MatthewChang')
def mc():
    return render_template('mc.html', title="Matthew Chang", url=os.getenv("URL"))

@app.route('/VuongHo')
def vh():
    return render_template('vh.html', title="Vuong Ho", url=os.getenv("URL"))

@app.route('/Hobbies')
def hobbies():
    return render_template('hobbies.html', title="Hobbies", url=os.getenv("URL"))
