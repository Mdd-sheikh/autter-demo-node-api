import { describe, expect, test } from "vitest";
import { buildApp } from "./app.js";

describe("zod schema after version bump", () => {
  test("preserves valid nested config fields when parsing /api/projects", async () => {
    const app = buildApp();
    const res = await app.inject({
      method: "POST",
      url: "/api/projects",
      payload: {
        name: "alpha",
        config: { retries: 3 },
        extraOuterField: "should-be-stripped",
      },
    });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({ name: "alpha", config: { retries: 3 } });
  });
});
