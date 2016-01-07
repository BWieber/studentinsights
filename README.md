# Student Insights

[![Build Status](https://travis-ci.org/codeforamerica/somerville-teacher-tool.svg?branch=master)](https://travis-ci.org/codeforamerica/somerville-teacher-tool) [![Code Climate](https://codeclimate.com/github/codeforamerica/somerville-teacher-tool/badges/gpa.svg)](https://codeclimate.com/github/codeforamerica/somerville-teacher-tool)

Student Insights enables educators to see at-risk students and match them to the help they need.

- [Installation](#installation)
- [Demo data](#demo-data)
- [Real data](#real-data)
- [Tests](#tests)
- [Deployment](#deployment)
    - [Heroku](#heroku)
    - [AWS](#aws)
    - [Your own server](#your-own-server)
- [Design](#design)
- [More](#more)

# Installation

This is a Ruby on Rails app and uses a PostgreSQL database.

Choose your favorite local development approach:

* [Local development with Docker](docs/local_development_with_docker.md)
* [Local installation on OSX and Debian](docs/local_installation_notes.md)

# Demo data

```
rake db:seed:demo
```

This will create demo students with fake student information. The demo educator username is `demo@example.com` and the demo password is `demo-password`.

Once you've created the data, start a local server by running `rails s` from the root of your project. When the local server is up and running, visit http://localhost:3000/ and log in with your demo login information. You should see the roster view for your data.

# Real data

If you're working with a real school district, you'll need flat files of the data you want to import.

Run an import task:

```
thor import:start
```

Use the `--district` flag to indicate your school district or charter organization. File formats and storage are configured in `app/importers/settings/settings.rb`.

So far, Student Insights can import CSV and JSON and can fetch data from AWS and SFTP. To import a new flat file type, write a new data transformer: `app/importers/data_transformers`. To import from a new storage location, write a new client: `app/importers/clients`.

# Tests
This app uses [Rspec](https://www.relishapp.com/rspec/rspec-rails/v/3-2/docs). Run the test suite:

```
rspec
```

It uses [Jasmine](http://jasmine.github.io/) for JavaScript tests, run through the [Teaspoon](https://github.com/modeset/teaspoon) gem.

You can run them in the browser at `http://localhost:3000/teaspoon/default`.

You can also run them from the command line:

```
teaspoon
```

# Deployment

### Heroku

We deployed this app on Heroku and you can, too. Set config variables for DEVISE_SECRET_KEY and SECRET_KEY_BASE in `local_env.yml` before deploying.

### AWS

Deploy on an AWS EC2 instance:

```
/scripts/aws/
```

Scripts by the fantastic [Kevin Robinson](https://github.com/kevinrobinson).

### Your own server

Deploy on your own Ubuntu server (not AWS's or Heroku's):

https://github.com/codeforamerica/promptly-deploy-scripts/tree/somerville-v1

# Design
For a history of all design iterations look here:
https://www.dropbox.com/sh/r71hh9azun8v6as/AABtBghkPI4XUJBZjNpMmRdba?dl=0

# More

- __[Student Insights Demo](https://somerville-teacher-tool-demo.herokuapp.com/)__
    - username: `demo@example.com`
    - password: `demo-password`
- __[Team Somerville Mid-Year Report](http://codeforamerica.github.io/somerville-story/)__
