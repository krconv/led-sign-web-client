import { Observable } from "rxjs";
import request from "request";

export default function streamFrames(protocol, host, secret) {
  return new Observable(subscriber =>
    request
      .get(getRequestUrl(protocol, host), getRequestOptions(secret))
      .on("response", response => {
        if (response.statusCode === 401) {
          subscriber.error(new Error("Secret is not correct"));
        }
      })
      .on("data", data => {
        try {
          subscriber.next(parseData(data));
        } catch (err) {
          console.log("Error while parsing a frame!", err);
        }
      })
      .on("error", err => subscriber.error(err))
      .on("end", () => subscriber.complete())
  );
}

function getRequestUrl(protocol, host) {
  return `${protocol}://${host}/api/render`;
}

function getRequestOptions(secret) {
  return {
    auth: {
      bearer: secret
    }
  };
}

function parseData(data) {
  let decoded = new TextDecoder().decode(data);
  const [dimensions, rawPixels] = decoded
    .split("|")
    .map(d => d.trim().split(","));

  if (!dimensions || !rawPixels) {
    throw new Error("Could not parse frame! ", decoded);
  }

  const [width] = dimensions.map(parseInt);

  const pixels = [];
  var row = [];
  for (var i = 0; i < rawPixels.length; i++) {
    const pixel = parseInt(rawPixels[i], 16);
    row.push(pixel);

    if ((i + 1) % width === 0) {
      pixels.push(row);
      row = [];
    }
  }

  return pixels;
}
