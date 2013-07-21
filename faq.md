---
layout: default
title: scrz
---

## How is scrz different from Capistrano or Fabric?

Both Capistrano and Fabric require that the person performing the deployment
has SSH access to the servers. Scrz uses a management server and developers
only need access to that. Scrz then automatically distributes your application
to the servers.

## How do I create an image?

An image is a filesystem snapshot that is used as the rootfs for the
container. You can create your own image from scratch, or you can start with
one of the base images (ubuntu-13.04-64bit) and modify it as required.
