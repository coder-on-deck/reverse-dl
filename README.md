Reverse DL
=============

Stop sending emails to DL. Start publishing feeds and lets people register to them.

This project aims to make publishing a feed very easy with multiple sources support

 - Rest API
 - Email (not supported yet)

# How to Use

## Install

simply download and run `npm start`

## Publish new feed

post:

`/feed/:feedId/config`

see https://github.com/dylang/node-rss#feedoptions  for all options

## Add item to feed

post:

`/feed/:feedId`

see https://github.com/dylang/node-rss#itemoptions for all options

## Get feed

get:

`/feed/:feedId`

Currently this produces a valid RSS feed

# Roadmap


 - ~Publish feed support~
 - ~Add Items to feed support~
 - Add persistency
 - Add email support
 - Add pubsubhubbub support
