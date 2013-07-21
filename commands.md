---
layout: default
title: supervisor
---

# Commands

The supervisor listens on a unix socket and accepts commands through it. By
default, only the user the supervisor is running under can send commands. This
typically is the root.

Certain commands don't require contacting the supervisor and work even if the
supervisor is not running.

<div class="command-title">List all containers</div>
<div class="command">
    <div class="command-cmdline">scrz ps</div>
    <div class="command-output">ID           IMAGE                COMMAND             STATUS
ivevpvcnpa   ubuntu-13.04-64bit   /sbin/init          running
qruqgjfftb   rails-app-v3         /srv/rails/server   stopped</div>
</div>

<div class="command-title">Stop a container</div>
<div class="command">
    <div class="command-cmdline">scrz stop &lt;container id&gt;</div>
    <div class="command-output">Container [id] has been stopped.</div>
</div>

<div class="command-title">Start a new container</div>
<div class="command">
    <div class="command-cmdline">scrz run &lt;image-id&gt; &lt;command...&gt;</div>
    <div class="command-output">Container [id] has been stopped.</div>
    <ul class="command-options">
        <li>--save-as &lt;image-id&gt;</li>
        <li>--mount &lt;mount-point&gt; &lt;host-path&gt;</li>
    </ul>
</div>

<div class="command-title">List all available images</div>
<div class="command">
    <div class="command-cmdline">scrz list-images</div>
    <div class="command-output">1c4231bb76195e47bb8d4d10c0d81f01150f5437
lpaxaanwcj
mail-v1
ubuntu-13.04-64bit</div>
</div>
