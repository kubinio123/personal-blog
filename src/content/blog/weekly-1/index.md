---
title: "Weekly #1"
description: "What's been going on between 9-15 March"
date: "2026-03-15"
category: "Weekly"
author:
  name: "Jakub Cichy"
draft: false
sources:
  - title: "Building Claude Code with Boris Cherny"
    url: "https://open.spotify.com/episode/3fuz0q5vlIQE1DB6JmKZ8B?si=96a3075fe2c04cc9"
---

Since I want to be consistent with keeping my personal blog up to date, I thought a weekly series would be a great start. I would try to keep it short and basically just reflect on the past week, work-wise, learning-wise.

## How's work

### MVP followup 

The past week has been a bit of a multitasking effort for me. On one side, we are quickly following up on an MVP version of our brand new audit service for the medical imaging data platform we're developing. By following up, I mean we are adding new features that didn't fit into the MVP. I was responsible for developing and rolling out a new subscriptions feature in the audit service which allows users to get time-based reports, aka digests, of what has been going on in their projects.

I really enjoyed working on the code. Nothing fancy, but the flow is more or less like: a user subscribes via API, the subscription is saved into the database, a periodic process looks up due subscriptions, fetches the time-based data, and stores that as raw notification data in the outbox table. From there, an outbox processor picks it up, compiles the raw data into a readable message based on the notification channel, and sends that to the user.

My goal was for the API to be very generic, allowing users to create any custom sort of report and allowing us to implement any delivery channel users might need. We obviously started with email first. As the API is generic and benefits power users, I also implemented subscription templates--these are predefined kinds of reports that users can subscribe to where they only need to specify the schedule and that's it. I think this feature and a couple of smaller changes will conclude the audit service effort for a while, until we collect some more feedback from the users.

### Elasticsearch migration

I mentioned multitasking, right? That's because we are also preparing to migrate our AWS OpenSearch cluster from running Elasticsearch to running actual OpenSearch under the hood. To kick things off, I spun up a new cluster on the dev environment, running side-by-side with the current one, and fed it with data from our hourly snapshots that are stored in S3.

I was surprised how quickly the new cluster got all the documents indexed and searchable--the restore from snapshot seems quite powerful; it literally took like 5 minutes and we do have a lot of indices with extensive, large mappings. The goal for me is to switch dev to use the new cluster and basically observe for a week or two if anything pops up, and if any additional steps will be required for a smooth and safe migration in production.

When migrating prod, we always aim for zero-downtime and no-service-disruption migrations. In this case, it also means running the new cluster side-by-side for a period of time and eventually making the switch, keeping the old cluster alive for some time after that as well. We don't need to worry about data sync during such a period, as documents are stored using Kafka consumer services, so we can just run two consumer groups during that time.

## Food for Thought

### Interview with Boris Cherny

I've listened to an interview with Boris Cherny, an engineer from Anthropic. I found myself sharing a similar perspective to him in regards to a shift in engineering culture that is and should naturally happen in the AI era: putting less thinking into what languages or frameworks we need to use, and focusing on what we actually need to build instead.

The never-ending debate about languages and frameworks has been annoying me even before LLMs. I understand everyone (including me) has their own preferences, but it should not cause any conflict in today's engineering teams. We should use the AI tools to our advantage and step out of our comfort zone. The fact that Anthropic doesn't give its employees any specific titles speaks for itself. People working in the marketing department are self-sufficient enough to use technology in their favor on their own, and so are engineers doing the work that back in the days wasn't in their scope.

I was surprised when, at the end of the interview, Boris said that functional programming in Scala is a thing he would recommend learning, as it makes you think in types, which most often maps into more readable, more thought-out code. That was nice to hear as a Scala enthusiast using it daily.
