---
layout: default
title: authority
---

# Authority

The authority is a central database which stores configuration of all
supervisors.

## Database schema

Here is the database schema, it may help you understanding the structure of
the various entities that the authority manages.

<div class="image-container">
    <a href="/images/scrz-authority-schema.png" class="shadow">
        <img src="/images/scrz-authority-schema.png" />
    </a>
</div>


## Services and Revisions

Configuration of services is stored in Revisions. Each time you change the
configuration, a new revision is created. That way you can always go back if
you make a mistake or deploy a buggy version.

Each Revision specifies which image to use, the command to execute,
environment variables, and which ports and volumes it needs.

In a typical Ruby on Rails app, the command to execute the web server would be
<code>bundle exec rails server</code>. In the environment you'd set
<code>RAILS_ENV</code> to <code>production</code> and include other
environment variables necessary in your app.
