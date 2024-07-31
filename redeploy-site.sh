#!/bin/bash

# Change dir in to MLH Portfolio and fetch branch
cd ~/MLH_Portfolio

# Take down currently running containers
docker compose -f docker-compose.prod.yml down

# Push new containers up
docker compose -f docker-compose.prod.yml up -d --build

