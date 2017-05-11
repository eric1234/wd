Whatcha Doin? - Nagware Time Tracking
======================================

A method of tracking time by nagging you.

Installation
============

FUTURE: Will be package up a standard installable desktop app using
[electron-forge](https://github.com/electron-userland/electron-forge)

Currently, you need node and npm installed. Then:

```
npm install
```

Usage
=====

* Run app. Currently this is done via `electron <path-to-code>`. Later we'll
  get this as a standard desktop icon.
* It will prompt you for what you are doing. Tell it.
* When it prompts you again later, let it know if you are still working on the
  same thing (just hit `enter`) or enter something new.
* If you don't answer it will assume you have stepped away and note the current
  task is stopped.
* If restarting an older task type the first few letters for auto-complete.
  If your task if the first option just hit `enter`. Otherwise hit `down` to
  select your task and then hit `enter`.
* If you wish to explicitly change task (instead of waiting for it to ask)
  click the tray icon.
* When you want to see how much time you have spent on tasks today, right click
  on the tray icon and hit `Report`

To understand the reason for this work-flow see MOTIVATIONS.md.

Development
===========

There is a test suite although it's just unit tests currently. I plan to add
[Spectron](https://github.com/electron/spectron) tests for integration testing
later. To run the test suite:

    npm test

Also to avoid development messing with your real data file you should launch
the app via `npm start`. This will make the data file be the `events.db` file
in the code directory instead of the normal location in your system profile.

Cost and Licensing
==================

"Whatcha Doin?" technically has been placed in the public domain to make license
evaluation quick, easy and non-restrictive.

BUT, informally I like to think of it as
[Careware](https://en.wikipedia.org/wiki/Careware). I encourage the users
to evaluate how useful it is to them and make an appropriate donation to the
charity of their choice. If you do let me know. I would love to list the
charities that have benefited in this software's name.
