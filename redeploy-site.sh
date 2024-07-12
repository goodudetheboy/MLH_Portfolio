#!/bin/bash


cd ~/MLH_Portfolio

git fetch && git reset origin/main --hard

python -m venv venv

source venv/bin/activate

pip install -r requirements.txt

systemctl start myportfolio
systemctl enable myportfolio

systemctl daemon-reload
systemctl restart myportfolio

