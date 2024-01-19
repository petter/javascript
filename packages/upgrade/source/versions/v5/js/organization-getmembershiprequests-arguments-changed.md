---
title: '`Organization.getMembershipRequests` arguments changed'
matcher: "\\.getMembershipRequests\\("
---

There have been a couple changes to the pagination arguments that can be passed into this function - `limit` has been renamed to `pageSize`, and `offset` has been renamed to `initialPage`. This will help to make it more clear and simple to reason about pagination control. Example of how changes might look below:

```diff
  import Clerk from "@clerk/clerk-js"

  const clerk = new Clerk()
  await clerk.load()

  const { data: orgs } = await clerk.organization.getMembershipRequests({
-   limit: 10,
+   pageSize: 10,
-   offset: 10,
+   initialPage: 2,
  })
```