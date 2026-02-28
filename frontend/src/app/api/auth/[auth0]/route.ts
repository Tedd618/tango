import { auth0 } from "@/lib/auth0";

// @ts-expect-error Types in v4.15 might be outdated or resolving incorrectly locally
export const GET = auth0.handleAuth();
// @ts-expect-error Types in v4.15 might be outdated or resolving incorrectly locally
export const POST = auth0.handleAuth();
