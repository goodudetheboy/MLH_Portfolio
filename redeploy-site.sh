#!/bin/bash

pkill -f tmux

cd ~/MLH_Portfolio

python -m venv venv

source venv/bin/activate

pip install -r requirements.txt

tmux new-session -d -s mlh_portfolio
tmux send-keys 'flask run --host=0.0.0.0' C-m
tmux detach -s mlh_portfolio

