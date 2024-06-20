var StringUtils = {
  removeLastPathSegment: function (url) {
    // Remove trailing slashes
    url = url.replace(/\/+$/, "");

    // Split the URL by slashes
    const segments = url.split("/");

    // Remove the last segment
    segments.pop();

    // Join the segments back together
    return segments.join("/");
  },
};

module.exports = StringUtils;
