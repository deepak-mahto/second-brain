export const random = (len: number) => {
  let options = "jdfherfhf2345435jhfdeoi@oig#$%oijfoierg835938";
  let ans = "";
  for (let i = 0; i < len; i++) {
    ans += options[Math.floor(Math.random() * len)];
  }
  return ans;
};
