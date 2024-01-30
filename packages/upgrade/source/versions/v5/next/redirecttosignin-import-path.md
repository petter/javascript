---
title: '`redirectToSignIn` import moved under `/server/'
matcher: "import\\s+{[\\s\\S]*?[,\\s]redirectToSignIn[,\\s][\\s\\S]*?from\\s+['\"]@clerk\\/(nextjs)[\\s\\S]*?['\"]"
replaceWithString: 'nextjs/server'
---

The `redirectToSignIn` import path has changed from `@clerk/nextjs` to `@clerk/nextjs/server`, as this is a helper that should be only used on the server side. You must update your import path in order for it to work correctly. Example below of the fix that needs to be made:

```diff
- import { redirectToSignIn } from "@clerk/nextjs"
+ import { redirectToSignIn } from "@clerk/nextjs/server"
```