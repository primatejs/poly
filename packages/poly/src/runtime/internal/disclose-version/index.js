import { PUBLIC_VERSION } from "#version";

if (typeof window !== "undefined")
// @ts-ignore
{
  (window.__poly || (window.__poly = { v: new Set() })).v.add(PUBLIC_VERSION);
}
