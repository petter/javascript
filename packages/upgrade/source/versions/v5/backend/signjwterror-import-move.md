---
title: '`SignJWTError` import moved to `@clerk/backend/errors`'
matcher: "import\\s+{[\\s\\S]*?SignJWTError[\\s\\S]*?}\\s+from\\s+['\"]@clerk\\/(backend)['\"]"
matcherFlags: 'm'
replaceWithString: 'backend/errors'
---

The `SignJWTError` import path has changed from `@clerk/backend` to `@clerk/backend/errors`. You must update your import path in order for it to work correctly. Example below of the fix that needs to be made:

```diff
- import { SignJWTError } from "@clerk/backend"
+ import { SignJWTError } from "@clerk/backend/errors"
```