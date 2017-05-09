Whatcha Doin? - Nagware Time Tracking
======================================

A method of tracking how your time is spent on your computer by nagging you
to find out how you are spending your time. Check out the "Goals and Usage"
section of this doc to better understand the motivations of it's design.

Installation
============

TODO

Goals and Usage
===============

Assume User Failure
-------------------

I have used many different systems for tracking time over the years. I find most
of them fail because I fail.

* **Timers** - I either forget to start them or stop them. This then means I
  have to spend extra time correcting them to the right values.
* **Forgetfulness** - When did I start or finish a task. Sometimes I can use an
  e-mail or chat message as a frame of reference but my memory is too faulty
  to remember what I did between 10 and 11am today.
* **Inconsistency** - Tracking time "as I go" sounds great. But inevitably I
  forget or get sidetracked. This takes me back to trying to use my memory
  (see point 2)

"Whatcha doin?" is different because it assumes these failures. It will
relentlessly nag you every 15 minutes to find out what you are working on
and record the answer. If you don't answer within a minute it assumes you have
stopped working and will automatically stop the timer on the last task you
where working on.

Of course if you aren't as much of a failure as I am you can still actively
indicate to "Whatcha doin?" your current task (for a bit more accuracy than
the 15 minute timer will allow). But if you fail (like me) "Whatcha doin?" has
your back.

Optimize Input
--------------

Even though "Whatcha doin?" will relentlessly pester you to find out what you
are actively working on I don't want it to really interrupt the workflow.
Providing it an answer and getting back to work has been optimized for minimal
loss of focus. This means:

* It will assume you are working on the last thing you were working on. This
  will already be populated. Just hit enter to confirm this and continue
  working.
* If you have changed tasks but changed to a task you recently worked on the
  auto-complete means you can likely just type a few characters, hit down to
  highlight the correct recent task and hit enter to submit.
* You do not need to pre-define tasks. If you are starting a new task you have
  never done before just type it in and hit enter.

Limited Reporting
-----------------

Another reason some time tools fail is that they try to both track and report.
This seems natural of course. Why would we track it if we don't want to report
on it (for example to get hours for an invoice for a specific project).

But this dual need also is what impedes time tracking. Requirements for
reporting include:

* Correct categorization of the time so it can be tracked against projects/tasks
  and the setup of those categorizations.
* Complete and professional explanation of the time that can be presented on
  things like an invoice.

Getting a time entry entered fully for reporting takes effort and accuracy.
When you are pumping through tasks it's easy to mis-categorize a time entry or
not put enough thought into providing a good description that is presentable
in an invoice.

"Whacha Doin?" sidesteps these issues by just focusing on getting a note on how
the time was spent. At a later point (COB) you then take the summary of how you
spent your time and transfer it into your time reporting system. Since all that
effort is batched together you can easily take 15 minutes at the end of the day
to ensure it's final destination is categorized and labeled properly.

To discourage folks from using "Whatcha Doin?" as a time reporting system all
entries older than 10 days are automatically removed.

Cost and Licensing
==================

"Whatcha Doin?" is released to the public domain. It was created simply to help
myself. I am releasing it for in case it is helpful also to someone else.

I have found this software has increased revenue by simply ensuring that all
work done is billed. If you also find it to have this beneficial effect I
encourage you to think about the value is has given you and make an appropriate
donation to your favorite cause as a "payment". Let me know if you do. I would
love to share all the organizations that are benefiting in the name of this
software. Call it donationware. :)
