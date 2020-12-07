/**
 * fetch post image
 * @param image
 * @param fileName
 * @param route
 * @param callback
 */
const fetchPatchImage = (image, fileName, route, callback) => {
  var fd = new FormData();
  fd.append(fileName, image);
  fetch(route, {
    method: "PATCH",
    body: fd,
    // mode: "cors",
  })
    .then(async (response) => {
      if (response.status === 500) {
        let responseText = await response.text();
        throw new Error(responseText);
      }
      return response.text();
    })
    .then((img) => {
      callback(URL.createObjectURL(image));
      console.log(img + "posted to server");
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * fetch post json
 * @param data
 * @param route
 * @param callbacks
 */
const fetchPostJson = async (data, route, callback) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  await fetch(route, {
    method: "POST",
    body: JSON.stringify(data),
    headers,
  })
    .then((res) => res.json())
    .then((json) => {
      console.log("server response: ", json);
      callback();
    })
    .catch((err) => {
      console.log(`couldn't post json: ${err}`);
    });
};

/**
 * fetch get json
 * @param route
 * @param cb  callback function
 */
const fetchGet = async (route, cb) => {
  await fetch(route)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      cb(json);
    })
    .catch((err) => {
      console.log(`couldn't get route: ${route}, ${err}`);
    });
};
module.exports = {
  fetchGet,
  fetchPatchImage,
  fetchPostJson,
};
