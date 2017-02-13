#! /bin/sh
#
# bitbucket.api.sh
# Copyright (C) 2017 jkirchartz <me@jkirchartz.com>
#
# Distributed under terms of the NPL (Necessary Public License) license.
#
# Storing a few curl/python doodads to poke the bitbucket API



curl -s -k --user <username> https://api.bitbucket.org/2.0/repositories/<team name> | python -m json.tool
curl -s -k --user <username> https://api.bitbucket.org/2.0/repositories/<team name> | python -m json.tool > fc.repos
curl -s -k --user <username> https://api.bitbucket.org/2.0/repositories/<team name> | python -c 'import sys, json; r = json.loads(sys.stdin.read());[sys.stdout.write(d["links"]["clone"][0]["href"]+"\n") for d in r["values"]]'
curl -s -k --user <username> https://api.bitbucket.org/2.0/teams/<team name> | python -m json.tool > fc.teams
curl -s -k --user <username> https://api.bitbucket.org/2.0/teams/<team name>/repositories | python -m json.tool > fc.teamrepos
curl -s -k --user <username> https://api.bitbucket.org/2.0/teams/<team name>/members | python -m json.tool
curl -s -k --user <username> https://api.bitbucket.org/2.0/teams/<team name>/repositories | python -m json.tool
