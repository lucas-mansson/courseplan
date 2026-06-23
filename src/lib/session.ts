import "server-only";

import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { cache } from "react";
import { redirect } from "next/navigation";

const SECRET_KEY = process.env.SESSION_SECRET;
const ENCODED_KEY = new TextEncoder().encode(SECRET_KEY);

const COOKIE_STORE_SESSION_KEY = "session";
const HASHING_ALGORITHM = "HS256";

export interface SessionPayload extends JWTPayload {
  userId: unknown;
  expiresAt: Date;
}

const expiryTime = {
  str: "7d",
  ts: 7 * 24 * 60 * 60 * 1000,
};

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + expiryTime.ts);
  const session = await encrypt({ userId, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_STORE_SESSION_KEY, session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get(COOKIE_STORE_SESSION_KEY)?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/sign-in");
  }

  return { isAuth: true, userId: session.userId };
});

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_STORE_SESSION_KEY);
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: HASHING_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(expiryTime.str)
    .sign(ENCODED_KEY);
}

export async function decrypt(session: string | undefined = "") {
  if (!session) {
    console.warn("Could not find session")
    return
  }
  try {
    const { payload } = await jwtVerify(session, ENCODED_KEY, {
      algorithms: [HASHING_ALGORITHM],
    });
    return payload;
  } catch (error) {
    console.error("Failed to verify session", error);
  }
}
