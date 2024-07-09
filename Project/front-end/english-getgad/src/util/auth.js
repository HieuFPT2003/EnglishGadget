import { redirect } from "react-router-dom";

export function getTokenDuration() {
  const storedExpirationData = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationData);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem("token");
  const duration = getTokenDuration();

  if (!token) {
    return null;
  }

  if (duration < 0) {
    return "EXPIRED";
  }
  return token;
}

export function tokenLoader() {
  const token = getAuthToken();
  return token;
}

export function checkAuthLoader() {
  const token = getAuthToken();
  if (!token) {
    return redirect("/auth");
  } else {
    return token;
  }
}

export async function checkPremiumAccount() {
  const token = getAuthToken();
  if (!token) {
    return false;
  }
  const premium = await fetchUser(token);
  return premium;
}

async function fetchUser(token) {
  const response = await fetch(`http://localhost:9999/Users?token=${token}`);
  if (!response.ok) {
    console.log(response.status);
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const users = await response.json();
  return users[0].premium;
}

export async function redirectNotPremium() {
  console.log("redirectNotPremium");
  const premium = await checkPremiumAccount();
  if (!premium) {
    return redirect("/premium");
  }
  return null;
}

export async function fetchUserRole(token) {
  const response = await fetch(`http://localhost:9999/Users?token=${token}`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const users = await response.json();
  return users[0].role;
}


// Check if the user is an admin
export async function checkAdminRoleLoader() {
  const token = getAuthToken();
  if (!token) {
    return redirect("/auth");
  }

  const role = await fetchUserRole(token);
  if (role !== 'admin') {
    return redirect("/auth");
  }
  return null;
}

