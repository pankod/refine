import Web3 from "web3";

const web3 = new Web3(window.ethereum);

export const getBalance = async (account: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line
    web3.eth.getBalance(account, (err: any, result: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(web3.utils.fromWei(result, "ether"));
      }
    });
  });
};

//Signed Transaction with using Metamask
export const sendEthereum = async (
  sender: string,
  receiver: string,
  amount: string,
) => {
  try {
    const params = {
      from: sender,
      to: receiver,
      value: web3.utils.toHex(web3.utils.toWei(amount, "ether")),
      gas: 39000,
    };
    await window.ethereum.enable();
    return await web3.eth.sendTransaction(params);
  } catch (error) {
    new Error("Something went wrong!");
  }
};
