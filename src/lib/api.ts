import { LoginSchemaType } from "../components/LoginForm";
import { UserInfo } from "../context/GlobalContext";

const API_BASE_URL = "https://api.escuelajs.co";

type UserTokensType = {
  access_token: string;
  refresh_token: string;
};

export async function getAccessToken(refreshToken1: string) {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/v1/auth/refresh-token`, {
      method: "POST",
      body: JSON.stringify({ refreshToken: refreshToken1 }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    throw new Error("Network error");
  }

  if (response.ok) {
    const responseData: UserTokensType = await response.json();
    return responseData;
  } else if (response.status === 401) {
    const responseData = await response.json();
    throw new Error(responseData?.detail || "Invalid token");
  } else {
    console.error(`Unexpected status: ${response.status}`);
    const responseData = await response.text();
    console.error(`Response body: ${responseData}`);
    throw new Error("Unexpected error. Please try again later!");
  }
}

export async function login(formData: LoginSchemaType) {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    throw new Error("Network Error");
  }

  if (response.ok) {
    const responseData: UserTokensType = await response.json();
    return responseData;
  } else if (response.status === 401) {
    const responseData = await response.json();
    throw new Error(responseData?.message || "Invalid credentials");
  } else {
    throw new Error("Unexpected error. Please try again later!");
  }
}

export async function getUserDetails(accessToken: string) {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/v1/auth/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    throw new Error("Network error");
  }

  if (response.ok) {
    const responseData: UserInfo = await response.json();
    return responseData;
  } else if (response.status === 401) {
    const responseData = await response.json();
    throw new Error(responseData?.message || "Unauthorised.");
  } else {
    console.error(`Unexpected status: ${response.status}`);
    const responseData = await response.text();
    console.error(`Response body: ${responseData}`);
    throw new Error("Unexpected error. Please try again later!");
  }
}
