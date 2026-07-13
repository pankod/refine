import type { AuthProvider } from "@refinedev/core";
import Web3 from "web3";
import Web3Modal from "web3modal";

import { getBalance } from "./utility";

export const TOKEN_KEY = "refine-auth";

const providerOptions = {};
const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions,
});

// eslint-disable-next-line
let provider: any | null = null;

export const authProvider: AuthProvider = {
  login: async () => {
    if (window.ethereum) {
      provider = await web3Modal.connect();
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      localStorage.setItem(TOKEN_KEY, accounts[0]);
      return {
        success: true,
        redirectTo: "/",
      };
    }
    return {
      success: false,
      error: new Error(
        "Not set ethereum wallet or invalid. You need to install Metamask",
      ),
    };
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    if (provider?.close) {
      await provider.close;

      provider = null;
      await web3Modal.clearCachedProvider();
    }
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
      logout: true,
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const address = localStorage.getItem(TOKEN_KEY);
    if (!address) {
      return null;
    }

    const balance = await getBalance(address);

    return {
      address,
      balance,
    };
  },
};
