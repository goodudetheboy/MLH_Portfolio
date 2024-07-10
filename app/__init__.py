import os
from flask import Flask, render_template, request
from dotenv import load_dotenv
from peewee import *
import datetime
from playhouse.shortcuts import model_to_dict

load_dotenv(".env")
app = Flask(__name__)
mydb = MySQLDatabase(os.getenv("MYSQL_DATABASE"),
					user=os.getenv("MYSQL_USER"),
					password=os.getenv("MYSQL_PASSWORD"),
					host=os.getenv("MYSQL_HOST"),
					port=3306,)

class TimelinePost(Model):
	name = CharField()
	email = CharField()
	content = TextField()
	created_at = DateTimeField(default=datetime.datetime.now)
	
	class Meta:
		 database = mydb

mydb.connect()
mydb.create_tables([TimelinePost])

@app.route("/")
def index():
	return render_template("index.html", title="MLH Fellows", url=os.getenv("URL"))

@app.route("/MatthewChang")
def mc():
	return render_template("mc.html", title="Matthew Chang", url=os.getenv("URL"))

@app.route("/VuongHo")
def vh():
	return render_template("vh.html", title="Vuong Ho", url=os.getenv("URL"))

@app.route("/Hobbies")
def hobbies():
	return render_template("hobbies.html", title="Hobbies", url=os.getenv("URL"))

@app.route("/timeline")
def timeline():
	return render_template('timeline.html', title="Vuong's Timeline", url=os.getenv("URL"))

@app.route("/api/timeline_post", methods=["post"])
def post_time_line_post():
	name = request.form['name']
	email = request.form['email']
	content = request.form['content']
	timeline_post = TimelinePost.create(name=name, email=email, content=content)

	return model_to_dict(timeline_post)

@app.route("/api/timeline_post", methods=["GET"])
def get_time_line_post():
	return {
		"timeline_posts": [
			model_to_dict(p)
			for p in
			TimelinePost.select().order_by(TimelinePost.created_at.desc())
		]
	}

@app.route("/api/timeline_post", methods=["DELETE"])
def delete_time_line_post():
	id_to_del = request.form.get("index")

	TimelinePost.delete_by_id(id_to_del)

	return {"msg": "Delete successfull" }
