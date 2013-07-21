---
layout: default
title: authority
---

# Authority

The authority is a central database which stores configuration of all
supervisors. The authority exposes a HTTP interface which the supervisors use
to communicate with it. The software is written in Ruby on Rails.

The authority is still a bit rough at the edges. For example, it doesn't yet
have a full web interface that could be used to manage it. Some changes can
only be done through the rails console.


# Entities

The authority manages a number of entities. To get a quick overview, take a
look at the [database schema][scrz-authority-schema].

*Projects* group multiple services together. *Images* are filesystem snapshots
which can be used to instanciate a new container. Projects provide multiple
*Services* to the outside. *Revisions* describe a particular version of a
service. *Deployments* specify where revisions are deployed to.  *Hosts* are
servers where supervisors are running.

Revisions reference *Envars*, *Ports* and *Volumes*. Those are runtime
resources that are required by the revision.

Not yet implemented are *Port/Volume allocations* and *Backing Volumes*. Those
will be used by the supervisors to report back to the authority which actual
resources have been allocated.

In the future the authority will also keep track of *Proxies* and *Proxy
Targets* to manage HTTP proxy configuration.


[scrz-authority-schema]: /images/scrz-authority-schema.png
