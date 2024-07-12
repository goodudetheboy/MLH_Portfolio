#!/bin/bash

# Change dir in to MLH Portfolio and fetch branch
cd ~/MLH_Portfolio
git fetch && git reset origin/main --hard

# Activate virtual env and pip install requirements
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Start and enable myportfolio if no service is enabled yet
systemctl start myportfolio
systemctl enable myportfolio

# Reload and restart service
systemctl daemon-reload
systemctl restart myportfolio

