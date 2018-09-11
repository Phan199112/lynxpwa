# Introduction

The lynx system contains a landing page that's open to all.

(a) Landing Page => 'www'
(b) Registration => 'app'
(c) Sign-in / Sign-out => 'app'


Use Cases

0. Landing Page
	* Bootstrap

1. User Registration

* Register with e-mail address
* Sign-in - taken to dashboard (Table View)
* Profile Information
* Lynx Payment & Subscription Options

2. Dashboard Table View

* List of referrals for default DB
* Drop Down option to select DB for Users 
* Button to Add a New Referral

3. Menu

* Profile
* Dashboard
	* Table
	* Analytics (Comming Soon)
* Management
	* Database
		* Create New Database
		* Add Variables
	* Quotas





# API Endpoints
did = database id
rid = referral id
uid = user id


endpoints:
  GET - https://api.lynx.mobi/ref/{did}/{rid}
  POST - https://api.lynx.mobi/ref/{did}
  GET - https://api.lynx.mobi/ref/{did}
  GET - https://api.lynx.mobi/db/{usr}
  POST - https://api.lynx.mobi/db/{usr}
  GET - https://api.lynx.mobi/user/{usr}
  PUT - https://api.lynx.mobi/user/{usr}
  POST - https://api.lynx.mobi/user/{usr}

