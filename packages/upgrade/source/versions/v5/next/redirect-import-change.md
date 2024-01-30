---
title: '`redirect` import moved under `/server`'
matcher: "import\\s+{[\\s\\S]*?[,\\s]redirect[,\\s][\\s\\S]*?from\\s+['\"]@clerk\\/(nextjs)[\\s\\S]*?['\"]"
matcherFlags: 'm'
replaceWithString: 'nextjs/server'
---

The `redirect` import path has changed from `@clerk/nextjs` to `@clerk/nextjs/server`, as this is a helper that should be only used on the server side. You must update your import path in order for it to work correctly. Example below of the fix that needs to be made:

```diff
- import { redirect } from "@clerk/nextjs"
+ import { redirect } from "@clerk/nextjs/server"
```