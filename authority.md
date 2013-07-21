---
layout: default
title: authority
---

## Services and Revisions

Configuration of services is stored in Revisions. Each time you change the
configuration, a new revision is created. That way you can always go back if
you make a mistake or deploy a buggy version.

Each Revision specifies which slug to use, the command to execute and the
environment. In a typical Ruby on Rails app, the command to execute the web
server would be <code>bundle exec rails server</code>. In the environment
you'd set <code>RAILS_ENV</code> to <code>production</code> and include other
environment variables necessary in your app.

## Deployments

When a supervisor contacts the authority, it sends along its hostname.  The
supervisor therefore has a list of all servers which are ready to run your
services. All you have to do is tell scrz on which servers the service should
be deployed.
