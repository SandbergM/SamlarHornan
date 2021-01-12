export const convertTimeStamp = (timestamp) => {
  let time = new Date(timestamp * 1000);
  let minutes = time.getMinutes();
  let hours = time.getHours();
  let date = time.toLocaleDateString();

  minutes = minutes < 10 ? minutes + "0" : minutes;

  return `${date} - ${hours}:${minutes}`;
};
